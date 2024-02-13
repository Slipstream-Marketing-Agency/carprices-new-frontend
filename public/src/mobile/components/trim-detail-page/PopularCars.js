import Link from "next/link";
import React from "react";
import ViewAllButton from "../common/ViewAllButton";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import FeaturedImage from "../common/FeaturedImage";
import Price from "../common/Price";

export default function PopularCars({trim }) {
  const [popularCarList, setPopularCarList] = useState([]);
  
  useEffect(() => {
    axios
      .get(
        process.env.NEXT_PUBLIC_API_URL +
          `model/by-brand/${trim.trim.brand.id}?pageSize=7&currentPage=1&orderBy=name`
      )
      .then((response) => {
        
        setPopularCarList(response.data.models);
      })
      .catch((error) => {
        console.error("Error", error);
        // setIsLoading(false);
        // setError(error);
      });
  }, []);
  return (
    <div id="popular_cars my-3">
      <div className="white_bg_wrapper pb-3">
        <h5 className="fw-bold">Popular {trim.trim.brand.name} cars in UAE</h5>
        <div className="mt-3">
          {popularCarList?.slice(0, 3).map((item, index) => (
            <Link
              href={`/brands/${item.brand.slug}/${item.year}/${item.slug}/${item.mainTrim.slug}`}
              className="white_bg_wrapper d-flex justify-content-start mt-3"
              key={index}
            >
              <div className="d-flex justify-content-center align-items-center w-25">
              <FeaturedImage width={100} height={100} src={item?.mainTrim?.featuredImage} alt="" />

              </div>
              <div className="w-75 ps-3">
                <p>{item?.brand.name} {item?.name} {item?.mainTrim?.name}</p>
                <small className="fw-bold">AED <Price data={item?.mainTrim?.price}/></small>
              </div>
            </Link>
          ))}
        </div>
        {/* <ViewAllButton text={"View All"} /> */}
      </div>
    </div>
  );
}
