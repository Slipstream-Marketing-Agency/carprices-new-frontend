"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function CarDetails({ data }) {

  // Helper function to process field values with conditions
  function processFieldValue(field, value) {
    switch (field) {
      case "gearBox":
        return value && value !== ""
          ? value === "CVT"
            ? "-"
            : value.slice(0, -1) + "-speed"
          : "-";
      case "fuelType":
        return value === "Hybrid" ? "Petrol" : value || "-";
      // Add more cases as needed for other fields
      default:
        return value !== undefined && value !== null && value !== ""
          ? value
          : "-";
    }
  }

  // Define categories and their respective sections
  const categories = [
    {
      heading: "Engine",
      sections: [
        { field: "cylinders", header: "No. Of Cylinders" },
        { field: "displacement", header: "Displacement (cc)" },
        { field: "power", header: "Power (hp)" },
        { field: "torque", header: "Peak Torque (Nm)" },
        {
          field: "fuelType",
          header: "Fuel Type",
        },
      ],
    },
    // {
    //   heading: "Safety",
    //   sections: [
    //     { field: "haveABS", header: "ABS" },
    //     { field: "haveFrontAirbags", header: "Front Airbags" },
    //   ],
    // },
    {
      heading: "Transmission",
      sections: [
        { field: "drive", header: "Drive" },
        { field: "transmission", header: "Transmission Type" },
        { field: "gearBox", header: "No. of Gears" },
      ],
    },
    {
      heading: "Fuel Efficiency",
      sections: [
        { field: "fuelTankSize", header: "Fuel Tank Size (L)" },
        { field: "fuelConsumption", header: "Fuel Consumption (kmpl)" },
      ],
    },
    {
      heading: "Performance",
      sections: [
        { field: "zeroToHundred", header: "0 to 100 (s)" },
        { field: "topSpeed", header: "Top Speed (km/h)" },
      ],
    },
    {
      heading: "Electric/Alternative Fuel",
      sections: [
        { field: "motorType", header: "Motor Type" },
        { field: "motor", header: "No. of Motors" },
        { field: "batteryCapacity", header: "Battery Capacity (kWh)" },
        { field: "chargingTime", header: "Charging Time" },
        { field: "batteryWarranty", header: "Battery Warranty" },
        { field: "range", header: "Range (km)" },
      ],
    },
    {
      heading: "Dimension",
      sections: [
        { field: "bodyType", header: "Body Type" },
        { field: "doors", header: "No. Of Doors" },
        { field: "length", header: "Length (mm)" },
        { field: "width", header: "Width (mm)" },
        { field: "height", header: "Height (mm)" },
        { field: "wheelbase", header: "Wheelbase (mm)" },
        { field: "weight", header: "Weight (kg)" },
        { field: "tyresFront", header: "Front Tyres" },
        { field: "tyresRear", header: "Rear Tyres" },
        { field: "cargoSpace", header: "Cargo Space (L)" },
      ],
    },
    {
      heading: "Interior",
      sections: [
        { field: "haveLeatherInterior", header: "Leather Interior" },
        { field: "haveFabricInterior", header: "Fabric Interior" },
        {
          field: "haveRearSeatEntertainment",
          header: "Rear Seat Entertainment",
        },
        { field: "haveCooledSeats", header: "Seat Cooling" },
        { field: "haveClimateControl", header: "Climate Control" },
        { field: "seatingCapacity", header: "Seating Capacity" },
        { field: "haveAppleCarPlay", header: "Apple CarPlay" },
        { field: "haveAndroidAuto", header: "Android Auto" },
      ],
    },
    {
      heading: "Safety",
      sections: [
        { field: "frontBrakes", header: "Front Brake" },
        { field: "rearBrakes", header: "Rear Brake" },
        { field: "haveFrontAirbags", header: "Front Airbags" },
        { field: "haveRearAirbags", header: "Rear Airbags" },
        { field: "haveSideAirbags", header: "Side Airbags" },
        { field: "haveFrontParkAssist", header: "Front Park Assist" },
        { field: "haveRearParkAssist", header: "Rear Park Assist" },
        { field: "haveRearParkingCamera", header: "Rear Parking Camera" },
        { field: "have360ParkingCamera", header: "360 Parking Camera" },
        { field: "haveCruiseControl", header: "Cruise Control" },
        {
          field: "haveAdaptiveCruiseControl",
          header: "Adaptive Cruise Control",
        },
        { field: "haveABS", header: "ABS" },
        { field: "haveFrontAirbags", header: "Front Airbags" },
        { field: "haveLaneChangeAssist", header: "Lane Change Assist" },
      ],
    },
  ];

  // State for active section
  const [activeCategory, setActiveCategory] = useState(null);

  // Create refs for each section
  const sectionRefs = useRef({});

  useEffect(() => {
    // Create an intersection observer to detect when sections are in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveCategory(entry.target.id);
        }
      });
    }, { threshold: 0.5 }); // Trigger when 50% of the section is in view

    // Observe all sections
    Object.keys(sectionRefs.current).forEach((key) => {
      observer.observe(sectionRefs.current[key]);
    });

    // Cleanup observer on component unmount
    return () => observer.disconnect();
  }, []);


  // Scroll to category section
  const scrollToSection = (categoryHeading) => {
    const element = document.getElementById(categoryHeading);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-20">
        <nav className="text-sm md:text-base leading-none text-black bg-zinc-50 shadow my-6 overflow-x-scroll custom-scrollbar">
          <div className="mx-auto container flex gap-7 items-center">
            {categories.map((category, catIndex) => (
              <button
                key={`nav-${catIndex}`}
                className={`gap-2.5 py-5 self-stretch p-2.5 h-full whitespace-nowrap border-0 border-b-2 border-solid ${activeCategory === category.heading
                  ? "border-b-blue-600 text-black"
                  : "border-transparent text-gray-500"
                  }`}
                onClick={() => {
                  scrollToSection(category.heading);
                  setActiveCategory(category.heading); // Set active category on click
                }}
              >
                {category.heading}
              </button>
            ))}
          </div>
        </nav>
      </div>

      <section className="py-8 bg-white container">
        <div className="container mx-auto">
          {categories.map((category, catIndex) => (
            <div
              key={`cat-${catIndex}`}
              id={category.heading} // Assigning unique id to each section for scrolling
              className="mb-14"
              ref={(el) => (sectionRefs.current[category.heading] = el)}
            >
              <h2 className="text-xl font-bold py-4 border-b border-gray-300 sm:py-6 sm:text-3xl">
                {category.heading}
              </h2>
              <div className="hidden sm:grid grid-cols-10 mt-4">
                {/* Category Header Column */}
                <div className="col-span-2 bg-gradient-to-r from-gray-50 to-gray-100">
                  {category.sections.map((section, secIndex) => (
                    <div
                      key={`section-${secIndex}`}
                      className={`text-base font-semibold py-5 px-4 border-b border-gray-200 flex items-center justify-center ${secIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                      style={{ height: '70px' }}
                    >
                      {section.header}
                    </div>
                  ))}
                </div>

                {/* Car Trims Columns */}
                {data.map((carTrim, dataIndex) => (
                  <div key={`car-${dataIndex}`} className="col-span-2">
                    {category.sections.map((section, colIndex) => (
                      <div
                        key={`car-section-${colIndex}`}
                        className={`py-5 px-4 flex items-center justify-center gap-2 text-sm border-b border-gray-200 ${colIndex % 2 === 0 ? 'bg-gray-50' : 'bg-tablegrey2'}`}
                        style={{ height: '70px' }}
                      >
                        {typeof carTrim[section.field] === 'boolean' ? (
                          carTrim[section.field] ? (
                            <Image src="/yes-icon.svg" alt="Yes" width={20} height={20} />
                          ) : (
                            <Image src="/no-icon.svg" alt="No" width={20} height={20} />
                          )
                        ) : (
                          processFieldValue(section.field, carTrim[section.field])
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Mobile UI */}
              <div className="sm:hidden">
                {category.sections.map((section, index) => (
                  <div
                    key={`mobile-section-${index}`}
                    className={`py-4 px-2 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b border-gray-200`}
                  >
                    <h4 className="text-sm font-semibold text-center mb-2">{section.header}</h4>
                    <div className="grid grid-cols-12 gap-2">
                      {data.map((carTrim, i) => (
                        <div
                          key={`mobile-car-${i}`}
                          className="col-span-6 flex justify-center text-center p-2 border rounded-md shadow-sm bg-gray-50"
                        >
                          {typeof carTrim[section.field] === 'boolean' ? (
                            carTrim[section.field] ? (
                              <Image
                                src="/yes-icon.svg"
                                alt="Yes"
                                width={20}
                                height={20}
                              />
                            ) : (
                              <Image
                                src="/no-icon.svg"
                                alt="No"
                                width={20}
                                height={20}
                              />
                            )
                          ) : (
                            <div className="text-xs font-medium">
                              {processFieldValue(section.field, carTrim[section.field])}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );

}

export default CarDetails;
