import React from "react";
import Link from "next/link";
import { BrandCategoryHome1 } from "../../../data/data";
import { useRouter } from "next/router";
import useTranslate from "@/src/utils/useTranslate";

function BrandCategory({ brandDetails }) {
  const router = useRouter();

  const t = useTranslate();
  let isRtl = router.locale === 'ar';
  return (
    <div className="brand-category-area mt-3 mb-3">
      <div className="container white_bg_wrapper">
        <div className="row mb-15 wow fadeInUp" data-wow-delay="200ms">
          <div className="col-lg-12 d-flex align-items-end justify-content-between flex-wrap gap-4">
            <div className="section-title1 w-100">
              <h2 className={`${isRtl && "text-end"} w-100 fw-bold`}>{t.popularcar}</h2>
              <hr className="my-0 mt-2 heading-bottom "/>

            </div>
          </div>
        </div>
        <div className="row row-cols-xl-6 row-cols-lg-5 row-cols-md-3 row-cols-sm-3 row-cols-3 g-4 justify-content-center mb-15">
          {brandDetails.map((item, idx) => {
            return (
              <div className="col wow fadeInUp" data-wow-delay="200ms">
                <Link legacyBehavior href={`/brands/${item?.slug}`} key={idx}>
                  <a className="single-category1">
                    <div className="brand-icon ">
                      <img
                        src={item?.logo}
                        alt="brand-icons"
                      />
                    </div>
                    <h6 className="text-dark">{item?.name}</h6>
              
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
        <div className="row wow fadeInUp" data-wow-delay="300ms">
          <div className="col-lg-12">
            <div className="view-btn-area">
              {/* <p>There will be 100+ Upcoming Car</p> */}
              <Link legacyBehavior href="/brands">
                <button className="btn mb-2 mb-md-0 btn-round btn-outline btn-block">
                  {t.viewMore}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrandCategory;
