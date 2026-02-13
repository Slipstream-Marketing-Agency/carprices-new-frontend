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
      } catch (error) {if (process.env.NODE_ENV === 'development') { console.error('Error fetching article types:', error); }
        return [];
      }
    };

    fetchArticleTypes()
  },[])
}
