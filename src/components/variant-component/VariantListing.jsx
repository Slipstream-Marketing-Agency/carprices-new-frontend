import Link from "next/link";
import React from "react";
import _ from "lodash";
import { useRouter, usePathname, useSearchParams, useParams } from 'next/navigation';
import Price from "@/utils/Price"; // Adjust the path based on your project structure
import useTranslate from "@/utils/UseTranslate"; // Adjust the path based on your project structure
import Image from "next/image";
import PrimaryButton from "../buttons/PrimaryButton";

export default function VariantsListing({ data, brandslug, modelslug, trimslug }) {
  const router = useRouter();
  const t = useTranslate();

  // Filter out the trim with the provided trimslug
  const filteredTrims = data?.relatedTrims?.filter(
    (trim) => trim.slug !== trimslug
  );

  return (
    <div className="my-3" id="variant_listing">
      <h2 className="font-semibold mb-5 mt-14">Other Variants</h2>
      <div className="bg-white shadow-sm p-4 rounded-xl border border-solid border-gray-200 ">
        {filteredTrims?.map((trim, index) => (
          <div key={index} className="mb-3 mt-3 ">
            <Link
              href={`/brands/${brandslug}/${trim?.year}/${modelslug}/${trim.slug}`}
            >
              <div className="flex flex-col md:flex-row gap-4 items-center p-4">
                <div className="md:w-1/3 flex items-center justify-center">
                  <Image
                    width={200}
                    height={200}
                    alt={trim?.name}
                    src={
                      trim?.featuredImage
                        ? trim?.featuredImage
                        : "/assets/img/car-placeholder.png"
                    }
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="md:w-1/2">
                  <div className="card-body">
                    <h4 className="text-lg font-semibold">
                      {data?.year} {data?.brand} {data?.model}{" "}
                      {trim?.name}
                    </h4>
                  </div>
                </div>
                <div className="md:w-1/4">
                  <h2 className="text-lg font-medium">
                    <Price data={trim?.price} />
                  </h2>
                </div>
                <div className="md:w-1/4 flex flex-col justify-center">
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
