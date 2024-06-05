const { NextResponse } = require('next/server');

let redirectsCache = [];
let cacheTime = 0;
const CACHE_DURATION = 10 * 60 * 1000; // Cache for 10 minutes

async function fetchRedirects() {
  try {
    const response = await fetch('https://apis.carprices.ae/api/redirects');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.redirects;
  } catch (error) {
    console.error('Error fetching redirects from Strapi:', error);
    return [];
  }
}

async function middleware(request) {
  try {
    console.log('Middleware triggered for:', request.url);

    const now = Date.now();
    // Check if cache is empty or expired
    if (!redirectsCache.length || now - cacheTime > CACHE_DURATION) {
      console.log('Fetching redirects from Strapi');
      redirectsCache = await fetchRedirects();
      cacheTime = now;
    }

    const requestPath = request.nextUrl.pathname;
    console.log('Request path:', requestPath);
    console.log('Redirects cache:', redirectsCache);

    const matchedRedirect = redirectsCache.find(r => r.from === requestPath);

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
