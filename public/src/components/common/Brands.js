import Image from "next/image";
import Link from "next/link";
import React from "react";
import FeaturedImage from "./FeaturedImage";

export default function Brands(data) {
  
  return (

    <>
      {data.props &&
        data.props.slice(0, 12).map((item, index) => (
          <div className="col-md-2 col-sm-3 col-4  mb-2" key={index}>
            <div className="card">
              <Link
                title=""
                href={`/brands/${item.slug}`}
                className="brand_img_wrapper d-flex flex-column justify-content-center align-items-center p-1"
              >
                <FeaturedImage
                 key={index}
                  width={100}
                  height={100}
                  alt={item.name}
                  src={
                    item.image
                  }
                />
                <h3 className="fs-6">{item.name}</h3>
              </Link>
            </div>
          </div>
        ))}

    </>
  );
}
