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
                <Link href="/web-stories" >
                    <span className="capitalize font-semibold">
                        View More
                    </span>
                </Link>
            </div>
            <StorySlider />
        </div>
    )
}


