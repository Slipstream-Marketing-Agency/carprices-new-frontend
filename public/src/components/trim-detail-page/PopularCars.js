import Link from "next/link";
import React from "react";
import ViewAllButton from "../common/ViewAllButton";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import FeaturedImage from "../common/FeaturedImage";
import Price from "../common/Price";
import { useRouter } from "next/router";

export default function PopularCars({ trim }) {

  const router = useRouter()

  const [popularCarList, setPopularCarList] = useState([]);
  
  const popularBrandData = {
    "brand": trim?.trim?.brand?.id,
    "currentModel": trim?.trim?.id
  }

  useEffect(() => {
    axios
      .post(
        process.env.NEXT_PUBLIC_API_URL +
        `model/popular-by-brand?pageSize=7&currentPage=1&orderBy=name`,popularBrandData
      )
      .then((response) => {
        
        setPopularCarList(response.data.models);
      })
      .catch((error) => {
        console.error("Error", error);
        // setIsLoading(false);
        // setError(error);
      });
  }, [router.query]);
  return (
    <div id="popular_cars my-3" >
      <div className="white_bg_wrapper pb-3">
        <h5 className="fw-bold">Popular 2023 {trim.trim.brand.name} cars in UAE</h5>
        <div className="mt-3">
          {popularCarList?.map((item, index) => (
            <>
              <Link
                href={`/brands/${item.brand.slug}/${item?.mainTrim?.year}/${item.slug}`}
                key={index}
                className="white_bg_wrapper d-flex justify-content-start align-items-center mt-3"
              >
                <div className="d-flex justify-content-center align-items-center w-40">
                  <FeaturedImage width={50} height={50} src={item?.mainTrim?.featuredImage} alt="" />
                </div>
                <div className="w-60 ps-3">
                  <p className="fw-bold font_small">{item?.brand.name} {item?.name}</p>
                  <p className="text-black font_small">Starting from<br /> <span className="text-danger fw-bold">AED <Price data={item?.mainTrim?.price} /></span></p>
                </div>

              </Link>

            </>
          ))}
        </div>
        {/* <ViewAllButton text={"View All"} /> */}
      </div >
    </div >
  );
}
