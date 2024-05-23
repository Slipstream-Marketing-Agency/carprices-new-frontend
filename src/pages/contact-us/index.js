import MainLayout from "@/src/layout/MainLayout";
import useTranslate from "@/src/utils/useTranslate";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function ContactPage() {
  const router = useRouter();
  const t = useTranslate();
  let isRtl = router.locale === "ar";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [touchedFields, setTouchedFields] = useState({
    name: false,
    email: false,
    phone: false,
    subject: false,
    note: false,
    agreed: false,
  });

  const makeTouchedTrue = () => {
    setTouchedFields({
      name: true,
      email: true,
      phone: true,
      subject: true,
      note: true,
      agreed: true,
    });
  };

  useEffect(() => {
    validateForm();
  }, [name, email, phone, subject, note, agreed]);

  const handleAgreementChange = (isChecked) => {
    setAgreed(isChecked);
  };

  const validateForm = () => {
    let errors = {};
    if (!name) {
      errors.name = t.nameRequired;
    } else if (name.length < 3) {
      errors.name = t.nameMustBeTwo;
    }

    if (!touchedFields.email && !email.trim()) {
      errors.email = t.emailRequired;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = t.invalidEmail;
    }

    if (!touchedFields.phone && !phone) {
      errors.phone = t.phoneRequired;
    } else if (!/^\+?\d{2,}-?\d{8,}$/.test(phone)) {
      errors.phone = t.invalidPhoneNumb;
    }

    if (!subject) {
      errors.subject = t.subRequired;
    } else if (subject.length < 4) {
      errors.subject = t.subMustBe3Char;
    }

    if (!note) {
      errors.note = t.noteRequired;
    } else if (note.length < 4) {
      errors.note = t.noteMustbeMore;
    }

    if (!agreed) {
      errors.agreed = t.agreeToTerms;
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };
  // Submit
  const handleSubmit = () => {
    makeTouchedTrue();
    validateForm();
    if (isFormValid) {
      alert(t.formSubmitted);
    } else {
      // alert('Form has errors. Please correct them.');
    }
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
      <div className="tw-container mx-auto">
        <div className="tw-grid tw-gap-4 tw-p-4 lg:tw-grid-rows-1 lg:tw-grid-cols-10 tw-w-full tw-container">
          <div className="tw-row-span-1 md:tw-col-span-12 tw-col-span-12 tw-flex tw-flex-col md:tw-justify-start tw-text-white tw-rounded-2xl tw-leading-[100%] tw-relative tw-overflow-hidden md:tw-h-[400px] tw-h-[200px]">
            <img
              loading="lazy"
              src="/Contact-Us.jpg"
              className="tw-object-cover tw-w-full tw-h-full tw-absolute tw-inset-0"
            />
            <div className="tw-absolute tw-inset-0 tw-bg-black tw-opacity-30"></div>{" "}
            {/* Overlay */}
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
      <div className="tw-row tw-gap-4 tw-mb-24 tw-mx-auto md:tw-w-[70%] tw-w-[95%]">
        <div className="tw-col-lg-12">
          <div className="tw-inquiry-form tw-bg-white tw-p-8 tw-rounded-xl tw-shadow-lg">
            <form>
              <div className="tw-row tw-space-y-6">
                <div className="tw-col-md-12">
                  <div className="tw-form-inner">
                    <label className="tw-block tw-mb-2 tw-font-semibold">
                      {t.contactUsFullName}*
                    </label>
                    <input
                      type="text"
                      placeholder="Jackson Mile"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        touchedFields.name = true;
                      }}
                      className="tw-w-full tw-p-4 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-transition tw-duration-300 focus:tw-outline-none focus:tw-border-blue-500"
                    />
                    {errors.name && touchedFields.name && (
                      <p className="tw-text-red-500 tw-mt-1">{errors.name}</p>
                    )}
                  </div>
                </div>
                <div className="tw-col-md-6">
                  <div className="tw-form-inner">
                    <label className="tw-block tw-mb-2 tw-font-semibold">
                      {t.contactUsPhone}*
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        touchedFields.phone = true;
                      }}
                      placeholder="Ex- +971-58* ** ***"
                      className="tw-w-full tw-p-4 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-transition tw-duration-300 focus:tw-outline-none focus:tw-border-blue-500"
                    />
                    {errors.phone && touchedFields.phone && (
                      <p className="tw-text-red-500 tw-mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>
                <div className="tw-col-md-6">
                  <div className="tw-form-inner">
                    <label className="tw-block tw-mb-2 tw-font-semibold">
                      {t.contactUsEmailL}*
                    </label>
                    <input
                      type="email"
                      placeholder="Ex- info@gmail.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        touchedFields.email = true;
                      }}
                      className="tw-w-full tw-p-4 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-transition tw-duration-300 focus:tw-outline-none focus:tw-border-blue-500"
                    />
                    {errors.email && touchedFields.email && (
                      <p className="tw-text-red-500 tw-mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>
                <div className="tw-col-md-12">
                  <div className="tw-form-inner">
                    <label className="tw-block tw-mb-2 tw-font-semibold">
                      {t.contactUsSubject}*
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => {
                        setSubject(e.target.value);
                        touchedFields.subject = true;
                      }}
                      placeholder="Subject"
                      className="tw-w-full tw-p-4 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-transition tw-duration-300 focus:tw-outline-none focus:tw-border-blue-500"
                    />
                    {errors.subject && touchedFields.subject && (
                      <p className="tw-text-red-500 tw-mt-1">
                        {errors.subject}
                      </p>
                    )}
                  </div>
                </div>
                <div className="tw-col-md-12">
                  <div className="tw-form-inner">
                    <label className="tw-block tw-mb-2 tw-font-semibold">
                      {t.contactUsShortNotes}*
                    </label>
                    <textarea
                      placeholder="Write Something..."
                      value={note}
                      onChange={(e) => {
                        setNote(e.target.value);
                        touchedFields.note = true;
                      }}
                      className="tw-w-full tw-p-4 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-transition tw-duration-300 focus:tw-outline-none focus:tw-border-blue-500"
                    />
                    {errors.note && touchedFields.note && (
                      <p className="tw-text-red-500 tw-mt-1">{errors.note}</p>
                    )}
                  </div>
                </div>
                <div className="tw-col-md-12">
                  <div className="tw-form-inner">
                    <label className="tw-flex tw-items-center tw-gap-2">
                      <input
                        className="tw-termsCheckBox tw-w-5 tw-h-5 tw-border tw-border-gray-300 tw-rounded tw-transition tw-duration-300 focus:tw-outline-none focus:tw-border-blue-500"
                        type="checkbox"
                        checked={agreed}
                        onChange={() => {
                          handleAgreementChange(!agreed);
                          touchedFields.agreed = true;
                        }}
                      />
                      {!isRtl && (
                        <>
                          <span className="tw-ps-1">I agree to </span>
                          <a
                            className="tw-text-blue-500 tw-underline"
                            href="/terms-and-conditions"
                          >
                            terms and conditions
                          </a>
                        </>
                      )}
                      {isRtl && (
                        <>
                          <span className="tw-ps-1">أنا أوافق على </span>
                          <a
                            className="tw-text-blue-500 tw-underline"
                            href="/terms-and-conditions"
                          >
                            الشروط والأحكام
                          </a>
                        </>
                      )}
                    </label>
                  </div>
                  {errors.agreed && touchedFields.agreed && (
                    <p className="tw-text-red-500 tw-mt-1">{errors.agreed}</p>
                  )}
                </div>
                <div className="tw-col-md-12 tw-mt-4">
                  <div className="tw-form-inner">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="tw-w-full tw-bg-blue-500 tw-text-white tw-py-3 tw-rounded-md tw-shadow-lg tw-transition tw-duration-300 hover:tw-bg-blue-600 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-ring-opacity-50"
                    >
                      {t.contactUsSubmitNow}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default ContactPage;
