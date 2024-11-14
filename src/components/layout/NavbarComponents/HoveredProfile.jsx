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
        <div className="rounded-lg shadow-xl absolute top-10 left-0 z-50 bg-white border border-gray-200">
            <div className="flex flex-col">
                <Link href="/setting/profile" className="px-4 py-2 hover:bg-blue-100 text-left text-sm rounded-t-lg font-medium transition">
                    Profile
                </Link>

                <Link href="/setting/address" className="px-4 py-2 hover:bg-blue-100 text-left text-sm font-medium transition">
                    Addresses
                </Link>

                <button onClick={ handleLogout } className="px-4 py-2 hover:bg-blue-100 text-left text-sm rounded-b-lg font-medium transition">
                    Logout
                </button>
            </div>
        </div>
    )
}

export default HoveredProfile