import Link from "next/link";

export default function CategoryFilter({ categories }) {
  return (
    <div className="tw-border tw-border-solid tw-border-gray-200 tw-p-2 tw-rounded-[10px]">
      <h4>Popular Tags</h4>
      <hr className="tw-m-0"/>
      <div className="tw-flex tw-flex-wrap tw-justify-start tw-space-x-4 tw-mt-3">
        {categories.map((category) => (
          <Link key={category.id} href={`#`}>
            <span className="tw-inline-flex tw-items-center tw-rounded-md tw-bg-blue-50 tw-px-2 tw-py-1 tw-text-xs tw-font-medium tw-text-blue-700 tw-ring-1 tw-ring-inset tw-ring-blue-700/10">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
