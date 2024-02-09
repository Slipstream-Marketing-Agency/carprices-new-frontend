import Link from "next/link";
import React, { useState } from "react";
import _ from "lodash";
// import TrimsPopup from "../TrimsPopup"; // Uncomment or adjust according to your project structure
import { toast } from "react-toastify";
import { useRouter } from "next/dist/client/router";
import Price from "@/src/utils/Price"; // Adjust the path based on your project structure
import useTranslate from "@/src/utils/useTranslate"; // Adjust the path based on your project structure
import FeaturedImage from "../common/FeaturedImage"; // Adjust the path based on your project structure

export default function VariantsListing({
  year,
  brand,
  model,
  minPrice,
  maxPrice,
  minFuelConsumption,
  maxFuelConsumption,
  mainTrimFuelType,
  engineTypes,
  transmissionList,
  motorTypes,
  allTrims,
  mainTrim,
}) {
  const availableTrim = _.orderBy(
    model,
    [
      (trim) => {
        return trim.price === 0 ? Infinity : trim.price;
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
            {year} {brand.name} {model.name}
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
              {allTrims?.map((item, index) => (
                <tr key={index}>
                  <td data-label="Image" className="col-2 py-4 w-10">
                    <div className="listed_image">
                      <FeaturedImage
                        width={100}
                        height={100}
                        src={item.featuredImage}
                      />
                    </div>
                  </td>
                  <td data-label="Variant" className="col-4 py-4">
                    <Link
                      href={`/brands/${brand?.slug}/${item?.year}/${model?.slug}/${item.slug}`}
                    >
                      <span>
                        <p>
                          <span>
                            {year} {brand.name} {model.name} {item?.name}
                          </span>
                        </p>
                        <small className="text-grey">
                          <span>{item?.transmission}</span>,{" "}
                          <span> {item?.seatingCapacity}</span>,{" "}
                          {item?.fuelType === "Electric" ? (
                            item?.motor
                          ) : (
                            <span>
                              {(item?.displacement / 1000).toFixed(1)}L{" "}
                              {item?.engine} {item?.drive}{" "}
                            </span>
                          )}
                          , <span> {item?.torque}Nm</span>,{" "}
                          <span> {item?.power}hp</span>
                        </small>
                      </span>
                    </Link>
                  </td>
                  <td data-label="Price" className="col-3">
                    <Price data={item?.price} />
                  </td>
                  <td data-label="Action" className="col-3">
                    <Link
                      href={`/brands/${brand?.slug}/${item?.year}/${model?.slug}/${item.slug}`}
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
