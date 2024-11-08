"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Pagination({ currentPage, pageCount, type, totalResults, pageSize }) {
  const router = useRouter();
  const [selectedPageSize, setSelectedPageSize] = useState(pageSize);

  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    setSelectedPageSize(newSize);
    router.push(`/${type}?page=1&pageSize=${newSize}`);
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5; // Show a maximum of 5 pages in the control
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(pageCount, currentPage + 2);

    if (currentPage <= 3) {
      endPage = Math.min(pageCount, maxPagesToShow);
    } else if (currentPage >= pageCount - 2) {
      startPage = Math.max(1, pageCount - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const displayedResultsStart = (currentPage - 1) * selectedPageSize + 1;
  const displayedResultsEnd = Math.min(currentPage * selectedPageSize, totalResults);

  return (
    <div className=" md:flex md:flex-row flex-col md:justify-between items-center mt-8 space-y-3">
      <div className="flex items-center space-x-2">
        {/* Previous Page Button */}
        {currentPage > 1 && (
          <Link
            href={`/${type}?page=${currentPage - 1}&pageSize=${selectedPageSize}`}
            prefetch={true}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            &lt;
          </Link>
        )}

        {/* Page Numbers */}
        {generatePageNumbers().map((page) => (
          <Link
            key={page}
            href={`/${type}?page=${page}&pageSize=${selectedPageSize}`}
            prefetch={true}
            className={`px-3 py-1 rounded ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            {page}
          </Link>
        ))}

        {/* Ellipsis and Last Page */}
        {currentPage < pageCount - 2 && (
          <>
            <span className="px-3 py-1 text-gray-700">...</span>
            <Link
              href={`/${type}?page=${pageCount}&pageSize=${selectedPageSize}`}
              prefetch={true}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              {pageCount}
            </Link>
          </>
        )}

        {/* Next Page Button */}
        {currentPage < pageCount && (
          <Link
            href={`/${type}?page=${currentPage + 1}&pageSize=${selectedPageSize}`}
            prefetch={true}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            &gt;
          </Link>
        )}
      </div>

      {/* Results Summary */}
      <div className="text-gray-700">
        Results: {displayedResultsStart} - {displayedResultsEnd} of {totalResults}
      </div>

      {/* Page Size Selector */}
      <select
        value={selectedPageSize}
        onChange={handlePageSizeChange}
        className="px-3 py-1 bg-gray-200 rounded border border-gray-300 text-gray-700 hover:bg-gray-300"
      >
        {[10, 20, 30, 50].map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
}
