import client from '@/lib/meilisearch';

export async function fetchCarBrands() {
  try {
    const response = await client.index('car-brand').search('', {
      facetsDistribution: ['name'],
      limit: 0, // Set limit to 0 to avoid returning documents
    });

    const carBrands = Object.keys(response.facetsDistribution.name);
    return carBrands;
  } catch (error) {if (process.env.NODE_ENV === 'development') { console.error('Error fetching car brands:', error); }
  }
}
