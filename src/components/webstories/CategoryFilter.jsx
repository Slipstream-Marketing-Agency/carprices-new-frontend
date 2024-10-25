import Link from "next/link";

export default function CategoryFilter({ categories }) {
  return (
    <div className="border border-solid border-gray-200 p-2 rounded-[10px]">
      <h4>Popular Tags</h4>
      <hr className="m-0"/>
      <div className="flex flex-wrap justify-start space-x-4 mt-3">
        {categories.map((category) => (
          <Link key={category.id} href={`#`}>
            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
