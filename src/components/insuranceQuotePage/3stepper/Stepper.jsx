export default function Stepper({ step, setCurrentStep }) {
  return (
    <div className="sm:tw-p-6 tw-px-6 tw-mx-auto lg:tw-w-1/2 md:tw-w-1/2">
      <div className="tw-flex tw-mt-4">
        <div
          onClick={() => setCurrentStep(0)}
          className={`tw-p-2 tw-mx-3 tw-h-6 tw-w-10 tw-rounded-xl tw-text-xs tw-text-white tw-cursor-pointer tw-flex tw-items-center tw-justify-center ${
            step === 2 ? "tw-bg-green-500" : "tw-bg-blue-500"
          }`}
        >
          1
        </div>
        <div className="tw-bg-slate-200 tw-my-3 tw-h-[3px] tw-w-full">
          {/* <hr
            className={`tw-h-[2px] tw-border-0${
              step === 2 ? " tw-w-full tw-bg-green-500 " : " tw-w-1/2 tw-bg-blue-700"
            } `}
          /> */}
        </div>

        <div
          onClick={() => setCurrentStep(1)}
          className="tw-bg-blue-500 tw-h-6 tw-p-2 tw-w-10 tw-mx-3 tw-rounded-xl tw-text-xs tw-text-white tw-cursor-pointer tw-flex tw-items-center tw-justify-center"
        >
          2
        </div>
        <div className="tw-bg-slate-200 tw-my-3 tw-h-[3px] tw-w-full">
          {/* <hr
            className={`${
              step === 2 ? "tw-h-[2px] tw-w-1/2 tw-bg-blue-700 tw-border-0" : ""
            } `}
          /> */}
        </div>
        <div className="tw-bg-blue-500 tw-p-2 tw-h-6 tw-w-10 tw-mx-3 tw-rounded-xl tw-text-xs tw-text-white tw-flex tw-items-center tw-justify-center">
          3
        </div>
      </div>
      <div className="tw-flex tw-text-xs tw-font-normal tw-justify-between tw-w-full">
        <div>Vehicle Details</div>
        <div>Driver Details</div>
        <div>Get Quote</div>
      </div>
    </div>
  );
}
