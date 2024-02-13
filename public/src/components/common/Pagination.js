import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Pagination({ totalPages, onPageChange }) {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(
    router.query.page === undefined ? 1 : Number(router.query.page)
  );

  useEffect(() => {
    setCurrentPage(router.query.page === undefined ? 1 : Number(router.query.page));
  }, [router.query.page]);

const renderPaginationButton = (page) => {
  const isActive = page === currentPage;
  const onClick = () => onPageChange(page);

  const buttonClassName = `page-link ${isActive ? "active" : ""}`;

  return (
    <li
      className={`page-item ${isActive ? "active" : ""}`}
      aria-current={isActive ? "page" : null}
      key={page}
    >
      <Link href={page == 1 ? `${router.asPath.split('?')[0]}` : `${router.asPath.split('?')[0]}?page=${page}`}>
        <button className={buttonClassName}>{page}</button>
      </Link>
    </li>
  );
};

  const renderPagination = () => {
    const maxButtonsToShow = 7;
    const halfButtonsToShow = Math.floor(maxButtonsToShow / 2);
    const startPage =
      currentPage - halfButtonsToShow <= 1
        ? 1
        : currentPage + halfButtonsToShow >= totalPages
          ? totalPages - maxButtonsToShow + 1
          : currentPage - halfButtonsToShow;
    const endPage =
      startPage + maxButtonsToShow - 1 > totalPages
        ? totalPages
        : startPage + maxButtonsToShow - 1;

    const pages = [];

    for (let i = startPage; i <= endPage; i++) {
      pages.push(renderPaginationButton(i));
    }

    return (
      <nav aria-label="Pagination">
        <ul className="pagination">
          <li className={`page-item ${currentPage <= 1 ? "disabled" : ""}`}>
            <Link href={currentPage > 2 ? `${router.asPath.split('?')[0]}?page=${currentPage - 1}` : `${router.asPath.split('?')[0]}`}>
              <button className="page-link">Previous</button>
            </Link>
          </li>
          {pages}
          <li
            className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
          >
            <Link href={`${router.asPath.split('?')[0]}?page=${currentPage + 1}`}>
              <button className="page-link">Next</button>
            </Link>
          </li>
        </ul>
      </nav>
    );
  };

  return renderPagination();
}
