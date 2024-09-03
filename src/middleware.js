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
    let response = await fetch(`https://apis.carprices.ae/api/redirects?pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch page ${page}: ${response.statusText}`);
    }

    let data = await response.json();
    totalRedirects = data.total;

    const totalPages = Math.ceil(totalRedirects / PAGE_SIZE);

    data.redirects.forEach(redirect => {
      const normalizedFromPath = redirect.from.toLowerCase().replace(/\/+$/, '');
      redirectsMap.set(normalizedFromPath, redirect);
    });

    for (page = 2; page <= totalPages; page++) {
      response = await fetch(`https://apis.carprices.ae/api/redirects?pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch page ${page}: ${response.statusText}`);
      }

      data = await response.json();
      data.redirects.forEach(redirect => {
        const normalizedFromPath = redirect.from.toLowerCase().replace(/\/+$/, '');
        redirectsMap.set(normalizedFromPath, redirect);
      });
    }
  } catch (error) {
    console.error(`Error fetching redirects on page ${page}:`, error);
  }

  return redirectsMap;
}

async function updateCache() {
  redirectsCache = await fetchAllRedirects();
  cacheTime = Date.now();
}

function shouldUpdateCache() {
  const now = Date.now();
  return redirectsCache.size === 0 || now - cacheTime > CACHE_DURATION;
}

async function middleware(request) {
  try {
    // Check if cache is empty or expired, but don't block the request
    if (shouldUpdateCache()) {
      updateCache().catch(console.error); // Update the cache in the background
    }

    const requestPath = request.nextUrl.pathname.toLowerCase().replace(/\/+$/, '');
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
          statusCode = 307;
      }

      if (statusCode === 410 || statusCode === 451) {
        return new NextResponse(null, { status: statusCode });
      }

      const destination = new URL(matchedRedirect.to, request.nextUrl.origin);
      return NextResponse.redirect(destination, statusCode);
    }

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
