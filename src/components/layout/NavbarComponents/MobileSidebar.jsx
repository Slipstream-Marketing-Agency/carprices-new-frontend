import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const MobileSidebar = ({ toggleNavigation, isOpen, links }) => {
    const [subMenuOptions, setSubMenuOptions] = useState([])
    const router = useRouter()
    const [activeMenu, setActiveMenu] = useState(null)

    const handleSetSubMenuOptions = (hoverItem) => {
        let options = [];
        if (hoverItem === 'search-cars') {
            options = [
                { link: '/search-cars', label: 'Browse New Car Guide' },
                { link: '/brands', label: 'Search By Brands' },
                { link: '/search-cars', label: 'Search All Body Type' },
                { link: '/search-cars', label: 'Popular Cars' },
            ];
        } else if (hoverItem === 'services') {
            options = [
                { link: '/loan-calculator', label: 'Loan Calculator' },
                { link: '/insurance-calculator', label: 'Insurance Calculator' },
            ];
        } else if (hoverItem === 'blog') {
            options = [
                { link: '/news', label: 'News' },
                { link: '/reviews', label: 'Reviews' },
            ];
        } else if(hoverItem === 'more') {
            options = [
                { link: '/about', label: 'About Us' },
                { link: '/contact-us', label: 'Contact Us' },
            ];
        }
        setSubMenuOptions(options);
    }

    const handleShowSubMenu = (link) => {
        if (link.hoverItem === 'compare-cars') {
            return router.push('/compare-cars')
        }
        setActiveMenu(link);
        handleSetSubMenuOptions(link.hoverItem);
    }

    return (
        <div
            className={`fixed top-0 left-0 z-[9999] w-3/4 max-w-[480px] h-full bg-white shadow-lg transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
            <div className="flex flex-col pb-20 mx-auto w-full max-w-[480px]">
                <div className="flex flex-col px-4 pt-2 w-full">
                    <div className="flex justify-between items-start gap-5 pt-7 w-full text-base tracking-wider text-center whitespace-nowrap text-neutral-900">
                        <Link
                            href="/"
                            className="flex items-center gap-1.5 mt-2 cursor-pointer"
                        >
                            <Image
                                loading="lazy"
                                src="/assets/img/car-prices-logo.png"
                                className="w-[150px] object-contain"
                                alt="logo"
                                width={150}  // Set a valid width
                                height={50}  // Adjust height based on your logo's aspect ratio
                                layout="intrinsic"  // Automatically sizes the image based on its intrinsic dimensions
                            />
                        </Link>
                        <div onClick={toggleNavigation}>
                            <Image
                                loading="lazy"
                                src="/close-button.svg"
                                className="shrink-0 w-6 aspect-[0.8]"
                                alt={`close`}
                                width={24} // Set a valid width
                                height={24} // Set a valid height
                            />
                        </div>
                    </div>

                    {activeMenu && (
                        <h3 onClick={() => { setActiveMenu(null) }} className="text-gray-600 font-bold pt-6">
                            <span className="inline-block mr-1">←</span> {/* Back arrow */}
                            {activeMenu.label} {/* Ensure activeMenu is an object with a label */}
                        </h3>
                    )}

                    <div className="flex flex-col pt-6 gap-4">
                        {activeMenu ? (
                            subMenuOptions.map((link, index) => (
                                <Link className="justify-center font-semibold" key={index} href={link.link}>
                                    {link.label}
                                </Link>
                            ))
                        ) : (
                            links.map((link, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleShowSubMenu(link)} // Pass a function reference
                                    className="justify-center font-semibold"
                                >
                                    {link.label}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MobileSidebar;
