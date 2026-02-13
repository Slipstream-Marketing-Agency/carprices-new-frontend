// utils/fetchCarComparisonData.js
export async function fetchCarComparisonData(slug) {
    let carData = [];
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}car-trims/compare/${slug}`
        );
        const data = await response.json();
        carData = data?.data || [];
    } catch (error) {if (process.env.NODE_ENV === 'development') { console.error("Error fetching comparison data:", error); }
    }

    return carData.filter((car) => car !== null);  // Filter out null or undefined cars
}
