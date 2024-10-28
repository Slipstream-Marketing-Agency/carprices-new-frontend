"use client";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import client from '@/lib/meilisearch';

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
                const filter = selectedBrands.length > 0
                    ? `car_brands.name IN [${selectedBrands.map(b => `"${b}"`).join(', ')}]`
                    : '';
                
                const response = await fetch(
                    `${process.env.MEILISEARCH_HOST}/indexes/car-trim/search`, 
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${process.env.MEILISEARCH_API_KEY}`
                        },
                        body: JSON.stringify({
                            q: query,
                            filter,
                            limit: resultsPerPage,
                            offset: (page - 1) * resultsPerPage
                        }),
                        cache: 'no-store' // Prevent caching
                    }
                ).then(res => res.json());

                setResults(response.hits);
                setTotalResults(response.nbHits);
                setTotalPages(Math.ceil(response.nbHits / resultsPerPage));
            } catch (error) {
                console.error('Error fetching car trims:', error);
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
                        <p className="text-gray-600 mb-1">Year: {trim.year}</p>
                        <p className="text-gray-600 mb-1">Price: ${trim.price.toLocaleString()}</p>
                        <p className="text-gray-600 mb-1">
                            Brand: {trim.car_brands?.map((brand) => brand.name).join(', ')}
                        </p>
                        <p className="text-gray-600">
                            Model: {trim.car_models?.map((model) => model.name).join(', ')}
                        </p>
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
