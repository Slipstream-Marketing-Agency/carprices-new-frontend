'use client'

import React, { useState, useEffect } from "react";

const CookiePopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsVisible(false);
  };
  const handleDismiss = () => {
    localStorage.setItem("cookieConsent", "false");
    setIsVisible(false);
  };

  const handleLearnMore = () => {
    window.open("/privacy", "_blank"); // Redirect to the privacy policy page
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-5 left-5 right-5 bg-white text-black p-6 rounded-lg shadow-lg z-50 md:left-10 md:right-10 md:bottom-10 border border-gray-300">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h4 className="text-xl font-bold text-blue-600 mb-2">
            Your Privacy Matters
          </h4>
          <p className="text-sm text-gray-600">
            We use cookies to personalize content, analyze traffic, and provide a seamless browsing experience. By clicking &quot;Accept All,&quot; you consent to our use of cookies.{" "}
            <button
              onClick={handleLearnMore}
              className="text-blue-600 underline hover:no-underline"
            >
              Learn More
            </button>
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleAccept}
            className="bg-blue-600 w-36 text-white font-medium px-6 py-2 rounded-md hover:bg-opacity-90 transition"
          >
            Accept All
          </button>
          <button
            onClick={handleDismiss}
            className="bg-gray-100 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-200 transition"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookiePopup;
