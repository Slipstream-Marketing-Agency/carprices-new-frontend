import client from '@/lib/meilisearch';

export async function fetchCarBrands() {
  try {
    const response = await client.index('car-brand').search('', {
      facetsDistribution: ['name'],
      limit: 0, // Set limit to 0 to avoid returning documents
    });

    const carBrands = Object.keys(response.facetsDistribution.name);
    console.log('Car Brands:', carBrands);
    return carBrands;
  } catch (error) {
    console.error('Error fetching car brands:', error);
  }
}
