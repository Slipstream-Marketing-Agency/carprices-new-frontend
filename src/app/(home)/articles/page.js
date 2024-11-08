"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function ArticlesPage() {
  const router = useRouter();
  const [articlesData, setArticlesData] = useState({ data: [], pagination: {} });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // State for filters
  const [selectedType, setSelectedType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  // Fetch all articles (without filters) on the client side
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}articles/list`, {
          params: {
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
  }, [currentPage, pageSize]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Function to navigate to the filtered page based on selected filters
  const applyFilters = () => {
    const filters = [];
    if (selectedType) filters.push(`type/${selectedType}`);
    if (selectedCategory) filters.push(`category/${selectedCategory}`);
    if (selectedTag) filters.push(`tag/${selectedTag}`);
    
    const filterPath = filters.join('/');
    router.push(`/articles/${filterPath}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">All Articles</h1>

      {/* Filter Controls */}
      <div className="flex gap-4 mb-6">
        <select
          className="border border-gray-300 p-2 rounded"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="technology">Technology</option>
          <option value="business">Business</option>
          {/* Add more types as needed */}
        </select>

        <select
          className="border border-gray-300 p-2 rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="news">News</option>
          <option value="reviews">Reviews</option>
          {/* Add more categories as needed */}
        </select>

        <select
          className="border border-gray-300 p-2 rounded"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          <option value="">All Tags</option>
          <option value="javascript">JavaScript</option>
          <option value="react">React</option>
          {/* Add more tags as needed */}
        </select>

        <button
          onClick={applyFilters}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Apply Filters
        </button>
      </div>

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
