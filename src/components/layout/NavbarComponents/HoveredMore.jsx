import Link from 'next/link'
import React from 'react'

const HoveredMore = () => {
    return (
        <div className="rounded-lg shadow-xl absolute top-10 -right-6 z-50 bg-white border border-gray-200">
            <div className="flex flex-col p-4 gap-2">
                <Link href="/about" className="py-2 text-sm font-medium rounded-lg transition">
                    About Us
                </Link>

                <Link href="/contact-us" className="py-2 text-sm font-medium rounded-lg transition">
                    Contact Us
                </Link>
            </div>
        </div>
    )
}

export default HoveredMore