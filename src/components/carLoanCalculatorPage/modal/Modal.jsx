import FormikSearchComponent from "../SearchComponent/FormikSearchComponent";
import Close from "@mui/icons-material/Close";

function Modal({ modal, setIsOpen, setCarSelected }) {
  return (
    <>
      {modal && (
        <dialog className="tw-fixed tw-left-0 tw-top-0  tw-bottom-0 -tw-right-0 tw-w-full tw-h-full tw-bg-black tw-bg-opacity-20 tw-overflow-auto  tw-z-10 tw-flex tw-justify-center tw-items-center tw-transition-all tw-duration-1000 tw-ease-in-out tw-no-scrollbar">
          <div className="tw-animate-trans-right tw-absolute tw-right-0 tw-bg-white tw-w-full tw-h-full sm:tw-w-1/2 sm:tw-rounded-3xl">
            <div className="tw-col-span-12 sm:tw-rounded-tl-3xl tw-bg-blue-500 tw-w-full tw-p-8 tw-flex tw-justify-between tw-text-3xl tw-text-white tw-bg-stripes">
              <div className=" sm:tw-w-[40%]">
                Select Your Brand, Model and Variant
              </div>
              <div
                className=" sm:tw-col-span-1 sm:tw-block tw-cursor-pointer "
                onClick={() => setIsOpen(false)}
              >
                <Close fontSize="large" />
              </div>
            </div>

            <div className="tw-m-4">
              <FormikSearchComponent
                setIsOpen={setIsOpen}
                setCarSelected={setCarSelected}
              />
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}

export default Modal;
