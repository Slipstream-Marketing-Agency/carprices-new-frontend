import { useRouter} from 'next/navigation';
import React from "react";
import Link from "next/link";
import PropTypes from "prop-types"; // Import PropTypes
export default function Pagination({ currentPage, totalPages }) {
  if (isNaN(currentPage) || isNaN(totalPages)) {
    return null; // Or handle the error scenario for invalid inputs
  }

  const router = useRouter();
  const currentPageNumber = parseInt(currentPage, 10);

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    const newQuery = { ...router.query, page };
    router.push({
      pathname: router.pathname,
      query: newQuery,
    });
  };

  // Function to generate page range
  const getPageRange = (start, end) => {
    return Array.from({ length: (end - start) + 1 }, (_, i) => i + start);
  };

  // Determine visible page numbers
  const maxPagesToShow = 3;
  let pages = [];

  if (totalPages <= maxPagesToShow + 4) {
    // Show all pages when total pages are few
    pages = getPageRange(1, totalPages);
  } else {
    // Always include the first and last pages
    pages = [1, totalPages];

    
    // Calculate range of pages to display around the current page
    let startPage = Math.max(2, currentPageNumber - 1);
    let endPage = Math.min(totalPages - 1, currentPageNumber + 1);

    if (currentPageNumber - 1 <= 2) {
      endPage = 1 + maxPagesToShow;
    }

    if (totalPages - currentPageNumber <= 2) {
      startPage = totalPages - maxPagesToShow;
    }

    pages = pages.concat(getPageRange(startPage, endPage));
  }

  // Remove duplicate and sort pages
  pages = [...new Set(pages)].sort((a, b) => a - b);

  return (
    <div className="container">
    {router && ( // Ensure router exists before using it
      <div className="row">
        <div className="col-lg-12">
          <div className="pagination-and-next-prev">
            <div className="pagination">
              <ul>
                {pages.map((pageNumber, index, array) => (
                  <React.Fragment key={pageNumber}>
                    {index > 0 && array[index - 1] !== pageNumber - 1 && (
                      <li>...</li>
                    )}
                    <li
                      className={currentPageNumber === pageNumber ? "active" : ""}
                    >
                      <Link
                        href={{
                          pathname: router.pathname,
                          query: { ...router.query, page: pageNumber },
                        }}
                      >
                        <span>{pageNumber}</span>
                      </Link>
                    </li>
                  </React.Fragment>
                ))}
              </ul>
            </div>
            <div className="next-prev-btn">
              <ul>
                <li>
                  <button
                    onClick={() => changePage(currentPageNumber - 1)}
                    disabled={currentPageNumber === 1}
                    className="bg-transparent"
                  >
                    Prev
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => changePage(currentPageNumber + 1)}
                    disabled={currentPageNumber === totalPages}
                    className="bg-transparent"
                  >
                    Next
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
          )}  
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};