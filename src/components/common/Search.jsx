'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SearchIcon from '@mui/icons-material/Search';
import client from '@/lib/meilisearch';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const router = useRouter();

  // Debounced search effect
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const debounceTimeout = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [query]);

  const handleSearch = async () => {
    if (!query) {
      console.log('Query is empty');
      return;
    }

    console.log('Starting search with query:', query);

    try {
      const modelIndex = client.index('car-model');
      const modelSearchResults = await modelIndex.search(query, { limit: 10 });

      const brandIndex = client.index('car-brand');
      const brandSearchResults = await brandIndex.search(query, { limit: 10 });

      const formattedBrands = brandSearchResults.hits.map((brand) => ({
        id: brand.id,
        name: brand.name,
        slug: brand.slug,
        description: brand.description || 'No description available.',
      }));

      const formattedModels = await Promise.all(
        modelSearchResults.hits.map(async (model) => {
          const modelName = model.name || 'Unknown Model';
          const brandName = model.car_brands?.[0]?.name || 'Unknown Brand';
          const brandSlug = model.car_brands?.[0]?.slug || 'unknown-brand';
          const modelSlug = model.slug || 'unknown-model';
          const modelId = model.id;

          const trimIndex = client.index('car-trim');
          const trimSearchResults = await trimIndex.search('', {
            filter: `car_models.id = ${modelId}`,
            limit: 100,
          });

          // Filter trims to find the latest year that is >= 2024
          const latestTrim = trimSearchResults.hits
            .filter((trim) => trim.year >= 2024)
            .reduce((latest, trim) => {
              return trim.year > (latest?.year || 0) ? trim : latest;
            }, null);

          if (!latestTrim) return null; // Only include models with a valid latest trim >= 2024

          return {
            id: model.id,
            displayText: `${latestTrim.year} ${brandName} ${modelName}`,
            year: latestTrim.year,
            brandSlug,
            modelSlug,
          };
        })
      );

      setResults({
        brands: formattedBrands,
        models: formattedModels.filter(Boolean), // Remove null results
      });
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  const handleBrandClick = (brandSlug) => {
    router.push(`/brands/${brandSlug}`);
  };

  const handleModelClick = (brandSlug, year, modelSlug) => {
    router.push(`/brands/${brandSlug}/${year}/${modelSlug}`);
  };

  return (
    <div className="w-full mx-auto relative">
      <div className="relative">
        <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setDropdownVisible(true)}
          onBlur={() => setDropdownVisible(false)}
          placeholder="Search for Brands and Cars..."
          className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {dropdownVisible && (results.brands?.length > 0 || results.models?.length > 0) && (
        <div className="absolute left-0 top-full mt-2 w-full bg-white border border-gray-200 shadow-lg rounded-lg z-10 max-h-64 overflow-y-auto">
          {results.brands?.length > 0 && (
            <div className="py-2 px-4 border-b border-gray-200">
              <h3 className="text-xs text-gray-500 uppercase font-semibold mb-2">Brands</h3>
              <ul>
                {results.brands.map((brand) => (
                  <li
                    key={brand.id}
                    className="py-1 px-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onMouseDown={() => handleBrandClick(brand.slug)}
                  >
                    {brand.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {results.models?.length > 0 && (
            <div className="py-2 px-4">
              <h3 className="text-xs text-gray-500 uppercase font-semibold mb-2">Models</h3>
              <ul>
                {results.models.map((model) => (
                  <li
                    key={model.id}
                    className="py-1 px-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onMouseDown={() => handleModelClick(model.brandSlug, model.year, model.modelSlug)}
                  >
                    <div className="font-semibold">{model.displayText}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
