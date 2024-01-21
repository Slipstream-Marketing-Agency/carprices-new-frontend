import Link from "next/link";
import React, { useState } from "react";
import _ from "lodash";
// import TrimsPopup from "../TrimsPopup";
import { toast } from "react-toastify";
import { useRouter } from "next/dist/client/router";
import Price from "@/src/utils/Price";
import useTranslate from "@/src/utils/useTranslate";
import FeaturedImage from "../common/FeaturedImage";

export default function VariantsListing({ model, highTrim }) {
  const availableTrim = _.orderBy(
    model,
    [
      (trim) => {
        return trim.attributes.price === 0 ? Infinity : trim.attributes.price;
      },
    ],
    ["asc"]
  );
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const t = useTranslate();
  const isRtl = router.locale === "ar";

  console.log(availableTrim, "availableTrim");

  return (
    <div className="my-3" id="variant_listing">
      <div className="white_bg_wrapper">
        <h4 className="fw-bold">
          <span>
            {highTrim?.year} {highTrim?.car_brands?.data[0]?.attributes?.name}{" "}
            {highTrim?.car_models?.data[0]?.attributes?.name}
          </span>{" "}
          {t.variants} {t.and} <span>{t.priceList}</span>
        </h4>
        <div className="car_description mt-3"></div>
        <div className="table-responsive table-bordered mt-3">
          <table className="table align-middle">
            <thead>
              <tr>
                <th scope="col" />
                <th scope="col">{t.variants}</th>
                <th scope="col">{t.price}</th>
                <th scope="col">{t.variant}</th>
                {/* <th scope="col text-end">{t.compare}</th> */}
              </tr>
            </thead>
            <tbody>
              {availableTrim?.map((item, index) => (
                <>
                  <tr>
                    <td className="col-2 py-4 w-10">
                      <div className="listed_image">
                        <FeaturedImage
                          width={100}
                          height={100}
                          src={
                            item.attributes?.featuredImage?.data?.attributes
                              ?.url
                          }
                        />
                      </div>
                    </td>
                    <td className="col-4 py-4">
                      <Link
                        href={`/brands/${item.attributes?.car_brands?.data[0]?.attributes?.slug}/${item.attributes?.year}/${item.attributes?.car_models?.data[0]?.attributes?.slug}/${item.attributes?.slug}`}
                      >
                        <p>
                          <span>
                            {item.attributes?.year}{" "}
                            {
                              item.attributes?.car_brands?.data[0]?.attributes
                                ?.name
                            }{" "}
                            {
                              item.attributes?.car_models?.data[0]?.attributes
                                ?.name
                            }{" "}
                            {item.attributes?.name}
                          </span>
                        </p>

                        <small className="text-grey">
                          <span>{item.attributes?.transmission}</span>,{" "}
                          <span> {item.attributes?.seatingCapacity}</span>,{" "}
                          {item?.fuelType === "Electric" ? (
                            item.attributes?.motor
                          ) : (
                            <span>
                              {(item.attributes?.displacement / 1000).toFixed(
                                1
                              )}
                              L {item.attributes?.engine}{" "}
                              {item.attributes?.drive}{" "}
                            </span>
                          )}
                          , <span> {item.attributes?.torque}Nm</span>,{" "}
                          <span> {item.attributes?.power}hp</span>
                        </small>
                      </Link>
                    </td>
                    <td className="col-3">
                      <p>
                        {item.attributes?.price === null ? (
                          <>
                            <Price data={item.attributes?.price} />
                          </>
                        ) : (
                          <>
                            {" "}
                            {t.aed} <Price data={item.attributes?.price} />
                          </>
                        )}
                      </p>
                    </td>
                    <td className="col-3">
                      <Link
                        href={`/brands/${item.attributes?.car_brands?.data[0]?.attributes?.slug}/${item.attributes?.year}/${item.attributes?.car_models?.data[0]?.attributes?.slug}/${item.attributes?.slug}`}
                      >
                        <div className="btn btn-outline-primary w-75">
                          {t.view} {t.variant}
                        </div>
                      </Link>
                    </td>
                    {/* <td className="col-1 text-center">
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
                          {selectedVariants.includes(item) ? t.added : t.add}
                        </button>
                      </td> */}
                  </tr>
                </>
              ))}
            </tbody>
          </table>
          {/* {availableTrim?.map((item, index) => (
            <TrimsPopup
              variants={selectedVariants}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              brandName={model?.brand?.name}
              modelName={model?.name}
              setVariants={setSelectedVariants}
              item={item}
            />
          ))} */}
        </div>
      </div>
    </div>
  );
}
