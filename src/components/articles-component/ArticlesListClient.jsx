// app/[type]/ArticleListClient.js
"use client";

import { useRouter } from 'next/navigation';

export default function ArticleListClient({ articles, pagination, baseUrl, initialSortBy }) {
    const router = useRouter();

    // Handle sorting changes
    const handleSortChange = (event) => {
        const newSort = event.target.value;
        router.push(`${baseUrl}&page=1&sortBy=${newSort}`);
    };

    // Handle pagination changes
    const handlePageChange = (newPage) => {
        router.push(`${baseUrl}&page=${newPage}`);
    };

    return (
        <div>
            {/* Sorting Controls */}
            <div>
                <label>Sort By:</label>
                <select value={initialSortBy} onChange={handleSortChange}>
                    <option value="publishedAt:desc">Newest</option>
                    <option value="publishedAt:asc">Oldest</option>
                    <option value="title:asc">Title A-Z</option>
                    <option value="title:desc">Title Z-A</option>
                </select>
            </div>

            {/* Article List */}
            {articles.length > 0 ? (
                articles.map((article) => (
                    <div key={article.id}>
                        <h2>{article.title}</h2>
                        <p>{article.summary}</p>
                        <p>Published on: {new Date(article.publishedAt).toLocaleDateString()}</p>
                    </div>
                ))
            ) : (
                <p>No articles found for this type.</p>
            )}

            {/* Pagination Controls */}
            <div>
                {pagination.page > 1 && (
                    <button onClick={() => handlePageChange(pagination.page - 1)}>Previous</button>
                )}
                <span>
                    Page {pagination.page} of {pagination.pageCount}
                </span>
                {pagination.page < pagination.pageCount && (
                    <button onClick={() => handlePageChange(pagination.page + 1)}>Next</button>
                )}
            </div>
        </div>
    );
}
