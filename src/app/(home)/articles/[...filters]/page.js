"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function FilteredArticlesPage({ params, searchParams }) {
  const router = useRouter();

  // Handle optional filters from URL segments
  const filters = params.filters || [];
  const [type, tag, category, car_brand, car_model] = filters;

  const page = searchParams.page || 1;
  const pageSize = searchParams.pageSize || 10;

  // State for articles and pagination
  const [articlesData, setArticlesData] = useState({ data: [], pagination: {} });
  const [currentPage, setCurrentPage] = useState(page);

  // Fetch articles based on filters
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}articles/list`, {
          params: {
            type: type || undefined,
            tag: tag || undefined,
            category: category || undefined,
            car_brand: car_brand || undefined,
            car_model: car_model || undefined,
            page: currentPage,
            pageSize,
          },
        });
        setArticlesData(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, [type, tag, category, car_brand, car_model, currentPage, pageSize]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    const updatedParams = new URLSearchParams(window.location.search);
    updatedParams.set('page', newPage);
    router.push(`/articles/${filters.join('/') || ''}?${updatedParams.toString()}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Filtered Articles</h1>

      {/* Article Listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articlesData.data.length > 0 ? (
          articlesData.data.map((article) => (
            <div key={article.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                <p className="text-gray-700 mb-4">{article.summary}</p>
                <button className="text-blue-500 hover:text-blue-700 font-medium">
                  Read more
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">No articles found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8">
        {Array.from({ length: articlesData.pagination.pageCount || 1 }, (_, i) => (
          <button
            key={i + 1}
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === i + 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            disabled={currentPage === i + 1}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
