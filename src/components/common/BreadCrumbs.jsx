import { usePathname } from 'next/navigation';
import React from 'react'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const BreadCrumbs = () => {
    const pathname = usePathname();
    const baseUrl = 'https://carprices.ae'; // Replace with your website URL
    const pathSegments = pathname.split('/').filter((segment) => segment);

    // Generate breadcrumb items
    const breadcrumbs = pathSegments.map((segment, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: segment.replace(/-/g, ' ').toUpperCase(), // Replace dashes with spaces and capitalize
        item: `${baseUrl}/${pathSegments.slice(0, index + 1).join('/')}`,
    }));

    // Add homepage as the first breadcrumb
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: baseUrl,
            },
            ...breadcrumbs,
        ],
    };

    return (
        <>
            {/* Breadcrumb Navigation */}
            {pathSegments.length > 0 &&
                <nav className="flex items-center space-x-2 text-sm text-gray-600 mt-5" aria-label="breadcrumb">
                    <a href="/" className="hover:text-blue-600">
                        Home
                    </a>
                    {pathSegments.map((segment, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <span> <ChevronRightIcon /> </span>
                            <a
                                href={`/${pathSegments.slice(0, index + 1).join('/')}`}
                                className={`hover:text-blue-600 capitalize ${index === pathSegments.length - 1 ? 'font-semibold text-black' : ''
                                    }`}
                            >
                                {segment.replace(/-/g, ' ')}
                            </a>
                        </div>
                    ))}
                </nav>}


            {/* Breadcrumb Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
        </>
    );
}

export default BreadCrumbs