"use client";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function CarTrimSearch() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [brands, setBrands] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState(searchParams.get('brands')?.split(',') || []);
    const [query, setQuery] = useState(searchParams.get('q') || '');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(parseInt(searchParams.get('page'), 10) || 1);
    const [totalResults, setTotalResults] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const resultsPerPage = 10;

    // Fetch car trims based on selected filters, query, and pagination
    useEffect(() => {
        const searchTrims = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams({
                    page: page.toString(),
                    pageSize: resultsPerPage.toString(),
                });
                if (query) params.set('searchTerm', query);
                if (selectedBrands.length > 0) {
                    params.set('brands', JSON.stringify(selectedBrands));
                }

                const response = await fetch(
                    `${API_URL}car-trims/global-search?keyword=${encodeURIComponent(query || '')}`,
                    { cache: 'no-store' }
                );
                const data = await response.json();

                // Combine brands + models + trims into a flat list for display
                const trimEntries = [];
                if (data.trims) {
                    Object.entries(data.trims).forEach(([brand, displayTexts]) => {
                        displayTexts.forEach((text) => {
                            trimEntries.push({
                                id: `${brand}-${text}`,
                                name: text,
                                brand,
                            });
                        });
                    });
                }

                setResults(trimEntries);
                setTotalResults(trimEntries.length);
                setTotalPages(Math.ceil(trimEntries.length / resultsPerPage));
            } catch (error) {
                if (process.env.NODE_ENV === 'development') {
                    console.error('Error fetching car trims:', error);
                }
            } finally {
                setLoading(false);
            }
        };

        searchTrims();
    }, [query, selectedBrands, page]);

    // Pagination handler
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Search Car Trims</h1>

            <div className="flex flex-col items-center mb-6">
                <input
                    type="text"
                    className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mb-4"
                    placeholder="Search car trims..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            {loading && <p className="text-center text-gray-500 mb-6">Loading...</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((trim) => (
                    <div key={trim.id} className="border border-gray-200 rounded-lg shadow-lg p-4">
                        <h3 className="text-xl font-semibold mb-2">{trim.name}</h3>
                        <p className="text-gray-600 mb-1">Brand: {trim.brand}</p>
                    </div>
                ))}
            </div>

            <div className="mt-8 flex justify-center items-center">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="px-4 py-2 mr-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                    Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .slice(Math.max(0, page - 5), Math.min(totalPages, page + 4))
                    .map((p) => (
                        <button
                            key={p}
                            onClick={() => handlePageChange(p)}
                            className={`px-4 py-2 mx-1 ${p === page ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'} rounded`}
                        >
                            {p}
                        </button>
                    ))}
                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className="px-4 py-2 ml-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            <p className="text-center text-gray-500 mt-4">
                Total Results: {totalResults} | Page {page} of {totalPages}
            </p>
        </div>
    );
}

export default CarTrimSearch;
