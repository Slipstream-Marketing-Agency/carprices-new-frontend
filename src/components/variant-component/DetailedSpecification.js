import { formatNumberWithCommas } from "@/utils/formatNumber";
import React from "react";
import CheckIcon from '@mui/icons-material/Check';

export default function DetailedSpecification({ trim }) {
  return (
    <div id="specifications">
      <h2 className="font-semibold mb-5 mt-14">Vehicle Details</h2>
      
      {/* Specifications Section */}
      <div className="my-3">
        <h3 className="font-semibold text-xl mb-4">Specifications</h3>
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Make and Model */}
            <div className="flex flex-col h-full space-y-2">
              <h5 className="font-semibold text-gray-400 m-0">Make and Model</h5>
              <p><strong>Brand:</strong> {trim?.brand}</p>
              <p><strong>Model Name:</strong> {trim?.model}</p>
              <p><strong>Year of Manufacture:</strong> {trim?.year || "-"}</p>
            </div>
            
            {/* Trim */}
            <div className="flex flex-col h-full space-y-2">
              <h5 className="font-semibold text-gray-400 m-0">Trim</h5>
              <p>{trim?.name || "Base"}</p>
              <p>{trim?.specialEdition || "Standard"}</p>
            </div>

            {/* Fuel Efficiency */}
            <div className="flex flex-col h-full space-y-2">
              <h5 className="font-semibold text-gray-400 m-0">Fuel Efficiency</h5>
              {trim?.fuelType !== "Electric" && (
                <>
                  <p><strong>Tank Size: </strong>{trim?.fuelTankSize ? trim?.fuelTankSize + "L" : "-"}</p>
                  <p><strong>Fuel Consumption: </strong>{trim?.fuelConsumption ? trim?.fuelConsumption + "kmpl" : "-"}</p>
                </>
              )}
            </div>

            {/* Engine Specifications */}
            <div className="flex flex-col h-full space-y-2">
              <h5 className="font-semibold text-gray-400 m-0">Engine Specifications</h5>
              <p><strong>No. of Cylinders: </strong>{trim?.cylinders || "-"}</p>
              <p><strong>Displacement: </strong>{trim?.displacement}</p>
              <p><strong>Power: </strong>{trim?.power}hp</p>
              <p><strong>Torque: </strong>{trim?.torque}Nm</p>
              <p><strong>Fuel Type: </strong>{trim?.fuelType}</p>
            </div>

            {/* Body & Dimensions */}
            <div className="flex flex-col h-full space-y-2">
              <h5 className="font-semibold text-gray-400 m-0">Body & Dimensions</h5>
              <p><strong>Body Type: </strong>{trim?.bodyType || "-"}</p>
              <p><strong>Doors: </strong>{trim?.doors || "-"}</p>
              <p><strong>Length: </strong>{trim?.length ? formatNumberWithCommas(trim?.length) + "mm" : "-"}</p>
              <p><strong>Width: </strong>{trim?.width ? formatNumberWithCommas(trim?.width) + "mm" : "-"}</p>
              <p><strong>Wheelbase: </strong>{trim?.wheelbase ? formatNumberWithCommas(trim?.wheelbase) + "mm" : "-"}</p>
            </div>

            {/* Tyres & Cargo */}
            <div className="flex flex-col h-full space-y-2">
              <h5 className="font-semibold text-gray-400 m-0">Tyres & Cargo</h5>
              <p><strong>Weight: </strong>{trim?.weight ? formatNumberWithCommas(trim?.weight) + "kg" : "-"}</p>
              <p><strong>Front Tyre: </strong>{trim?.tyresFront || "-"}</p>
              <p><strong>Rear Tyre: </strong>{trim?.tyresRear || "-"}</p>
              <p><strong>Cargo Space: </strong>{trim?.cargoSpace ? trim?.cargoSpace + "L" : "-"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="my-3">
        <h3 className="font-semibold text-xl mb-4">Features</h3>
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Technology & Comfort */}
            <div className="flex flex-col h-full space-y-2">
              <h5 className="font-semibold text-gray-400 m-0">Technology & Comfort</h5>
              <p><strong>Rear Seat Entertainment: </strong>{trim?.haveRearSeatEntertainment ? <CheckIcon className="w-5 h-5" /> : <b>-</b>}</p>
              <p><strong>Climate Control: </strong>{trim?.haveClimateControl ? <CheckIcon className="w-5 h-5" /> : <b>-</b>}</p>
              <p><strong>Apple Car Play: </strong>{trim?.haveAppleCarPlay ? <CheckIcon className="w-5 h-5" /> : <b>-</b>}</p>
              <p><strong>Android Auto: </strong>{trim?.haveAndroidAuto ? <CheckIcon className="w-5 h-5" /> : <b>-</b>}</p>
            </div>

            {/* Seating & Upholstery */}
            <div className="flex flex-col h-full space-y-2">
              <h5 className="font-semibold text-gray-400 m-0">Seating & Upholstery</h5>
              <p><strong>Leather Interior: </strong>{trim?.haveLeatherInterior ? <CheckIcon className="w-5 h-5" /> : <b>-</b>}</p>
              <p><strong>Fabric Interior: </strong>{trim?.haveFabricInterior ? <CheckIcon className="w-5 h-5" /> : <b>-</b>}</p>
              <p><strong>Seating Capacity: </strong>{trim?.seatingCapacity ? trim?.seatingCapacity.split(" ")[0] : "-"}</p>
              <p><strong>Cooled Seats: </strong>{trim?.haveCooledSeats ? <CheckIcon className="w-5 h-5" /> : <b>-</b>}</p>
            </div>
            
            {/* Transmission Specifications */}
            <div className="flex flex-col h-full space-y-2">
              <h5 className="font-semibold text-gray-400 m-0">Transmission Specifications</h5>
              <p><strong>Drive: </strong>{trim?.drive}</p>
              <p><strong>Transmission Type: </strong>{trim?.transmission}</p>
              {trim?.fuelType === "Electric" ? "" : (
                <p>
                  <strong>No. of Gears: </strong>
                  {trim?.gearBox ? (
                    trim?.gearBox === "CVT" ? "-" : trim?.gearBox.slice(0, -1) + "-speed"
                  ) : "-"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
