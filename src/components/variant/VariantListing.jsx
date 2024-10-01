import Link from "next/link";
import React from "react";
import _ from "lodash";
import { useRouter } from "next/dist/client/router";
import Price from "@/src/utils/Price"; // Adjust the path based on your project structure
import useTranslate from "@/src/utils/useTranslate"; // Adjust the path based on your project structure
import Image from "next/image";
import PrimaryButton from "@/src/components/buttons/PrimaryButton";

export default function VariantsListing({ data, brandslug, modelslug, trimslug }) {
  const router = useRouter();
  const t = useTranslate();

  // Filter out the trim with the provided trimslug
  const filteredTrims = data?.relatedTrims?.filter(
    (trim) => trim.slug !== trimslug
  );

  return (
    <div className="tw-my-3" id="variant_listing">
      <h2 className="tw-font-semibold tw-mb-5 tw-mt-14">Other Variants</h2>
      <div className="tw-bg-white tw-shadow-sm tw-p-4 tw-rounded-xl tw-border tw-border-solid tw-border-gray-200 ">
        {filteredTrims?.map((trim, index) => (
          <div key={index} className="tw-mb-3 tw-mt-3 ">
            <Link
              href={`/brands/${brandslug}/${trim?.year}/${modelslug}/${trim.slug}`}
            >
              <div className="tw-flex tw-flex-col md:tw-flex-row tw-gap-4 tw-items-center tw-p-4">
                <div className="md:tw-w-1/3 tw-flex tw-items-center tw-justify-center">
                  <Image
                    width={200}
                    height={200}
                    alt={trim?.name}
                    src={
                      trim?.featuredImage
                        ? trim?.featuredImage
                        : "/assets/img/car-placeholder.png"
                    }
                    className="tw-object-cover tw-rounded-lg"
                  />
                </div>
                <div className="md:tw-w-1/2">
                  <div className="tw-card-body">
                    <h4 className="tw-text-lg tw-font-semibold">
                      {data?.year} {data?.brand} {data?.model}{" "}
                      {trim?.name}
                    </h4>
                  </div>
                </div>
                <div className="md:tw-w-1/4">
                  <h2 className="tw-text-lg tw-font-medium">
                    <Price data={trim?.price} />
                  </h2>
                </div>
                <div className="md:tw-w-1/4 tw-flex tw-flex-col tw-justify-center">
                  <PrimaryButton
                    label="View Details"
                    href={`/brands/${brandslug}/${trim?.year}/${modelslug}/${trim.slug}`}
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
