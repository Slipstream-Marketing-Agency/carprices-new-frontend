import React from 'react'
import StorySlider from '../webstories/StorySlider'
import Link from 'next/link'


export default function WebStories() {
    return (
        <div className="w-full container md:mt-12 mt-6">
            <div className="relative flex justify-between ">
                <div className="flex flex-col justify-center">
                    <h5 className="md:text-sm  text-xs tracking-wider leading-5 text-blue-600 uppercase font-bold">
                        Web Stories
                    </h5>
                    <h2 className="md:text-xl text-md font-semibold capitalize">Web Stories</h2>
                </div>
                <Link href="/web-stories" className='px-5 py-2 text-white bg-blue-600 border border-blue-600 rounded-[47px] max-md:px-4 md:text-[16px] text-[12px] whitespace-nowrap flex items-center justify-center'>
                    <span className="capitalize font-semibold">
                        View More
                    </span>
                </Link>
            </div>
            <StorySlider />
        </div>
    )
}


