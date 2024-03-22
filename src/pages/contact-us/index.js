import MainLayout from "@/src/layout/MainLayout";
import useTranslate from "@/src/utils/useTranslate";
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
      <div className="contact-page pt-50 mb-100">
        <div className="container">
          <h1 className={`mb-4 fw-bolder ${isRtl && "text-end"}`}>
            {t.contactUs}
          </h1>
          <p className={`paragraph mb-5 ${isRtl && "text-end"}`}>
            {t.contactUsSubtitle}
          </p>
          <div className="row g-4 mb-100">
     
            <div className="col-lg-12">
              <div className="inquiry-form">
                <form>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-inner mb-30">
                        <label>{t.contactUsFullName}*</label>
                        <input
                          type="text"
                          placeholder="Jackson Mile"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            touchedFields.name = true;
                          }}
                        />
                        {errors.name && touchedFields.name && (
                          <p className="text-danger">{errors.name}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-inner mb-30">
                        <label>{t.contactUsPhone}*</label>
                        <input
                          type="text"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            touchedFields.phone = true;
                          }}
                          placeholder="Ex- +971-58* ** ***"
                        />
                        {errors.phone && touchedFields.phone && (
                          <p className="text-danger">{errors.phone}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-inner mb-30">
                        <label>{t.contactUsEmailL}*</label>
                        <input
                          type="email"
                          placeholder="Ex- info@gmail.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            touchedFields.email = true;
                          }} // Mark the field as touched on change
                        />
                        {errors.email && touchedFields.email && (
                          <p className="text-danger">{errors.email}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-inner mb-30">
                        <label>{t.contactUsSubject}*</label>
                        <input
                          type="text"
                          value={subject}
                          onChange={(e) => {
                            setSubject(e.target.value);
                            touchedFields.subject = true;
                          }}
                          placeholder="Subject"
                        />
                        {errors.subject && touchedFields.subject && (
                          <p className="text-danger">{errors.subject}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-inner mb-10">
                        <label>{t.contactUsShortNotes}*</label>
                        <textarea
                          placeholder="Write Something..."
                          value={note}
                          onChange={(e) => {
                            setNote(e.target.value);
                            touchedFields.note = true;
                          }}
                        />
                        {errors.note && touchedFields.note && (
                          <p className="error text-danger">{errors.note}</p>
                        )}
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-inner">
                        <label className="d-flex align-items-center gap-1">
                          <input
                            className="termsCheckBox"
                            style={{ width: "18px" }}
                            type="checkbox"
                            checked={agreed}
                            onChange={() => {
                              handleAgreementChange(!agreed);
                              touchedFields.agreed = true;
                            }}
                          />
                          {!isRtl && (
                            <>
                              <span className="ps-1">I agree to </span>
                              <a
                                className="text-primary p-0 m-0"
                                href="/terms-and-conditions"
                              >
                                {" "}
                                terms and conditions
                              </a>
                            </>
                          )}
                          {isRtl && (
                            <>
                              <span className="ps-1">أنا أوافق على </span>
                              <a
                                className="text-primary p-0 m-0"
                                href="/terms-and-conditions"
                              >
                                الشروط والأحكام
                              </a>
                            </>
                          )}
                        </label>
                      </div>
                      {errors.agreed && touchedFields.agreed && (
                        <p className="text-danger">{errors.agreed}</p>
                      )}
                    </div>

                    <div className="col-md-12 mt-2">
                      <div className="col-md-12">
                        <div className="form-inner">
                          <button
                            type="button"
                            onClick={handleSubmit}
                            className="primary-btn3"
                          >
                            {t.contactUsSubmitNow}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </MainLayout>
  );
}

export default ContactPage;
