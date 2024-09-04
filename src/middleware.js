import { NextResponse } from 'next/server';

let redirects;

export async function middleware(req) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  if (!redirects) {
    try {
      // Fetch the redirects.json file from the public directory
      const res = await fetch(`${req.nextUrl.origin}/redirects.json`);
      if (!res.ok) throw new Error('Failed to fetch redirects.json');
      redirects = await res.json();
    } catch (error) {
      console.error('Error fetching redirects:', error);
      return NextResponse.next(); // If there's an error, continue without redirecting
    }
  }

  // Find the redirect that matches the current pathname
  const redirect = redirects.find(r => r.from === pathname);

  if (redirect) {
    const statusCode = getStatusCode(redirect.type);
    const targetUrl = redirect.to.startsWith('http') ? redirect.to : `${req.nextUrl.origin}${redirect.to}`;

    console.log(`Redirecting from ${pathname} to ${targetUrl} with status ${statusCode}`);
    return NextResponse.redirect(targetUrl, statusCode);
  } else {
    console.log(`No redirect found for ${pathname}`);
  }

  return NextResponse.next();
}

function getStatusCode(type) {
  switch (type) {
    case 'moved_permanently_301': return 301;
    case 'found_302': return 302;
    case 'temporary_redirect_307': return 307;
    case 'gone_410': return 410;
    case 'unavailable_for_legal_reasons_451': return 451;
    default:
      console.warn(`Unknown redirect type: ${type}, defaulting to 307`);
      return 307;
  }
}
