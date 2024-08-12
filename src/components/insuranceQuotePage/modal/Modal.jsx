import Image from "next/image";
import Close from "@mui/icons-material/Close";

function Modal({ modal, setIsOpen }) {
  return (
    <>
      {modal && (
        <dialog className="tw-fixed sm:tw-left-0 tw-top-0 tw-w-full tw-h-full tw-bg-black tw-bg-opacity-20 tw-z-10 tw-overflow-auto tw-backdrop-blur tw-flex tw-justify-center tw-items-center">
          <div className="tw-bg-white tw-rounded-md md:tw-w-1/4 tw-w-3/4 tw-p-5">
            <div className="tw-grid tw-grid-cols-12">
              <div className="sm:tw-col-span-2 sm:tw-block tw-hidden tw-bg-green-200 tw-rounded-full tw-w-12 tw-h-12 tw-align-middle">
                <Image
                  src={"/icon-submitted.svg"}
                  alt="icon"
                  height={130}
                  width={130}
                  className=""
                />
              </div>
              <div className="tw-col-span-11 sm:tw-col-span-9">
                <div className="tw-items-center">
                  <h4 className="tw-font-light  tw-text-slate-600 tw-my-1">
                    Thank You for Your Submission!
                  </h4>
                  <p className="tw-text-xs tw-font-thin tw-text-gray-400 tw-leading-5">
                    We have received your request for a car insurance quote. Our
                    team is processing your information and will send your quote
                    to your email shortly.
                  </p>
                </div>
              </div>
              <div
                className="tw-col-span-1 tw-cursor-pointer tw-mx-auto tw-text-sm"
                onClick={() => setIsOpen(false)}
              >
                <Close fontSize="small" />
              </div>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}

export default Modal;
