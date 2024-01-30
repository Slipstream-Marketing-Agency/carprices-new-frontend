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
    <div className="brand-category-area  pt-4 mb-20">
      <div className="container">
        <div className="row mt-4 mb-30 wow fadeInUp" data-wow-delay="200ms">
          <div className="col-lg-12 d-flex align-items-start justify-content-start flex-wrap gap-4">
            <div className="section-title1 w-100">
              {/* <span>Available Brand Car</span> */}
              <h1 className={`${isRtl && "text-end"} w-100`}>
                Popular Cars By Body Type
              </h1>
            </div>
          </div>
        </div>
        <div className="row row-cols-xl-6 row-cols-lg-5 row-cols-md-3 row-cols-sm-3 row-cols-2 g-4 justify-content-center mb-40">
          {bodyTypeList.map((item, idx) => {
            return (
              <div className="col wow fadeInUp" data-wow-delay="200ms">
                <Link
                  legacyBehavior
                  href={`/category/${item?.slug}`}
                  key={idx}
                >
                  <a className="single-category1">
                    <div className="brand-icon w-50">
                      <img
                        src={item?.image?.url}
                        alt="bodytype-icons"
                      />
                    </div>
                    <h6 className="text-dark">{item?.name}</h6>
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
