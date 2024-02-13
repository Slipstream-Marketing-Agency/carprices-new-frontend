import Link from "next/link";
import React from "react";

export default function Brands(data) {
  
  return (

    <>
      {data.props &&
        data.props.map((item, index) => (
          <div className="col-2 mb-3" style={{ width: "14%" }}>
            <div className="card">
              <Link
                title=""
                href={`/brands/${item.slug}`}
                className="brand_img_wrapper d-flex flex-column justify-content-center align-items-center p-1"
              >
                <img alt={item.name} src={item.image === null ? "assets/images/placeholders/car-placeholder.png":process.env.NEXT_PUBLIC_S3_URL + `${item.image}`} />
                <h6>{item.name}</h6>
              </Link>
            </div>
          </div>
        ))}
    </>
  );
}
