import { NextResponse } from 'next/server';

let redirects;

export async function middleware(req) {
  const url = req.nextUrl.clone();
  let pathname = url.pathname;

  // Step 1: Fetch the redirects.json file from the public directory, if not already fetched
  if (!redirects) {
    try {
      const res = await fetch(`${req.nextUrl.origin}/redirects.json`);
      if (!res.ok) throw new Error('Failed to fetch redirects.json');
      redirects = await res.json();
    } catch (error) {
      return NextResponse.next(); // If there's an error fetching the redirects, continue without redirecting
    }
  }

  // Step 2: Check for predefined redirects from the redirects.json file
  const redirect = redirects.find(r => r.from === pathname);
  if (redirect) {
    const statusCode = getStatusCode(redirect.type);
    const targetUrl = redirect.to.startsWith('http') ? redirect.to : `${req.nextUrl.origin}${redirect.to}`;
    return NextResponse.redirect(targetUrl, statusCode);
  }

  // Step 3: Redirect any '/tag/' URLs to the home page
  if (pathname.startsWith('/tag/')) {
    url.pathname = '/'; // Redirect to the homepage
    return NextResponse.redirect(url, 301); // 301 Moved Permanently
  }

  // Step 4: Force Redirect all URLs that use '/trim/' or '/trims/' to '/brands/'
  if (pathname.startsWith('/trim/') || pathname.startsWith('/trims/')) {
    // Replace '/trim/' or '/trims/' with '/brands/' in the pathname
    const newPathname = pathname.replace('/trim/', '/brands/').replace('/trims/', '/brands/');
    url.pathname = newPathname;

    // Redirect the user to the correct URL with '/brands/'
    return NextResponse.redirect(url, 301); // 301 Moved Permanently
  }

  // Step 5: Handle dynamic redirection for non-existent 'trim' level pages (as before)
  if (pathname.startsWith('/brands/')) {
    const pathSegments = pathname.split('/').filter(Boolean);
    if (pathSegments.length === 5) {
      // Attempt to fetch the URL to check if it exists
      try {
        const response = await fetch(`${req.nextUrl.origin}/${pathSegments.join('/')}`);
        if (response.status === 404) {
          // If it's a 404, remove the last 'trim' segment and redirect to the parent 'model' level
          return handleTrimRedirect(url, pathname);
        }
      } catch (error) {
        return NextResponse.next(); // In case of fetch error, continue without redirecting
      }
    }
  }

  // Step 6: Continue to the requested page if no redirection is needed
  return NextResponse.next();
}

// Function to handle redirection by trimming the 'trim' part of the URL
function handleTrimRedirect(url, pathname) {
  const pathSegments = pathname.split('/').filter(Boolean);
  if (pathSegments.length > 4) {
    // Only redirect if there are enough path segments (brand/year/model/trim)
    pathSegments.pop(); // Remove the last segment (the 'trim' part)
    url.pathname = `/${pathSegments.join('/')}`; // Redirect to the parent directory
    return NextResponse.redirect(url, 301); // 301 Moved Permanently
  }
  return NextResponse.next(); // If it's already at the model level or lower, continue without redirecting
}

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
