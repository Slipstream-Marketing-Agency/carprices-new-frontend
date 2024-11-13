import Link from 'next/link'
import React from 'react'

const HoveredMore = () => {
    return (
        <div className="rounded-lg shadow-xl absolute top-6 w-28 z-50 bg-white border border-gray-200">
            <div className="flex flex-col">
                <Link href="/about" className="py-2 px-4 hover:bg-blue-100 text-sm font-medium rounded-t-lg transition">
                    About Us
                </Link>

                <Link href="/contact-us" className="py-2 px-4 hover:bg-blue-100 text-sm font-medium rounded-b-lg transition">
                    Contact Us
                </Link>
            </div>
        </div>
    )
}

export default HoveredMore