import MainLayout from "@/src/layout/MainLayout";
import useTranslate from "@/src/utils/useTranslate";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function ContactPage() {
  const router = useRouter();
  const t = useTranslate();
  let isRtl = router.locale === "ar";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [touchedFields, setTouchedFields] = useState({
    name: false,
    email: false,
    phone: false,
    subject: false,
  });

  const [loading, setLoading] = useState(false);
  const [openThankYou, setOpenThankYou] = useState(false);

  const makeTouchedTrue = () => {
    setTouchedFields({
      name: true,
      email: true,
      phone: true,
      subject: true,
    });
  };

  useEffect(() => {
    validateForm();
  }, [name, email, phone, subject]);

  useEffect(() => {
    const loadRecaptcha = () => {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          console.log("reCAPTCHA ready");
        });
      }
    };

    if (!window.grecaptcha) {
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
      script.async = true;
      script.defer = true;
      script.onload = loadRecaptcha;
      document.body.appendChild(script);
    } else {
      loadRecaptcha();
    }
  }, []);

  const validateForm = () => {
    let errors = {};
    if (!name) {
      errors.name = t.nameRequired;
    }

    if (!touchedFields.email && !email.trim()) {
      errors.email = t.emailRequired;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = t.invalidEmail;
    }

    if (!touchedFields.phone && !phone) {
      errors.phone = t.phoneRequired;
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    makeTouchedTrue();
    validateForm();

    if (isFormValid) {
      setLoading(true);

      try {
        const token = await window.grecaptcha.execute(
          process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
          { action: "submit" }
        );

        const response = await axios.post("/api/sendContactUsMail", {
          name,
          email,
          phone,
          subject,
          recaptchaToken: token,
        });

        if (response.status === 200) {
          setOpenThankYou(true);
          setName("");
          setEmail("");
          setPhone("");
          setSubject("");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Error submitting form");
      } finally {
        setLoading(false);
      }
    } else {
      // console.log("Form is not valid:", errors);
    }
  };

  const handleCloseThankYou = () => {
    setOpenThankYou(false);
  };

  return (
    <MainLayout
      pageMeta={{
        title: "Contact Us - Carprices.ae",
        description:
          "Contact us for any inquiries, suggestions, or feedback. We are here to assist you. Reach out to CarPrices.ae - your trusted companion in the automotive world. Let's connect and make your car journey exceptional.",
        type: "Car Review Website",
      }}
    >
      {loading && (
        <div className="tw-fixed tw-inset-0 tw-flex tw-items-center tw-justify-center tw-bg-black tw-bg-opacity-50 z-[999]">
          <CircularProgress />
        </div>
      )}
      <Dialog open={openThankYou} onClose={handleCloseThankYou}>
        <DialogTitle>
          {t.thankYou}
          <IconButton
            aria-label="close"
            onClick={handleCloseThankYou}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className="p-4">
              <h1>Thank you for contacting us!</h1>
              <p>
                Your form has been successfully submitted. We will get back to
                you as soon as possible.
              </p>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseThankYou} color="primary">
            {t.close}
          </Button>
        </DialogActions>
      </Dialog>
      <div className="tw-container mx-auto">
        <div className="tw-grid tw-gap-4 tw-p-4 lg:tw-grid-rows-1 lg:tw-grid-cols-10 tw-w-full tw-container">
          <div className="tw-row-span-1 md:tw-col-span-12 tw-col-span-12 tw-flex tw-flex-col md:tw-justify-start tw-text-white tw-rounded-2xl tw-leading-[100%] tw-relative tw-overflow-hidden md:tw-h-[400px] tw-h-[200px]">
            <img
              loading="lazy"
              src="/Contact-Us.jpg"
              className="tw-object-cover tw-w-full tw-h-full tw-absolute tw-inset-0"
            />
            <div className="tw-absolute tw-inset-0 tw-bg-black tw-opacity-30"></div>
            <div className="tw-relative tw-flex tw-flex-col md:tw-px-12 tw-px-3 md:tw-pt-12 tw-pt-3 md:tw-pb-20 tw-w-full tw-h-full">
              <h1 className="tw-text-white md:tw-leading-10 tw-leading-6 tw-font-bold banner-header">
                {t.contactUs}
              </h1>
              <p className="md:tw-mt-5 tw-mt-2 md:tw-w-[50%]">
                {t.contactUsSubtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="tw-grid tw-gap-4 tw-mb-24 tw-mx-auto lg:tw-grid-cols-12 tw-w-full tw-container px-3">
        <div className="md:tw-col-span-3 tw-col-span-12 tw-p-8 tw-bg-white tw-rounded-xl tw-shadow-lg">
          <h2 className="tw-text-2xl tw-font-semibold tw-mb-4">
            Contact Details
          </h2>
          <div className="tw-flex tw-items-start tw-mb-4">
            <i className="bx bxs-map tw-text-blue-500 tw-mr-2" />
            <div className="">
              <p className="tw-font-semibold">Slipstream Holdings Limited</p>
              <p className=" mt-1">DD-15-134-004 – 007</p>
              <p className=" mt-1">Level 15, WeWork Hub71</p>
              <p className=" mt-1">Al Khatem Tower</p>
              <p className=" mt-1">Abu Dhabi Global Market Square</p>
              <p className=" mt-1">Al Maryah Island</p>
              <p className=" mt-1">Abu Dhabi, United Arab Emirates</p>
            </div>
          </div>
          <div className="tw-flex tw-items-center tw-mb-4">
            <i className="bx bxs-envelope tw-text-blue-500 tw-mr-2" />
            <Link href="mailto:info@carprices.ae">info@carprices.ae</Link>
          </div>
        </div>
        <div className="md:tw-col-span-9 tw-col-span-12 tw-bg-white tw-p-8 tw-rounded-xl tw-shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="tw-space-y-6">
              <div>
                <label className="tw-block tw-mb-2 tw-font-semibold">
                  {t.contactUsFullName}*
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setTouchedFields({ ...touchedFields, name: true });
                  }}
                  className="tw-w-full tw-p-4 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-transition tw-duration-300 focus:tw-outline-none focus:tw-border-blue-500"
                />
                {errors.name && touchedFields.name && (
                  <p className="tw-text-red-500 tw-mt-1">{errors.name}</p>
                )}
              </div>
              <div className="tw-grid tw-gap-6 md:tw-grid-cols-2">
                <div>
                  <label className="tw-block tw-mb-2 tw-font-semibold">
                    {t.contactUsPhone}*
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setTouchedFields({ ...touchedFields, phone: true });
                    }}
                    placeholder="+971-58* ** ***"
                    className="tw-w-full tw-p-4 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-transition tw-duration-300 focus:tw-outline-none focus:tw-border-blue-500"
                  />
                </div>
                <div>
                  <label className="tw-block tw-mb-2 tw-font-semibold">
                    {t.contactUsEmailL}*
                  </label>
                  <input
                    type="email"
                    placeholder="Please enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setTouchedFields({ ...touchedFields, email: true });
                    }}
                    className="tw-w-full tw-p-4 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-transition tw-duration-300 focus:tw-outline-none focus:tw-border-blue-500"
                  />
                  {errors.email && touchedFields.email && (
                    <p className="tw-text-red-500 tw-mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="tw-block tw-mb-2 tw-font-semibold">
                  Message
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    setTouchedFields({ ...touchedFields, subject: true });
                  }}
                  placeholder="Share your thoughts or questions with us"
                  className="tw-w-full tw-p-4 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-transition tw-duration-300 focus:tw-outline-none focus:tw-border-blue-500"
                />
                {errors.subject && touchedFields.subject && (
                  <p className="tw-text-red-500 tw-mt-1">{errors.subject}</p>
                )}
              </div>

              <div className="tw-mt-4">
                <button
                  type="submit"
                  className="tw-w-full tw-bg-blue-500 tw-text-white tw-py-3 tw-rounded-md tw-shadow-lg tw-transition tw-duration-300 hover:tw-bg-blue-600 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-ring-opacity-50"
                  disabled={loading}
                >
                  {t.contactUsSubmitNow}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}

export default ContactPage;
