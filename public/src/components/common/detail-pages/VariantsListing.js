import { ModelContext } from "@/components/model-detail-page/ModelContext";
import Link from "next/link";
import React, { useState } from "react";
import _ from "lodash";
import { useContext } from "react";
import Price from "../Price";
import TrimsPopup from "../TrimsPopup";
import { toast } from "react-toastify";
import FeaturedImage from "../FeaturedImage";

export default function VariantsListing({ model }) {
  const availableTrim = _.sortBy(model?.trims, 'price');
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  

  return (
    <div className="my-3" id="variant_listing">
      <div className="white_bg_wrapper">
        <h4 className="fw-bold">
          <span>
            {model?.mainTrim?.year} {model?.brand?.name} {model?.name}
          </span>{" "}
          Variants and <span>Price List </span>
        </h4>
        <div className="car_description mt-3">
        </div>
        <div className="table-responsive table-bordered mt-3">
          <table className="table align-middle ">
            <thead>
              <tr>
                <th scope="col" />
                <th scope="col">Variants</th>
                <th scope="col">Price</th>
                <th scope="col" >Variant</th>
                <th scope="col text-end">Compare</th>
              </tr>
            </thead>
            <tbody>
              {availableTrim
                ?.map((item, index) => (
                  <>
                    <tr>
                      <td className="col-2 py-4 w-10">
                        <div className="listed_image">
                          <FeaturedImage width={50} height={50} src={item.featuredImage} />
                        </div>
                      </td>
                      <td className="col-4 py-4">
                        <Link href={`/brands/${model?.brand?.slug}/${item?.year}/${model?.slug}/${item?.slug}`}>

                          <p>
                            <span>
                              {item.year} {model?.brand?.name} {model?.name}
                            </span>
                            <span> {item.name}</span>
                          </p>

                          <small className="text-grey">
                            <span>{item.transmission}</span>,{" "}
                            <span> {item.seatingCapacity}</span>,{" "}
                            {item?.fuelType === "Electric" ? item.motor : <span>{((item.displacement / 1000).toFixed(1))}L {item.engine} {item.drive} </span>},{" "}
                            <span> {item.torque}Nm</span>,{" "}
                            <span> {item.power}hp</span>
                          </small>
                        </Link>
                      </td>
                      <td className="col-3">
                        <p>
                          {item.price === null ? (
                            <>
                              <Price data={item.price} />
                            </>
                          ) : (
                            <>
                              {" "}
                              AED <Price data={item.price} />
                            </>
                          )}
                        </p>
                      </td>
                      <td className="col-2">
                        <Link
                          href={`/brands/${model?.brand?.slug}/${item?.year}/${model?.slug}/${item?.slug}`}
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
                            if (selectedVariants.length === 4) {
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
