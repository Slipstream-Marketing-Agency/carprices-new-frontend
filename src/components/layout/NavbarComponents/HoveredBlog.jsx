import Link from 'next/link'
import React from 'react'

const HoveredBlog = () => {
    return (
        <div className="rounded-xl shadow-xl absolute top-10 right-4 z-50 bg-white border border-gray-200">
            <div className="flex flex-col p-4 gap-2">
                <Link href="/news" className="py-2 text-sm font-medium rounded-lg transition">
                    News
                </Link>

                <Link href="/reviews" className="py-2 text-sm font-medium rounded-lg transition">
                    Reviews
                </Link>
            </div>
        </div>
    )
}

export default HoveredBlog