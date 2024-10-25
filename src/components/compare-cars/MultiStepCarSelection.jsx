"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from 'next/navigation';
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import EditIcon from '@mui/icons-material/Edit';
import CarSelectionModal from './CarSelectionModal'; // Import your modal component

const MultiStepCarSelection = ({ carData, mode }) => {
  const [showModal, setShowModal] = useState(false); // State to handle modal visibility
  const [selectedVariant, setSelectedVariant] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  const router = useRouter();
  const pathname = usePathname();

  // Handle variant selection from CarSelectionModal
  const handleVariantSelect = (variantData) => {
    const newVariantMainSlug = variantData.mainSlug; // Assuming mainSlug is the identifier
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

    setSelectedYear(variantData.year);
    setSelectedBrand(variantData.brand);
    setSelectedModel(variantData.model);
    setSelectedVariant(variantData.name); // Use variant's name
    setShowModal(false); // Close modal after selection
  };

  return (
    <>
      {mode === "add" ? (
        <div onClick={() => setShowModal(true)}>
          <div className="text-center cursor-pointer">
            <ControlPointIcon className="text-[120px] text-gray-300" />
            <h5 className="text-gray-500">Add to Compare</h5>
          </div>
        </div>
      ) : (
        <div className="absolute top-3 left-3">
          <button
            className="bg-white font-semibold flex items-center"
            onClick={() => setShowModal(true)}
          >
            <EditIcon className="text-sm mr-2" /> Change Car{" "}
          </button>
        </div>
      )}

      {/* CarSelectionModal Integration */}
      <CarSelectionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onVariantSelect={handleVariantSelect}
      />

      {/* Display selected car details */}
      {selectedVariant && (
        <div className="mt-4">
          <h2 className="text-xl">Selected Car Variant: {selectedVariant}</h2>
          <p>Year: {selectedYear}</p>
          <p>Brand: {selectedBrand}</p>
          <p>Model: {selectedModel}</p>
        </div>
      )}
    </>
  );
};

export default MultiStepCarSelection;
