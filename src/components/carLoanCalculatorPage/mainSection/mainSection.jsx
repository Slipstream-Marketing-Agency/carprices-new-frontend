import { useState, useEffect } from "react";
import Modal from "../modal/Modal";
import LoanDetails from "../loanDetails/LoanDetails";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { carLoanPage } from "@/src/mocks/labels";
import BannerSection from "../bannerSection/bannerSection";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import Image from "next/image";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import LoadingAnimation from "@/src/components-old/common/LoadingAnimation";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

function MainSection() {
  const [carSelected, setCarSelected] = useState(false);
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
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);

  // console.log(variants, "variants");

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
                          price
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

  const handleVariantSelect = (variantdata) => {
    console.log(variantdata, "variantdata");
    // Close modal and reset states
    setShowModal(false);
    setCurrentStep("brand");

    setSelectedVariant(variantdata.name);
    setPrice(variantdata.price);
    // setSelectedBrand("");
    // setSelectedModel("");
    // setSelectedYear("");
    // setSelectedVariant("");
    // setSearchTerm("");
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
        <Image src={iconSrc} alt="brand-icon" height={20} width={20} />
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

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
      setCurrentStep("brand");
      setSelectedBrand("");
      setSelectedModel("");
      setSelectedYear("");
      setSelectedVariant("");
      setSearchTerm("");
      setPrice(null);
    } else {
      document.body.style.overflow = "";
    }
  }, [showModal]);

  return (
    <div className="">
      <h1 className="tw-text-4xl tw-leading-loose tw-text-lightgray ">
        Car Loan Calculator
      </h1>
      {/* <div className="tw-para tw-text-lightgray">{carLoanPage.para1}</div> */}
      {/* {showModal && (
        <Modal
          modal={showModal}
          setShowModal={setShowModal}
          setCarSelected={setCarSelected}
        />
      )} */}

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
                <Link
                  className={` ${
                    currentStep === "brand" && selectedBrand === ""
                      ? "tw-hidden "
                      : "tw-block"
                  }`}
                  href="#brand"
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
                </Link>

                <Link
                  className={` ${
                    selectedModel === "" ? "tw-hidden " : "tw-block"
                  }`}
                  href="#model"
                >
                  <DataBadge
                    iconSrc={null}
                    label={selectedModel}
                    onClick={() => {
                      setCurrentStep("model"), setSearchTerm("");
                    }}
                  />
                </Link>

                <Link
                  className={` ${
                    selectedYear === "" ? "tw-hidden " : "tw-block"
                  }`}
                  href="#year"
                >
                  <DataBadge
                    iconSrc={null}
                    label={selectedYear}
                    onClick={() => {
                      setCurrentStep("year"), setSearchTerm("");
                    }}
                  />
                </Link>

                <Link
                  className={` ${
                    selectedVariant === "" ? "tw-hidden " : "tw-block"
                  }`}
                  href="#variant"
                >
                  <DataBadge
                    iconSrc={null}
                    label={selectedVariant}
                    onClick={() => {
                      setCurrentStep("variant"), setSearchTerm("");
                    }}
                  />
                </Link>
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
                              <Image
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
                            onClick={() => handleVariantSelect(variant)}
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

      {/* bannersection */}
      {variants.length > 0 ? (
        <LoanDetails
          setShowModal={setShowModal}
          selectedBrand={selectedBrand}
          selectedModel={selectedModel}
          selectedYear={selectedYear}
          selectedVariant={selectedVariant}
          price={price}
        />
      ) : (
        <BannerSection
          modal={showModal}
          setShowModal={setShowModal}
          setCarSelected={setCarSelected}
        />
      )}
      {/* section2 */}
      <div>
        <h2 className="tw-mt-8 tw-mb-3 tw-font-medium tw-text-2xl  tw-text-lightgray">
          {carLoanPage.Heading2}
        </h2>
        <div className="tw-grid tw-para tw-gap-2">
          <p className="tw-mt-1">
            When it comes to financing your dream car in the UAE, securing a car
            loan is a common route taken by many residents and expatriates
            alike. Car ownership is a symbol of status and convenience in the
            Emirates, and obtaining the right car loan can make it easily
            attainable. The allure of owning a car in the UAE, with its
            well-maintained roads and world-class infrastructure, is a dream
            shared by many residents and expatriates alike. However, the reality
            is that purchasing a car in the UAE often requires a substantial
            financial commitment, and that's where a car loan can make all the
            difference.
          </p>
          <h2 className="tw-mt-6 tw-font-medium">
            Car Loan EMI and Downpayment
          </h2>
          <h4 className="tw-mt-1 tw-font-medium">
            Interest Rate and Monthly Installment
          </h4>
          <p className="">
            Interest rates play a pivotal role in determining the cost of your
            car loan. Typically, car loan interest rates in the UAE can vary
            depending on the lender and the prevailing market conditions.
            Therefore, it's essential to compare interest rates across different
            financial institutions to secure the most favorable deal. Lower
            interest rates translate to reduced monthly installments, which
            means less financial strain over the loan tenure. By doing your
            research and finding the best interest rate, you can optimize your
            car loan for affordability.
          </p>
          <h4 className=" tw-mt-3 tw-font-medium">
            Loan Installment and Downpayment Variability on Car Finance
          </h4>
          <p className="">
            Car loan providers in the UAE offer various loan tenures and down
            payment options, allowing you to choose the one that aligns with
            your financial goals. Whether you prefer a shorter loan tenure with
            higher EMI instalments or a longer tenure with lower monthly
            payments, the flexibility offered by car loan providers ensures you
            can adapt the loan structure to suit your unique financial
            situation. Moreover, the down payment amount can also vary, giving
            you the freedom to decide how much you can contribute upfront.
          </p>
          <h4 className="tw-mt-3 tw-font-medium">
            Monthly Budgeting with Car Loans
          </h4>
          <p className="">
            A significant advantage of opting for a car loan in the UAE is the
            ability to plan your monthly budget effectively. With a fixed EMI
            amount, you can confidently allocate your resources and manage your
            finances without unexpected surprises. This predictability allows
            you to strike a balance between fulfilling your car ownership dreams
            and maintaining.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MainSection;
