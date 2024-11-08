// src/app/[type]/[filterType]/[filterValue]/page.js
import Pagination from '@/components/articles-component/Pagination';
import axios from 'axios';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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

      {/* Article Listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articlesData.data.length > 0 ? (
          articlesData.data.map((article) => (
            <Link href={`/${type}/${article.slug}`} key={article.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              {article.coverImage ? (
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">No Image Available</p>
                </div>
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                <p className="text-gray-700 mb-4 line-clamp-3">{article.summary || 'No summary available.'}</p>
                <div className="flex items-center text-gray-600 text-sm mb-4">
                  <p className="mr-2">{article.author?.name || 'Unknown Author'}</p> •
                  <p className="ml-2">{new Date(article.publishedAt).toLocaleDateString()}</p>
                </div>
                <button className="text-blue-500 hover:text-blue-700 font-medium">Read more</button>
              </div>
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">No articles found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <Pagination
        currentPage={page}
        pageCount={articlesData.pagination.pageCount}
        type={`${type}/${filterType}/${filterValue}`} // Pass full path for pagination
      />
    </div>
  );
}
