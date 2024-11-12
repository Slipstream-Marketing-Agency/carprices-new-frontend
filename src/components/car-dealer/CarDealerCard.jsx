import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import CallIcon from '@mui/icons-material/Call';

const CarDealerCard = ({dealer}) => {
    return (
        <div className="md:col-span-4 col-span-12  relative" key={dealer.id} >
            <div className="flex flex-col justify-start bg-white rounded-lg shadow-md overflow-hidden h-full">
                <Link href={`/car-dealers/${dealer.slug}`} className="relative">
                    <Image
                        src={dealer.dealer_shop_image || '/assets/placeholder/dealer-placeholder.webp'}
                        alt={dealer?.name}
                        width={0}
                        height={0}
                        sizes="100vw"
                        layout="fixed"
                        className="w-full md:h-[180px] h-[180px] object-cover rounded-t-[14px]"
                    />
                </Link>
                <div className="p-2 flex flex-col justify-between h-full">
                    <Link href={`/car-dealers/${dealer.slug}`} className='flex flex-col space-y-2 mb-3'>
                        <h3 className="text-lg font-medium">{dealer.name}</h3>
                        <p className="text-sm text-gray-600 font-semibold flex items-center gap-2"><LocationOnIcon className='text-green-500' />{dealer.dealer_branch.name}</p>
                        <p className="text-sm text-gray-600 flex items-center gap-2"><BusinessIcon /> {dealer.address}</p>
                    </Link>
                    <button
                        onClick={() => window.location.href = `tel:${dealer.phone_number}`}
                        className='border border-blue-400 p-2 rounded-lg w-full flex justify-center items-center gap-3 text-sm font-semibold hover:bg-blue-100'
                    >
                        <CallIcon className='text-blue-400' />Call Dealer
                    </button>


                    {/* <div className="mt-2">
                                        <div className="flex flex-col justify-between text-gray-800 mt-2">
                                            <div className='flex justify-between'>
                                                <div className='flex items-center gap-2'>
                                                    <p className="text-xs font-semibold sm:inline">
                                                        {dealer.author?.name || 'Unknown Author'}
                                                    </p>{" "}
                                                </div>
                                                <p>
                                                    <span className='text-xs font-semibold sm:inline'>Published: </span>
                                                    <span className='text-xs ml-1'>{new Date(dealer.publishedAt).toLocaleDateString()}</span>
                                                </p>
                                            </div>{" "}
                                        </div>
                                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default CarDealerCard