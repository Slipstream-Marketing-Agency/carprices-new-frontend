import { useEffect, useState } from 'react';
import { fetchModels } from '@/lib/brandapis';

export default function ModelSearchComponent({ brandname }) {
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(9);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            const data = await fetchModels(brandname, currentPage, pageSize, searchTerm);
            setModels(data.data);
            setLoading(false);
        }
        loadData();
    }, [brandname, currentPage, pageSize, searchTerm]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search models..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
            />
            {loading ? <div>Loading...</div> : (
                <div>
                    {models.map((model) => (
                        <div key={model.id}>{model.name}</div>
                    ))}
                </div>
            )}
        </div>
    );
}
