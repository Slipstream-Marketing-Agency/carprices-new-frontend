import Link from 'next/link'
import React from 'react'

const HoveredServices = () => {
    return (
        <div className="rounded-xl shadow-xl absolute top-6 left-0 w-48 z-50 bg-white border border-gray-200 opacity-0 scale-y-0 transition-all duration-300 transform group-hover:opacity-100 group-hover:scale-y-100 origin-top ease-out">
            <div className="flex flex-col">
                {/* Loan Calculator Link */}
                <Link href="/loan-calculator" className="py-2 px-4 text-sm font-medium hover:bg-blue-100 rounded-t-lg transition">
                    Loan Calculator
                </Link>

                {/* Insurance Calculator Link */}
                <Link href="/insurance-calculator" className="py-2 px-4 text-sm font-medium hover:bg-blue-100 rounded-b-lg transition">
                    Insurance Calculator
                </Link>
            </div>
        </div>
    )
}

export default HoveredServices