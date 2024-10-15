import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
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
            className={`tw-fixed tw-top-0 tw-left-0 tw-z-[9999] tw-w-3/4 tw-max-w-[480px] tw-h-full tw-bg-white tw-shadow-lg tw-transform tw-transition-transform tw-duration-300 ${isOpen ? "tw-translate-x-0" : "-tw-translate-x-full"}`}
        >
            <div className="tw-flex tw-flex-col tw-pb-20 tw-mx-auto tw-w-full tw-max-w-[480px]">
                <div className="tw-flex tw-flex-col tw-px-4 tw-pt-2 tw-w-full">
                    <div className="tw-flex tw-justify-between tw-items-start tw-gap-5 tw-pt-7 tw-w-full tw-text-base tw-tracking-wider tw-text-center tw-whitespace-nowrap tw-text-neutral-900">
                        <Link
                            href="/"
                            className="tw-flex tw-items-center tw-gap-1.5 tw-mt-2 cursor-pointer"
                        >
                            <Image
                                loading="lazy"
                                src="/assets/img/car-prices-logo.png"
                                className="tw-w-[150px] tw-object-contain"
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
                                className="tw-shrink-0 tw-w-6 tw-aspect-[0.8]"
                                alt={`close`}
                                width={24} // Set a valid width
                                height={24} // Set a valid height
                            />
                        </div>
                    </div>

                    {activeMenu && (
                        <h3 onClick={() => { setActiveMenu(null) }} className="tw-text-gray-600 tw-font-bold tw-pt-6">
                            <span className="tw-inline-block tw-mr-1">←</span> {/* Back arrow */}
                            {activeMenu.label} {/* Ensure activeMenu is an object with a label */}
                        </h3>
                    )}

                    <div className="tw-flex tw-flex-col tw-pt-6 tw-gap-4">
                        {activeMenu ? (
                            subMenuOptions.map((link, index) => (
                                <Link className="tw-justify-center tw-font-semibold" key={index} href={link.link}>
                                    {link.label}
                                </Link>
                            ))
                        ) : (
                            links.map((link, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleShowSubMenu(link)} // Pass a function reference
                                    className="tw-justify-center tw-font-semibold"
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
