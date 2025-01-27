import LoanInquiryForm from '@/components/loan-calculator/LoanInquireForm';
import Price from '@/utils/Price';
import React, { useEffect, useState } from 'react';

const LoanCalculator = ({ vehicleName, variants }) => {
    const [selectedVariant, setSelectedVariant] = useState(variants[0])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [P, setP] = useState(0); // Start with 0 until price is available
    const [R, setR] = useState(2.5); // Interest rate default is 2.5%
    const [N, setN] = useState(5); // Tenure in years
    const [downPayment, setDownPayment] = useState(20); // Default down payment
    const [emi, setEmi] = useState(0);
    const [downPaymentResult, setDownPaymentResult] = useState(0);
    const [payableInterest, setPayableInterest] = useState(0);
    const [totalCost, setTotalCost] = useState(0);

    // Variant price
    const price = selectedVariant?.price || 0;

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
            }
        };

        if (P > 0 && R && N) {
            calculateEMI(); // Only calculate if values are valid
        }
    }, [P, R, N, downPayment]);

    return (
        <div className="p-8 w-full rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-4">{vehicleName} Loan Calculator</h2>
            <p className="text-gray-600 mb-8">
                Use our intuitive calculator to find out how affordable your dream car can be.
            </p>

            {/* Dropdown for selecting the variant */}
            <div className="mb-6">
                <label className="block mb-2 font-semibold">Select Variant</label>
                <select
                    className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={selectedVariant?.name || ''}
                    onChange={(e) =>
                        setSelectedVariant(variants.find((v) => v.name === e.target.value))
                    }
                >
                    {variants.map((variant) => (
                        <option key={variant.name} value={variant.name}>
                            {variant.name} - <Price data={variant.price} />
                        </option>
                    ))}
                </select>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                {price > 0 ? (
                    <>
                        <div>
                            {/* Down Payment Slider */}
                            <div className="mb-6">
                                <div className="flex items-center mb-2 justify-between">
                                    <label className="block font-semibold">Down Payment</label>
                                    <div className="text-center border-2 border-gray-300 p-2 rounded-lg font-semibold text-blue-600">
                                        {downPayment}%
                                    </div>
                                </div>
                                <input
                                    type="range"
                                    min="20"
                                    max="80"
                                    step="5"
                                    value={downPayment}
                                    onChange={(e) =>
                                        setDownPayment(Number(e.target.value))
                                    }
                                    className="w-full cursor-pointer"
                                />
                            </div>

                            {/* Finance Rate Slider */}
                            <div className="mb-6">
                                <div className="flex items-center mb-2 justify-between">
                                    <label className="block font-semibold">Finance Rate</label>
                                    <div className="text-center border-2 border-gray-300 p-2 rounded-lg font-semibold text-blue-600">
                                        {R}%
                                    </div>
                                </div>
                                <input
                                    type="range"
                                    min="1.9"
                                    max="8"
                                    step="0.1"
                                    value={R}
                                    onChange={(e) => setR(Number(e.target.value))}
                                    className="w-full cursor-pointer"
                                />
                            </div>

                            {/* Finance Period Buttons */}
                            <div className="mb-8">
                                <label className="block mb-2 font-semibold">
                                    Finance Period (years)
                                </label>
                                <div className="flex gap-3 flex-wrap">
                                    {[1, 2, 3, 4, 5].map((year) => (
                                        <button
                                            key={year}
                                            className={`px-4 py-2 border rounded-lg transition-all ${N === year
                                                ? 'bg-blue-600 text-white shadow-md'
                                                : 'bg-white text-blue-600 border-blue-300 hover:bg-blue-100'
                                                }`}
                                            onClick={() => setN(year)}
                                        >
                                            {year} {year > 1 ? 'Years' : 'Year'}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Calculation Results */}
                        <div>
                            <div className="p-6 bg-blue-100 border rounded-lg shadow-lg">
                                <div className="flex justify-between items-center mb-4">
                                    <p className="font-medium text-blue-700">Down Payment:</p>
                                    <p className="font-semibold">
                                        {P ? <Price data={(price * (downPayment / 100))} /> : 0}
                                    </p>
                                </div>
                                <div className="flex justify-between items-center mb-4">
                                    <p className="font-medium text-blue-700">Finance Amount:</p>
                                    <p className="font-semibold">
                                        <Price data={emi ? emi : 0} />
                                    </p>
                                </div>
                                <div className="flex justify-between items-center border-t pt-4">
                                    <p className="font-medium text-blue-700">
                                        Total Interest:
                                    </p>
                                    <p className="font-bold text-blue-700">
                                        <Price data={payableInterest?payableInterest:0} />
                                    </p>
                                </div>
                                <button
                                    className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                                    disabled={price === 0}
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    Apply for Loan
                                </button>
                            </div>
                            <p className="text-sm text-gray-500 mt-4 italic">
                                *Rates in the calculator are indicative only. Actual rates may
                                vary.
                            </p>
                        </div>
                        <LoanInquiryForm
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            car={vehicleName+" "+selectedVariant.name}
                            price={Number(price).toLocaleString("en-US", {maximumFractionDigits:0})}
                            tenure={Number(N).toLocaleString("en-US", {maximumFractionDigits:0})}
                            interest_rate={Number((price - (price * (downPayment / 100))) * (R / 100)).toLocaleString("en-US", {maximumFractionDigits:0})}
                            down_payment={Number(price * (downPayment / 100)).toLocaleString("en-US", {maximumFractionDigits:0})}
                            monthly_emi={Number(emi).toLocaleString("en-US", { maximumFractionDigits: 0 })}
                            total_interest={Number(payableInterest).toLocaleString("en-US", { maximumFractionDigits: 0 })}
                            total_amount_payable={(totalCost).toLocaleString("en-US", { maximumFractionDigits: 0 })}
                        />
                    </>
                ) : (
                    <p className="text-center text-red-500 font-semibold">
                        The selected variant has no price. Please choose another variant to
                        proceed.
                    </p>
                )}
            </div>
        </div>
    );
};

export default LoanCalculator;
