"use client";
import Image from "next/image";

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
    {
      heading: "Safety",
      sections: [
        { field: "haveABS", header: "ABS" },
        { field: "haveFrontAirbags", header: "Front Airbags" },
      ],
    },
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
        { field: "haveLaneChangeAssist", header: "Lane Change Assist" },
      ],
    },
  ];

  return (
    <section className="">
      <div className="">
        {categories.map((category, catIndex) => (
          <div key={catIndex} className="mb-10">
            <h2 className="text-lg py-3 sm:py-5 sm:text-2xl">
              {category.heading}
            </h2>
            <hr />
            <div className="hidden sm:grid grid-cols-10">
              <div className="col-span-2 ">
                {category.sections.map((section, index) => (
                  <div
                    key={index}
                    className={`text-base font-bold sm:py-10 sm:px-4 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-tablegrey2"
                    }`}
                  >
                    {section.header}
                  </div>
                ))}
              </div>
              {data.map((carTrim, index) => (
                <div key={index} className="col-span-2 ">
                  {category.sections.map((section, colIndex) => (
                    <div
                      key={colIndex}
                      className={`py-10 flex gap-2 col-span-2 text-base sm:py-10 ${
                        section.field === "name" ? "font-semibold" : ""
                      } ${
                        colIndex % 2 === 0
                          ? "bg-gray-50"
                          : "bg-tablegrey2"
                      }`}
                    >
                      <div
                        className={`${
                          typeof carTrim[section.field] === "boolean"
                            ? "block"
                            : "hidden"
                        }`}
                      >
                        {carTrim[section.field] ? (
                          <Image
                            src={"/yes-icon.svg"}
                            alt="Yes"
                            width={20}
                            height={20}
                          />
                        ) : (
                          <Image
                            src={"/no-icon.svg"}
                            alt="No"
                            width={20}
                            height={20}
                          />
                        )}
                      </div>
                      {typeof carTrim[section.field] !== "boolean" &&
                        processFieldValue(
                          section.field,
                          carTrim[section.field]
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
                  key={index}
                  className={`py-4 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-tablegrey2"
                  }`}
                >
                  <h4 className="text-xs font-bold text-center">
                    {section.header}
                  </h4>
                  <div className="grid grid-cols-12 py-4">
                    {data.map((carTrim, i) => (
                      <div
                        key={i}
                        className={`col-span-6 text-center`}
                      >
                        {typeof carTrim[section.field] === "boolean" ? (
                          carTrim[section.field] ? (
                            <Image
                              src={"/yes-icon.svg"}
                              alt="Yes"
                              width={20}
                              height={20}
                            />
                          ) : (
                            <Image
                              src={"/no-icon.svg"}
                              alt="No"
                              width={20}
                              height={20}
                            />
                          )
                        ) : (
                          processFieldValue(
                            section.field,
                            carTrim[section.field]
                          )
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
  );
}

export default CarDetails;
