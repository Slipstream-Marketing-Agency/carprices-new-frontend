"use client"

import Close from "@mui/icons-material/Close";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { Snackbar, Alert, CircularProgress } from "@mui/material"; // Import Snackbar and Alert
import { setCookie } from "@/lib/helper";

function LoginModal({ isOpen, setIsOpen, postLogin=null }) {
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
      if (postLogin) {
        postLogin()
      }
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
      if (postLogin) {
        postLogin()
      }
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
          className="fixed left-0 top-0 bottom-0 right-0 w-full h-full bg-black bg-opacity-40 overflow-auto z-10 flex justify-center items-center transition-all duration-1000 ease-in-out no-scrollbar"
          onClick={() => setIsOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()} className="absolute bg-white w-[93%]  md:w-[42%] xl:w-1/4 sm:rounded-3xl z-30 rounded-lg">
            <Close
              onClick={() => setIsOpen(false)}
              fontSize=""
              className="cursor-pointer absolute right-4 top-4"
            />
            {activeForm === 'login' && (
              <section className="p-8 flex flex-col justify-between">
                <div className="my-6">
                  <div>
                    Welcome to{" "}
                    <span className="font-semibold">CarPrices.ae</span>
                  </div>
                  <div className="font-semibold text-4xl">Sign in</div>
                </div>
                {/* <div className="bg-blue-100 space-x-4 p-2 py-3 rounded-xl mb-10 mt-6 items-center text-center cursor-pointer">
                  <Image
                    src={"https://cdn.carprices.ae/assets/google_8cfba8cae1.svg"}
                    alt="google-icon"
                    width={20}
                    height={20}
                  />
                  <span className="text-sm text-blue-800 font-semibold">
                    Sign in with Google
                  </span>
                </div> */}
                <label className="text-sm font-semibold">
                  Email/Username
                </label>
                <input
                  className="radius-lg p-2 w-full border border-gray-200 rounded-lg text-sm my-2"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email/Username"
                />
                <label className="text-sm font-semibold my-2">
                  Enter your password
                </label>
                <input
                  className="radius-lg p-2 w-full border border-gray-200 rounded-lg text-sm"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
                <div className="float-right my-6">
                  <button className="text-blue-500 bg-transparent text-xs float-right" onClick={() => setActiveForm('forget-password')}>
                    Forgot Password
                  </button>
                </div>
                <div className="mt-6 flex justify-between">
                  <button
                    className="text-xs bg-transparent"
                    onClick={() => setActiveForm('registration')}
                  >
                    No Account ? Sign up
                  </button>
                  <button
                    onClick={handleLogin}
                    className="text-white text-xs px-8 2xl:px-16 py-2 bg-blue-600 rounded-full"
                    disabled={isLoading} // Disable the button when loading
                  >
                    {isLoading ? <CircularProgress size={20} color="inherit" /> : "Sign in"}
                  </button>
                </div>
              </section>
            )}
            {activeForm === 'registration' && (
              <section className="p-8 flex flex-col justify-between">
                <div className="my-6">
                  <div>
                    Welcome to{" "}
                    <span className="font-semibold">CarPrices.ae</span>
                  </div>
                  <div className="font-semibold text-4xl">Sign up</div>
                </div>
                {/* <div className="bg-blue-100 space-x-4 p-2 py-3 rounded-xl mb-8 mt-6 items-center text-center cursor-pointer">
                  <Image
                    src={"https://cdn.carprices.ae/assets/google_8cfba8cae1.svg"}
                    alt="google-icon"
                    width={20}
                    height={20}
                  />
                  <span className="text-sm text-blue-800 font-semibold">
                    Sign up with Google
                  </span>
                </div> */}
                <label className="text-sm font-semibold">
                  Enter your Username
                </label>
                <input
                  className="radius-lg p-2 w-full border border-gray-200 rounded-lg text-sm my-2"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                />
                <label className="text-sm font-semibold">
                  Enter your email address
                </label>
                <input
                  className="radius-lg p-2 w-full border border-gray-200 rounded-lg text-sm my-2"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
                <label className="text-sm font-semibold my-2">
                  Enter your password
                </label>
                <input
                  className="radius-lg p-2 w-full border border-gray-200 rounded-lg text-sm"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
                <label className="text-sm font-semibold my-2">
                  Re-enter password
                </label>
                <input
                  className="radius-lg p-2 w-full border border-gray-200 rounded-lg text-sm"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter Password"
                />
                <div className="mt-6 flex justify-between">
                  <button
                    className="text-xs bg-transparent"
                    onClick={() => setActiveForm('login')}
                  >
                    Have an account ? Sign In
                  </button>
                  <button
                    className="text-white text-xs px-6 2xl:px-10 py-2 bg-blue-600 rounded-full"
                    onClick={handleRegister}
                    disabled={isLoading} // Disable the button when loading
                  >
                    {isLoading ? <CircularProgress size={20} color="inherit" /> : "Create Account"}
                  </button>
                </div>
              </section>
            )}
            {activeForm === 'forget-password' && (
              <section className="p-8 flex flex-col justify-between">
                <div className="my-6">
                  <div>
                    Welcome to{" "}
                    <span className="font-semibold">CarPrices.ae</span>
                  </div>
                  <div className="font-semibold text-4xl">Forget Password</div>
                </div>
                <label className="text-sm font-semibold">
                  Email
                </label>
                <input
                  className="radius-lg p-2 w-full border border-gray-200 rounded-lg text-sm my-2"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
                <div className="mt-6 flex justify-between">
                  <button
                    className="text-xs bg-transparent"
                    onClick={() => setActiveForm('login')}
                  >
                    Back to SignIn
                  </button>
                  <button
                    onClick={handleForgetPassword}
                    className="text-white text-xs px-6 2xl:px-16 py-2 bg-blue-600 rounded-full"
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
