// src/app/[type]/Filters.js
"use client";

import { useRouter } from 'next/navigation';

export default function Filters({ type }) {
  const router = useRouter();

  const navigateToFilter = (filterType, filterValue) => {
    if (filterValue) {
      router.push(`/${type}/${filterType}/${filterValue}`);
    }
  };

  return (
    <div className="flex gap-4 mb-6">
      <select
        className="border border-gray-300 p-2 rounded"
        onChange={(e) => navigateToFilter("category", e.target.value)}
        defaultValue=""
      >
        <option value="">Filter by Category</option>
        <option value="technology">Technology</option>
        <option value="business">Business</option>
      </select>

      <select
        className="border border-gray-300 p-2 rounded"
        onChange={(e) => navigateToFilter("tag", e.target.value)}
        defaultValue=""
      >
        <option value="">Filter by Tag</option>
        <option value="javascript">JavaScript</option>
        <option value="react">React</option>
      </select>
    </div>
  );
}
