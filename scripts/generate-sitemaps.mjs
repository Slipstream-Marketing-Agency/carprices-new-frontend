import fetch from 'node-fetch'; // Use `import` instead of `require`
import fs from 'fs';
import path from 'path';

/**
 * Generate sitemaps by triggering API endpoints and saving the resulting files.
 */
async function generateSitemaps() {
    // Step 1: Trigger the backend APIs to generate the sitemaps
    const apiEndpoints = [
        'https://apis.carprices.ae/api/articles/generateSitemap',
        'https://apis.carprices.ae/api/car-body-type/generateSitemap',
        'https://apis.carprices.ae/api/car-trims/generate',
    ];

    console.log('Triggering API to generate sitemaps...');
    for (const endpoint of apiEndpoints) {
        try {
            const response = await fetch(endpoint);
            if (!response.ok) throw new Error(`Failed to trigger API at ${endpoint}`);
            console.log(`Successfully triggered ${endpoint}`);
        } catch (error) {
            console.error(`Error triggering ${endpoint}:`, error);
        }
    }

    // Step 2: Fetch the generated sitemap files and save them in the public directory
    const sitemaps = [
        { name: 'articles-sitemap.xml', url: 'https://apis.carprices.ae/articles-sitemap.xml' },
        { name: 'bodytypes-sitemap.xml', url: 'https://apis.carprices.ae/bodytypes-sitemap.xml' },
        { name: 'trims-sitemap.xml', url: 'https://apis.carprices.ae/trims-sitemap.xml' },
        { name: 'models-sitemap.xml', url: 'https://apis.carprices.ae/models-sitemap.xml' },
        { name: 'brands-sitemap.xml', url: 'https://apis.carprices.ae/brands-sitemap.xml' },
    ];

    console.log('Fetching and saving sitemaps...');
    for (const sitemap of sitemaps) {
        try {
            const response = await fetch(sitemap.url);
            if (!response.ok) throw new Error(`Failed to fetch ${sitemap.name}`);
            const xmlContent = await response.text();
            const outputDir = path.resolve(process.cwd(), 'public');
            fs.mkdirSync(outputDir, { recursive: true }); // Ensure the directory exists
            fs.writeFileSync(path.join(outputDir, sitemap.name), xmlContent, 'utf8');
            console.log(`${sitemap.name} saved successfully.`);
        } catch (error) {
            console.error(`Error fetching ${sitemap.name}:`, error);
        }
    }
}

generateSitemaps()
    .then(() => console.log('Sitemap generation completed successfully.'))
    .catch((error) => console.error('Error during sitemap generation:', error));
