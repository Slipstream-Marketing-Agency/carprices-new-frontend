// src/components/NavigationGrid.js

import Link from 'next/link';

export default function TypeNavigation({ types = [], currentType }) {
  return (
    <div className="md:flex rounded-lg shadow-md hidden w-full mb-4">
      {types.map((type) => (
        <Link key={type.slug} href={`/${type.slug}`} className="group flex-grow basis-0">
          <div
            className={`p-2 border text-center transition-all ${
              currentType === type.slug
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
