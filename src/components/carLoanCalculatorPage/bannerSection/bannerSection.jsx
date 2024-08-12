import { carLoanPage } from "@/src/mocks/labels";
import Image from "next/image";

export default function BannerSection({ setIsOpen }) {
  return (
    <div className="tw-bg-gradient-to-tl tw-from-blue-800 tw-via-blue-600 tw-to-blue-700 tw-my-4  tw-mt-8 tw-rounded-2xl tw-p-10 tw-text-white tw-flex tw-relative tw-overflow-hidden tw-custom-gradient">
      <div>
        <div className="tw-text-4xl sm:tw-w-1/2 tw-leading-snug">
          {carLoanPage.bannerImageSection.heading}
        </div>
        <div className="tw-font-extralight tw-mb-6 tw-w-2/3 tw-opacity-80">
          {carLoanPage.bannerImageSection.para}
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="tw-border-solid tw-border-2 tw-rounded-3xl tw-p-2 tw-px-6 tw-my-4"
        >
          {carLoanPage.bannerImageSection.button}
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
