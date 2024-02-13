const EXTERNAL_DATA_URL = 'https://carprices.ae';

function generateSiteMap(posts) {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
    <url>
    <loc>https://carprices.ae/news</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
</url>
<url>
    <loc>https://carprices.ae/search-cars</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
</url>
<url>
    <loc>https://carprices.ae/compare-cars</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
</url>
<url>
    <loc>https://carprices.ae/loan-calculator</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
</url>
<url>
    <loc>https://carprices.ae/terms-and-conditions</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
</url>
<url>
    <loc>https://carprices.ae/privacy</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
</url>
<url>
    <loc>https://carprices.ae/code-of-conduct</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
</url>
<url>
    <loc>https://carprices.ae/about</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
</url>
<url>
    <loc>https://carprices.ae/contact-us</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
</url>
   </urlset>
 `;
}

function SiteMap() {
    // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
    // We make an API call to gather the URLs for our site
    const request = await fetch(process.env.NEXT_PUBLIC_API_URL + `blog?type=news&isAll=1`);
    const posts = await request.json();

    // We generate the XML sitemap with the posts data
    const sitemap = generateSiteMap(posts);

    res.setHeader('Content-Type', 'text/xml');
    // we send the XML to the browser
    res.write(sitemap);
    res.end();

    

    return {
        props: {},
    };
}

export default SiteMap;