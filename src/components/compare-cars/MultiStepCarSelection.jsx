import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Link from "next/link";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

const MultiStepCarSelection = ({ carData, mode }) => {
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
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    setCurrentStep("year");
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setCurrentStep("variant");
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

  console.log(carData, "sssssssssss");
  return (
    <>
      {mode === "add" ? (
        <div
          className="col-lg-12 cursor_pointer"
          onClick={() => setShowModal(true)}
        >
          <div className="product-upload-area text-center">
            <div className="upload-area">
              <i className="bi bi-plus" />
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
        <button className="btn mb-0 mb-md-0 btn-round btn-outline btn-block" onClick={() => setShowModal(true)}>
          <>Change Car <i class="bi bi-pencil"></i> </>
        </button>
      )}

      {/* Bootstrap Modal */}
      <div
        className={`modal fade ${showModal ? "show modal-overlay" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Select Your Car For Compare</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleCloseModal}
              ></button>
            </div>
            <div className="sticky-tab mx-3 mt-4">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      currentStep === "brand" ? "active" : ""
                    }`}
                    href="#brand"
                    onClick={() => setCurrentStep("brand")}
                  >
                    Brand
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      currentStep === "model" ? "active" : ""
                    } ${!selectedBrand ? "disabled" : ""}`}
                    href="#model"
                    onClick={() => selectedBrand && setCurrentStep("model")}
                  >
                    Model
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      currentStep === "year" ? "active" : ""
                    } ${!selectedModel ? "disabled" : ""}`}
                    href="#year"
                    onClick={() => selectedModel && setCurrentStep("year")}
                  >
                    Year
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      currentStep === "variant" ? "active" : ""
                    } ${!selectedYear ? "disabled" : ""}`}
                    href="#variant"
                    onClick={() => selectedYear && setCurrentStep("variant")}
                  >
                    Variant
                  </a>
                </li>
              </ul>
            </div>
            <div className="mx-3">
              <input
                type="search"
                className="form-control my-3 "
                placeholder="Search..."
                onChange={handleSearchChange}
              />
            </div>

            <div
              className="modal-body"
              style={{ maxHeight: "400px", overflowY: "auto" }}
            >
              {currentStep === "brand" && (
                <>
                  <div className="list-group">
                    {filterBrands().map((brand) => (
                      <button
                        key={brand.id}
                        className="list-group-item list-group-item-action"
                        onClick={() => handleBrandSelect(brand.attributes.slug)}
                      >
                        {brand.attributes.name}
                      </button>
                    ))}
                  </div>
                </>
              )}
              {currentStep === "model" && selectedBrand && (
                <div className="list-group">
                  {/* Check if models is an array before calling map */}
                  {filterModels().map((model) => (
                    <button
                      key={model.slug}
                      className="list-group-item list-group-item-action"
                      onClick={() => {
                        setSelectedModel(model.slug);
                        setCurrentStep("year");
                      }}
                    >
                      {model.name} ({model.year})
                    </button>
                  ))}
                </div>
              )}
              {currentStep === "year" && selectedModel && (
                <div className="list-group">
                  {filterYears().map((year) => (
                    <button
                      key={year}
                      className="list-group-item list-group-item-action"
                      onClick={() => handleYearSelect(year)}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              )}
              {currentStep === "variant" && selectedYear && (
                <div className="list-group">
                  {filterVariants().map((variant) => (
                    <button
                      key={variant.mainSlug}
                      className="list-group-item list-group-item-action"
                      onClick={() => handleVariantSelect(variant.mainSlug)}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MultiStepCarSelection;
