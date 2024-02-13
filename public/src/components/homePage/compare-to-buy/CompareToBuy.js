import React from "react";
import ViewAllButton from "../../common/ViewAllButton";
import FeaturedImage from "../../common/FeaturedImage";
import Price from "../../common/Price";
import Link from "next/link";
import { useRouter } from "next/router";

export default function CompareToBuy(props) {
  const router = useRouter();
  return (

    <div className="row">
      {props?.compareList?.models.map((item, index) => {
        
        const formattedSlugWithBrand = `${item?.v1?.brand?.name.replace(/\s/g, "-")}-vs-${item?.v2?.brand?.name.replace(/\s/g, "-")}`;
        const formattedSlugWithModel = `${item?.v1?.brand?.name.replace(/\s/g, "-")}-${item?.v1?.slug.replace(/\s/g, "-")}-vs-${item?.v2?.brand?.name.replace(/\s/g, "-")}-${item?.v2?.slug.replace(/\s/g, "-")}`;
        const formattedSlug = `${item?.v1?.brand?.name.replace(/\s/g, "-")}-${item?.v1?.slug.replace(/\s/g, "-")}-${item?.v1?.mainTrim?.name.replace(/\s/g, "-")}-vs-${item?.v2?.brand?.name.replace(/\s/g, "-")}-${item?.v2?.slug.replace(/\s/g, "-")}-${item?.v2?.mainTrim?.name.replace(/\s/g, "-")}`;
        return (
          <div className="col-md-4 col-sm-6 col-12 mt-sm-0 mt-3">
            <Link href={`/compare-cars/${item?.v1?.mainTrim?.mainSlug}-vs-${item?.v2?.mainTrim?.mainSlug}`}
            >
              <div className="card container h-100">
                <div className="row comparisons_wrapper">
                  <div className="col-6 p-0">
                    <div className="comparisons_image_wrapper">
                      <FeaturedImage width={100} height={100}
                        src={item?.v1?.mainTrim?.featuredImage}
                        alt={item?.v1?.mainTrim?.name}
                        title={item?.v1?.mainTrim?.name}
                      />
                    </div>
                    <div className="d-flex flex-column p-2">
                      <small className="card-title fw-bold">
                      {item?.v1?.year} {item?.v1?.brand?.name} <br/>{item?.v1?.name}
                      </small>
                      <small className="card-text text-danger fw-bold">
                        <span className="text-black fw-bold">From AED</span>{" "}
                        <Price data={item?.v1?.mainTrim?.price} />
                      </small>
                    </div>
                  </div>
                  <div className="col-6 text-end p-0">
                    <div className="comparisons_image_wrapper">
                      <FeaturedImage width={100} height={100}
                        src={item?.v2?.mainTrim?.featuredImage}
                        alt={item?.v2?.mainTrim?.name}
                        title={item?.v2?.mainTrim?.name}
                      />
                    </div>
                    <div className="d-flex flex-column p-2">
                      <small className="card-title fw-bold">
                      {item?.v1?.year} {item?.v2?.brand?.name} <br/>{item?.v2?.name}
                      </small>
                      <small className="card-text text-danger fw-bold">
                        <span className="text-black fw-bold">From AED</span>{" "}
                        <Price data={item?.v2?.mainTrim?.price} />
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>

  );
}
