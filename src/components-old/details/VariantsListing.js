import Link from "next/link";
import React from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import { useRouter } from "next/dist/client/router";
import Price from "@/src/utils/Price"; // Adjust the path based on your project structure
import useTranslate from "@/src/utils/useTranslate"; // Adjust the path based on your project structure
import FeaturedImage from "../common/FeaturedImage"; // Adjust the path based on your project structure
import Image from "next/image";

export default function VariantsListing({ year, brand, model, allTrims }) {
  const router = useRouter();
  const t = useTranslate();

  return (
    <div className="my-3" id="variant_listing">
      <div className="white_bg_wrapper">
        <h2 className={`w-100 fw-bold`}>
          {year} {brand.name} {model.name} {t.variants} {t.and} {t.priceList}
        </h2>
        <hr className="my-2 heading-bottom " />

        {allTrims?.map((item, index) => (
          <div key={index} className="card mb-3 mt-3">
            <Link
              href={`/brands/${brand?.slug}/${item?.year}/${model?.slug}/${item.slug}`}
            >
              <div className="row g-0">
                <div className="col-md-3 d-flex align-items-center justify-content-center ">
                  <Image
                    width={100}
                    height={100}
                    src={item?.featuredImage ? item?.featuredImage : "/assets/img/car-placeholder.png"}
                    className="img-fluid p-md-3 p-1"
                  />
                </div>
                <div className="col-md-7">
                  <div className="card-body">
                    <h4 className="card-title fw-bold">
                      {year} {brand.name} {model.name} {item?.name}
                    </h4>
                    <p className="card-text">
                      <p className="text-muted">
                        <span>{item?.transmission}</span>,{" "}
                        <span>{item?.seatingCapacity}</span>,{" "}
                        {item?.fuelType === "Electric"
                          ? item?.motor
                          : `${(item?.displacement / 1000).toFixed(1)}L ${
                              item?.engine
                            } ${item?.drive}`}
                        ,<span> {item?.torque}Nm</span>,{" "}
                        <span> {item?.power}hp</span>
                      </p>
                    </p>
                    <h4 className="card-text fw-bold text-primary">
                      <Price data={item?.price} />
                    </h4>
                  </div>
                </div>
                <div className="col-md-2 d-flex flex-column justify-content-center pe-md-2">
                  <button className="btn btn-primary">
                    {t.view} {t.variant}{" "}
                    <i class="bi bi-chevron-double-right"></i>
                  </button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

// import Link from "next/link";
// import React, { useState } from "react";
// import _ from "lodash";
// // import TrimsPopup from "../TrimsPopup"; // Uncomment or adjust according to your project structure
// import { toast } from "react-toastify";
// import { useRouter } from "next/dist/client/router";
// import Price from "@/src/utils/Price"; // Adjust the path based on your project structure
// import useTranslate from "@/src/utils/useTranslate"; // Adjust the path based on your project structure
// import FeaturedImage from "../common/FeaturedImage"; // Adjust the path based on your project structure

// export default function VariantsListing({
//   year,
//   brand,
//   model,
//   minPrice,
//   maxPrice,
//   minFuelConsumption,
//   maxFuelConsumption,
//   mainTrimFuelType,
//   engineTypes,
//   transmissionList,
//   motorTypes,
//   allTrims,
//   mainTrim,
//   getTransmissionType
// }) {
//   const availableTrim = _.orderBy(
//     model,
//     [
//       (trim) => {
//         return trim.price === 0 ? Infinity : trim.price;
//       },
//     ],
//     ["asc"]
//   );
//   const [selectedVariants, setSelectedVariants] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);

//   const router = useRouter();
//   const t = useTranslate();
//   const isRtl = router.locale === "ar";

//   return (
//     <div className="my-3" id="variant_listing">
//       <div className="white_bg_wrapper">
//         <h4 className="fw-bold">
//           <span>
//             {year} {brand.name} {model.name}
//           </span>{" "}
//           {t.variants} {t.and} <span>{t.priceList}</span>
//         </h4>
//         <div className="car_description mt-3"></div>
//         <div className="table-responsive table-bordered mt-3">
//           <table className="table align-middle setTableWidth">
//             <thead>
//               <tr>
//                 <th scope="col" />
//                 <th scope="col">{t.variants}</th>
//                 <th scope="col">{t.price}</th>
//                 <th scope="col">{t.variant}</th>
//                 {/* <th scope="col text-end">{t.compare}</th> */}
//               </tr>
//             </thead>
//             <tbody>
//               {allTrims?.map((item, index) => (
//                 <tr key={index}>
//                   <td data-label="Image" className="col-2 py-4 w-10">
//                     <div className="listed_image">
//                       <FeaturedImage
//                         width={100}
//                         height={100}
//                         src={item?.featuredImage}
//                       />
//                     </div>
//                   </td>
//                   <td data-label="Variant" className="col-4 py-4">
//                     <Link
//                       href={`/brands/${brand?.slug}/${item?.year}/${model?.slug}/${item.slug}`}
//                     >
//                       <span>
//                         <p>
//                           <span>
//                             {year} {brand.name} {model.name} {item?.name}
//                           </span>
//                         </p>
//                         <small className="text-grey">
//                           <span>{item?.transmission}</span>,{" "}
//                           <span> {item?.seatingCapacity}</span>,{" "}
//                           {item?.fuelType === "Electric" ? (
//                             item?.motor
//                           ) : (
//                             <span>
//                               {(item?.displacement / 1000).toFixed(1)}L{" "}
//                               {item?.engine} {item?.drive}{" "}
//                             </span>
//                           )}
//                           , <span> {item?.torque}Nm</span>,{" "}
//                           <span> {item?.power}hp</span>
//                         </small>
//                       </span>
//                     </Link>
//                   </td>
//                   <td data-label="Price" className="col-3">
//                     <Price data={item?.price} />
//                   </td>
//                   <td data-label="Action" className="col-3">
//                     <Link
//                       href={`/brands/${brand?.slug}/${item?.year}/${model?.slug}/${item.slug}`}
//                     >
//                       <span className="btn btn-outline-primary w-75">
//                         {t.view} {t.variant}
//                       </span>
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }
