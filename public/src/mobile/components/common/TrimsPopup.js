import React from "react";
import FeaturedImage from "./FeaturedImage";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Price from "./Price";

export default function TrimsPopup({
  modelName,
  brandName,
  variants,
  isOpen,
  setIsOpen,
  addMoreCar,
  setVariants,
  item,
}) {
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const router = useRouter();

  

  return (
    // isOpen &&
    // variants.length !== 0 && (
    <div
      className={`modal_variant${
        isOpen && variants.length !== 0 ? " open" : ""
      }`}
    >
      <div className="modal-content">
        <div className="container position-relative">
          <h2>Selected Variants</h2>
          <div
            className="onclose_button pointer"
            onClick={() => setIsOpen(false)}
          >
            <i className="bi bi-x-circle-fill"></i>
          </div>
          <div className="">
            <div className="row">
              {variants.map((variant, index) => (
                <>
                  <div
                    className="col-md-2 col-sm-4 col-4 h-100 position-relative"
           
                  >
                    <div className="card position-relative p-2">
                      <div key={index} className="pt-2">
                        <FeaturedImage width={100} height={100} src={variant?.featuredImage} />
                        <h6 className="fw-bold">
                          {variant?.year} {brandName} {modelName}{" "}
                          {variant?.name}
                        </h6>
                        <small className="fw-bold text-danger">
                          AED <Price data={variant?.price} />
                        </small>
                      </div>
                      {/* <div className="filter_versus">vs</div> */}
                    </div>
                    <div
                      className="item_close"
                      onClick={() =>
                        setVariants(variants.filter((v) => v !== variant))
                      }
                    >
                      <i className="bi bi-x-circle" />
                    </div>
                  </div>
                </>
              ))}

              {/* <div className="col-3 " style={{ width: "20%" }}>
                <div
                  className="card position-relative p-2 h-100"
                  onClick={() => {
                    if (!variants.includes(item)) {
                      // check if item is not already in variants
                      setVariants([...variants, item]); // add item to variants
                    }
                    setIsOpen(true);
                  }}
                >
                  <div className="d-flex justify-content-center align-items-center add_more_cars">
                    <i className="bi bi-plus-square-fill" />
                  </div>
                </div>
              </div> */}

              <div className="col-2 align-items-center">
                <div
                  className="btn btn-outline-primary compare_button"
                  onClick={() => {
                    if (variants.length < 2) {
                      toast.info("Add more than one trim");
                    } else {
                      router.push(
                        `/compare-cars/${
                          variants[0]?.mainSlug &&
                          variants[0]?.mainSlug + "-vs-"
                        }${
                          variants[1]?.mainSlug &&
                          variants[1]?.mainSlug + "-vs-"
                        }${
                          variants[2]?.mainSlug &&
                          variants[2]?.mainSlug + "-vs-"
                        }${variants[3]?.mainSlug && variants[3]?.mainSlug}`
                      );
                    }
                  }}
                >
                  Compare Now
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`modal ${isOpen ? "open" : ""}`}>
        <div className="modal-content">
          <p>This is the modal content</p>
          {/* <button onClick={toggleModal}>Close Modal</button> */}
        </div>
      </div>
    </div>
  );
  //   );
}
