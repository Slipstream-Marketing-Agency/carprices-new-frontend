import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useTranslate from "@/src/utils/useTranslate";

function BodyTypes({ bodyTypeList }) {
  const router = useRouter();

  const t = useTranslate();
  let isRtl = router.locale === "ar";
  console.log(bodyTypeList, "bodyTypeList");
  return (
    <div className="body-category-area mt-3 mb-3">
      <div className="container white_bg_wrapper pb-1">
        <div className="row mb-4 wow fadeInUp " data-wow-delay="200ms">
          <div className="col-lg-12 d-flex align-items-start justify-content-start flex-wrap gap-4">
            <div className="section-title1 w-100">
              <h2 className={`${isRtl && "text-end"} w-100 fw-bold`}>
                Popular Cars By Body Type
              </h2>
              <hr className="my-0 mt-2 heading-bottom " />
            </div>
          </div>
        </div>
        <div className="row row-cols-xl-5 row-cols-lg-5 row-cols-md-3 row-cols-sm-2 row-cols-2 g-4 justify-content-center mb-2">
          {bodyTypeList.map((item, idx) => {
            return (
              <div className="col wow fadeInUp" data-wow-delay="200ms">
                <Link legacyBehavior href={`/category/${item?.slug}`} key={idx}>
                  <a className="single-category">
                    <div className="body-icon">
                      <img src={item?.image} alt="bodytype-icons" />
                    </div>
                    <h6 className="text-black fw-bold mt-2">{item?.name}</h6>
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BodyTypes;
