import Link from "next/link";
import React from "react";
import FeaturedImage from "../common/FeaturedImage";
import Price from "../common/Price";
import InfiniteScroll from "react-infinite-scroll-component";
import { Tooltip } from "primereact/tooltip";

export default function FilteredCarCard({
  filteredData,
  handleLoadMore,
  uniqueIndex,
}) {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 col-6 single_card_wrap mb-3" key={uniqueIndex}>
      <div className="card h-100">
        <Link
          href={`/brands/${filteredData?.brand?.slug}/${filteredData?.year}/${filteredData?.model?.name.toLowerCase().replace(/\s+/g, '-')}`}
        >
          <FeaturedImage width={100} height={100}
            src={filteredData?.featuredImage}
            alt={filteredData?.name}
            title={filteredData?.name}
          />
        </Link>
        <div className="px-3 py-2">
          <Link
            href={`/brands/${filteredData?.brand?.slug}/${filteredData?.year}/${filteredData?.model?.slug}`}
          >
            <h6 className="card-title fw-semibold">
              {filteredData?.year} {filteredData?.brand?.name}{" "}
              {filteredData?.model?.name}
              {/* <small>{item?.min}</small>
                      <small>{item?.max}</small> */}
            </h6>
          </Link>
          <h6 className="card-text text-danger fw-bold my-1">
            {filteredData?.minPrice === filteredData?.maxPrice ? <>AED <Price data={filteredData?.minPrice} /></> : filteredData?.minPrice === "TBD" ? <Price data={filteredData?.minPrice} /> : <>AED <Price data={filteredData?.minPrice} />{" "}-{" "}
              <Price data={filteredData?.maxPrice} /></>}

          </h6>

          <div className="position-relative">
            <Tooltip target={`.tooltip-button-${uniqueIndex}`} autoHide={false} position="bottom">
              <div className="d-flex flex-column">
                {filteredData?.allTrims?.map((item, index) => (
                  <div key={index}>
                    <Link
                      href={`/brands/${filteredData.brand.slug}/${filteredData.year}/${filteredData.model.slug}/${item.slug}`}
                      className=""
                    >
                      <small>{item?.name}</small>
                    </Link>
                  </div>
                ))}
              </div>
            </Tooltip>
            <small
              className={`variant_btn fw-bold btn btn-light box_shadow tooltip-button-${uniqueIndex}`}
              type="button"
              label="Number"
            >
              {filteredData?.allTrimsCount
                ? filteredData.allTrimsCount === 1
                  ? `${filteredData?.allTrimsCount} Variant`
                  : `${filteredData?.allTrimsCount} Variants`
                : "No Variants"}{" "}
              Available
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
