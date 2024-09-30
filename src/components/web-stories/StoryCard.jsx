import Link from 'next/link'

export default function StoryCard({ story }) {
  return (
    <Link href={`/web-stories/${story.slug}`}>
      <a className="block group">
        <div className="relative h-64 bg-gray-100 overflow-hidden rounded-lg shadow-md">
          <img
            src={story.coverImage}
            alt={story.title}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-75" />
          <h2 className="absolute bottom-4 left-4 text-white text-xl font-semibold">
            {story.title}
          </h2>
        </div>
      </a>
    </Link>
  )
}
