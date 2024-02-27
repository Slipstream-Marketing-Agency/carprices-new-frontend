import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Link from "next/link";
import LoadingAnimation from "../common/LoadingAnimation";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

const MultiStepCarSelection = ({ carData, mode }) => {
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

  console.log(selectedYear, "selectedBrand");
  const [isMobile, setIsMobile] = useState(false);


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

          console.log(variants, "uuuuuuuuuuu");
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
    setSearchTerm('')
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    setCurrentStep("year");
    setSearchTerm('')

  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setCurrentStep("variant");
    setSearchTerm('')

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
    console.log("selected slug ",newVariantMainSlug);
    console.log("Updated path : ",updatedPath);
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

  console.log(carData, "sssssssssss");
  return (
    <>

      {mode === "add" ? (
        <div
          className="col-lg-12 cursor_pointer"
          onClick={() => setShowModal(true)}
        >

          <div className="product-upload-area text-center " >
            <div className={`upload-area ${!isMobile && isSticky && 'setStyleForAdd'}`} >
              <i className={`bi bi-plus ${!isMobile && isSticky && 'plusIcon'}`} />
            </div>
            <div className="comparea-content">
              <h6>Add to Compare</h6>
              <p>
                {/* <Link legacyBehavior href="/single-brand-category">
                  <a>24,342</a>
                </Link>{" "} */}
                {/* Available Compare Cars */}
              </p>
            </div>
          </div>
        </div>
      ) : (
       <div className="w-100 d-flex ">
          <button className="btn mb-0 mb-md-0 btn-round btn-outline btn-block changeCarBtn" onClick={() => setShowModal(true)}>
            <>Change Car <i class="bi bi-pencil"></i> </>
          </button>
       </div>
      )}

      {/* Bootstrap Modal */}
      <div
        className={`modal compareModalMainContainer  ${showModal ? "show modal-overlay " : ""}`}
        style={{ display: showModal ? "block " : "none " }}
        tabIndex="-1"
      >
        <div className={`modal-dialog modal-dialog-centered modal-lg compareModalWidth  ${showModal ? 'showCompareModal' : 'hideCompareModal'}`}  >
          <div className="modal-content compareModelContainer">
            <div className="modal-header border-0 mx-md-4  mt-3 mb-0">
              <h5 className="modal-title fw-bold"> Select Your Car For Compare</h5>
              <button
                type="button"
                className="btn-close compareModalCloseBtn cursor-pointer"
                onClick={handleCloseModal}
              ></button>
            </div>
            <div className="mx-md-5 mx-3">
              <input
                type="search"
                className="modalSearchInputField mt-0 mb-3 "
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="sticky-tab mx-md-5 mx-2 ">
              <ul className="nav nav-tabs modalNavTab">
                <li className="nav-item compareModelNav">
                  <a
                    className={`nav-link compareModelNavLink ${
                      currentStep === "brand" ? "active compareModelNavLinkActive" : ""
                    }`}
                    href="#brand"
                    onClick={() => {setCurrentStep("brand") ; setSearchTerm('')}}
                  >
                    Brand
                  </a>
                </li>
                <li className="nav-item compareModelNav">
                  <a
                    className={`nav-link compareModelNavLink ${
                      currentStep === "model" ? "active compareModelNavLinkActive" : ""
                    } ${!selectedBrand ? "disabled" : ""}`}
                    href="#model"
                    onClick={() => {selectedBrand && setCurrentStep("model"),setSearchTerm('')}}
                  >
                    Model
                  </a>
                </li>
                <li className="nav-item compareModelNav">
                  <a
                    className={`nav-link compareModelNavLink ${
                      currentStep === "year" ? "active compareModelNavLinkActive" : ""
                    } ${!selectedModel ? "disabled" : ""}`}
                    href="#year"
                    onClick={() => {selectedModel && setCurrentStep("year") ,setSearchTerm('')}}
                  >
                    Year
                  </a>
                </li>
                <li className="nav-item compareModelNav">
                  <a
                    className={`nav-link compareModelNavLink ${
                      currentStep === "variant" ? "active compareModelNavLinkActive" : ""
                    } ${!selectedYear ? "disabled" : ""}`}
                    href="#variant"
                    onClick={() => {selectedYear && setCurrentStep("variant"),setSearchTerm('') }}
                  >
                    Variant
                  </a>
                </li>
              </ul>
            </div>
           

            <div
              className="modal-body mt-3 mx-md-4 mx-0 mb-4" 
              style={{ maxHeight: "400px", overflowY: "auto" }}
            >
              {currentStep === "brand" && (
                <>
           {<div className="list-group">
                    {filterBrands().map((brand) => (
                      <button
                        key={brand.id}
                        className="list-group-item list-group-item-action border-0  modalCompareTxt"
                        onClick={() => handleBrandSelect(brand.attributes.slug)}
                      >
                        {brand.attributes.name}
                      </button>
                    ))}
                  </div>}
                  {
                    filterBrands().length==0 && <LoadingAnimation/>
                  }
                </>
              )}
              {currentStep === "model" && selectedBrand && (
             <>
                  <div className="list-group">
                    {/* Check if models is an array before calling map */}
                    {filterModels().map((model) => (
                      <button
                        key={model.slug}
                        className="list-group-item list-group-item-action border-0 modalCompareTxt" 
                        onClick={() => {
                          setSelectedModel(model.slug);
                          setCurrentStep("year");
                        }}
                      >
                        {model.name} 
                      </button>
                    ))}
                  </div>
                  {
                    filterModels().length<=0 && <LoadingAnimation/>
                  }
             </>
              )}
              {currentStep === "year" && selectedModel && (
                <>
                  <div className="list-group">
                    {filterYears().map((year) => (
                      <button
                        key={year}
                        className="list-group-item list-group-item-action border-0 modalCompareTxt"
                        onClick={() => handleYearSelect(year)}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                  {
                    filterYears().length<=0 && <LoadingAnimation/>
                  }
                </>
              )}
              {currentStep === "variant" && selectedYear && (
                <>
                  <div className="list-group">
                    {filterVariants().map((variant) => (
                      <button
                        key={variant.mainSlug}
                        className="list-group-item list-group-item-action border-0 modalCompareTxt"
                        onClick={() => handleVariantSelect(variant.mainSlug)}
                      >
                        {variant.name}
                      </button>
                    ))}
                  </div>
                  {
                    filterVariants().length<=0 && <LoadingAnimation/>
                  }
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MultiStepCarSelection;
