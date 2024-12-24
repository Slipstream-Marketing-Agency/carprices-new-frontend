"use client";
import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default function SimpleLoanCalculator() {
    const [P, setP] = useState(100000); // Loan amount
    const [R, setR] = useState(5); // Interest rate
    const [N, setN] = useState(3); // Tenure in years
    const [downPayment, setDownPayment] = useState(10); // Down payment percentage
    const [emi, setEmi] = useState(0);
    const [payableInterest, setPayableInterest] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [pieData, setPieData] = useState({
        labels: ["Principal", "Interest"],
        datasets: [
            {
                data: [0, 0],
                backgroundColor: ["#EEF0FF", "blue"],
            },
        ],
    });

    // Calculate loan details
    useEffect(() => {
        const calculateEMI = () => {
            const principalAmount = P - (downPayment / 100) * P;
            const monthlyRate = R / 100 / 12;
            const totalMonths = N * 12;

            // EMI formula
            const emiValue =
                (principalAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
                (Math.pow(1 + monthlyRate, totalMonths) - 1);
            setEmi(emiValue);

            const totalRepayment = emiValue * totalMonths;
            const totalInterest = totalRepayment - principalAmount;
            const totalPayable = totalRepayment + (downPayment / 100) * P;

            setPayableInterest(totalInterest);
            setTotalCost(totalPayable);

            setPieData({
                labels: ["Principal Amount", "Interest Amount"],
                datasets: [
                    {
                        data: [principalAmount, totalInterest],
                        backgroundColor: ["#EEF0FF", "blue"],
                    },
                ],
            });
        };

        if (P > 0 && R > 0 && N > 0) {
            calculateEMI();
        }
    }, [P, R, N, downPayment]);

    return (
        <div className="p-6 bg-white shadow-xl rounded-3xl w-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Simple Loan Calculator
            </h1>

            <div className="grid gap-8 lg:grid-cols-2 items-start">
                {/* Input Section */}
                <div className="space-y-6">
                    {/* Loan Amount */}
                    <div className="p-4 border rounded-lg shadow-inner">
                        <label className="text-gray-500 text-sm">Loan Amount</label>
                        <input
                            type="number"
                            value={P}
                            onChange={(e) => setP(parseFloat(e.target.value))}
                            className="w-full mt-2 p-2 border rounded"
                        />
                    </div>

                    {/* Tenure */}
                    <div className="p-4 border rounded-lg shadow-inner">
                        <label className="text-gray-500 text-sm">Tenure (Years)</label>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            step="1"
                            value={N}
                            onChange={(e) => setN(parseFloat(e.target.value))}
                            className="w-full mt-2"
                        />
                        <div className="text-sm flex justify-between text-gray-700 mt-1">
                            <span>1 year</span>
                            <span>{N} years</span>
                            <span>10 years</span>
                        </div>
                    </div>

                    {/* Interest Rate */}
                    <div className="p-4 border rounded-lg shadow-inner">
                        <label className="text-gray-500 text-sm">Interest Rate (%)</label>
                        <input
                            type="number"
                            value={R}
                            onChange={(e) => setR(parseFloat(e.target.value))}
                            className="w-full mt-2 p-2 border rounded"
                        />
                    </div>

                    {/* Down Payment */}
                    <div className="p-4 border rounded-lg shadow-inner">
                        <label className="text-gray-500 text-sm">Down Payment (%)</label>
                        <input
                            type="range"
                            min="0"
                            max="50"
                            step="1"
                            value={downPayment}
                            onChange={(e) => setDownPayment(parseFloat(e.target.value))}
                            className="w-full mt-2"
                        />
                        <div className="text-sm flex justify-between text-gray-700 mt-1">
                            <span>0%</span>
                            <span>{downPayment}%</span>
                            <span>50%</span>
                        </div>
                    </div>
                </div>

                {/* Doughnut Chart + Summary */}
                <div className="space-y-6 items-center">
                    {/* Doughnut Chart */}
                    <div className="flex justify-center border rounded-xl py-2 w-full h-[265px]">
                        <Doughnut className="w-full h-full" data={pieData} height={300} />
                    </div>

                    {/* Summary */}
                    <div className="w-full bg-blue-50 px-8 py-4 rounded-xl text-center">
                        <h2 className="text-xl font-bold text-gray-700 mb-6">Loan Summary</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span>Monthly EMI</span>
                                <span className="font-bold text-lg">AED {emi.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Total Interest</span>
                                <span className="font-bold text-lg">AED {payableInterest.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Total Amount Payable</span>
                                <span className="font-bold text-lg">AED {totalCost.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
