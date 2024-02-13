import { ModelContext } from "@/components/model-detail-page/ModelContext";
import Link from "next/link";
import React, { useState } from "react";
import { useContext } from "react";
import Price from "../Price";
import TrimsPopup from "../TrimsPopup";
import { toast } from "react-toastify";

export default function MobileVariantsListing({ model }) {
  const availableTrim = model?.trims;
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  

  

  
  return (
    <div className="my-3">
      <div className="white_bg_wrapper">
        <h4 className="fw-bold">
          <span>
            {model?.mainTrim?.year} {model?.brand?.name} {model?.name}
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
        <div class="container">
        {availableTrim?.map((item, index) => (
  <div class="row">
      <table class="table align-middle">
        <tbody>
            <tr>
              <th className="col-3">Variant</th>
              <td className="col-9">
                <p>
                  <span>
                    {item.year} {model?.brand?.name} {model?.name}
                  </span>
                  <span> {item.name}</span>
                </p>
                <small class="text-grey">
                  <span>{item.transmission}</span>,
                  <span> {item.seatingCapacity}</span>,
                  <span> {item.engine}</span>,
                  <span> {item.torque} Nm</span>
                </small>
              </td>
            </tr>
        </tbody>
      </table>
      <table class="table align-middle">
        <tbody>
            <tr>
              <th className="col-3">Price</th>
              <td className="col-9">
                <p>
                  {item.price === null ? (
                    <Price data={item.price} />
                  ) : (
                    <>
                      {" "}
                      AED <Price data={item.price} />
                    </>
                  )}
                </p>
              </td>
            </tr>
       
        </tbody>
      </table>
      <table class="table align-middle">
        <tbody>
         
            <tr>
              <th className="col-3"></th>

              <td>
                <Link
                  href={`/brands/${model?.brand?.slug}/${item?.year}/${model?.slug}/${item?.slug}`}
                >
                  <div class="btn btn-outline-primary ">
                    View Variant
                  </div>
                </Link>
              </td>
              <td colspan="2" class="text-center">
                <button
                  class="btn btn-outline-primary"
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
                  {selectedVariants.includes(item) ? "Added" : "Add to compare"}
                </button>
              </td>
            </tr>
        
        </tbody>
      </table>
  </div>
  ))}
</div>

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
