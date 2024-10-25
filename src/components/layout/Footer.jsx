import Link from 'next/link'
import React, { Suspense } from 'react'
import FixedAd320x50 from '../ads/FixedAd320x50'
import FixedAd728x90 from '../ads/FixedAd728x90'
import Ad300X250 from '../ads/Ad300x250'
import Ad970x250 from '../ads/Ad970x250'

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div className="my-10">
        {/* Desktop Ad */}
        <div className="md:block hidden">
          <Suspense fallback={<div>Loading ad...</div>}>
            <Ad970x250 dataAdSlot="3620924730" />
          </Suspense>
        </div>

        {/* Mobile Ad */}
        <div className="md:hidden block">
          <Suspense fallback={<div>Loading ad...</div>}>
            <Ad300X250 dataAdSlot="1332106070" />
          </Suspense>
        </div>
      </div>

      <div className="">
        <Suspense fallback={<div>Loading ad...</div>}>
          <FixedAd320x50 dataAdSlot="1332106070" />
        </Suspense>
        <Suspense fallback={<div>Loading ad...</div>}>
          <FixedAd728x90 dataAdSlot="3620924730" />
        </Suspense>
      </div>

      <div className="flex justify-center items-center px-16 py-16 bg-neutral-900 max-md:px-5 w-full ">
        <div className="flex flex-col w-full container">
          <div className="flex flex-col max-md:max-w-full">
            <div className="flex gap-5 justify-between sm:mt-12 w-full max-md:flex-wrap md:mt-10 max-md:max-w-full">
              <div className="max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                  <div className="flex flex-col w-[29%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow text-sm leading-5 text-white">
                      <h4 className=" text-gray-400 tracking-wide uppercase font-semibold">
                        Top 10s
                      </h4>
                      <div className="flex flex-col mt-3 space-y-2">
                        <Link
                          href="https://carprices.ae/news/10-popular-cars-in-uae-with-high-ground-clearance-sorted-by-price-low-to-high-best-cars-in-uae"
                          className="text-white"
                        >
                          10 Cars with High Ground Clearance
                        </Link>
                        <Link
                          href="https://carprices.ae/news/2023-s-top-10-cars-that-buyers-searched-for-on-carprices-ae"
                          className="mt-1 text-white"
                        >
                          10 Most Searched Cars
                        </Link>
                        <Link
                          href="https://carprices.ae/news/chinese-car-brands-uae"
                          className="mt-1 text-white"
                        >
                          10 Best Chinese Brands
                        </Link>
                        <Link
                          href="https://carprices.ae/news/10-myths-busted-about-buying-a-new-car-in-the-uae"
                          className="mt-1 text-white"
                        >
                          10 Myths About Buying a Car
                        </Link>
                        <Link
                          href="https://carprices.ae/news/top-fuel-effnt"
                          className="mt-1 text-white"
                        >
                          10 Fuel Efficient Cars
                        </Link>
                        <Link
                          href="https://carprices.ae/news/top-10-hybrid-cars-AED-230k"
                          className="mt-1 text-white"
                        >
                          10 Best Hybrid Cars
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col ml-5 w-[29%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col text-sm leading-5 text-white max-md:mt-10">
                      <h4 className=" text-gray-400 tracking-wide uppercase font-semibold">
                        Comparisons
                      </h4>
                      <div className="flex flex-col mt-3 space-y-2">
                        <Link
                          href="https://carprices.ae/news/the-2024-toyota-land-cruiser-prado-vs-the-gwm-tank-500"
                          className="text-white"
                        >
                          2024 Toyota Prado Vs GWM Tank 500
                        </Link>
                        <Link
                          href="https://carprices.ae/news/2024-toyota-land-cruiser-prado-vs-land-rover-defender-vs-jeep-wrangler-vs-the-ford-bronco"
                          className="mt-1 text-white"
                        >
                          Battle Of 4 Popular SUVs
                        </Link>
                        <Link
                          href="https://carprices.ae/news/the-2023-toyota-land-cruiser-300-series-vs-the-2024-toyota-land-cruiser-prado"
                          className="mt-1 text-white"
                        >
                          LC 300 Vs 2024 Toyota Prado
                        </Link>
                        <Link
                          href="https://carprices.ae/news/new-vs-old-prado"
                          className="mt-1 text-white"
                        >
                          2024 LC Prado Vs Used LC Prado
                        </Link>
                        <Link
                          href="https://carprices.ae/news/lc-prado-vs-patrol"
                          className="mt-1 text-white"
                        >
                          2024 LC Prado Vs Nissan Patrol
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col ml-5 w-[22%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col text-sm leading-5 text-white max-md:mt-10">
                      <h4 className=" text-gray-400 tracking-wide uppercase font-semibold">
                        Quick Search
                      </h4>
                      <div className="flex flex-col mt-3 space-y-2">
                        <Link
                          href="https://carprices.ae/news/internal-combustion-engine-car-vs-hybrid-car-which-will-be-worth-buying-in-the-uae"
                          className="text-white"
                        >
                          ICE Vs Hybrid
                        </Link>
                        <Link
                          href="https://carprices.ae/news/analysing-the-cost-of-living-with-the-electric-vehicle-vs-internal-combustion-engine-vehicle-in-the-uae-ev-vs-ice"
                          className="mt-1 text-white"
                        >
                          ICE Vs EV
                        </Link>
                        <Link
                          href="https://carprices.ae/news/7-popular-reliable-sedans-to-buy-in-the-uae-in-2024-or-best-cars-in-uae"
                          className="mt-1 text-white"
                        >
                          Popular Reliable Sedans
                        </Link>
                        <Link
                          href="https://carprices.ae/news/5-exciting-car-launches-to-happen-in-the-uae-in-2024"
                          className="mt-1 text-white"
                        >
                          2024 Car Launches
                        </Link>
                        <Link
                          href="https://carprices.ae/news/6-best-chinese-suv-cars-in-uae-under-aed-70000"
                          className="mt-1 text-white"
                        >
                          Best Chinese SUVs
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col ml-5 w-1/5 max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col text-sm leading-5 text-white max-md:mt-10">
                      <h4 className=" text-gray-400 tracking-wide uppercase font-semibold">
                        Legal Bits
                      </h4>
                      <div className="flex flex-col mt-3">
                        <Link href="/about" className="text-white">
                          About us
                        </Link>
                        <Link
                          href="/contact-us"
                          className="mt-1 text-white"
                        >
                          Contact Us
                        </Link>
                        <Link
                          href="/privacy"
                          className="mt-1 text-white"
                        >
                          Privacy Policy
                        </Link>
                        {/* <Link
                            href="/terms-and-conditions"
                            className="mt-1 text-white"
                          >
                            Terms and Conditions
                          </Link>
                          <Link
                            href="/code-of-conduct"
                            className="mt-1 text-white"
                          >
                            Code of Conduct
                          </Link> */}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col ml-5 w-1/5 max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col text-sm leading-5 text-white max-md:mt-10">
                      <h4 className=" text-gray-400 tracking-wide uppercase font-semibold">
                        Media
                      </h4>
                      <div className="flex flex-col mt-3">
                        <Link href="/press-releases" className="text-white">
                          Press Releases
                        </Link>

                        {/* <Link
                            href="/terms-and-conditions"
                            className="mt-1 text-white"
                          >
                            Terms and Conditions
                          </Link>
                          <Link
                            href="/code-of-conduct"
                            className="mt-1 text-white"
                          >
                            Code of Conduct
                          </Link> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center self-start">
                <div className="flex flex-col">
                  <div className="shrink-0 md:self-end h-px bg-white w-[45px]" />
                  <div className="flex flex-col mt-6">
                    <div className="flex flex-col md:self-end text-sm leading-5 text-white">
                      {/* <div>+971 50 649 4665</div> */}
                      <div className="mt-1 md:text-right text-white">
                        <Link
                          href="mailto:info@carprices.ae"
                          className="text-white"
                        >
                          info@carprices.ae
                        </Link>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Link href="https://youtube.com/@carpricesuae?feature=shared">
                        <i className="bx bxl-youtube text-white" />
                      </Link>
                      <Link href="https://www.facebook.com/carprices.ae/">
                        <i className="bx bxl-facebook text-white" />
                      </Link>
                      <Link href="https://x.com/CarPricesAe?t=_IgNE0J6jf5r1ZiiKrkaYw&s=09">
                        <i className="bx bxl-twitter text-white" />
                      </Link>
                      <Link href="https://www.linkedin.com/company/car-prices-ae/">
                        <i className="bx bxl-linkedin text-white" />
                      </Link>
                      <Link href="https://www.instagram.com/carprices.ae?igsh=bnE4cnpudjFwMHg1">
                        <i className="bx bxl-instagram-alt text-white" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-5 justify-between mt-14 text-sm leading-5 text-white max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
            <div className="my-auto text-gray-400">
              *CarPrices.ae does not guarantee the accuracy of any brand,
              vehicle or specification information shown on our website.
              Models and specifications and vehicle availability are subject
              to change without prior notice. Users are advised to contact the
              authorised dealer/distributor for more up to date information on
              the vehicles and their specifications and availability.
            </div>
          </div>
          <div className="flex gap-5 justify-between mt-14 text-sm leading-5 text-white max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
            <div className="my-auto ">
              ©2017 - {currentYear} CarPrices.ae. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
