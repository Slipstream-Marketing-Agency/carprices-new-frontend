import Link from 'next/link'
import React from 'react'

const HoveredMore = () => {
    return (
        <div className="tw-rounded-lg tw-shadow-xl tw-absolute tw-top-10 -tw-right-6 tw-z-50 tw-bg-white tw-border tw-border-gray-200">
            <div className="tw-flex tw-flex-col tw-p-4 tw-gap-2">
                <Link href="/about" className="tw-py-2 tw-text-sm tw-font-medium tw-rounded-lg tw-transition">
                    About Us
                </Link>

                <Link href="/contact-us" className="tw-py-2 tw-text-sm tw-font-medium tw-rounded-lg tw-transition">
                    Contact Us
                </Link>
            </div>
        </div>
    )
}

export default HoveredMore