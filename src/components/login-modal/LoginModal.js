import Close from "@mui/icons-material/Close";
import Image from "next/image";
import { useState, useEffect } from "react";

function LoginModal({ modal, setIsOpen }) {
  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [modal]);

  const [isSignIn, setIsSignIn] = useState(true);
  return (
    <>
      {modal && (
        <dialog className="tw-fixed tw-left-0 tw-top-0  tw-bottom-0 tw-right-0 tw-w-full tw-h-full tw-bg-black tw-bg-opacity-20 tw-overflow-auto  tw-z-10 tw-flex tw-justify-center tw-items-center tw-transition-all tw-duration-1000 tw-ease-in-out tw-no-scrollbar">
          <div className="tw-absolute tw-bg-white tw-w-[93%]  md:tw-w-[42%] xl:tw-w-1/4 sm:tw-rounded-3xl tw-z-30 tw-rounded-lg">
            <Close
              onClick={() => setIsOpen(false)}
              fontSize=""
              className="tw-cursor-pointer tw-absolute tw-right-4 tw-top-4"
            />
            {isSignIn ? (
              <section className=" tw-p-8 tw-flex tw-flex-col tw-justify-between ">
                <div className="tw-my-6">
                  <div>
                    Welcome to
                    <span className="tw-font-semibold"> CarPrice.ae</span>
                  </div>
                  <div className="tw-font-semibold tw-text-4xl">Sign in</div>
                </div>
                <div className="tw-bg-blue-100 tw-space-x-4 tw-p-2 tw-py-3 tw-rounded-xl tw-mb-10 tw-mt-6 tw-items-center tw-text-center tw-cursor-pointer">
                  <Image
                    src={"https://cdn.carprices.ae/assets/google_8cfba8cae1.svg"}
                    alt="google-icon"
                    width={20}
                    height={20}
                  />
                  <span className="tw-text-sm tw-text-blue-800 tw-font-semibold">
                    Sign in with Google
                  </span>
                </div>
                <label className="tw-text-sm tw-font-semibold">
                  Enter your email address
                </label>
                <input
                  className="radius-lg  radius-lg rounded-md p-2 w-full border tw-border-gray-200 tw-rounded-lg  tw-text-sm tw-my-2"
                  type="email"
                  placeholder="Email"
                />
                <label className="tw-text-sm tw-font-semibold tw-my-2">
                  Enter your password
                </label>
                <input
                  className="radius-lg  radius-lg rounded-md p-2 w-full border tw-border-gray-200 tw-rounded-lg  tw-text-sm"
                  type="password"
                  placeholder="Password"
                />
                <div className="float-right tw-my-6">
                  <button className="tw-text-blue-500 tw-bg-transparent tw-text-xs tw-float-right">
                    Forgot Password
                  </button>
                </div>
                <div className="tw-mt-6 tw-flex tw-justify-between">
                  <button
                    className="tw-text-xs tw-bg-transparent"
                    onClick={() => setIsSignIn(false)}
                  >
                    No Account ? Sign up
                  </button>
                  <button className="tw-text-white tw-text-xs tw-px-16 tw-py-2 tw-bg-blue-600 tw-rounded-full">
                    Sign in
                  </button>
                </div>
              </section>
            ) : (
              <section className=" tw-p-8 tw-flex tw-flex-col tw-justify-between ">
                <div className="tw-my-6">
                  <div>
                    Welcome to{" "}
                    <span className="tw-font-semibold">CarPrice.ae</span>
                  </div>
                  <div className="tw-font-semibold tw-text-4xl">Sign up</div>
                </div>
                <div className="tw-bg-blue-100 tw-space-x-4 tw-p-2 tw-py-3 tw-rounded-xl tw-mb-8 tw-mt-6 tw-items-center tw-text-center tw-cursor-pointer">
                  <Image
                    src={"https://cdn.carprices.ae/assets/google_8cfba8cae1.svg"}
                    alt="google-icon"
                    width={20}
                    height={20}
                  />
                  <span className="tw-text-sm tw-text-blue-800 tw-font-semibold">
                    Sign up with Google
                  </span>
                </div>
                <label className="tw-text-sm tw-font-semibold">
                  Enter your email address
                </label>
                <input
                  className="radius-lg  radius-lg rounded-md p-2 w-full border tw-border-gray-200 tw-rounded-lg  tw-text-sm tw-my-2"
                  type="email"
                  placeholder="Email"
                />
                <label className="tw-text-sm tw-font-semibold tw-my-2">
                  Enter your password
                </label>
                <input
                  className="radius-lg  radius-lg rounded-md p-2 w-full border tw-border-gray-200 tw-rounded-lg  tw-text-sm"
                  type="password"
                  placeholder="Password"
                />
                <label className="tw-text-sm tw-font-semibold tw-my-2">
                  Re-enter password
                </label>
                <input
                  className="radius-lg  radius-lg rounded-md p-2 w-full border tw-border-gray-200 tw-rounded-lg  tw-text-sm"
                  type="password"
                  placeholder="Password"
                />

                <div className="tw-mt-6 tw-flex tw-justify-between">
                  <button
                    className="tw-text-xs tw-bg-transparent"
                    onClick={() => setIsSignIn(true)}
                  >
                    Have an account ? Sign In
                  </button>
                  <button className="tw-text-white tw-text-xs tw-px-10 tw-py-2 tw-bg-blue-600 tw-rounded-full">
                    Create Account
                  </button>
                </div>
              </section>
            )}
          </div>
        </dialog>
      )}
    </>
  );
}

export default LoginModal;
