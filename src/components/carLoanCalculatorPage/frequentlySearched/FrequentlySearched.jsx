import { carData } from "../../../mocks/mock";
export default function FrequentlySearched() {
  return (
    <div>
      <div className=" heading-blue">
        Frequently searched
      </div>
      <div className="heading ">
        What Others Are Searching For ?
      </div>

      {/*popular cars */}
      <div className="hidden lg:block">
        <div className="font-semibold font-medium text-md mt-8 mb-4">
          Popular New Cars
        </div>
        <div className=" grid gap-2 sm:grid-cols-12 opacity-70 mb-8">
          {carData?.popularNewCars?.map((cars,index) => (
            <div key={index} className="sm:col-span-3 rounded-xl">{cars}</div>
          ))}
        </div>
      </div>
      {/*searched keywords */}
      <div className="sm:hidden mb-4">
        <div className="font-semibold font-medium text-md mt-4 mb-4">
       Searched Keywords
        </div>
        <div className="grid gap-2 sm:grid-cols-12 opacity-70 leading-7">
          {carData?.searchedKeywords?.map((keywords, index) => (
            <div key={index} className="">{keywords}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
