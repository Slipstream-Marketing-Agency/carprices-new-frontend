'use client'

import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function TypeNavigation({ currentType }) {

  const [articleTypes, setArticleTypes] = useState([]);

  useEffect(() => {
    const fetchArticleTypes = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}article-types/type-list`);
        setArticleTypes(data);
      } catch (error) {
        console.error('Error fetching article types:', error);
        return [];
      }
    };

    fetchArticleTypes()
  },[])

  console.log(articleTypes)


  return (
    <div className="flex rounded-lg shadow-md w-full mb-4 overflow-x-auto">
      {articleTypes.map((type) => (
        <Link key={type.slug} href={`/${type.slug}`} className="group flex-grow basis-0">
          <div
            className={`p-2 border text-center transition-all ${
              currentType === type.slug
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <h3 className="font-semibold">{type.type}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
