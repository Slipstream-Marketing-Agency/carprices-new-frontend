import Image from "next/image";

export default function ComparisonSection() {
    return (
        <div className='my-6'>
            <div className=' text-blue-600 font-medium text-xs'>WHAT'S THE BEST ?</div>
            <div className='font-medium text-xl'>Popular Car Comparison</div>
            <div className='m-4 grid gap-4 sm:grid-cols-12'>
                {/* will do mapping from mock to just have eliminate div2 */}
                {/* div2 */}
                <div className='sm:col-span-6 rounded-xl border-2  px-2 py-4'>
                    <div className=' grid gap-1  sm:grid-cols-12 '>
                        <div className='sm:col-span-5 m-2'>
                            <div className="">
                                <Image src="/car-image2.png" width={150} height={150} className="mx-auto mb-2"/>
                                <div className='text-blue-500 text-xs'>VOLVO</div>
                                <div className='text-sm font-medium'>Volvo XC40</div>
                                <div className='font-bold text-sm'>AED 185,850 - 222,900</div>
                            </div>
                        </div>
                        <div className="sm:col-span-1 border-r-2 sm:block hidden mx-2">
                            <div className=" bg-blue-500 h-6 w-6 p-1 my-8 rounded-xl text-xs text-white">Vs</div>
                        </div>
                        
                        <div className="lg:hidden sm:col-span-12 border-b-2 mx-2">
                            <div className=" bg-blue-500 h-6 w-6 mx-auto -my-2 p-1 rounded-xl text-xs text-white">Vs</div>
                        </div>

                        <div className='sm:col-span-5 m-2'>
                            <div>
                                <Image src="/car-image2.png" width={150} height={150} className="mx-auto mb-2"/>
                                <div className='text-blue-500 text-xs'>BMW</div>
                                <div className='text-sm font-medium'>1 Series</div>
                                <div className='font-bold text-sm b-2'>AED 185,850</div>
                            </div>
                        </div>
                    </div>
                    <button className='bg-blue-700 text-sm px-6 py-1 font-thin font-xs text-white rounded-xl justify-center text-center my-2 w-full'>Compare Now</button>
                </div>
                {/* div2 */}
                <div className='sm:col-span-6 rounded-xl border-2  px-2 py-4'>
                    <div className=' grid gap-1  sm:grid-cols-12 '>
                        <div className='sm:col-span-5 m-2'>
                            <div className="">
                                <Image src="/car-image2.png" width={150} height={150} className="mx-auto mb-2"/>
                                <div className='text-blue-500 text-xs'>VOLVO</div>
                                <div className='text-sm font-medium'>Volvo XC40</div>
                                <div className='font-bold text-sm'>AED 185,850 - 222,900</div>
                            </div>
                        </div>
                        <div className="sm:col-span-1 border-r-2 sm:block hidden mx-2">
                            <div className=" bg-blue-500 h-6 w-6 p-1 my-8 rounded-xl text-xs text-white">Vs</div>
                        </div>
                        
                        <div className="lg:hidden sm:col-span-12 border-b-2 mx-2">
                            <div className=" bg-blue-500 h-6 w-6 mx-auto -my-2 p-1 rounded-xl text-xs text-white">Vs</div>
                        </div>

                        <div className='sm:col-span-5 m-2'>
                            <div>
                                <Image src="/car-image2.png" width={150} height={150} className="mx-auto mb-2"/>
                                <div className='text-blue-500 text-xs'>BMW</div>
                                <div className='text-sm font-medium'>1 Series</div>
                                <div className='font-bold text-sm b-2'>AED 185,850</div>
                            </div>
                        </div>
                    </div>
                    <button className='bg-blue-700 text-sm px-6 py-1 font-thin font-xs text-white rounded-xl justify-center text-center my-2 w-full'>Compare Now</button>
                </div>
            </div>
        </div>
    )
}
