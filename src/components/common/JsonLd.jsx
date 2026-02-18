/**
 * JsonLd component for rendering structured data (Schema.org) on pages.
 * 
 * Usage in any page component:
 * ```jsx
 * import JsonLd from '@/components/common/JsonLd';
 * 
 * export default function Page() {
 *   const structuredData = {
 *     "@context": "https://schema.org",
 *     "@type": "WebPage",
 *     name: "Page Title",
 *     description: "Page description",
 *   };
 *   
 *   return (
 *     <>
 *       <JsonLd data={structuredData} />
 *       <div>Page content</div>
 *     </>
 *   );
 * }
 * ```
 */
export default function JsonLd({ data }) {
  if (!data) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}
