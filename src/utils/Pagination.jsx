import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";
import PropTypes from "prop-types"; // Import PropTypes

export default function Pagination({
  currentPage,
  totalPages,
  currentPageZero,
  totalPagesZero,
  type, // Add a type prop to distinguish between the two paginations
}) {
  if (
    isNaN(currentPage) ||
    isNaN(totalPages) ||
    isNaN(currentPageZero) ||
    isNaN(totalPagesZero)
  ) {
    return null; // Or handle the error scenario for invalid inputs
  }

  // console.log(type,"popop");

  const router = useRouter();

  const currentPageNumber = parseInt(type === 1 ? currentPageZero : currentPage, 10);

  const changePage = (page) => {
    if (page < 1 || page > (type === 1 ? totalPagesZero : totalPages)) return;
    const newQuery = {
      ...router.query,
      [type === 1 ? "pageZero" : "page"]: page,
    };
    router.push({
      pathname: router.pathname,
      query: newQuery,
    });
  };

  // Function to generate page range
  const getPageRange = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => i + start);
  };

  // Determine visible page numbers
  const maxPagesToShow = 3;
  let pages = [];
  const total = type === 1 ? totalPagesZero : totalPages;

  if (total <= maxPagesToShow + 4) {
    // Show all pages when total pages are few
    pages = getPageRange(1, total);
  } else {
    // Always include the first and last pages
    pages = [1, total];

    // Calculate range of pages to display around the current page
    let startPage = Math.max(2, currentPageNumber - 1);
    let endPage = Math.min(total - 1, currentPageNumber + 1);

    if (currentPageNumber - 1 <= 2) {
      endPage = 1 + maxPagesToShow;
    }

    if (total - currentPageNumber <= 2) {
      startPage = total - maxPagesToShow;
    }

    pages = pages.concat(getPageRange(startPage, endPage));
  }

  // Remove duplicate and sort pages
  pages = [...new Set(pages)].sort((a, b) => a - b);

  return (
    <div className="container tw-my-6">
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
                            query: { ...router.query, [type === 1 ? "pageZero" : "page"]: pageNumber },
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
                      disabled={currentPageNumber === total}
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
  currentPageZero: PropTypes.number.isRequired,
  totalPagesZero: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["default", 0]).isRequired,
};
