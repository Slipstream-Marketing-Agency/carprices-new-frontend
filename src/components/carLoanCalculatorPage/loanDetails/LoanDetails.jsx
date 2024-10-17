import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import Image from "next/image";
import Price from "@/src/utils/Price";
Chart.register(...registerables);

const LoanDetails = ({
  setShowModal,
  selectedBrand,
  selectedModel,
  selectedModelName,
  selectedYear,
  selectedVariant,
  selectedVariantThumbnail,
  price, // this comes from the parent
}) => {
  const [P, setP] = useState(0); // Start with 0 until price is available
  const [R, setR] = useState(2.5); // Interest rate default is 2.5%
  const [N, setN] = useState(5); // Tenure in years
  const [downPayment, setDownPayment] = useState(20); // Default down payment
  const [emi, setEmi] = useState(0);
  const [downPaymentResult, setDownPaymentResult] = useState(0);
  const [payableInterest, setPayableInterest] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [pieData, setPieData] = useState({
    labels: ["Principal", "Interest"],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ["#EEF0FF", "blue"],
        radius: "80%",
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
      <div className="tw-my-6 tw-bg-gradient-to-tl tw-to-[#275BA7] tw-via-[#275BA7] tw-from-[#77cdf2] tw-rounded-lg tw-p-6 tw-flex tw-flex-col tw-gap-3 md:tw-flex-row tw-justify-between tw-items-center tw-w-full tw-shadow-lg">
        <div className="tw-flex tw-gap-3 tw-justify-start tw-items-end">
          {selectedVariantThumbnail &&
            <Image
              src={
                selectedVariantThumbnail
              }
              alt="icon-car"
              width={85}
              height={65}
              className="tw-bg-white tw-h-20 tw-w-28"
            />
          }
          <div>
            <div className="tw-text-white tw-uppercase tw-text-sm tw-font-bold">
              {selectedYear} {selectedBrand}
            </div>
            <div className="tw-text-2xl lg:tw-text-3xl tw-font-semibold tw-text-white">
              {selectedModelName} {selectedVariant}
            </div>
          </div>
        </div>
        <button
          onClick={setShowModal}
          className="tw-py-2 tw-px-6 tw-text-blue-600 tw-font-semibold tw-bg-white tw-rounded-lg tw-w-full md:tw-w-auto tw-shadow-md tw-text-sm hover:tw-bg-gray-100 tw-transition-all"
        >
          Change Car
        </button>
      </div>

      {/* Loan Calculator Section */}
      <div className="tw-mt-8 tw-p-10 tw-bg-white tw-shadow-xl tw-rounded-3xl tw-w-full tw-max-w-6xl tw-mx-auto">
        <h1 className="tw-text-3xl lg:tw-text-4xl tw-font-bold tw-text-gray-800 tw-mb-8 tw-text-center">
          Car Loan EMI Calculator
        </h1>

        <div className="tw-grid tw-gap-8 lg:tw-grid-cols-2 tw-items-start">
          {/* Input Section (Left Side) */}
          <div className="tw-space-y-6">
            {/* Loan Amount */}
            <div className="tw-flex tw-justify-between tw-items-center tw-bg-gray-50 tw-p-4 tw-rounded-lg tw-shadow-inner tw-border">
              <div>
                <label className="tw-text-gray-500 tw-text-sm">Total Car Price</label>
                <p className="tw-text-2xl lg:tw-text-3xl tw-font-bold tw-text-gray-800 tw-mt-2">
                  {P ? <Price data={price} /> : 0}
                </p>
              </div>
            </div>

            {/* Tenure */}
            <div className="tw-space-y-2 tw-bg-gray-50 tw-p-4 tw-rounded-lg tw-shadow-inner tw-border">
              <div className="tw-flex tw-justify-between">
                <label className="tw-text-gray-500 tw-text-sm">Tenure</label>
                <span className="">{N} years</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={N}
                onChange={(e) => setN(parseFloat(e.target.value))}
                className="tw-w-full tw-h-2 tw-rounded-full tw-bg-blue-200 tw-cursor-pointer"
              />
              <div className="tw-text-sm tw-flex tw-justify-between tw-text-gray-700">
                <span>1 year</span>
                <span>5 years</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="tw-space-y-2 tw-bg-gray-50 tw-p-4 tw-rounded-lg tw-shadow-inner tw-border">
              <div className="tw-flex tw-justify-between">
                <label className="tw-text-gray-500 tw-text-sm">Interest Rate</label>
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
                className="tw-w-full tw-h-2 tw-rounded-full tw-bg-blue-200 tw-cursor-pointer"
              />
              <div className="tw-text-sm tw-flex tw-justify-between tw-text-gray-700">
                <span>1.9%</span>

                <span>8%</span>
              </div>
            </div>

            {/* Down Payment */}
            <div className="tw-space-y-2 tw-bg-gray-50 tw-p-4 tw-rounded-lg tw-shadow-inner tw-border">
            <div className="tw-flex tw-justify-between">
                <label className="tw-text-gray-500 tw-text-sm">Down Payment</label>
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
                className="tw-w-full tw-h-2 tw-rounded-full tw-bg-blue-200 tw-cursor-pointer"
              />
              <div className="tw-text-sm tw-flex tw-justify-between tw-text-gray-700">
                <span>20%</span>
                
                <span>80%</span>
              </div>
            </div>
          </div>

          {/* Doughnut Chart + Summary Section (Right Side) */}
          <div className="tw-flex tw-flex-col tw-space-y-6 tw-items-center">
            {/* Doughnut Chart */}
            <div className="tw-w-full tw-max-w-xs tw-mx-auto tw-shadow-md tw-rounded-full tw-p-6 tw-bg-white">
              <Doughnut className="tw-w-full tw-h-full" data={pieData} />
            </div>

            {/* EMI Summary */}
            <div className="tw-bg-blue-50 tw-p-8 tw-rounded-xl tw-shadow-lg tw-text-center">
              <h2 className="tw-text-xl lg:tw-text-2xl tw-font-bold tw-text-gray-700 tw-mb-6">
                Loan Summary
              </h2>
              <div className="tw-space-y-4">
                {/* Monthly EMI */}
                <div className="tw-flex tw-justify-between tw-items-center tw-text-sm lg:tw-text-base tw-text-gray-600">
                  <span>Monthly EMI</span>
                  <span className="tw-font-bold tw-text-lg lg:tw-text-xl tw-text-gray-800">
                    AED {emi ? Number(emi).toLocaleString("en-US", { maximumFractionDigits: 0 }) : "0"}*
                  </span>
                </div>

                {/* Total Interest */}
                <div className="tw-flex tw-justify-between tw-items-center tw-text-sm lg:tw-text-base tw-text-gray-600">
                  <span>Total Interest</span>
                  <span className="tw-font-bold tw-text-lg lg:tw-text-xl tw-text-gray-800">
                    AED {payableInterest ? Number(payableInterest).toLocaleString("en-US", { maximumFractionDigits: 0 }) : "0"}*
                  </span>
                </div>

                {/* Total Amount Payable */}
                <div className="tw-bg-blue-100 tw-rounded-md tw-py-2 tw-px-4 tw-text-sm lg:tw-text-base tw-font-semibold tw-text-gray-700 tw-mt-4">
                  Total Amount Payable
                  <span className="tw-text-blue-600 tw-text-lg lg:tw-text-xl tw-block tw-font-bold">
                    AED {P && payableInterest ? (P + payableInterest).toLocaleString("en-US", { maximumFractionDigits: 0 }) : "0"}*
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoanDetails;
