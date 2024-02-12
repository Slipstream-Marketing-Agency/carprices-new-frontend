import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import useTranslate from "../utils/useTranslate";

export default function MoreBrands() {
  const router = useRouter();
  const t = useTranslate();
  let isRtl = router.locale === "ar";
  const carBrands = [
    { name: "Toyota1", image: "/images/toyota.jpg" },
    { name: "Honda2", image: "/images/honda.jpg" },
    { name: "Ford3", image: "/images/ford.jpg" },
    { name: "Toyota4", image: "/images/toyota.jpg" },
    { name: "Honda5", image: "/images/honda.jpg" },
    { name: "Ford6", image: "/images/ford.jpg" },
    { name: "Toyota7", image: "/images/toyota.jpg" },
    { name: "Honda8", image: "/images/honda.jpg" },
    { name: "Ford9", image: "/images/ford.jpg" },
    // Add more car brands as needed
  ];
  return (
    <div className="white_bg_wrapper p-2 px-3">
      <h5 className="mb-4 ">{t.otherBrands}</h5>
      <div className="row">
        {carBrands.map((item, idx) => (
          <div key={idx} className="col-lg-4 g-0">
            <Link legacyBehavior href="/" key={idx}>
              <div className="text-center border py-2">
                <img src={item?.image} alt="brand-icons" />
                <p className="mt-2">{item?.name}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="my-2 mx-2">
        <a href="/brands">
          <span className="viewAllbrandTxt">{t.viewbrand}</span>
        </a>
      </div>
    </div>
  );
}
