import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import Link from "next/link";
import PropTypes from "prop-types"; // Import PropTypes

export default function Pagination({ currentPage, totalPages }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    
    if (isNaN(currentPage) || isNaN(totalPages)) {
        return null; // Or handle the error scenario for invalid inputs
    }

    const currentPageNumber = parseInt(currentPage, 10);

    const changePage = (page) => {
        if (page < 1 || page > totalPages) return null;

        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page);

        // Use Link component for routing in the app router
        return `${pathname}?${params.toString()}`;
    };

    // Function to generate page range
    const getPageRange = (start, end) => {
        return Array.from({ length: end - start + 1 }, (_, i) => i + start);
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
        <div className=" mt-6">
            <div className="flex md:flex-row flex-col items-center space-x-2">
                <ul className="flex space-x-2">
                    {pages.map((pageNumber, index, array) => (
                        <React.Fragment key={pageNumber}>
                            {index > 0 && array[index - 1] !== pageNumber - 1 && (
                                <li className="text-gray-500">...</li>
                            )}
                            <li>
                                <Link
                                    href={changePage(pageNumber) || "#"}
                                    className={`px-4 py-2 border rounded ${currentPageNumber === pageNumber
                                            ? "bg-blue-500 text-white"
                                            : "text-blue-500 hover:bg-blue-100"
                                        }`}
                                >
                                    <span>{pageNumber}</span>
                                </Link>
                            </li>
                        </React.Fragment>
                    ))}
                </ul>
                <div className="flex space-x-2 md:mt-0 mt-4">
                    <Link href={changePage(currentPageNumber - 1) || "#"} passHref>
                        <button
                            disabled={currentPageNumber === 1}
                            className={`px-4 py-2 border rounded ${currentPageNumber === 1
                                    ? "text-gray-400 cursor-not-allowed"
                                    : "text-blue-500 hover:bg-blue-100"
                                }`}
                        >
                            Prev
                        </button>
                    </Link>
                    <Link href={changePage(currentPageNumber + 1) || "#"} passHref>
                        <button
                            disabled={currentPageNumber === totalPages}
                            className={`px-4 py-2 border rounded ${currentPageNumber === totalPages
                                    ? "text-gray-400 cursor-not-allowed"
                                    : "text-blue-500 hover:bg-blue-100"
                                }`}
                        >
                            Next
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
};
