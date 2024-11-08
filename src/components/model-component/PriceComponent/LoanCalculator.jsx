import React, { useState } from 'react';

const LoanCalculator = ({ vehicleName, variants }) => {
    const [selectedVariant, setSelectedVariant] = useState(variants[0]);
    const [downPaymentPercentage, setDownPaymentPercentage] = useState(25);
    const [financeRate, setFinanceRate] = useState(5);
    const [financePeriod, setFinancePeriod] = useState(5);

    // Calculate values only if the price is greater than 0
    const price = selectedVariant.price;
    const downPayment = price > 0 ? (price * downPaymentPercentage) / 100 : 0;
    const financeAmount = price > 0 ? price - downPayment : 0;
    const monthlyRepayment =
        price > 0 ? (financeAmount * (1 + (financeRate / 100) * financePeriod)) / (financePeriod * 12) : 0;

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
                    value={selectedVariant.name}
                    onChange={(e) => setSelectedVariant(variants.find(v => v.name === e.target.value))}
                >
                    {variants.map((variant) => (
                        <option key={variant.name} value={variant.name}>
                            {variant.name} - AED {variant.price.toLocaleString()}
                        </option>
                    ))}
                </select>
            </div>

            <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-6'>
                {price > 0 ? (
                    <>
                        <div>
                            {/* Down Payment Slider */}
                            <div className="mb-6">
                                <div className='flex items-center mb-2 justify-between'>
                                    <label className="block font-semibold">Down Payment</label>
                                    <div className="text-center border-2 border-gray-300 p-2 rounded-lg font-semibold text-blue-600">{downPaymentPercentage}%</div>
                                </div>
                                <input
                                    type="range"
                                    min="10"
                                    max="60"
                                    step="5"
                                    value={downPaymentPercentage}
                                    onChange={(e) => setDownPaymentPercentage(Number(e.target.value))}
                                    className="w-full cursor-pointer"
                                />
                            </div>

                            {/* Finance Rate Slider */}
                            <div className="mb-6">
                                <div className='flex items-center mb-2 justify-between'>
                                    <label className="block font-semibold">Finance Rate</label>
                                    <div className="text-center border-2 border-gray-300 p-2 rounded-lg font-semibold text-blue-600">{financeRate.toFixed(1)}%</div>
                                </div>
                                <input
                                    type="range"
                                    min="2"
                                    max="36"
                                    step="1"
                                    value={financeRate}
                                    onChange={(e) => setFinanceRate(Number(e.target.value))}
                                    className="w-full cursor-pointer"
                                />

                            </div>

                            {/* Finance Period Buttons */}
                            <div className="mb-8">
                                <label className="block mb-2 font-semibold">Finance Period (years)</label>
                                <div className="flex gap-3 flex-wrap">
                                    {[1, 2, 3, 4, 5, 6, 7].map((year) => (
                                        <button
                                            key={year}
                                            className={`px-4 py-2 border rounded-lg transition-all ${financePeriod === year
                                                ? 'bg-blue-600 text-white shadow-md'
                                                : 'bg-white text-blue-600 border-blue-300 hover:bg-blue-100'
                                                }`}
                                            onClick={() => setFinancePeriod(year)}
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
                                    <p className="font-semibold">AED {downPayment.toFixed(0).toLocaleString()}</p>
                                </div>
                                <div className="flex justify-between items-center mb-4">
                                    <p className="font-medium text-blue-700">Finance Amount:</p>
                                    <p className="font-semibold">AED {financeAmount.toFixed(0).toLocaleString()}</p>
                                </div>
                                <div className="flex justify-between items-center border-t pt-4">
                                    <p className="font-medium text-blue-700">Monthly Repayment (EMI):</p>
                                    <p className="font-bold text-blue-700">AED {monthlyRepayment.toFixed(0).toLocaleString()}</p>
                                </div>
                                <button
                                    className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                                    disabled={price === 0}
                                >
                                    Apply for Loan
                                </button>
                            </div>
                            <p className="text-sm text-gray-500 mt-4 italic">
                                *Rates in the calculator are indicative only. Actual rates may vary.
                            </p>
                        </div>
                    </>
                ) : (
                    <p className="text-center text-red-500 font-semibold">
                        The selected variant has no price. Please choose another variant to proceed.
                    </p>
                )}
            </div>
        </div>
    );
};

export default LoanCalculator;
