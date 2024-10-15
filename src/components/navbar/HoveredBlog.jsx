import Link from 'next/link'
import React from 'react'

const HoveredBlog = () => {
    return (
        <div className="tw-rounded-xl tw-shadow-xl tw-absolute tw-top-10 tw-right-4 tw-z-50 tw-bg-white tw-border tw-border-gray-200">
            <div className="tw-flex tw-flex-col tw-p-4 tw-gap-2">
                <Link href="/news" className="tw-py-2 tw-text-sm tw-font-medium tw-rounded-lg tw-transition">
                    News
                </Link>

                <Link href="/reviews" className="tw-py-2 tw-text-sm tw-font-medium tw-rounded-lg tw-transition">
                    Reviews
                </Link>
            </div>
        </div>
    )
}

export default HoveredBlog