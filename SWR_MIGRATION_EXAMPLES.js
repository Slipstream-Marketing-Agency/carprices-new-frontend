// Example: How to migrate from axios/fetch to SWR for better performance

// ❌ OLD WAY - No caching, multiple requests
import { useState, useEffect } from 'react';
import axios from 'axios';

function OldBrandSelector() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchBrands = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}latest-model-years`);
        setBrands(response.data.data.brands);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBrands();
  }, []);
  
  if (loading) return <div>Loading...</div>;
  
  return <select>{brands.map(b => <option key={b.id}>{b.name}</option>)}</select>;
}

// ✅ NEW WAY - Cached, deduplicated, instant
import { useBrands } from '@/lib/swr-config';

function NewBrandSelector() {
  const { data, isLoading } = useBrands(1, 100);
  
  if (isLoading) return <div>Loading...</div>;
  
  const brands = data?.data?.brands || [];
  
  return <select>{brands.map(b => <option key={b.id}>{b.name}</option>)}</select>;
}

// 🚀 BENEFITS:
// - Instant load if data was fetched before (any component, any page)
// - Only 1 API call even if used in 10 components simultaneously
// - Automatic revalidation in background
// - Works offline with stale data

// ===============================================

// Example 2: Models with dependencies

// ❌ OLD WAY
function OldModelSelector({ brandSlug, year }) {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!brandSlug || !year) return;
    
    const fetchModels = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}car-models/brand/${brandSlug}`,
          { params: { year, page: 1, pageSize: 100 } }
        );
        setModels(response.data.data.models);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchModels();
  }, [brandSlug, year]);
  
  if (loading) return <div>Loading...</div>;
  
  return <select>{models.map(m => <option key={m.id}>{m.name}</option>)}</select>;
}

// ✅ NEW WAY
import { useModels } from '@/lib/swr-config';

function NewModelSelector({ brandSlug, year }) {
  const { data, isLoading } = useModels(brandSlug, year, '', 1, 100);
  
  if (isLoading) return <div>Loading...</div>;
  
  const models = data?.data?.models || [];
  
  return <select>{models.map(m => <option key={m.id}>{m.name}</option>)}</select>;
}

// ===============================================

// Example 3: Custom SWR hook for any endpoint

import useApiSWR from '@/lib/swr-config';

function CarDealers({ brandSlug }) {
  const { data, isLoading, error, mutate } = useApiSWR(
    brandSlug ? `car-dealers/by-filter?brandSlug=${brandSlug}&page=1&pageSize=20` : null,
    {
      // Optional: Override default config
      dedupingInterval: 120000, // 2 minutes
      refreshInterval: 0, // Don't auto refresh
    }
  );
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading dealers</div>;
  
  const dealers = data?.dealers || [];
  
  return (
    <div>
      {dealers.map(dealer => (
        <div key={dealer.id}>{dealer.name}</div>
      ))}
      {/* Manual revalidation button */}
      <button onClick={() => mutate()}>Refresh</button>
    </div>
  );
}

// ===============================================

// Example 4: Pagination with SWR

import { useState } from 'react';
import { useArticles } from '@/lib/swr-config';

function ArticleList() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useArticles('news', page, 10);
  
  const articles = data?.data || [];
  const totalPages = data?.pagination?.pageCount || 1;
  
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {articles.map(article => (
        <div key={article.id}>{article.title}</div>
      ))}
      <button 
        onClick={() => setPage(p => p - 1)} 
        disabled={page === 1}
      >
        Previous
      </button>
      <button 
        onClick={() => setPage(p => p + 1)} 
        disabled={page >= totalPages}
      >
        Next
      </button>
    </div>
  );
}

// ===============================================

// Example 5: Global SWR Configuration

import { SWRConfig } from 'swr';

// You can wrap parts of your app with custom SWR config
function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig 
      value={{
        // Global config
        refreshInterval: 0,
        revalidateOnFocus: false,
        dedupingInterval: 60000,
        onError: (error, key) => {
          // Global error handling
          console.error('SWR Error:', error);
        },
        onSuccess: (data, key) => {
          // Global success handling
          // Track analytics, etc.
        },
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}

// ===============================================

// Example 6: Preloading data for better UX

import { mutate } from 'swr';

function BrandLink({ brandSlug }) {
  const preloadBrandData = () => {
    // Preload data on hover
    mutate(
      `${process.env.NEXT_PUBLIC_API_URL}brands/details?brandSlug=${brandSlug}`,
      fetch(`${process.env.NEXT_PUBLIC_API_URL}brands/details?brandSlug=${brandSlug}`).then(r => r.json()),
      { revalidate: false }
    );
  };
  
  return (
    <Link 
      href={`/brands/${brandSlug}`}
      onMouseEnter={preloadBrandData}
    >
      View Brand
    </Link>
  );
}

// ===============================================

// Available SWR Hooks in src/lib/swr-config.js:

// • useBrands(page, pageSize, search)
// • useModels(brandSlug, year, model, page, pageSize, search)
// • useTrims(year, brand, model)
// • useBodyTypes()
// • useArticles(type, page, pageSize)
// • useApiSWR(endpoint, options) - For custom endpoints

// All hooks return: { data, isLoading, isError, error, mutate }
