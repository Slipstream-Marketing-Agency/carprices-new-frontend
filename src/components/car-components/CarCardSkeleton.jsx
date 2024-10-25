

import React from 'react'

export default function CarCardSkeleton() {
    return (
        <article className="flex flex-col py-5 bg-white rounded-2xl border border-solid border-zinc-100 shadow-md xl:w-full xl:shadow-lg animate-pulse">
            <div className="z-10 text-xs justify-center self-start py-1.5 pr-2 pl-3 rounded-tr-full rounded-br-full backdrop-blur-md bg-slate-100 font-semibold">
                <div className="h-4 w-24 bg-gray-300 rounded"></div>
            </div>

            <div className="flex flex-col w-full text-sm leading-4 rounded-2xl text-neutral-900 px-5">
                <div className="relative self-center -mt-1.5 w-full aspect-[1.69] max-w-[278px] flex justify-center items-center bg-gray-300">
                    <div className="w-full h-full bg-gray-300 rounded"></div>
                </div>
            </div>

            <div className="flex flex-col justify-center mt-1 w-full px-5">
                <div className="flex flex-col">
                    <div className="h-4 w-20 bg-gray-300 mb-1 rounded"></div>
                    <div className="h-4 w-32 bg-gray-300 mb-1 rounded"></div>
                    <div className="h-4 w-24 bg-gray-300 rounded"></div>
                </div>
            </div>

            <section className="px-5 md:block hidden">
                <div className="car-filter-card-spec flex gap-5 justify-between self-center p-3 w-full rounded-lg bg-slate-100 text-neutral-900 mt-2">
                    <div className="flex flex-col">
                        <div className="h-4 w-12 bg-gray-300 rounded"></div>
                    </div>
                    <div className="flex flex-col">
                        <div className="h-4 w-12 bg-gray-300 rounded"></div>
                    </div>
                    <div className="flex flex-col">
                        <div className="h-4 w-12 bg-gray-300 rounded"></div>
                    </div>
                </div>
            </section>

            <footer className="grid grid-cols-2 mt-3 w-full px-5">
                <div className="flex flex-col my-auto text-neutral-900">
                    <div className="h-4 w-24 bg-gray-300 rounded"></div>
                </div>
                <div className="flex justify-end">
                    <div className="h-10 w-24 bg-gray-300 rounded"></div>
                </div>
            </footer>
        </article>
    )
}
