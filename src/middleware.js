const { NextResponse } = require('next/server');

let redirectsCache = new Map();
let cacheTime = 0;
const CACHE_DURATION = 10 * 60 * 1000; // Cache for 10 minutes
const PAGE_SIZE = 500; // The number of redirects per page as per your API

async function fetchAllRedirects() {
  const redirectsMap = new Map();
  let page = 1;
  let totalRedirects = 0;

  try {
    // Fetch the first page to get the total count
    let response = await fetch(`https://apis.carprices.ae/api/redirects?pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch page ${page}: ${response.statusText}`);
    }

    let data = await response.json();
    totalRedirects = data.total;

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalRedirects / PAGE_SIZE);

    // Process the first page
    data.redirects.forEach(redirect => {
      const normalizedFromPath = redirect.from.toLowerCase().replace(/\/+$/, ''); // Normalize the 'from' path
      redirectsMap.set(normalizedFromPath, redirect);
    });

    // Fetch remaining pages
    for (page = 2; page <= totalPages; page++) {
      response = await fetch(`https://apis.carprices.ae/api/redirects?pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch page ${page}: ${response.statusText}`);
      }

      data = await response.json();
      data.redirects.forEach(redirect => {
        const normalizedFromPath = redirect.from.toLowerCase().replace(/\/+$/, ''); // Normalize the 'from' path
        redirectsMap.set(normalizedFromPath, redirect);
      });
      console.log(`Fetched ${data.redirects.length} redirects from page ${page}`);
    }
  } catch (error) {
    console.error(`Error fetching redirects on page ${page}:`, error);
  }

  console.log(`Total redirects fetched: ${redirectsMap.size}`); // Debugging: Log total redirects fetched
  return redirectsMap;
}

async function updateCache() {
  redirectsCache = await fetchAllRedirects();
  cacheTime = Date.now();
}

async function middleware(request) {
  try {
    const now = Date.now();

    // Check if cache is empty or expired
    if (redirectsCache.size === 0 || now - cacheTime > CACHE_DURATION) {
      await updateCache();
    }

    const requestPath = request.nextUrl.pathname.toLowerCase().replace(/\/+$/, ''); // Normalize request path
    console.log(`Request path: ${requestPath}`); // Debugging: Log the request path
    const matchedRedirect = redirectsCache.get(requestPath);

    if (matchedRedirect) {
      let statusCode;
      switch (matchedRedirect.type) {
        case 'moved_permanently_301':
          statusCode = 301;
          break;
        case 'found_302':
          statusCode = 302;
          break;
        case 'temporary_redirect_307':
          statusCode = 307;
          break;
        case 'gone_410':
          statusCode = 410;
          break;
        case 'unavailable_for_legal_reasons_451':
          statusCode = 451;
          break;
        default:
          statusCode = 307; // Temporary redirect as a fallback
      }

      if (statusCode === 410 || statusCode === 451) {
        console.log(`Returning status ${statusCode} for ${matchedRedirect.from}`);
        return new NextResponse(null, { status: statusCode });
      }

      const destination = new URL(matchedRedirect.to, request.nextUrl.origin);
      console.log(`Redirecting from ${matchedRedirect.from} to ${matchedRedirect.to} with status ${statusCode}`);
      return NextResponse.redirect(destination, statusCode);
    }

    console.log('No redirect match found, proceeding to next handler');
    return NextResponse.next();
  } catch (error) {
    console.error('Error in middleware:', error);
    return NextResponse.next();
  }
}

const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

module.exports = { middleware, config };
