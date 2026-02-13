# Performance Optimization Guide

## Bundle Size Optimization

### Current Issues
- Multiple CSS frameworks (Tailwind + MUI + Bootstrap remnants)
- Large dependency footprint
- No code splitting for routes

### Implemented Fixes

#### 1. Removed Unused Dependencies
```bash
# Removed from package.json:
- bootstrap (unused CSS framework)
- moment (use native Date or date-fns instead)
- @fontsource/roboto (MUI provides its own fonts)
```

#### 2. Image Optimization
- ✅ Enabled Next.js image optimization
- ✅ Added AVIF and WebP format support
- ✅ Configured proper device sizes
- ✅ Set cache TTL to 60 seconds

### Recommendations for Further Optimization

#### A. Code Splitting
```javascript
// Use dynamic imports for heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSkeleton />,
  ssr: false // if client-side only
});
```

#### B. Bundle Analysis
```bash
npm run analyze
```
This will generate a visual representation of your bundle size.

#### C. Lazy Load Components
```javascript
// For below-the-fold content
import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('./Footer'));
const NewsSection = dynamic(() => import('./NewsSection'));
```

#### D. Optimize Third-Party Scripts
```javascript
// Use Next.js Script component with proper strategy
import Script from 'next/script';

<Script
  src="https://example.com/script.js"
  strategy="lazyOnload"
/>
```

## Performance Monitoring

### Core Web Vitals Checklist
- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] FID (First Input Delay) < 100ms
- [ ] CLS (Cumulative Layout Shift) < 0.1

### Tools
1. **Lighthouse** - Built into Chrome DevTools
2. **WebPageTest** - https://webpagetest.org/
3. **Next.js Analytics** - Built-in with Vercel

## API Optimization

### Implemented
- ✅ Error boundary for graceful failures
- ✅ Development-only error logging
- ✅ Custom `useApi` hook with loading states

### Recommended
```javascript
// Add request caching with SWR
import useSWR from 'swr';

function useCarData(slug) {
  const { data, error } = useSWR(`/api/cars/${slug}`, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000 // 1 minute
  });
  
  return {
    car: data,
    isLoading: !error && !data,
    isError: error
  };
}
```

## Caching Strategy

### Static Generation
```javascript
// For pages that don't change often
export async function generateStaticParams() {
  const brands = await getBrands();
  return brands.map((brand) => ({ slug: brand.slug }));
}
```

### Revalidation
```javascript
// Incremental Static Regeneration
export const revalidate = 3600; // Revalidate every hour
```

## Image Optimization Checklist
- ✅ Use Next/Image component
- ✅ Add width and height attributes
- ✅ Use appropriate formats (WebP, AVIF)
- ✅ Implement lazy loading
- [ ] Use CDN for static assets
- [ ] Compress images before upload

## Font Optimization
```javascript
// Use next/font for optimal font loading
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});
```

## CSS Optimization

### Recommended
1. **Purge Unused CSS**: Tailwind already does this
2. **Consolidate Styling**: Use Tailwind consistently
3. **Avoid inline styles**: Use className instead

### MUI Optimization
```javascript
// Use tree-shaking for MUI imports
import Button from '@mui/material/Button';
// NOT: import { Button } from '@mui/material';
```

## Database Query Optimization

### For Strapi Backend
1. Populate only needed fields
2. Use pagination
3. Add proper indexes
4. Cache frequently accessed data

```javascript
// Example optimized query
const cars = await strapi.entityService.findMany('api::car.car', {
  fields: ['id', 'name', 'slug', 'price'],
  populate: {
    brand: {
      fields: ['name', 'slug']
    }
  },
  pagination: {
    pageSize: 20
  }
});
```

## Monitoring & Analytics

### Add Performance Monitoring
```javascript
// Install and configure
npm install @vercel/analytics

// In _app.js or layout.js
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
```

## Progressive Web App (PWA)

### Add PWA Support
```bash
npm install next-pwa
```

```javascript
// next.config.mjs
import withPWA from 'next-pwa';

export default withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development'
});
```

## Checklist for Production

### Before Deploy
- [ ] Run `npm run build` successfully
- [ ] Test all critical paths
- [ ] Verify image optimization is working
- [ ] Check bundle size (< 250KB first load)
- [ ] Test on mobile devices
- [ ] Check Core Web Vitals scores
- [ ] Enable gzip/brotli compression
- [ ] Configure CDN for static assets
- [ ] Set up proper caching headers
- [ ] Add monitoring and error tracking

### Post-Deploy
- [ ] Monitor error logs
- [ ] Track performance metrics
- [ ] Set up alerts for downtime
- [ ] Review user feedback
- [ ] Analyze page load times

## Resources
- [Next.js Performance Docs](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web.dev Performance Guide](https://web.dev/performance/)
- [React Performance Optimization](https://react.dev/learn/render-and-commit)
