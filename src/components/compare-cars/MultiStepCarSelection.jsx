"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from 'next/navigation';
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import EditIcon from '@mui/icons-material/Edit';
import CarSelectionModal from './CarSelectionModal'; // Import your modal component
import { CircularProgress } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const MultiStepCarSelection = ({ carData, mode, cars, setCars }) => {
  const [showModal, setShowModal] = useState(false); // State to handle modal visibility
  const [selectedVariant, setSelectedVariant] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  const router = useRouter();
  const pathname = usePathname();

  const [selectedSlug, setSelectedSlug] = useState([])
  console.log(selectedSlug, cars, 'selectedSlug')

  // Handle variant selection from CarSelectionModal
  const handleVariantSelect = (variantData) => {
    const newVariantMainSlug = variantData.mainSlug; // Assuming mainSlug is the identifier

    if (pathname === '/compare-cars') {
      setSelectedSlug((prevSlugs) => {
        // Create a copy of the current slugs
        const slugArray = [...prevSlugs];

        if (mode === "update") {
          // Find the index of the slug that matches `carData`
          const index = slugArray.findIndex((slug) => slug === carData);
          if (index !== -1) {
            // Update the existing entry
            slugArray[index] = newVariantMainSlug;
          }
        } else if (mode === "add") {
          // Add the new slug to the array
          slugArray.push(newVariantMainSlug);
        }

        return slugArray; // Return the updated array
      });
      // Update cars state
      setCars((prevCars) => {
        const carsArray = [...prevCars];

        if (mode === "update") {
          const index = carsArray.findIndex((car) => car.mainSlug === carData);
          if (index !== -1) {
            // Replace the existing entry with the new variant data
            carsArray[index] = variantData;
          }
        } else if (mode === "add") {
          // Add the new variant data to the array
          carsArray.push(variantData);
        }

        return carsArray; // Return the updated array
      });
    } else {

      const currentPath = pathname;

      let basePath, comparisonSlugs;

      if (currentPath.includes("/compare-cars/") && currentPath.split("/compare-cars/")[1]) {
        [basePath, comparisonSlugs] = currentPath.split("/compare-cars/");
        basePath += "/compare-cars";
      } else {
        basePath = "/compare-cars";
        comparisonSlugs = "";
      }

      let slugArray = comparisonSlugs.split("-vs-").filter(Boolean);

      if (slugArray.includes(newVariantMainSlug)) {
        alert("This car variant is already in the comparison list.");
        return;
      }

      if (mode === "update") {
        const index = slugArray.findIndex((slug) => slug === carData);
        if (index !== -1) {
          slugArray[index] = newVariantMainSlug;
        }
      } else if (mode === "add") {
        slugArray.push(newVariantMainSlug);
      }

      const updatedPath = `${basePath}/${slugArray.join("-vs-")}`;
      router.push(updatedPath);
    }

    setSelectedYear(variantData.year);
    setSelectedBrand(variantData.brand);
    setSelectedModel(variantData.model);
    setSelectedVariant(variantData.name); // Use variant's name
    setShowModal(false); // Close modal after selection
  };

  return (
    <>
      {mode === "add" ? (
        <>
          <div onClick={() => setShowModal(true)} className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center cursor-pointer border-dashed h-28 w-28 border-2 border-blue-600 rounded-lg mb-3">
              <AddIcon className="text-blue-600 !text-4xl" />
            </div>
            <h5 className="text-gray-500">Select Car</h5>
          </div>
        </>
        // selectedVariant ? (
        //   <div className="flex justify-center items-center mt-4">
        //     <CircularProgress /> {/* Material UI loading spinner */}
        //   </div>
        // ) : (
        //   <>
        //     <div onClick={() => setShowModal(true)} className="flex items-center justify-center flex-col">
        //       <div className="flex items-center justify-center cursor-pointer border-dashed h-28 w-28 border-2 border-blue-600 rounded-lg mb-3">
        //         <AddIcon className="text-blue-600 !text-4xl" />
        //       </div>
        //       <h5 className="text-gray-500">Select Car</h5>
        //     </div>
        //   </>
        // )
      ) : (
        <div className="absolute top-3 left-3">
          <button
            className="bg-white font-semibold flex items-center"
            onClick={() => setShowModal(true)}
          >
            <EditIcon className="text-sm mr-2" /> Change Car
          </button>
        </div>
      )}


      {/* CarSelectionModal Integration */}
      <CarSelectionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onVariantSelect={handleVariantSelect}
      />

    </>
  );
};

export default MultiStepCarSelection;
