import Link from 'next/link'

export default function CategoryFilter({ categories }) {
  return (
    <div className="flex flex-wrap justify-center space-x-4 mb-8">
      {categories.map((category) => (
        <Link key={category.id} href={`/web-stories/${category.slug}`}>
          <a className="text-lg font-semibold hover:text-blue-500">
            {category.name}
          </a>
        </Link>
      ))}
    </div>
  )
}
