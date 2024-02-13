import React, { useEffect, useState } from "react";
import Ad300x250 from "../ads/Ad300x250";
import ModelDescription from "./ModelDescription";
import Select from "react-select";
import { ModelContext } from "./ModelContext";
import { useContext } from "react";
import FeaturedImage from "../common/FeaturedImage";
import Price from "../common/Price";
import Slider from "react-slick";
import { useRef } from "react";

export default function ModelOverview({ model }) {
  const Options = {
    year: [
      { value: "2023", label: "2023" },
      { value: "2022", label: "2022" },
      { value: "2021", label: "2021" },
      { value: "2020", label: "2020" },
    ],
  };

  const availableTrim = model?.trims;

  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  

  // Calculate min and max prices whenever prices state changes
  useEffect(() => {
    let newMinPrice = null;
    let newMaxPrice = null;

    if (availableTrim.length > 0) {
      newMinPrice = availableTrim[0].price;
      newMaxPrice = availableTrim[0].price;

      for (let i = 1; i < availableTrim.length; i++) {
        const price = availableTrim[i].price;
        if (price < newMinPrice) {
          newMinPrice = price;
        }
        if (price > newMaxPrice) {
          newMaxPrice = price;
        }
        if (price === "TBD") {
          newMinPrice = "TBD";
        }
      }
    }

    setMinPrice(newMinPrice);
    setMaxPrice(newMaxPrice);
  }, [availableTrim]);

  

  const [currentImage, setCurrentImage] = useState("");
  const selectedImageRef = useRef(null);

  useEffect(()=>{
    setCurrentImage(model?.mainTrim?.images[0]?.image)
  },[model])

  const handleArrowClick = (direction) => {
    const currentIndex = model?.mainTrim?.images.findIndex(
      (item) => item.image === currentImage
    );

    if (direction === "left") {
      const newIndex =
        currentIndex > 0
          ? currentIndex - 1
          : model?.mainTrim?.images.length - 1;
      setCurrentImage(model?.mainTrim?.images[newIndex].image);
    } else if (direction === "right") {
      const newIndex =
        currentIndex < model?.mainTrim?.images.length - 1
          ? currentIndex + 1
          : 0;
      setCurrentImage(model?.mainTrim?.images[newIndex].image);
    }
  };

  const handleImageClick = (image) => {
    setCurrentImage(image);
  };

  
  function handleScrollClick() {
    selectedImageRef.current.scrollIntoView({
      behavior: "smooth",
    });
  }
  const engineText = model?.engines
    .map((engine) => {
      const engineParts = engine.split(" ");
      const size = engineParts[0];
      const type = engineParts[1];

      return `${size}`;
    })
    .reduce((acc, cur, idx, arr) => {
      
      if (arr.length === 1) {
        return cur;
      } else if (idx === arr.length - 1) {
        return `${acc} or ${cur}`;
      } else {
        return `${acc && acc + ","} ${cur}`;
      }
    }, "");

  function TransmissionList(props) {
    const transmissions = Array.from(
      new Set(props.map((transmission) => transmission?.gearBox))
    )
      .filter((transmission) => transmission !== undefined)
      .map((transmission) => {
        let type;
        let speed;

        if (transmission?.includes("A")) {
          type = "Automatic";
          speed = `${type}`;
        } else if (transmission?.includes("M")) {
          type = "Manual";
          speed = `${type}`;
        } else {
          type = "CVT";
          speed = `${type}`;
        }

        return `${speed}`;
      });

    if (transmissions.length === 1) {
      return <>{transmissions[0]}</>;
    } else if (transmissions.length === 2) {
      if (transmissions[0] === transmissions[1]) {
        return <>{transmissions[0]}</>;
      } else {
        return (
          <>
            {transmissions[0]} or {transmissions[1]}
          </>
        );
      }
    } else {
      const last = transmissions.pop();
      const joined = transmissions.join(", ");
      const hasDuplicates = transmissions.includes(last);

      if (hasDuplicates) {
        return <p>{joined}</p>;
      } else {
        return (
          <p>
            {joined} or {last}
          </p>
        );
      }
    }
  }

  const fuelType = availableTrim
    ?.map((item) => item.fuelType)
    .filter((value, index, self) => self.indexOf(value) === index) // add this line to filter duplicates
    .reduce((acc, cur, idx, arr) => {
      
      if (arr.length === 1) {
        return cur;
      } else if (idx === arr.length - 1) {
        return `${acc} or ${cur}`;
      } else {
        return `${acc && acc + ","} ${cur}`;
      }
    }, "");

  const motorTypes = availableTrim
    ?.map((item) => item.motor)
    .filter((value, index, self) => self.indexOf(value) === index) // add this line to filter duplicates
    .reduce((acc, cur, idx, arr) => {
      
      if (arr.length === 1) {
        return cur;
      } else if (idx === arr.length - 1) {
        return `${acc} or ${cur}`;
      } else {
        return `${acc && acc + ","} ${cur}`;
      }
    }, "");

  
  return (
    <section>
      <div className="trim_overview">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="row">
                <div className="col-12">
                  <div className="row">
                    <div className="col-2">
                      <div className="gallery_image_wrapper">
                        <div className="d-flex flex-column justify-content-center align-items-start position-relative">
                          {/* <Slider > */}
                          {model?.mainTrim?.images.map((item, index) => (
                            <div key={item.id}>
                              {

                              <div
                                className={`gallery_image_item ${currentImage === item.image ? "active" : ""
                                  }`}
                              >
                                <img
                                  src={
                                    process.env.NEXT_PUBLIC_S3_URL + item.image
                                  }
                                  alt={item.alt}
                                  onClick={() => handleImageClick(item.image)}
                                // ref={currentImage === item.image ? selectedImageRef : null}
                                />
                              </div>
                            </div>
                          ))}
                          {/* </Slider> */}
                        </div>
                      </div>
                    </div>
                    <div className="col-10 selected_image position-relative d-flex justify-content-center align-items-center">
                      <div
                        className="arrow_left"
                        onClick={() => handleArrowClick("left")}
                      >
                        <i className="bi bi-caret-left-fill" />
                      </div>
                      <div>
                        <FeaturedImage width={100} height={100}
                          src={currentImage !== "" ? currentImage : model?.mainTrim?.images[0]?.image}
                          alt={currentImage !== "" ? currentImage?.alt : model?.mainTrim?.name}
                          title={currentImage !== "" ? currentImage?.alt : model?.mainTrim?.name}
                        />
                      </div>

                      <div
                        className="arrow_right"
                        onClick={() => handleArrowClick("right")}
                      >
                        <i className="bi bi-caret-right-fill" />
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="col-12 mt-3">
                  <div className="d-flex justify-content-center align-items-center">
                    <a href="" className="custom_icons white_bg_wrapper me-2">
                      <i className="bi bi-car-front-fill" />
                      <small> All Variants</small>
                    </a>
                    <a
                      href="#user_review"
                      className="custom_icons white_bg_wrapper"
                    >
                      <i className="bi bi-stars" />
                      <small>Reviews</small>
                    </a>
                    <a href="" className="custom_icons white_bg_wrapper">
                      <i className="bi bi-heart" />
                      <small>Wishlist</small>
                    </a>
                    <a href="" className="custom_icons white_bg_wrapper">
                      <i className="bi bi-share" />
                      <small>Share</small>
                    </a>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="col-md-6 ">
              <div className="d-flex align-items-end">
                <h1 className="fw-bold">
                  {model?.mainTrim?.year} {model?.brand?.name} {model?.name}
                </h1>
                {/* <div className="change_car_btn d-inline-flex align-items-center">
                      <p>Change car</p>
                      <i className="bi bi-caret-right-fill" />
                    </div> */}
              </div>
              {/* <div className="startRating">
                <i className="bi bi-star-fill" />
                <i className="bi bi-star-fill" />
                <i className="bi bi-star-half" />
                <i className="bi bi-star" />
                <i className="bi bi-star" />
                <small className="fw-bold ms-2">130 reviews</small>
                <small className="primary_badge_wrapper fw-bold pointer ms-2">
                  Write a review
                </small>
              </div> */}
              <div className="car_price d-flex align-items-end my-1">
                <span className="price text-primary">
                  {minPrice === null ? (
                    "TBD*"
                  ) : minPrice === maxPrice ? (
                    <> AED <Price data={minPrice} /></>

                  ) : (
                    <>
                      AED <Price data={minPrice} /> - AED{" "}
                      <Price data={maxPrice} />
                    </>
                  )}
                </span>
              </div>
              {minPrice === null ? (
                ""
              ) : (
                <p className="overview_emi">
                  <i className="bi bi-bank2" />
                  <span className="ms-2">
                    Monthly EMI starting from{" "}
                    <Price
                      data={Math.round((model?.mainTrim?.price * 1.032) / 60)}
                    />
                  </span>
                </p>
              )}

              {/* <div className="mt-2">
              <Select
            id="long-value-select"
            instanceId="long-value-select"
            defaultValue="2023"
            // value={Options.value}
            options={Options.year}
            // onChange={handleMakeChange}
            placeholder="Select Year"
          />
              </div> */}

              <div className="mt-2 key_spec">
                <p className="fw-bold">Key Specification</p>
                <div className="row px-2">
                  <div className="col-4 mt-1 ps-0">
                    <div className="d-flex d-flex align-items-center justify-content-start">
                      <img
                        className="spec_image"
                        src="/assets/images/specs/EngineType.svg"
                        alt=""
                      />
                      <div className="d-flex flex-column">
                        <small className="fw-bold">{engineText.includes("Electric") ? "Motor Type" : "Engine Type"}</small>
                        <div className="d-flex flex-wrap mt-1">
                          <small>
                            {engineText.includes("Electric")
                              ? motorTypes.split(" ")[0]
                              : engineText.includes("Hybrid")
                                ? engineText
                                : engineText}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-4 mt-1 ps-0">
                    <div className="d-flex d-flex align-items-center justify-content-start">
                      <img
                        className="spec_image p-2"
                        src="/assets/images/specs/Transmission.png"
                        alt=""
                      />
                      <div className="d-flex flex-column">
                        <small className="fw-bold">Transmission</small>
                        <div className="d-flex flex-wrap">
                          <small>{TransmissionList(model?.trims)}</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-4 mt-1 ps-0">
                    <div className="d-flex d-flex align-items-center justify-content-start">
                      <img
                        className="spec_image"
                        src="/assets/images/specs/KM.svg"
                        alt=""
                      />
                      <div className="d-flex flex-column">
                        <small className="fw-bolder">Power (HP)</small>
                        <small>
                          {model?.minPower === model?.maxPower
                            ? model?.minPower
                            : `${model?.minPower} to ${model?.maxPower}`}
                        </small>
                      </div>
                    </div>
                  </div>

                  <div className="col-4 mt-1 ps-0">
                    <div className="d-flex d-flex align-items-center justify-content-start">
                      <img
                        className="spec_image p-2"
                        src="/assets/images/specs/Torque.png"
                        alt=""
                      />
                      <div className="d-flex flex-column">
                        <small className="fw-bolder">Torque (Nm)</small>
                        <small>
                          {model?.minTorque === model?.maxTorque
                            ? model?.minTorque
                            : `${model?.minTorque} to ${model?.maxTorque}`}
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="col-4 mt-1 ps-0">
                    <div className="d-flex d-flex align-items-center justify-content-start">
                      <img
                        className="spec_image p-2"
                        src="/assets/images/specs/Seats.png"
                        alt=""
                      />
                      <div className="d-flex flex-column">
                        <small className="fw-bold">Seats</small>
                        <small>
                          {model?.mainTrim?.seatingCapacity?.replace(
                            "Seater",
                            ""
                          )}
                        </small>
                      </div>
                    </div>
                  </div>

                  <div className="col-4 mt-1 ps-0">
                    <div className="d-flex d-flex align-items-center justify-content-start">
                      <img
                        className="spec_image p-2"
                        src="/assets/images/specs/FuelType.png"
                        alt=""
                      />
                      <div className="d-flex flex-column">
                        <small className="fw-bold">Fuel Type</small>
                        <small>{fuelType}</small>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-4 mt-1 ps-0">
                    <div className="d-flex d-flex align-items-center justify-content-start">
                      <img
                        className="spec_image"
                        src="/assets/images/specs/FWD.svg"
                        alt=""
                      />
                      <div className="d-flex flex-column">
                        <small className="fw-bold">Crossover</small>
                        <small>SUV</small>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>

              <div className="outline_badge_wrapper mt-2 d-inline-flex align-items-center">
                <i className="bi bi-car-front-fill" />
                <p className="fw-bold ps-1">
                  Available Variants: <span>{model?.trims?.length}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
