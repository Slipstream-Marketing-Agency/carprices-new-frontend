import { ModelContext } from "@/components/model-detail-page/ModelContext";
import Link from "next/link";
import React, { useState } from "react";
import { useContext } from "react";
import Price from "../common/Price";
import TrimsPopup from "../common/TrimsPopup";
import { toast } from "react-toastify";

export default function VariantsListing({ trim }) {
  const availableTrim = model?.trims?.filter((item) => item.year === 2023);
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  

  
  return (
    <div className="my-3">
      <div className="white_bg_wrapper">
        <h4 className="fw-bold">
          <span>
            {model?.year} {model?.brand?.name} {model?.name}
          </span>{" "}
          Variants and <span>Price List </span>
        </h4>
        <div className="car_description mt-3">
          {/* <p>
            <span>
              The price of Toyota Land Cruiser starts at AED 5.99 and goes upto
              AED 8.98 . Toyota Land Cruiser is offered in 11 variants - the
              base model of Swift is LXI and the top variant Toyota Land Cruiser
              ZXI Plus DT AMT which comes at a price tag of AED 8.98 .
            </span>
          </p> */}
        </div>
        <div className="table-responsive table-bordered mt-3">
          <table className="table align-middle ">
            <thead>
              <tr>
                <th scope="col">Variants</th>
                <th scope="col">Price</th>
                <th scope="col" />
                <th scope="col text-end">Compare</th>
              </tr>
            </thead>
            <tbody>
              {availableTrim?.map((item, index) => (
                <>
                  <tr>
                  <td className="col-2 py-4 w-10">
                      <FeaturedImage width={100} height={100} src={item.featuredImage} />
                    </td>
                    <td className="col-4 py-4">
                      <p>
                        <span>
                          {item.year} {model?.brand?.name} {model?.name}
                        </span>
                        <span> {item.name}</span>
                      </p>
                      <small className="text-grey">
                        <span>{item.transmission}</span>,
                        <span> {item.seatingCapacity}</span>,
                        <span> {item.engine}{item?.displacement}</span>,
                        <span> {item.torque}Nm</span>
                      </small>
                    </td>
                    <td className="col-3">
                      <p>
                        <Price data={item.price} />
                      </p>
                    </td>
                    <td className="col-2">
                      <Link
                        href={`/brands/${model?.brand?.name}/${item?.year}/${model?.slug}/${item?.slug}`}
                      >
                        <div className="btn btn-outline-primary w-75">
                          View Variant
                        </div>
                      </Link>
                    </td>
                    <td className="col-1 text-center">
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => {
                          if ((selectedVariants.length === 4)) {
                            toast.info("Cannot add more than 4");
                          } else {
                            if (selectedVariants.includes(item)) {
                              setSelectedVariants(
                                selectedVariants.filter((v) => v !== item)
                              );
                            } else {
                              setSelectedVariants([...selectedVariants, item]);
                            }
                          }

                          setIsOpen(true);
                        }}
                      >
                        {selectedVariants.includes(item) ? "Added" : "Add"}
                      </button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
          {availableTrim?.map((item, index) => (
            <TrimsPopup
              variants={selectedVariants}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              brandName={model?.brand?.name}
              modelName={model?.name}
              setVariants={setSelectedVariants}
              item={item}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
