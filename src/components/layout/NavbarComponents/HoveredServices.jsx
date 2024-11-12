import Link from 'next/link'
import React from 'react'

const HoveredServices = () => {
    return (
        <div className="rounded-xl shadow-xl absolute top-10 right-52 z-50 bg-white border border-gray-200">
            <div className="flex flex-col p-4 gap-2">
                {/* Loan Calculator Link */}
                <Link href="/loan-calculator" className="py-2 text-sm font-medium rounded-lg transition">
                    Loan Calculator
                </Link>

                {/* Insurance Calculator Link */}
                <Link href="/insurance-calculator" className="py-2 text-sm font-medium rounded-lg transition">
                    Insurance Calculator
                </Link>
            </div>
        </div>
    )
}

export default HoveredServices