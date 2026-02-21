const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchCarBodyTypes() {
  try {
    const res = await fetch(
      `${API_URL}car-body-types?fields[0]=name&pagination[pageSize]=100&sort=name:asc`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) throw new Error('Failed to fetch body types');
    const { data } = await res.json();
    return data.map((b) => b.attributes.name);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching car body types:', error);
    }
    return [];
  }
}
  
