"use client"
import useTranslate from '@/utils/UseTranslate';
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
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import React, { useEffect, useState } from 'react'
import Image from "next/image";
import Link from 'next/link';
import axios from 'axios';

export default function ContactForm() {
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
        <>{loading && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999]">
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
            <div className="container mx-auto">
                <div className="grid gap-4 p-4 lg:grid-rows-1 lg:grid-cols-10 w-full container">
                    <div className="row-span-1 md:col-span-12 col-span-12 flex flex-col md:justify-start text-white rounded-2xl leading-[100%] relative overflow-hidden !sm:h-auto md:h-[400px] pb-4">
                        <Image
                            loading="lazy"
                            alt="contact-us-banner"
                            width={0}
                            height={0}
                            src="/Contact-Us.jpg"
                            className="object-cover w-full h-full absolute inset-0"
                        />
                        <div className="absolute inset-0 bg-black opacity-30"></div>
                        <div className="relative flex flex-col md:px-12 px-3 md:pt-12 pt-3 md:pb-20 w-full h-full">
                            <h1 className="md:text-2xl text-xl text-white md:leading-10 leading-6 font-bold banner-header">
                                {t.contactUs}
                            </h1>
                            <p className="md:mt-5 mt-2 md:w-[50%]">
                                {t.contactUsSubtitle}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid gap-4 mb-24 mx-auto lg:grid-cols-12 w-full container px-3">
                <div className="md:col-span-3 col-span-12 p-8 bg-white rounded-xl shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">
                        Contact Details
                    </h2>
                    <div className="flex items-start mb-4">
                        <i className="bx bxs-map text-blue-500 " />
                        <div className="">
                            <p className="font-semibold">Slipstream Holdings Limited</p>
                            <p className=" mt-1">DD-15-134-004 – 007</p>
                            <p className=" mt-1">Level 15, WeWork Hub71</p>
                            <p className=" mt-1">Al Khatem Tower</p>
                            <p className=" mt-1">Abu Dhabi Global Market Square</p>
                            <p className=" mt-1">Al Maryah Island</p>
                            <p className=" mt-1">Abu Dhabi, United Arab Emirates</p>
                        </div>
                    </div>
                    <div className="flex items-center mb-4">
                        <i className="bx bxs-envelope text-blue-500 " />
                        <Link href="mailto:info@carprices.ae">info@carprices.ae</Link>
                    </div>
                </div>
                <div className="md:col-span-9 col-span-12 bg-white p-8 rounded-xl shadow-lg">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <div>
                                <label className="block mb-2 font-semibold">
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
                                    className="w-full p-4 border border-gray-300 rounded-md shadow-sm transition duration-300 focus:outline-none focus:border-blue-500"
                                />
                                {errors.name && touchedFields.name && (
                                    <p className="text-red-500 mt-1">{errors.name}</p>
                                )}
                            </div>
                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <label className="block mb-2 font-semibold">
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
                                        className="w-full p-4 border border-gray-300 rounded-md shadow-sm transition duration-300 focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 font-semibold">
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
                                        className="w-full p-4 border border-gray-300 rounded-md shadow-sm transition duration-300 focus:outline-none focus:border-blue-500"
                                    />
                                    {errors.email && touchedFields.email && (
                                        <p className="text-red-500 mt-1">{errors.email}</p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="block mb-2 font-semibold">
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
                                    className="w-full p-4 border border-gray-300 rounded-md shadow-sm transition duration-300 focus:outline-none focus:border-blue-500"
                                />
                                {errors.subject && touchedFields.subject && (
                                    <p className="text-red-500 mt-1">{errors.subject}</p>
                                )}
                            </div>

                            <div className="mt-4">
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white py-3 rounded-md shadow-lg transition duration-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                    disabled={loading}
                                >
                                    {t.contactUsSubmitNow}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div></>
    )
}
