// src/components/LastTwoWeeksArticles.js

"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function LastTwoWeeksArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch articles from the last two weeks
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}articles/last-two-weeks`);
        setArticles(response.data.data);
        setLoading(false);
      } catch (error) {if (process.env.NODE_ENV === 'development') { console.error("Error fetching articles:", error); }
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading articles...</p>;
  }

  if (articles.length === 0) {
    return null
  }

  return (
    <div className="p-4  shadow-md rounded-lg mt-6">
      <h2 className="text-lg font-semibold mb-4 uppercase">From Last Two Week</h2>
      <div className="space-y-4">
        {articles.map((article) => (
          <div key={article.id} className="flex flex-col">
            <Link href={`/${article.types[0]}/${article.slug}`}>
              <h3 className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                {article.title}
              </h3>
            </Link>
            <div className="text-xs text-gray-500 flex items-center space-x-2 mt-1">
              <span>{new Date(article.publishedAt).toLocaleDateString("en-GB", { day: '2-digit', month: 'long', year: 'numeric' })}</span>
              <span>|</span>
              <span className="text-blue-500 font-medium">{article.types[0]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
