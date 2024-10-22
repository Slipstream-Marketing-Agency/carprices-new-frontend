import Close from "@mui/icons-material/Close";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { Snackbar, Alert, CircularProgress } from "@mui/material"; // Import Snackbar and Alert
import { setCookie } from "@/src/lib/helper";

function LoginModal({ isOpen, setIsOpen }) {
  const [isSignIn, setIsSignIn] = useState(true);
  const [activeForm, setActiveForm] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "", // Only used for registration
    code: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Close snackbar
  const handleSnackbarClose = () => setSnackbarOpen(false);

  // Helper function for handling form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // API call for registration
  const handleRegister = async () => {
    const { username, email, password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      // Show error message
      setSnackbarMessage("Password Mismatch");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return false;
    }
    setIsLoading(true); // Start loading
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}auth/local/register`,
        {
          username,
          email,
          password,
        }
      );
      // Extract the JWT and user information from the response
      const { jwt, user } = response.data;

      // Store the JWT token in a cookie for 7 days
      setCookie('jwt', jwt, 7);

      // Store only username, email, and id in the user cookie
      const userInfo = {
        username: user.username,
        email: user.email,
        id: user.id
      };

      setCookie('user', JSON.stringify(userInfo), 7);

      setSnackbarMessage("Registration Successful");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setIsOpen(false);
      // Reset formData to initial state
      setFormData({ username: "", email: "", password: "" });
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage = error.response?.data?.error?.message || "An error occurred";

      // Show error message
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false); // Stop loading
      setActiveForm('login')
    }
  };

  // API call for login
  const handleLogin = async () => {
    const { email, password } = formData;
    setIsLoading(true); // Start loading
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}auth/local`,
        {
          identifier: email,
          password,
        }
      );
      // Extract the JWT and user information from the response
      const { jwt, user } = response.data;

      // Store the JWT token in a cookie for 7 days
      setCookie('jwt', jwt, 7);

      // Store only username, email, and id in the user cookie
      const userInfo = {
        username: user.username,
        email: user.email,
        id: user.id
      };

      setCookie('user', JSON.stringify(userInfo), 7);
      setSnackbarMessage("Login Success!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setIsOpen(false);
      // Reset formData to initial state
      setFormData({ username: "", email: "", password: "" });
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage = error.response?.data?.error?.message || "An error occurred";

      // Show error message
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false); // Stop loading
      setActiveForm('login')
    }
  };

  const handleForgetPassword = async () => {
    const { email } = formData;

    setIsLoading(true); // Start loading
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}auth/forgot-password`,
        {
          email,
        }
      );

      setSnackbarMessage("Email Sent!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      // Reset formData to initial state
      setFormData({ username: "", email: "", password: "" });
      setActiveForm('login')
      setIsOpen(false)
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage = error.response?.data?.error?.message || "An error occurred";

      // Show error message
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false); // Stop loading
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <dialog
          className="tw-fixed tw-left-0 tw-top-0 tw-bottom-0 tw-right-0 tw-w-full tw-h-full tw-bg-black tw-bg-opacity-40 tw-overflow-auto tw-z-10 tw-flex tw-justify-center tw-items-center tw-transition-all tw-duration-1000 tw-ease-in-out tw-no-scrollbar"
          onClick={() => setIsOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()} className="tw-absolute tw-bg-white tw-w-[93%]  md:tw-w-[42%] xl:tw-w-1/4 sm:tw-rounded-3xl tw-z-30 tw-rounded-lg">
            <Close
              onClick={() => setIsOpen(false)}
              fontSize=""
              className="tw-cursor-pointer tw-absolute tw-right-4 tw-top-4"
            />
            {activeForm === 'login' && (
              <section className="tw-p-8 tw-flex tw-flex-col tw-justify-between">
                <div className="tw-my-6">
                  <div>
                    Welcome to{" "}
                    <span className="tw-font-semibold">CarPrices.ae</span>
                  </div>
                  <div className="tw-font-semibold tw-text-4xl">Sign in</div>
                </div>
                {/* <div className="tw-bg-blue-100 tw-space-x-4 tw-p-2 tw-py-3 tw-rounded-xl tw-mb-10 tw-mt-6 tw-items-center tw-text-center tw-cursor-pointer">
                  <Image
                    src={"https://cdn.carprices.ae/assets/google_8cfba8cae1.svg"}
                    alt="google-icon"
                    width={20}
                    height={20}
                  />
                  <span className="tw-text-sm tw-text-blue-800 tw-font-semibold">
                    Sign in with Google
                  </span>
                </div> */}
                <label className="tw-text-sm tw-font-semibold">
                  Email/Username
                </label>
                <input
                  className="radius-lg rounded-md p-2 w-full border tw-border-gray-200 tw-rounded-lg tw-text-sm tw-my-2"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email/Username"
                />
                <label className="tw-text-sm tw-font-semibold tw-my-2">
                  Enter your password
                </label>
                <input
                  className="radius-lg rounded-md p-2 w-full border tw-border-gray-200 tw-rounded-lg tw-text-sm"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
                <div className="float-right tw-my-6">
                  <button className="tw-text-blue-500 tw-bg-transparent tw-text-xs tw-float-right" onClick={() => setActiveForm('forget-password')}>
                    Forgot Password
                  </button>
                </div>
                <div className="tw-mt-6 tw-flex tw-justify-between">
                  <button
                    className="tw-text-xs tw-bg-transparent"
                    onClick={() => setActiveForm('registration')}
                  >
                    No Account ? Sign up
                  </button>
                  <button
                    onClick={handleLogin}
                    className="tw-text-white tw-text-xs tw-px-16 tw-py-2 tw-bg-blue-600 tw-rounded-full"
                    disabled={isLoading} // Disable the button when loading
                  >
                    {isLoading ? <CircularProgress size={20} color="inherit" /> : "Sign in"}
                  </button>
                </div>
              </section>
            )}
            {activeForm === 'registration' && (
              <section className="tw-p-8 tw-flex tw-flex-col tw-justify-between">
                <div className="tw-my-6">
                  <div>
                    Welcome to{" "}
                    <span className="tw-font-semibold">CarPrices.ae</span>
                  </div>
                  <div className="tw-font-semibold tw-text-4xl">Sign up</div>
                </div>
                {/* <div className="tw-bg-blue-100 tw-space-x-4 tw-p-2 tw-py-3 tw-rounded-xl tw-mb-8 tw-mt-6 tw-items-center tw-text-center tw-cursor-pointer">
                  <Image
                    src={"https://cdn.carprices.ae/assets/google_8cfba8cae1.svg"}
                    alt="google-icon"
                    width={20}
                    height={20}
                  />
                  <span className="tw-text-sm tw-text-blue-800 tw-font-semibold">
                    Sign up with Google
                  </span>
                </div> */}
                <label className="tw-text-sm tw-font-semibold">
                  Enter your Username
                </label>
                <input
                  className="radius-lg rounded-md p-2 w-full border tw-border-gray-200 tw-rounded-lg tw-text-sm tw-my-2"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                />
                <label className="tw-text-sm tw-font-semibold">
                  Enter your email address
                </label>
                <input
                  className="radius-lg rounded-md p-2 w-full border tw-border-gray-200 tw-rounded-lg tw-text-sm tw-my-2"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
                <label className="tw-text-sm tw-font-semibold tw-my-2">
                  Enter your password
                </label>
                <input
                  className="radius-lg rounded-md p-2 w-full border tw-border-gray-200 tw-rounded-lg tw-text-sm"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
                <label className="tw-text-sm tw-font-semibold tw-my-2">
                  Re-enter password
                </label>
                <input
                  className="radius-lg rounded-md p-2 w-full border tw-border-gray-200 tw-rounded-lg tw-text-sm"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter Password"
                />
                <div className="tw-mt-6 tw-flex tw-justify-between">
                  <button
                    className="tw-text-xs tw-bg-transparent"
                    onClick={() => setActiveForm('login')}
                  >
                    Have an account ? Sign In
                  </button>
                  <button
                    className="tw-text-white tw-text-xs tw-px-10 tw-py-2 tw-bg-blue-600 tw-rounded-full"
                    onClick={handleRegister}
                    disabled={isLoading} // Disable the button when loading
                  >
                    {isLoading ? <CircularProgress size={20} color="inherit" /> : "Create Account"}
                  </button>
                </div>
              </section>
            )}
            {activeForm === 'forget-password' && (
              <section className="tw-p-8 tw-flex tw-flex-col tw-justify-between">
                <div className="tw-my-6">
                  <div>
                    Welcome to{" "}
                    <span className="tw-font-semibold">CarPrices.ae</span>
                  </div>
                  <div className="tw-font-semibold tw-text-4xl">Forget Password</div>
                </div>
                <label className="tw-text-sm tw-font-semibold">
                  Email
                </label>
                <input
                  className="radius-lg rounded-md p-2 w-full border tw-border-gray-200 tw-rounded-lg tw-text-sm tw-my-2"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
                <div className="tw-mt-6 tw-flex tw-justify-between">
                  <button
                    className="tw-text-xs tw-bg-transparent"
                    onClick={() => setActiveForm('login')}
                  >
                    Back to SignIn
                  </button>
                  <button
                    onClick={handleForgetPassword}
                    className="tw-text-white tw-text-xs tw-px-16 tw-py-2 tw-bg-blue-600 tw-rounded-full"
                    disabled={isLoading} // Disable the button when loading
                  >
                    {isLoading ? <CircularProgress size={20} color="inherit" /> : "Forget Password"}
                  </button>
                </div>
              </section>
            )}
          </div>
        </dialog>
      )}

      {/* Snackbar for Success and Error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default LoginModal;
