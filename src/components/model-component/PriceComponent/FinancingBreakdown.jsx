'use client';

import { useState } from 'react';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import Price from '@/utils/Price';

const VariantDropDown = ({ variant, dpPercentages, durations, index, expandedIndex, handleToggle }) => {
    const [dpPercentage, setDpPercentage] = useState(20);
    const [duration, setDuration] = useState(12);

    const downPayment = (variant.price * dpPercentage) / 100;
    const installment = (variant.price - downPayment) / duration;
    const totalFirstPayment = downPayment + installment;

    return (
        <div key={index} className="border rounded-lg mb-6 transition-shadow bg-white">
            <div
                className="flex justify-between items-center p-5 bg-gradient-to-r from-gray-50 to-gray-100 cursor-pointer rounded-t-lg"
                onClick={() => handleToggle(index)}
            >
                <div>
                    <h3 className="text-xl font-semibold text-gray-900">{variant.name}</h3>
                    <p className="text-gray-700 text-2xl font-bold">
                        {variant.price > 0 ? `AED ${variant.price.toLocaleString()}` : "Price not available"}
                    </p>
                </div>
                <button className="text-gray-600">
                    {expandedIndex === index ? (
                        <ExpandLess fontSize="large" />
                    ) : (
                        <ExpandMore fontSize="large" />
                    )}
                </button>
            </div>

            {expandedIndex === index && (
                <div className="p-6 border-t bg-gray-50 rounded-b-lg">
                    {variant.price > 0 ? (
                        <>
                            <div className="flex gap-6 items-center mb-5">
                                <div className="flex flex-col w-1/2">
                                    <label className="text-sm font-medium mb-2">Down Payment (%):</label>
                                    <select
                                        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={dpPercentage}
                                        onChange={(e) => setDpPercentage(Number(e.target.value))}
                                    >
                                        {dpPercentages.map((dp) => (
                                            <option key={dp} value={dp}>{dp}%</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col w-1/2">
                                    <label className="text-sm font-medium mb-2">Duration:</label>
                                    <select
                                        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={duration}
                                        onChange={(e) => setDuration(Number(e.target.value))}
                                    >
                                        {durations.map((months) => (
                                            <option key={months} value={months}>{months / 12} years</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-y-3 border-t pt-5">
                                <p className="text-gray-500 font-medium">OTR:</p>
                                <p className="text-gray-800 font-semibold text-right"><Price data={variant.price} /></p>
                                <p className="text-gray-500 font-medium">Down Payment:</p>
                                <p className="text-gray-800 font-semibold text-right"><Price data={downPayment} /></p>
                                <p className="text-gray-500 font-medium">Installment:</p>
                                <p className="text-blue-600 font-semibold text-right"><Price data={installment} /></p>
                                <p className="text-gray-500 font-medium">Total First Payment:</p>
                                <p className="text-blue-600 font-semibold text-right"><Price data={totalFirstPayment} /></p>
                            </div>

                            <div className="mt-5 text-center">
                                <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
                                    View Offers
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-4">
                            <p className="text-gray-600">Price information is currently unavailable. Please contact us for more details.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const FinancingBreakdown = ({ vehicleName, variants }) => {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const dpPercentages = [20, 25, 30, 35];
    const durations = [12, 24, 36, 48, 60]; // 1 to 5 years in months

    const handleToggle = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="bg-white p-6 rounded-lg w-full shadow-md mx-auto mt-8">
            <h2 className="text-xl font-semibold mb-2">{vehicleName} Financing Breakdown</h2>
            <p className="text-sm text-gray-600 mb-4">Check downpayment and monthly amortization and compare rates across the variants.</p>

            {variants.map((variant, index) => (
                <VariantDropDown variant={variant} key={index} durations={durations} dpPercentages={dpPercentages} handleToggle={handleToggle} index={index} expandedIndex={expandedIndex} />
            ))}
        </div>
    );
};

export default FinancingBreakdown;
