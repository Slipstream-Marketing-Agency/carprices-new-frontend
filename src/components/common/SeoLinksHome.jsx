import Link from "next/link";

export default function SeoLinksHome() {
  const PopularNewCarsdata = [
    { href: "https://carprices.ae/brands/toyota/2024/land-cruiser-70", text: "New Toyota Land Cruiser 70 Series" },
    { href: "https://carprices.ae/brands/toyota/2024/land-cruiser", text: "New Toyota Land Cruiser 300 Series" },
    { href: "https://carprices.ae/brands/toyota/2024/rav4-hybrid", text: "New Toyota Rav 4" },
    { href: "https://carprices.ae/brands/toyota/2024/hilux", text: "New Toyota Hilux" },
    { href: "https://carprices.ae/brands/toyota/2024/rav4", text: "New Toyota Camry" },
    { href: "https://carprices.ae/brands/hyundai/2024/tucson", text: "New Hyundai Tucson" },
    { href: "https://carprices.ae/brands/hyundai/2024/santa-fe", text: "New Hyundai Santa Fe" },
    { href: "https://carprices.ae/brands/ford/2024/bronco", text: "New Ford Bronco" },
    { href: "https://carprices.ae/brands/ford/2024/f-150", text: "New Ford F-150" },
    { href: "https://carprices.ae/brands/chevrolet/2024/silverado", text: "New Chevrolet Silverado" },
    { href: "https://carprices.ae/brands/mitsubishi/2024/outlander", text: "New Mitsubishi Outlander" },
    { href: "https://carprices.ae/brands/jeep/2024/wrangler", text: "New Jeep Wrangler" },
    { href: "https://carprices.ae/brands/honda/2024/accord", text: "New Honda Accord" },
    { href: "https://carprices.ae/brands/honda/2024/civic", text: "New Honda Civic" },
    { href: "https://carprices.ae/brands/honda/2024/cr-v", text: "New Honda CR-V" },
    { href: "https://carprices.ae/brands/geely/2024/coolray", text: "New Geely Tugella" },
    { href: "https://carprices.ae/brands/geely/2024/starray", text: "New Geely Starray" },
    { href: "https://carprices.ae/brands/nissan/2024/patrol-safari", text: "New Nissan Patrol Safari" },
    { href: "https://carprices.ae/brands/nissan/2024/patrol", text: "New Nissan Patrol" },
    { href: "https://carprices.ae/brands/audi/2024/a3-sedan", text: "New Audi A3" },
    { href: "https://carprices.ae/brands/bmw/2024/3-series-sedan", text: "New BMW 3-Series" }
  ];
  const searchedKeywordsData = [
    { href: "https://carprices.ae/news/10-important-things-to-know-about-the-2024-toyota-land-cruiser-prado-before-its-uae-launch", text: "10 Important Things To Know About the 2024 Toyota Land Cruiser Prado Before Its UAE Launch!" },
    { href: "https://carprices.ae/news/the-2024-toyota-land-cruiser-prado-vs-the-gwm-tank-500", text: "The 2024 Toyota Land Cruiser Prado VS The GWM Tank 500!" },
    { href: "https://carprices.ae/news/5-exciting-car-launches-to-happen-in-the-uae-in-2024", text: "5 Exciting Car Launches To Happen In The UAE In 2024!" },
    { href: "https://carprices.ae/news/10-popular-cars-in-uae-with-high-ground-clearance-sorted-by-price-low-to-high-best-cars-in-uae", text: "10 Popular Cars In UAE With High Ground Clearance Sorted By Price Low To High!" },
    { href: "https://carprices.ae/news/internal-combustion-engine-car-vs-hybrid-car-which-will-be-worth-buying-in-the-uae", text: "Internal Combustion Engine Car VS Hybrid Car!" },
    { href: "https://carprices.ae/news/are-chinese-luxury-cars-better-than-german-luxury-cars-in-uae-chinese-cars-vs-german-cars", text: "Are Chinese Luxury Cars Better Than German Luxury Cars In UAE?" },
    { href: "https://carprices.ae/news/heres-what-you-can-do-during-a-car-break-down-in-the-middle-of-nowhere-in-the-uae", text: "Here's What You Can Do During A Car Break Down!" },
    { href: "https://carprices.ae/news/6-best-and-cheapest-suvs-in-uae-under-aed-150000", text: "6 Best And Cheapest SUVs In UAE Under AED 150,000!" },
    { href: "https://carprices.ae/news/10-best-cars-to-buy-in-uae-under-aed-100k", text: "10 Best Cars To Buy In UAE Under AED 100K In 2024" },
    { href: "https://carprices.ae/news/are-chinese-cars-superior-and-reliable-than-japanese-cars-in-uae", text: "Are Chinese Cars Superior And Reliable Than Japanese Cars In UAE?" }
  ];
  const whyCarPriceData = [
    {
      heading: "New Car Buyer’s Guide",
      para: "Our interactive car finder platform is like no other. It covers every car currently available in the UAE, neatly organized into 10 categories and 12 body types, complete with an EMI calculator. This way, you can effortlessly find a car that suits your lifestyle, needs, and budget."
    },
    {
      heading: "Comprehensive Database",
      para: "Our extensive database of new and used cars provides access to a wide range of vehicles from trusted new car dealerships across the UAE. Whether you're looking for a luxury sedan, a rugged SUV, or a fuel-efficient hatchback, we've got you covered."
    },
  ]
  return (
    <div className="container w-full sm:mt-12 max-md:pr-5 max-md:mt-10">
      <div className="flex flex-col self-start mb-6 sm:mb-8 md:max-w-full">
        <h5 className="md:text-sm  text-xs  tracking-wide leading-5 text-blue-600 uppercase font-bold">
          Frequently Searched
        </h5>
        <h2 className="md:text-xl text-md font-semibold ">What Others Are Searching For?</h2>
      </div>
      <div className="sm:grid sm:grid-cols-7 gap-6 space-y-6 sm:space-y-0">
        <div className="col-span-3">
          <div className="font-semibold leading-6 capitalize sm:text-xl">Popular new cars</div>
          <div className="sm:grid grid-cols-2 ">
            {PopularNewCarsdata.map((link, index) => (
              <Link key={`link-${index}`} href={link.href} className={`block mt-2  text-sm `}>
                {link.text}
              </Link>
            ))}
          </div>
        </div>
        <div className="col-span-2">
          <div className="font-semibold leading-6 capitalize sm:text-xl">
            Most searched keywords
          </div>
          <div>
            {searchedKeywordsData.slice(0, 6).map((link, index) => (
              <Link key={`link-${index}`} href={link.href} className="text-sm block mt-2">
                {link.text}
              </Link>
            ))}
          </div>
        </div>
        <div className="col-span-2 bg-sky-100 px-8 py-8 rounded-2xl text-neutral-900 w-full hidden xl:block">
          <div className="font-semibold text-xl sm:text-2xl mb-2 ">
            Why Carprices.ae
          </div>
          {whyCarPriceData.map((data, index) => (
            <div className="mb-5" key={`data-${index}`}>
              <div key={`data-${index}`} className="font-semibold mb-2">{data.heading}</div>
              <div className="text-sm">{data.para}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
