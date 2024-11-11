import Link from 'next/link'
import React from 'react'

const HoveredBlog = () => {
    return (
        <div className="rounded-xl shadow-xl absolute top-12 right-32 z-50 bg-white border border-gray-200">
            <div className="flex flex-col p-4 gap-2">
                <Link href="/news" className="py-2 text-sm font-medium rounded-lg transition">
                    News & Top Stories
                </Link>

                <Link href="/review" className="py-2 text-sm font-medium rounded-lg transition">
                   Car Expert Reviews
                </Link>
                <Link href="/car-videos" className="py-2 text-sm font-medium rounded-lg transition">
                   Car Videos
                </Link>
            </div>
        </div>
    )
}

export default HoveredBlog