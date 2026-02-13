// src/components/NavigationGrid.js

import { slugToCapitalCase } from '@/utils/slugToCapitalCase';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function InnerNavigation({ brandname }) {
    // Define the navigation data directly within the component
    const navigationData = [
        {
            slug: `brands/${brandname}`,
            type: `${slugToCapitalCase(brandname)} Cars`
        },
        {
            slug: `brands/${brandname}/car-dealers`,
            type: "Car Dealers"
        },
        {
            slug: `brands/${brandname}/car-videos`,
            type: "Car Videos"
        },
        {
            slug: `brands/${brandname}/articles`,
            type: "Articles"
        }
    ];

    const pathname = usePathname();
    return (
        <div className="md:flex rounded-lg shadow-md hidden w-full mb-4">
            {navigationData.map((type) => (
                <Link key={type.slug} href={`/${type.slug}`} className="group flex-grow basis-0">
                    <div
                        className={`p-2 border text-center transition-all ${pathname === `/${type.slug}`
                            ? 'bg-blue-500 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        <h3 className="font-semibold">{type.type}</h3>
                    </div>
                </Link>
            ))}
        </div>
    );
}
