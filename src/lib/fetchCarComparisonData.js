// utils/fetchCarComparisonData.js
export async function fetchCarComparisonData(slug) {

    console.log(slug, "ddddddddddsss");

    let carData = [];
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}car-trims/compare/${slug}`
        );
        const data = await response.json();

        console.log(data, 'datadatadata');

        carData = data?.data || [];
    } catch (error) {
        console.error("Error fetching comparison data:", error);
    }

    return carData.filter((car) => car !== null);  // Filter out null or undefined cars
}
