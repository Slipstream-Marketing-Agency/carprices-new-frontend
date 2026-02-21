import { NextResponse } from 'next/server';

let redirectsMap = null;

export async function middleware(req) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  // Step 1: Fetch and cache redirects as a Map for O(1) lookup
  if (!redirectsMap) {
    try {
      const res = await fetch(`${req.nextUrl.origin}/redirects.json`);
      if (!res.ok) throw new Error('Failed to fetch redirects.json');
      const redirects = await res.json();
      redirectsMap = new Map();
      if (Array.isArray(redirects)) {
        redirects.forEach(r => redirectsMap.set(r.from, r));
      }
    } catch (error) {
      redirectsMap = new Map(); // Initialize empty map to prevent re-fetching on every request
      return NextResponse.next();
    }
  }

  // Step 2: Check for predefined redirects using Map lookup
  const redirect = redirectsMap.get(pathname);
  if (redirect) {
    const statusCode = getStatusCode(redirect.type);
    const targetUrl = redirect.to.startsWith('http') ? redirect.to : `${req.nextUrl.origin}${redirect.to}`;
    return NextResponse.redirect(targetUrl, statusCode);
  }

  // Step 3: Redirect any '/tag/' URLs to the home page
  if (pathname.startsWith('/tag/')) {
    url.pathname = '/';
    return NextResponse.redirect(url, 301);
  }

  // Step 4: Force Redirect all URLs that use '/trim/' or '/trims/' to '/brands/'
  if (pathname.startsWith('/trim/') || pathname.startsWith('/trims/')) {
    const newPathname = pathname.replace('/trim/', '/brands/').replace('/trims/', '/brands/');
    url.pathname = newPathname;
    return NextResponse.redirect(url, 301);
  }

  // Step 5: Handle URLs that contain 'undefined' in the path
  if (pathname.includes('/undefined')) {
    const pathSegments = pathname.split('/').filter(Boolean);
    if (pathSegments[0] === 'brands') {
      url.pathname = '/brands';
      return NextResponse.redirect(url, 301);
    }
  }

  return NextResponse.next();
}

// Only run middleware on page routes, not static assets
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|assets|uploads|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|json|xml|txt)$).*)',
  ],
};

// Helper function to get the correct status code for redirects
function getStatusCode(type) {
  switch (type) {
    case 'moved_permanently_301': return 301;
    case 'found_302': return 302;
    case 'temporary_redirect_307': return 307;
    case 'gone_410': return 410;
    case 'unavailable_for_legal_reasons_451': return 451;
    default:
      return 307; // Default to 307 if no known type is found
  }
}

