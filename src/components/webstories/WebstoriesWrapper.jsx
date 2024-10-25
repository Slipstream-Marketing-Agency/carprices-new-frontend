import React, { Suspense } from 'react'
import StoryCard from './StoryCard'
import Ad300x600 from '../ads/Ad300x600'
import Ad300X250 from '../ads/Ad300x250'

export default function WebstoriesWrapper({ stories, categories }) {
    return (
        <><div className="container grid grid-cols-12 py-8">
            <div className="md:col-span-9 col-span-12">
                {/* Story Listing */}
                <h1 className="md:text-3xl text-lg font-bold">Web Stories</h1>
                <div className="grid md:grid-cols-4 grid-cols-2 gap-6 mt-4">
                    {stories.map((story) => (
                        <StoryCard key={story.id} story={story} />
                    ))}
                </div>
            </div>
            <div className="md:col-span-3 col-span-12">
                {/* Category Filter Component */}
                <Suspense fallback={<div>Loading ad...</div>}>
                    <Ad300X250 dataAdSlot="6764889295" />
                </Suspense>
                <div className="my-0 p-2">
                    {/* <CategoryFilter categories={categories} /> */}
                </div>

                <div className="sticky-sidebar">
                    <div className="ad-container">
                        <Suspense fallback={<div>Loading ad...</div>}>
                            <Ad300x600 dataAdSlot="3792539533" />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div></>
    )
}
