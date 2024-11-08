import { removeCookie } from '@/lib/helper'
import { logout } from '@/store/slices/authSlice'
import Link from 'next/link'
import React from 'react'
import { useDispatch } from 'react-redux'

const HoveredProfile = ({setHoveredMenuItem}) => {


    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout());

        setHoveredMenuItem(null)
    }

    return (
        <div className="rounded-lg shadow-xl absolute top-12 -right-6 z-50 bg-white border border-gray-200">
            <div className="flex flex-col p-4 gap-2">
                <Link href="/setting/profile" className="py-2 text-left text-sm font-medium rounded-lg transition">
                    Profile
                </Link>

                <Link href="/setting/address" className="py-2 text-left text-sm font-medium rounded-lg transition">
                    Addresses
                </Link>

                <button onClick={ handleLogout } className="py-2 text-left text-sm font-medium rounded-lg transition">
                    Logout
                </button>
            </div>
        </div>
    )
}

export default HoveredProfile