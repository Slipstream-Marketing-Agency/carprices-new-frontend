export async function fetchCarBodyTypes() {
    try {
      const response = await client.index('car-body-type').search('', {
        facetsDistribution: ['name'],
        limit: 0, // Set limit to 0 to avoid returning documents
      });
  
      const carBodyTypes = Object.keys(response.facetsDistribution.name);
      console.log('Car Body Types:', carBodyTypes);
      return carBodyTypes;
    } catch (error) {
      console.error('Error fetching car body types:', error);
    }
  }
  