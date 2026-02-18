const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchCarBrands() {
  try {
    const response = await fetch(`${API_URL}car-brands/names`, {
      next: { revalidate: 300 },
    });
    if (!response.ok) throw new Error('Failed to fetch car brands');
    const data = await response.json();
    // Return array of brand names
    return Array.isArray(data) ? data.map((b) => b.name) : [];
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching car brands:', error);
    }
    return [];
  }
}
