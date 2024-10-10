import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Link from "next/link";
import LoadingAnimation from "../common/LoadingAnimation";
import FilterLayout from "../find-car-multi-step-filter/FilterLayout";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import Image from "next/image";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import OptimizedImage from "@/src/components/common/image/OptimisedImage";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

const MultiStepCarSelection = ({ carData, mode }) => {
  console.log(carData, "carData");

  const [isSticky, setIsSticky] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 600) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState("brand");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [year, setYear] = useState([]);
  const [variants, setVariants] = useState([]);

  const [isMobile, setIsMobile] = useState(false);

  console.log(brands, "popopo");
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the threshold as needed
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (showModal) {
      client
        .query({
          query: gql`
            query carBrands {
              carBrands(sort: "name:asc", pagination: { limit: -1 }) {
                data {
                  id
                  attributes {
                    name
                    slug
                    brandLogo {
                      data {
                        id
                        attributes {
                          url
                        }
                      }
                    }
                  }
                }
              }
            }
          `,
        })
        .then((response) => {
          setBrands(response.data.carBrands.data);
        })
        .catch((error) => {
          console.error("Error fetching brands:", error);
        });
    }
  }, [showModal]);

  useEffect(() => {
    setLoading(true);
    if (selectedBrand) {
      client
        .query({
          query: gql`
            query carModels($brandSlug: String!) {
              carBrands(filters: { slug: { eq: $brandSlug } }) {
                data {
                  attributes {
                    car_models(sort: "name:asc", pagination: { limit: -1 }) {
                      data {
                        attributes {
                          name
                          slug
                          year
                        }
                      }
                    }
                  }
                }
              }
            }
          `,
          variables: { brandSlug: selectedBrand },
        })
        .then((response) => {
          const fetchedModels =
            response.data.carBrands.data[0].attributes.car_models.data.map(
              (m) => m.attributes
            );
          setModels(fetchedModels); // Set the models state
          setCurrentStep("model");
        })
        .catch((error) => {
          console.error("Error fetching models:", error);
        });
    }
  }, [selectedBrand, client]);

  useEffect(() => {
    if (selectedModel) {
      client
        .query({
          query: gql`
          query CarModels {
            carModels(filters: { slug: { eq: "${selectedModel}" }}){
              data {
                attributes {
                  car_trims {
                    data {
                      attributes {
                        year
                      }
                    }
                  }
                }
              }
            }
          }
        `,
        })
        .then((response) => {
          const trims =
            response.data.carModels.data[0].attributes.car_trims.data;
          const uniqueYears = Array.from(
            new Set(trims.map((trim) => trim.attributes.year))
          );
          setYear(uniqueYears.sort((a, b) => a - b)); // Set and sort the years
          setCurrentStep("year");
        })
        .catch((error) => {
          console.error("Error fetching model years:", error);
        });
    }
  }, [selectedModel, client]);

  useEffect(() => {
    if (selectedModel && selectedYear) {
      client
        .query({
          query: gql`
          query CarModels {
              carModels(filters: { slug: { eq: "${selectedModel}" }}) {
                data {
                  attributes {
                    car_trims(filters: { year: { eq: ${selectedYear} } }) {
                      data {
                        id
                        attributes {
                          name
                          mainSlug
                        }
                      }
                    }
                  }
                }
              }
            }
          `,
        })
        .then((response) => {
          const variants =
            response.data.carModels.data[0].attributes.car_trims.data.map(
              (trim) => trim.attributes
            );

          setVariants(variants); // Update the state with the fetched variants
          setCurrentStep("variant");
        })
        .catch((error) => {
          console.error("Error fetching car trims:", error);
        });
    }
  }, [selectedYear, client]);

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    setCurrentStep("model");
    setSearchTerm("");
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    setCurrentStep("year");
    setSearchTerm("");
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setCurrentStep("variant");
    setSearchTerm("");
  };

  const handleVariantSelect = (newVariantMainSlug) => {
    const currentPath = router.asPath;
    let basePath, comparisonSlugs;

    if (
      currentPath.includes("/compare-cars/") &&
      currentPath.split("/compare-cars/")[1]
    ) {
      // If we're on a specific comparison page
      [basePath, comparisonSlugs] = currentPath.split("/compare-cars/");
      basePath += "/compare-cars"; // Ensure basePath ends with '/compare-cars'
    } else {
      // If we're on the base comparison page
      basePath = "/compare-cars";
      comparisonSlugs = "";
    }

    let slugArray = comparisonSlugs.split("-vs-").filter(Boolean); // Filter Boolean removes empty strings

    // Check if the new variant is already in the comparison list
    if (slugArray.includes(newVariantMainSlug)) {
      alert("This car variant is already in the comparison list.");
      return;
    }

    // Logic for 'update' and 'add' modes
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

    // Close modal and reset states
    setShowModal(false);
    setCurrentStep("brand");
    setSelectedBrand("");
    setSelectedModel("");
    setSelectedYear("");
    setSelectedVariant("");
    setSearchTerm("");
  };

  const filterBrands = () => {
    if (!searchTerm) return brands;
    return brands.filter((brand) =>
      brand.attributes.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Function to filter models based on the search term
  const filterModels = () => {
    if (!searchTerm) return models;
    return models.filter((model) =>
      model.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Function to filter years based on the search term
  const filterYears = () => {
    if (!searchTerm) return year;
    return year.filter((y) =>
      y.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Function to filter variants based on the search term
  const filterVariants = () => {
    if (!searchTerm) return variants;
    return variants.filter((variant) =>
      variant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredOptions = (options) => {
    return searchTerm
      ? options.filter((option) =>
          option.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : options;
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentStep("brand");
    setSelectedBrand("");
    setSelectedModel("");
    setSelectedYear("");
    setSelectedVariant("");
    setSearchTerm(""); // Also clear the search term if needed
  };

  const toggleSlideover = () => {
    setShowModal(!showModal);
  };

  const DataBadge = ({ iconSrc, label, onClick }) => (
    <div className="tw-flex tw-bg-blue-100 tw-rounded-full tw-py-1 tw-px-3 tw-items-center tw-gap-1">
      {iconSrc && (
        <OptimizedImage src={iconSrc} alt="brand-icon" height={20} width={20} />
      )}
      <div className="tw-capitalize tw-text-black tw-text-xs">{label}</div>
      <Image
        src={"/carLoanPage/edit-icon.svg"}
        width={25}
        height={20}
        className="tw-cursor-pointer"
        alt="edit-icon"
        onClick={onClick}
      />
    </div>
  );

  console.log(selectedModel, "selectedModel");
  return (
    <>
      {mode === "add" ? (
        <div onClick={() => setShowModal(true)}>
          <div className="tw-text-center tw-cursor-pointer">
            <ControlPointIcon className="tw-text-[120px] tw-text-gray-300" />

            <h5 className="tw-text-gray-500">Add to Compare</h5>
          </div>
        </div>
      ) : (
        <div className="tw-absolute tw-top-3 tw-left-3 ">
          <button
            className="tw-bg-white tw-font-semibold"
            onClick={() => setShowModal(true)}
          >
            <i class="bi bi-pencil tw-bg-gray-200 tw-p-2 tw-text-[11px] tw-rounded-md "></i>{" "}
            Change Car{" "}
          </button>
        </div>
      )}

      {/* Bootstrap Modal */}
      <div className="tw-flex tw-items-center tw-justify-center ">
        <div
          id="slideover-container"
          className={`tw-w-full tw-h-full tw-fixed tw-z-[999] tw-inset-0 ${
            showModal ? "tw-visible" : "tw-invisible"
          }`}
        >
          <div
            onClick={toggleSlideover}
            id="slideover-bg"
            className={`tw-w-full tw-h-full tw-duration-500 tw-ease-out tw-transition-all tw-inset-0 tw-absolute tw-bg-gray-900 ${
              showModal ? "tw-opacity-50" : "tw-opacity-0"
            }`}
          />
          <div
            id="slideover"
            className={`tw-w-full md:tw-w-[60%]  tw-rounded-tl-2xl  tw-rounded-bl-2xl tw-bg-white tw-h-full tw-absolute tw-right-0 tw-duration-300 tw-ease-out tw-transition-all ${
              showModal ? "tw-translate-x-0" : "tw-translate-x-full"
            }`}
          >
            <div
              onClick={toggleSlideover}
              className="tw-z-[999] tw-absolute tw-cursor-pointer tw-text-gray-600 tw-top-0 tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center tw-right-0 tw-mt-1 tw-mr-1"
            >
              <svg
                className="tw-w-6 tw-h-6"
                fill="none"
                stroke="white"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div className="tw-col-span-12 sm:tw-rounded-tl-2xl tw-bg-blue-500 tw-w-full tw-p-8 tw-flex tw-justify-between tw-text-3xl tw-text-white tw-bg-stripes">
              <div className=" ">Select Your Brand, Model and Variant</div>
              <div
                onClick={toggleSlideover}
                className="tw-z-[999] tw-absolute tw-cursor-pointer tw-text-gray-600 tw-top-0 tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center tw-right-0 tw-mt-1 tw-mr-1"
              >
                <svg
                  className="tw-w-6 tw-h-6"
                  fill="none"
                  stroke="white"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
            <div className="tw-p-6">
              <h2 className=" tw-my-2 tw-capitalize tw-font-semibold">
                Choose {currentStep}
              </h2>
              <div className="tw-flex gap-3">
                <div
                  className={` ${
                    currentStep === "brand" && selectedBrand === ""
                      ? "tw-hidden "
                      : "tw-block"
                  }`}
                  onClick={() => {
                    setCurrentStep("brand");
                    setSearchTerm("");
                  }}
                >
                  <DataBadge
                    iconSrc={null}
                    label={selectedBrand}
                    onClick={() => {
                      setCurrentStep("brand");
                      setSearchTerm("");
                    }}
                  />
                </div>

                <div
                  className={` ${
                    selectedModel === "" ? "tw-hidden " : "tw-block"
                  }`}
                >
                  <DataBadge
                    iconSrc={null}
                    label={selectedModel}
                    onClick={() => {
                      setCurrentStep("model"), setSearchTerm("");
                    }}
                  />
                </div>

                <div
                  className={` ${
                    selectedYear === "" ? "tw-hidden " : "tw-block"
                  }`}
                >
                  <DataBadge
                    iconSrc={null}
                    label={selectedYear}
                    onClick={() => {
                      setCurrentStep("year"), setSearchTerm("");
                    }}
                  />
                </div>
                

                <div
                  className={` ${
                    selectedVariant === "" ? "tw-hidden " : "tw-block"
                  }`}
                >
                  <DataBadge
                    iconSrc={null}
                    label={selectedVariant}
                    onClick={() => {
                      setCurrentStep("variant"), setSearchTerm("");
                    }}
                  />
                </div>
              </div>
              <div className=" tw-relative tw-rounded-md tw-shadow-sm tw-my-6">
                <div className="tw-absolute tw-inset-y-0 tw-left-0 tw-pl-3 tw-flex tw-items-center tw-pointer-events-none">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  className="tw-focus:ring-blue-500 tw-focus:border-blue-500 tw-block tw-p-2 tw-border tw-rounded-full tw-w-full tw-mb-4 sm:tw-text-sm tw-border-gray-300 tw-px-10"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder={`Search ${currentStep}`}
                />
              </div>
              <div className="">
                <div>
                  {currentStep === "brand" && (
                    <div className="tw-overflow-auto tw-h-[650px]">
                      {
                        <div className=" tw-grid tw-gap-6 tw-grid-cols-12 ">
                          {filterBrands().map((brand) => (
                            <button
                              key={brand.id}
                              className="tw-bg-white sm:tw-col-span-2 tw-col-span-3"
                              onClick={() =>
                                handleBrandSelect(brand.attributes.slug)
                              }
                            >
                              <OptimizedImage
                                src={
                                  brand.attributes.brandLogo.data.attributes.url
                                }
                                alt="icon-brand"
                                width={70}
                                height={70}
                                className="tw-cursor-pointer"
                              />
                              <div className="tw-capitalize tw-text-center tw-my-1 tw-text-xs">
                                {brand.attributes.name}
                              </div>
                            </button>
                          ))}
                        </div>
                      }
                      {filterBrands().length == 0 && <LoadingAnimation />}
                    </div>
                  )}
                  {currentStep === "model" && selectedBrand && (
                    <>
                      <div className="tw-flex tw-flex-col ">
                        {filterModels().map((model) => (
                          <button
                            key={model.slug}
                            className="tw-bg-white hover:tw-bg-blue-200 tw-text-left tw-py-4 tw-px-2"
                            onClick={() => {
                              setSelectedModel(model.slug);
                              setCurrentStep("year");
                            }}
                          >
                            {model.name}
                          </button>
                        ))}
                      </div>
                      {filterModels().length <= 0 && <LoadingAnimation />}
                    </>
                  )}
                  {currentStep === "year" && selectedModel && (
                    <>
                      <div className="tw-flex tw-flex-col ">
                        {filterYears().map((year) => (
                          <button
                            key={year}
                            className="tw-bg-white hover:tw-bg-blue-200 tw-text-left tw-py-4 tw-px-2"
                            onClick={() => handleYearSelect(year)}
                          >
                            {year}
                          </button>
                        ))}
                      </div>
                      {filterYears().length <= 0 && <LoadingAnimation />}
                    </>
                  )}
                  {currentStep === "variant" && selectedYear && (
                    <>
                      <div className="tw-flex tw-flex-col ">
                        {filterVariants().map((variant) => (
                          <button
                            key={variant.mainSlug}
                            className="tw-bg-white hover:tw-bg-blue-200 tw-text-left tw-py-4 tw-px-2"
                            onClick={() =>
                              handleVariantSelect(variant.mainSlug)
                            }
                          >
                            {variant.name}
                          </button>
                        ))}
                      </div>
                      {filterVariants().length <= 0 && <LoadingAnimation />}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MultiStepCarSelection;
