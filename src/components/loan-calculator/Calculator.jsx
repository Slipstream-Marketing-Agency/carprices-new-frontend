"use client"
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import Image from "next/image";
import PrimaryButton from "../buttons/PrimaryButton";
import Price from "@/utils/Price";
import LoanInquiryForm from "./LoanInquireForm";
Chart.register(...registerables);

export default function Calculator({
    setShowModal,
    selectedBrand,
    selectedModel,
    selectedModelName,
    selectedYear,
    selectedVariant,
    selectedVariantThumbnail,
    price,
}) {
    const [P, setP] = useState(0); // Start with 0 until price is available
    const [R, setR] = useState(2.5); // Interest rate default is 2.5%
    const [N, setN] = useState(5); // Tenure in years
    const [downPayment, setDownPayment] = useState(20); // Default down payment
    const [emi, setEmi] = useState(0);
    const [downPaymentResult, setDownPaymentResult] = useState(0);
    const [payableInterest, setPayableInterest] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [pieData, setPieData] = useState({
        labels: ["Principal", "Interest"],
        datasets: [
            {
                data: [0, 0],
                backgroundColor: ["#EEF0FF", "blue"],
                radius: "100%",
            },
        ],
    });

    // Effect to handle when price updates from the parent component
    useEffect(() => {
        if (price !== null && price !== undefined) {
            setP(price); // When price becomes available, update P
        }
    }, [price]);

    useEffect(() => {
        const calculateEMI = () => {
            if (P > 0) {
                // Calculate principal after down payment
                const principalAmount = P - (downPayment / 100) * P;
                const r = R / 100 / 12; // Monthly interest rate
                const n = N * 12; // Loan tenure in months

                // EMI calculation formula
                const emiValue =
                    (principalAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
                setEmi(emiValue);

                const totalRepayment = emiValue * n; // Total repayment over the period
                const downPaymentAmount = (downPayment / 100) * P; // Calculate down payment
                const totalCostValue = totalRepayment + downPaymentAmount; // Total cost including down payment
                setDownPaymentResult(downPaymentAmount);
                setTotalCost(totalCostValue);
                setPayableInterest(totalRepayment - principalAmount); // Interest payable is total repayment minus principal

                // Update the pie chart data
                setPieData({
                    labels: ["Principal Amount", "Interest Amount"],
                    datasets: [
                        {
                            data: [
                                principalAmount, // Principal amount
                                totalRepayment - principalAmount, // Interest amount
                            ],
                            backgroundColor: ["#EEF0FF", "blue"],
                        },
                    ],
                });
            }
        };

        if (P > 0 && R && N) {
            calculateEMI(); // Only calculate if values are valid
        }
    }, [P, R, N, downPayment]);
    return (
        <>
            {/* Car Details Section */}
            <div className="my-6 bg-gradient-to-tl to-[#275BA7] via-[#275BA7] from-[#77cdf2] rounded-lg p-6 flex flex-col gap-3 md:flex-row justify-between items-center w-full shadow-lg">
                <div className="flex gap-3 justify-start items-center">
                    {selectedVariantThumbnail &&
                        <Image
                            src={
                                selectedVariantThumbnail
                            }
                            alt="icon-car"
                            width={95}
                            height={65}
                            className="h-20 w-36 object-contain"
                        />
                    }
                    <div>
                        <div className="text-white uppercase text-sm font-bold">
                            {selectedYear} {selectedBrand}
                        </div>
                        <div className="text-2xl lg:text-3xl font-semibold text-white">
                            {selectedModelName} {selectedVariant}
                        </div>
                    </div>
                </div>
                <button
                    onClick={setShowModal}
                    className="py-2 px-6 text-blue-600 font-semibold bg-white rounded-lg w-full md:w-auto shadow-md text-sm hover:bg-gray-100 transition-all"
                >
                    Change Car
                </button>
            </div>

            {/* Loan Calculator Section */}
            <div className="mt-0 p-5 bg-white shadow-xl rounded-3xl w-full ">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-8 text-center">
                    Car Loan EMI Calculator
                </h1>

                <div className="grid gap-8 lg:grid-cols-2 items-start">
                    {/* Input Section (Left Side) */}
                    <div className="space-y-6">
                        {/* Loan Amount */}
                        <div className="flex justify-between items-center  p-4 rounded-lg shadow-inner border">
                            <div>
                                <label className="text-gray-500 text-sm">Total Car Price</label>
                                <p className="text-2xl lg:text-3xl font-bold text-gray-800 mt-2">
                                    {P ? <Price data={price} /> : 0}
                                </p>
                            </div>
                        </div>

                        {/* Tenure */}
                        <div className="space-y-2  p-4 rounded-lg shadow-inner border">
                            <div className="flex justify-between">
                                <label className="text-gray-500 text-sm">Tenure</label>
                                <span className="">{N} years</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="5"
                                step="1"
                                value={N}
                                onChange={(e) => setN(parseFloat(e.target.value))}
                                className="w-full h-2 rounded-full bg-blue-200 cursor-pointer"
                            />
                            <div className="text-sm flex justify-between text-gray-700">
                                <span>1 year</span>
                                <span>5 years</span>
                            </div>
                        </div>

                        {/* Interest Rate */}
                        <div className="space-y-2  p-4 rounded-lg shadow-inner border">
                            <div className="flex justify-between">
                                <label className="text-gray-500 text-sm">Interest Rate</label>
                                <span>
                                    {R}% ({P ? <Price data={(price - (price * (downPayment / 100))) * (R / 100)} /> : 0} per year)
                                </span>
                            </div>
                            <input
                                type="range"
                                min="1.9"
                                max="8"
                                step="0.1"
                                value={R}
                                onChange={(e) => setR(parseFloat(e.target.value))}
                                className="w-full h-2 rounded-full bg-blue-200 cursor-pointer"
                            />
                            <div className="text-sm flex justify-between text-gray-700">
                                <span>1.9%</span>

                                <span>8%</span>
                            </div>
                        </div>

                        {/* Down Payment */}
                        <div className="space-y-2  p-4 rounded-lg shadow-inner border">
                            <div className="flex justify-between">
                                <label className="text-gray-500 text-sm">Down Payment</label>
                                <span>
                                    {downPayment}% ({P ? <Price data={(price * (downPayment / 100))} /> : 0})
                                </span>
                            </div>
                            <input
                                type="range"
                                min="20"
                                max="80"
                                step="1"
                                value={downPayment}
                                onChange={(e) => setDownPayment(parseFloat(e.target.value))}
                                className="w-full h-2 rounded-full bg-blue-200 cursor-pointer"
                            />
                            <div className="text-sm flex justify-between text-gray-700">
                                <span>20%</span>

                                <span>80%</span>
                            </div>
                        </div>
                        <PrimaryButton label="Inquire Now" additionalclassName="font-bold" onClick={() => setIsModalOpen(true)} />
                    </div>

                    {/* Doughnut Chart + Summary Section (Right Side) */}
                    <div className="flex flex-col space-y-6 items-center">
                        {/* Doughnut Chart */}
                        <div className="flex justify-center border rounded-xl py-2 w-full h-[265px]">
                            <Doughnut className="w-full h-full" data={pieData} height={300} />
                        </div>

                        {/* EMI Summary */}
                        <div className="w-full bg-blue-50 px-8 py-4 rounded-xl  text-center ">
                            <h2 className="text-xl lg:text-2xl font-bold text-gray-700 mb-6">
                                Loan Summary
                            </h2>
                            <div className="space-y-4">
                                {/* Monthly EMI */}
                                <div className="flex justify-between items-center text-sm lg:text-base text-gray-600">
                                    <span>Monthly EMI</span>
                                    <span className="font-bold text-lg lg:text-xl text-gray-800">
                                        AED {emi ? Number(emi).toLocaleString("en-US", { maximumFractionDigits: 0 }) : "0"}*
                                    </span>
                                </div>

                                {/* Total Interest */}
                                <div className="flex justify-between items-center text-sm lg:text-base text-gray-600">
                                    <span>Total Interest</span>
                                    <span className="font-bold text-lg lg:text-xl text-gray-800">
                                        AED {payableInterest ? Number(payableInterest).toLocaleString("en-US", { maximumFractionDigits: 0 }) : "0"}*
                                    </span>
                                </div>

                                {/* Total Amount Payable */}
                                <div className="bg-blue-100 rounded-md py-2 px-4 text-sm lg:text-base font-semibold text-gray-700 mt-4">
                                    Total Amount Payable
                                    <span className="text-blue-600 text-lg lg:text-xl block font-bold">
                                        AED {P && payableInterest ? (totalCost).toLocaleString("en-US", { maximumFractionDigits: 0 }) : "0"}*
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <LoanInquiryForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} car={selectedYear + " " + selectedBrand + " " + selectedModelName + " " + selectedVariant} price={price} tenure={N} interest_rate={R} down_payment={downPayment} monthly_emi={Number(emi).toLocaleString("en-US", { maximumFractionDigits: 0 })} total_interest={Number(payableInterest).toLocaleString("en-US", { maximumFractionDigits: 0 })} total_amount_payable={(totalCost).toLocaleString("en-US", { maximumFractionDigits: 0 })} />
        </>
    );
}
