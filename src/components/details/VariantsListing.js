import Link from "next/link";
import React, { useState } from "react";
import _ from "lodash";
// import TrimsPopup from "../TrimsPopup"; // Uncomment or adjust according to your project structure
import { toast } from "react-toastify";
import { useRouter } from "next/dist/client/router";
import Price from "@/src/utils/Price"; // Adjust the path based on your project structure
import useTranslate from "@/src/utils/useTranslate"; // Adjust the path based on your project structure
import FeaturedImage from "../common/FeaturedImage"; // Adjust the path based on your project structure

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
                <tr key={index}>
                  <td data-label="Image" className="col-2 py-4 w-10">
                    <div className="listed_image">
                      <FeaturedImage
                        width={100}
                        height={100}
                        src={
                          item.attributes?.featuredImage?.data?.attributes?.url
                        }
                      />
                    </div>
                  </td>
                  <td data-label="Variant" className="col-4 py-4">
                    <Link
                      href={`/brands/${item.attributes?.car_brands?.data[0]?.attributes?.slug}/${item.attributes?.year}/${item.attributes?.car_models?.data[0]?.attributes?.slug}/${item.attributes?.slug}`}
                    >
                      <span>
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
                      </span>
                    </Link>
                  </td>
                  <td data-label="Price" className="col-3">
                    <Price data={item.attributes?.price} />
                  </td>
                  <td data-label="Action" className="col-3">
                    <Link
                      href={`/brands/${item.attributes?.car_brands?.data[0]?.attributes?.slug}/${item.attributes?.year}/${item.attributes?.car_models?.data[0]?.attributes?.slug}/${item.attributes?.slug}`}
                    >
                      <span className="btn btn-outline-primary w-75">
                        {t.view} {t.variant}
                      </span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
