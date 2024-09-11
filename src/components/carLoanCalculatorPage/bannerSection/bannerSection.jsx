import { carLoanPage } from "@/src/mocks/labels";
import Image from "next/image";

export default function BannerSection({ setShowModal }) {
  return (
    <div className="tw-bg-gradient-to-tl tw-from-blue-800 tw-via-blue-600 tw-to-blue-700  tw-rounded-2xl md:tw-p-10 tw-p-8 tw-text-white tw-flex tw-relative tw-overflow-hidden tw-custom-gradient">
      <div>
        <div className="tw-text-4xl sm:tw-w-1/2 ">
          Choose the car to calculate loan EMI
        </div>
        <div className=" tw-mb-6 md:tw-w-2/3 tw-opacity-80 tw-mt-3">
          Get a quick breakdown of your monthly payments and make an informed
          decision on your next ride.
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="tw-border-solid tw-border  tw-font-bold tw-bg-white tw-rounded-3xl tw-p-2 tw-px-6 tw-my-4"
        >
          Choose Car Now
        </button>
      </div>
      <Image
        className="tw-object-contain tw-min-h-0 tw-absolute tw-bottom-0 tw-right-0 tw-hidden md:tw-block"
        src={"/carLoanPage/carImage.png"}
        alt="car-image"
        height={380}
        width={380}
      />
    </div>
  );
}
