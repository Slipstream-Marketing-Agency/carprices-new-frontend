import Link from "next/link";
import React from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import Price from "@/utils/Price"; // Adjust the path based on your project structure
import useTranslate from "@/utils/UseTranslate";; // Adjust the path based on your project structu
import PrimaryButton from "../buttons/PrimaryButton";
import { useRouter } from "next/navigation";
import Image from "next/image";


export default function VariantsListing({ year, brand, model, allTrims }) {
  const router = useRouter();
  const t = useTranslate();

  return (
    <div className="my-3" id="variant_listing">
      <h2 className="font-semibold mb-5">{brand.name} {model.name} {year} Variants & Price in UAE</h2>
      <div className="bg-white shadow-sm p-4 rounded-xl border border-solid border-gray-200 ">
        {allTrims?.map((item, index) => (
          <div key={index} className="my-2 border-b-2 border-gray-300">
            <Link
              href={`/brands/${brand?.slug}/${item?.year}/${model?.slug}/${item.slug}`}
            >
              <div className="flex flex-col md:flex-row gap-4 items-center p-4">
                <div className="md:w-1/3 flex items-center justify-center">
                  <Image
                    width={200}
                    height={200}
                    layout="fixed"
                    alt={item?.name}
                    src={
                      item?.featuredImage
                        ? item?.featuredImage
                        : "/assets/img/car-placeholder.png"
                    }
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="md:w-1/2">
                  <div className="card-body">
                    <h4 className="text-lg font-semibold">
                      {year} {brand.name} {model.name} {item?.name} Price in UAE
                    </h4>
                    <p className="text-xs sm:text-sm uppercase font-semibold text-gray-500">
                      <span>{item?.transmission}</span>,{" "}
                      <span>{item?.seatingCapacity}</span>,{" "}
                      {item?.fuelType === "Electric"
                        ? item?.motor
                        : `${(item?.displacement > 0 ? (item.displacement / 1000).toFixed(1) + 'L ' : '')} ${item?.engine} ${item?.drive}`}
                      ,<span> {item?.torque}Nm</span>,{" "}
                      <span> {item?.power}hp</span>
                    </p>
                  </div>
                </div>
                <div className="md:w-1/4">
                  <h2 className="text-lg font-medium">
                    <Price data={item?.price} />
                  </h2>
                </div>
                <div className="md:w-1/4 flex flex-col justify-center">
                  <PrimaryButton
                    label="View Details"
                    href={`/brands/${brand?.slug}/${item?.year}/${model?.slug}/${item.slug}`}
                  />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
