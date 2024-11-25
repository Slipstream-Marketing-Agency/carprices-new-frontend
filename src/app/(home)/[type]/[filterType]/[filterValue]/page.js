// src/app/[type]/[filterType]/[filterValue]/page.js
import Ad300x600 from '@/components/ads/Ad300x600';
import Pagination from '@/components/articles-component/Pagination';
import SearchSelect from '@/components/articles-component/SearchSelect';
import TtitleAndDescription from '@/components/articles-component/TtitleAndDescription';
import TypeNavigation from '@/components/articles-component/TypeNavigation';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import NewsletterSubscribe from '@/components/articles-component/NewsLetterSubscription';

const VALID_TYPES = ['news', 'review', 'new-launches'];
const VALID_FILTERS = ['category', 'tag'];

export default async function FilteredTypePage({ params, searchParams }) {
  const { type, filterType, filterValue } = params;
  const page = parseInt(searchParams.page) || 1;
  const pageSize = parseInt(searchParams.pageSize) || 10;

  // Validate type and filterType; if invalid, show 404 page
  if (!VALID_TYPES.includes(type) || !VALID_FILTERS.includes(filterType)) {
    notFound();
  }

  // Set the filter query parameter for category or tag
  const filterParams = { page, pageSize };
  if (filterType === 'category') {
    filterParams.category = filterValue;
  } else if (filterType === 'tag') {
    filterParams.tag = filterValue;
  }

  // Fetch articles from Strapi API with the relevant filters
  const fetchArticles = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}articles/type/${type}`, {
        params: filterParams,
      });
      return data;
    } catch (error) {
      console.error("Error fetching articles:", error);
      return null;
    }
  };

  const articlesData = await fetchArticles();

  // Handle case where articles data couldn't be fetched
  if (!articlesData) {
    return <p className="text-center text-red-500">Failed to load articles. Please try again later.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Articles in {type} - {filterType.charAt(0).toUpperCase() + filterType.slice(1)}: {filterValue}
      </h1>

      <div className="container grid sm:gap-10 grid-cols-12">
        <div className="sm:col-span-9 col-span-12 ">
          <div>
            <TypeNavigation currentType={type} />

            <TtitleAndDescription type={type} />
            <SearchSelect articleType={type} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articlesData?.data?.map((article, index) => (
                  <Link
                    href={`/${type}/${article.slug}`}
                    key={article?.id}
                    className="bg-white shadow-lg rounded-lg overflow-hidden"
                  >
                    <div className="relative">
                      <Image
                        src={article.coverImage || '/assets/placeholder/news-placeholder.webp'}
                        alt={article?.title}
                        width={0}
                        height={0}
                        sizes="100vw"
                        layout="fixed"
                        className="w-full md:h-[180px] h-[180px] object-cover rounded-t-[14px]"
                      />
                      <div className="absolute top-2 left-2 flex flex-wrap gap-2">
                        {article?.types?.map((type, index) => (
                          <span key={index} className="text-[10px] bg-blue-400 text-white py-[1px] px-[5px] rounded-xl">
                            {type.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-2">
                      <h3 className="text-md font-semibold mb-2">{article.title}</h3>
                      <p className="text-[12px] text-gray-700 line-clamp-3">{article.summary}</p>
                      <div className="mt-2">
                        {article.categories.length > 0 && (
                          <p>
                            <span className="text-[10px] font-semibold">Categories: </span>
                            {article.categories?.map((category, index) => (
                              <span
                                key={index}
                                className="text-[10px] bg-yellow-200 text-black py-[1px] px-[5px] rounded-xl mr-1"
                              >
                                {category.name}
                              </span>
                            ))}
                          </p>
                        )}
                        {article.tags.length > 0 && (
                          <p>
                            <span className="text-[10px] font-semibold">Tags: </span>
                            {article.tags?.map((tag, index) => (
                              <span key={index} className="text-[10px] bg-gray-200 text-black py-[1px] px-[5px] rounded-xl mr-1">
                                {tag.name}
                              </span>
                            ))}
                          </p>
                        )} {article?.carBrands?.length > 0 &&
                          <div className='flex flex-wrap mt-2'>
                            {article?.carBrands?.map((brand, index) => (
                              <div key={index}>

                                <Image
                                  src={brand.brandLogo}
                                  alt={brand?.name}
                                  width={30}
                                  height={30}
                                  className='border rounded-xl'
                                />
                              </div>
                            ))}
                          </div>}



                        <div className="flex flex-col justify-between text-gray-800 mt-2">
                          <div className='flex justify-between'>
                            <div className='flex items-center gap-2'>
                              <Image
                                src={article.author?.avatar}
                                alt={article.author?.name}
                                width={30}
                                height={30}
                                className='border rounded-xl w-[20px] h-[20px]'
                              />
                              <p className="text-xs font-semibold sm:inline">
                                {article.author?.name || 'Unknown Author'}
                              </p>{" "}
                            </div>

                            <p><span className='text-xs font-semibold sm:inline'>Published:
                            </span><span className='text-xs ml-1'>{new Date(article.publishedAt).toLocaleDateString()}
                              </span>
                            </p>

                          </div>{" "}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              {articlesData?.pagination && (
                <Pagination
                  currentPage={articlesData.pagination.page}
                  pageCount={articlesData.pagination.pageCount}
                  type={type}
                  totalResults={articlesData.pagination.total}
                  pageSize={articlesData.pagination.pageSize}
                />
              )}  
          </div>
        </div>
        <div className="sm:col-span-3 col-span-12">
        <NewsletterSubscribe />
        <div className='my-6 pt-16 sticky top-0  md:block hidden'>
              <Suspense fallback={<div>Loading ad...</div>}>
                <Ad300x600 dataAdSlot="2051998638" />
              </Suspense>
            </div>
        </div>
      </div>
    </div>
  );
}
