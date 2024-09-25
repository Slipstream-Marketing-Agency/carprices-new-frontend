import Link from "next/link";
import React from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import { useRouter } from "next/dist/client/router";
import Price from "@/src/utils/Price"; // Adjust the path based on your project structure
import useTranslate from "@/src/utils/useTranslate"; // Adjust the path based on your project structure
import FeaturedImage from "../common/FeaturedImage"; // Adjust the path based on your project structure
import Image from "next/image";
import PrimaryButton from "@/src/components/buttons/PrimaryButton";

export default function VariantsListing({ year, brand, model, allTrims }) {
  const router = useRouter();
  const t = useTranslate();

  return (
    <div className="tw-my-3" id="variant_listing">
      <h2 className="tw-font-semibold tw-mb-5">{brand.name} {model.name} {year} Variants & Price in UAE</h2>
      <div className="tw-bg-white tw-shadow-sm tw-p-4 tw-rounded-xl tw-border tw-border-solid tw-border-gray-200 ">
        {allTrims?.map((item, index) => (
          <div key={index} className="tw-mb-3 tw-mt-3 ">
            <Link
              href={`/brands/${brand?.slug}/${item?.year}/${model?.slug}/${item.slug}`}
            >
              <div className="tw-flex tw-flex-col md:tw-flex-row tw-gap-4 tw-items-center tw-p-4">
                <div className="md:tw-w-1/3 tw-flex tw-items-center tw-justify-center">
                  <Image
                    width={200}
                    height={200}
                    src={
                      item?.featuredImage
                        ? item?.featuredImage
                        : "/assets/img/car-placeholder.png"
                    }
                    className="tw-object-cover tw-rounded-lg"
                  />
                </div>
                <div className="md:tw-w-1/2">
                  <div className="tw-card-body">
                    <h4 className="tw-text-lg tw-font-semibold">
                      {year} {brand.name} {model.name} {item?.name}
                    </h4>
                    <p className="tw-text-xs sm:tw-text-sm tw-uppercase tw-font-semibold tw-text-gray-500">
                      <span>{item?.transmission}</span>,{" "}
                      <span>{item?.seatingCapacity}</span>,{" "}
                      {item?.fuelType === "Electric"
                        ? item?.motor
                        : `${(item?.displacement / 1000).toFixed(1)}L ${
                            item?.engine
                          } ${item?.drive}`}
                      ,<span> {item?.torque}Nm</span>,{" "}
                      <span> {item?.power}hp</span>
                    </p>
                  </div>
                </div>
                <div className="md:tw-w-1/4">
                  <h2 className="tw-text-lg tw-font-medium">
                    <Price data={item?.price} />
                  </h2>
                </div>
                <div className="md:tw-w-1/4 tw-flex tw-flex-col tw-justify-center">
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
