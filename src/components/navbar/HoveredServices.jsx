import Link from 'next/link'
import React from 'react'

const HoveredServices = () => {
    return (
        <div className="tw-rounded-xl tw-shadow-xl tw-absolute tw-top-10 tw-right-4 tw-z-50 tw-bg-white tw-border tw-border-gray-200">
            <div className="tw-flex tw-flex-col tw-p-4 tw-gap-2">
                {/* Loan Calculator Link */}
                <Link href="/loan-calculator" className="tw-py-2 tw-text-sm tw-font-medium tw-rounded-lg tw-transition">
                    Loan Calculator
                </Link>

                {/* Insurance Calculator Link */}
                <Link href="/insurance-calculator" className="tw-py-2 tw-text-sm tw-font-medium tw-rounded-lg tw-transition">
                    Insurance Calculator
                </Link>
            </div>
        </div>
    )
}

export default HoveredServices