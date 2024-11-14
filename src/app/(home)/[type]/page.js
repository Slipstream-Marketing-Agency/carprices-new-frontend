// src/app/[type]/page.js

import FeaturedSlider from '@/components/articles-component/FeaturedSlider';
import Pagination from '@/components/articles-component/Pagination';
import SearchSelect from '@/components/articles-component/SearchSelect';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import TypeNavigation from '@/components/articles-component/TypeNavigation';
import TtitleAndDescription from '@/components/articles-component/TtitleAndDescription';
import LastTwoWeeksArticles from '@/components/articles-component/LastTwoWeeksArticles';
import NewsletterSubscribe from '@/components/articles-component/NewsLetterSubscription';
import Ad300x600 from '@/components/ads/Ad300x600';
import PopularCategories from '@/components/popular-sections/PopularCategories';
import { Suspense } from 'react';

const VALID_TYPES = ['news', 'reviews','new-launches', 'comparisons', 'buying-guide', 'top-picks']; // Example, update this based on your types

export async function generateStaticParams() {
  return VALID_TYPES.map((type) => ({ type }));
}

export default async function TypePage({ params, searchParams }) {
  const { type } = params;
  const page = parseInt(searchParams.page) || 1;
  const pageSize = parseInt(searchParams.pageSize) || 9;

  if (!VALID_TYPES.includes(type)) {
    notFound();
  }

  
  const fetchArticles = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}articles/type/${type}`, {
        params: { page, pageSize },
      });
      return data;
    } catch (error) {
      console.error('Error fetching articles:', error);
      return null;
    }
  };

  const fetchFeaturedArticles = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}articles/type/${type}`, {
        params: { tag: 'featured', page: 1, pageSize: 5 },
      });
      return data;
    } catch (error) {
      console.error('Error fetching featured articles:', error);
      return null;
    }
  };

  const fetchArticleTypes = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}article-types/type-list`);
      return data;
    } catch (error) {
      console.error('Error fetching article types:', error);
      return [];
    }
  };

  const fetchPopularCategoriesAndTabs = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}articles/popular-categories-tags?type=${type}`);
      return data;
    } catch (error) {
      console.error('Error fetching article types:', error);
      return [];
    }
  };

  const articlesData = await fetchArticles();
  const featuredArticlesData = await fetchFeaturedArticles();
  const articleTypes = await fetchArticleTypes();
  const popularCatgeoriesAndTabs = await fetchPopularCategoriesAndTabs();


  console.log(popularCatgeoriesAndTabs, "popularCatgeoriesAndTabs");

  return (
    <div>
      <div className="container px-4 py-4">

        {/* Render NavigationGrid with article types */}

        <div className="container grid sm:gap-10 grid-cols-12">
          <div className="sm:col-span-9 col-span-12 ">
            <div>
              <TypeNavigation types={articleTypes} currentType={type} />

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
                              <div>

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
              )}            </div>
            <PopularCategories />

          </div>
          <div className="sm:col-span-3 col-span-12">
            <FeaturedSlider featuredArticles={featuredArticlesData} type={type} />
            <TagsList tags={popularCatgeoriesAndTabs.tags} />
            <CategoryList categories={popularCatgeoriesAndTabs.categories} />
            <NewsletterSubscribe />

            <LastTwoWeeksArticles />
            <div className='my-6 sticky top-0  md:block hidden'>
              <Suspense fallback={<div>Loading ad...</div>}>
                <Ad300x600 dataAdSlot="3792539533" />
              </Suspense>
            </div>

          </div>
        </div>
      </div>
    </div>

  );
}

const TagsList = ({ tags }) => (
  tags?.length > 0 && (
    <div className="mt-6 shadow-md p-4 rounded-lg">
      <h3 className="md:text-lg font-semibold uppercase">Popular Tags</h3>
      <div className="flex flex-wrap gap-2 mt-4">
        {tags?.map(tag => (
          <Link key={tag?.id} href={`/news/tag/${tag?.slug}`}>
            <div className="bg-blue-100 text-blue-600 px-1 py-1 rounded-full text-[10px] font-medium hover:bg-blue-200 hover:text-blue-700 transition-colors">
              #{tag?.title}
            </div>
          </Link>
        ))}
      </div>
    </div>

  )
);

const CategoryList = ({ categories }) => (
  categories?.length > 0 && (
    <div className="mt-6 shadow-md p-4 rounded-lg">
      <h3 className="md:text-lg font-semibold uppercase">Popular Categories</h3>
      <div className="flex flex-wrap gap-2 mt-4">
        {categories.map(category => (
          <Link key={category.id} href={`/news/body-types/${category.slug}`}>
            <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-[10px] font-medium hover:bg-blue-200 hover:text-blue-700 transition-colors">
              {category.name}
            </div>
          </Link>
        ))}
      </div>
    </div>

  )
);