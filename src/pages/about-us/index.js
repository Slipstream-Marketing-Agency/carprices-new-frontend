import MainLayout from "@/src/layout/MainLayout";
import Image from "next/image";

function AboutUs() {
    return (
        <MainLayout>
            <main className="sm:tw-space-y-14 tw-space-y-6">
                <div className="tw-relative tw-w-full tw-h-auto sm:tw-block tw-hidden">
                    <Image src={"/about-us/bannerImage-aboutUs.webp"}
                        alt="bannerImage"
                        layout="responsive"
                        width={1400}
                        height={500}
                        className="object-cover"
                    />
                    <div className="tw-absolute tw-inset-0 tw-text-white tw-top-20 tw-right-0 tw-mx-8 tw-space-y-4 sm:tw-block tw-hidden">
                        <div className="tw-text-3xl tw-font-semibold">About CarPrices.ae</div>
                        <div className="tw-text-sm tw-w-[36%] tw-opacity-60">Dive into a realm where interaction sets the stage for endless exploration. Experience a groundbreaking platform that redefines engagement as you know it.</div>
                        <button className="tw-rounded-3xl tw-p-2 tw-px-6  tw-text-white tw-bg-blue-600 tw-text-sm">Find Now</button>
                    </div>
                </div>
                <section className="sm:tw-mx-24 tw-mx-4 tw-space-y-8">
                    <div className="sm:tw-grid sm:tw-grid-cols-2 tw-gap-4">
                        <div className="tw-col-span-1">
                            <div className="tw-text-blue-600 tw-font-bold tw-text-xs tw-uppercase tw-leading-5 tw-tracking-widest">What we offer</div>
                            <div className="sm:tw-text-xl tw-leading-9 tw-mb-6 tw-capitalize">What we bring to you</div>
                            <Image src={"/about-us/porsche1.png"}
                                alt="bannerImage"
                                layout="responsive"
                                width={1400}
                                height={500}
                                className="object-cover sm:tw-block tw-hidden"
                            />
                        </div>
                        <div className="tw-col-span-1">
                            <Image src={"/about-us/porsche2.png"}
                                alt="bannerImage"
                                layout="responsive"
                                width={1400}
                                height={500}
                                className="object-cover sm:tw-block tw-hidden" />
                            <div className=" sm:tw-p-8 tw-space-y-6">
                                <p className="tw-text-md">The world's first truly interactive new car research platform recommending cars based on buyers' preferences and requirements.</p>
                                <p className="tw-text-md">Extensive new car database maintained by automotive experts.</p>
                                <p className="tw-text-md">Compare a wide range of vehicles side-by-side for comprehensive pricing and feature overviews.</p>
                                <p className="tw-text-md">Tools and insights to find the perfect car aligned with users' needs, preferences, and budget.</p>
                            </div>
                        </div>
                    </div>
                    <div className="sm:tw-grid tw-grid-cols-4  gap-3 ">
                        <div className="tw-col-span-1">
                            <div className="tw-bg-slate-300 tw-rounded-lg  tw-flex tw-justify-center tw-items-center tw-min-h-[400px]">300 px X 600</div>
                        </div>
                        <div className="tw-col-span-3">
                            <div className="tw-bg-gradient-to-tl tw-from-blue-300 tw-via-blue-400 tw-to-blue-500 tw-rounded-2xl tw-p-10 tw-text-white tw-flex tw-relative tw-overflow-hidden tw-custom-gradient tw-min-h-[400px]">
                                <div className="tw-space-y-6">
                                    <div className="sm:tw-text-3xl sm:tw-w-1/2 tw-leading-snug tw-font-semibold">
                                        Navigate Car Prices with a Fresh Perspective
                                    </div>
                                    <div className="tw-font-extralight tw-mb-6 tw-w-2/3 tw-opacity-90 tw-text-sm">
                                        Experience a revolutionary approach to navigating car prices. Explore innovation as you navigate the world of automotive pricing with a fresh perspective
                                    </div>
                                    <button
                                        onClick={() => setIsOpen(true)}
                                        className="tw-border-solid tw-border-[1px] tw-rounded-3xl tw-p-2 tw-px-6 tw-bg-transparent tw-text-white tw-text-xs"
                                    >
                                        Find your car now
                                    </button>
                                </div>
                                <Image
                                    className="tw-object-contain tw-min-h-0 tw-absolute tw-bottom-0 tw-top-50 tw-right-0 tw-max-w-xs lg:tw-max-w-3xl"
                                    src={"/about-us/porsche-blue.png"}
                                    alt="car-image"
                                    height={400}
                                    width={400}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </MainLayout>
    )
}

export default AboutUs;