import Link from 'next/link'
import React from 'react'

const HoveredBlog = () => {
    return (
        <div className="rounded-xl shadow-xl absolute top-6 z-50 bg-white border border-gray-200">
            <div className="flex flex-col">
                <Link href="/news" className="py-2 px-4 hover:bg-blue-100 text-sm font-medium rounded-t-lg transition">
                    News & Top Stories
                </Link>

                <Link href="/review" className="py-2 px-4 hover:bg-blue-100 text-sm font-medium transition">
                   Car Expert Reviews
                </Link>
                <Link href="/car-videos" className="py-2 px-4 hover:bg-blue-100 text-sm font-medium rounded-b-lg transition">
                   Car Videos
                </Link>
            </div>
        </div>
    )
}

export default HoveredBlog