"use client";


import Ad300x600 from "@/components/ads/Ad300x600";
import Ad728x90 from "@/components/ads/Ad728x90";
import Ad970x250 from "@/components/ads/Ad970x250";
import { Suspense, useState } from "react";
import { IoLogoWhatsapp } from "react-icons/io";
import Swal from "sweetalert2";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    emirates: "Abu Dhabi",
    vehicle: "Avatr 11",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        console.log("dataaaa", data);

        setFormData({
          name: "",
          email: "",
          phone: "",
          emirates: "Abu Dhabi",
          vehicle: "Avatr 11",
        });
        Swal.fire({
          icon: "success",
          title: data.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: error.message,
      });
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="w-full">
        <img
          className="w-full h-auto"
          src="/home/avatr-12-hero-1-scaled.webp"
          alt="avar-12"
        />
      </div>

      <a
        className="fixed bottom-8 right-8 text-green-600 text-5xl z-50"
        href="https://wa.me/971581000300"
        target="_blank"
        rel="noopener noreferrer"
      >
        <IoLogoWhatsapp />
      </a>

      <div className="container mx-auto my-12 lg:px-40 sm:px-14 px-5">
        <div className="flex flex-col lg:flex-row gap-5 justify-between">
          {/* Offer Card */}
          <div className="bg-white border-4 border-black p-8 rounded-3xl shadow-md w-full lg:w-1/3">
           <a  href="https://avatruae.com/" > <h2 className="text-lg lg:text-2xl font-semibold">AVATR Offer</h2> </a>
            <ul className="mt-6 list-disc list-inside text-xs lg:text-sm">
              <li className="mt-[10px] text-[16px] ">
                8 Years Battery Warranty (Unlimited Mileage)
              </li>
              <li className="mt-[18px] text-[16px]">
                5 Years Warranty (Unlimited Mileage)
              </li>
              <li className="mt-[18px] text-[16px]">
                3 Years / 60,000 KM Service Contract
              </li>
              <li className="mt-[18px] text-[16px] ">
                2 Years Complimentary Etisalat Connectivity
              </li>
              <li className="mt-[18px] text-[16px]">
                Free Registration, Tinting & Insurance
              </li>
              <li className="mt-[18px] text-[16px]">
                7 kWh Charger + Installation & Extra 2 kWh Portable Charger
              </li>
              <li className="mt-[18px] text-[16px]">24/7 Road Assistance</li>
            </ul>
            <a href="https://avatruae.com/?utm_source=link&utm_medium=cp&utm_campaign=traffic-backlink" className="w-full">
                <button
                  type="button"
                  className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition cursor-pointer"
                >
                 Explore Avatr
                </button>
              </a>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-lg w-full lg:w-1/2"
          >
            <label className="block text-[16px]  mt-4">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:border-black"
            />

            <label className="block text-[16px]  mt-4">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:border-black"
            />

            <label className="block text-[16px]  mt-4">Phone *</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={(e) => {
                const { name, value } = e.target;
                if (/^\d*$/.test(value) && value.length <= 10) {
                  setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                  }));
                }
              }}
              required
              maxLength={10}
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:border-black"
            />

            <label className="block  text-[16px] mt-4">Emirates</label>
            <select
              name="emirates"
              value={formData.emirates}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:border-black"
            >
              <option>Abu Dhabi</option>
              <option>Dubai</option>
              <option>Sharjah</option>
              <option>Ajman</option>
              <option>Umm Al Quwain</option>
              <option>Ras Al Khaimah</option>
              <option>Fujairah</option>
            </select>

            <label className="block text-[16px]  mt-4">Vehicle of Interest</label>
            <select
              name="vehicle"
              value={formData.vehicle}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:border-black"
            >
              <option>Avatr 11</option>
              <option>Avatr 12</option>
            </select>

            <div className="flex gap-4 mt-8">
              <a href="tel:80028287" className="w-full">
                <button
                  type="button"
                  className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition cursor-pointer"
                >
                  Call Now
                </button>
              </a>
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition cursor-pointer"
                disabled={loading}
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </div>
          </form>

          <div className="  rounded-xl w-full lg:w-1/3">
            {/* Adds content goes here */}

            <div className="hidden lg:block">
              <Suspense fallback={<div>Loading ad…</div>}>
                <Ad300x600 dataAdSlot="6087017302" />
              </Suspense>
            </div>

            {/* Lower: only on small/medium screens */}

            {/* <div className="block lg:hidden">
              <Suspense fallback={<div>Loading ad…</div>}>
                <Ad970x250 dataAdSlot="6087017302" />
              </Suspense>
            </div> */}
          </div>
        </div>

        {/* <div className=" p-8 rounded-xl w-full lg:w-1/1 my-10">
          
        </div> */}
      </div>
    </div>
  );
}
