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
  selectedYear,
  selectedVariant,
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
      <div className="tw-my-2 tw-p-4 tw-bg-slate-200 tw-rounded-lg sm:tw-flex tw-justify tw-justify-between">
        <div className="tw-flex tw-items-center">
          {/* <Image
            src={"/carLoanPage/bmw_change_car_icon.png"}
            alt="car-icon"
            width={90}
            height={90}
            className="tw-object-contain"
          /> */}
          <div className="tw-mx-4">
            <div className="tw-text-blue-500 tw-text-sm tw-font-semibold tw-capitalize">
              {selectedYear} {selectedBrand}
            </div>
            <div className="tw-text-md tw-font-semibold">
              {selectedModel} {selectedVariant}
            </div>
          </div>
        </div>
        <div className="tw-mt-4">
          <button
            onClick={setShowModal}
            className="tw-py-4 tw-px-12 tw-text-sm tw-bg-blue-700 tw-rounded-3xl tw-text-white tw-w-full"
          >
            Change Car
          </button>
        </div>
      </div>
      <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-mt-6">
        <div className="tw-w-full  tw-bg-white tw-rounded-2xl tw-border">
          <div className="tw-flex tw-justify-between tw-items-center tw-mb-10">
            <h1 className="tw-text-2xl tw-font-semibold">
              Car Loan EMI Calculator
            </h1>
          </div>
          <div className="tw-grid tw-gap-16 sm:tw-grid-cols-12">
            <div className="sm:tw-col-span-6 sm:tw-block">
              <div className="tw-mb-12">
                <div>
                  <p className="tw-opacity-70 tw-text-md">Loan Amount</p>
                  <p
                    id="loan-amt-text"
                    className="tw-text-2xl tw-font-semibold tw-mb-3"
                  >
                    {P ? <Price data={price} /> : 0}
                  </p>
                </div>
              </div>
              {/* Tenure */}
              <div className="tw-mb-12">
                <p className="tw-opacity-70 tw-text-md">Tenure</p>
                <p className="tw-text-2xl tw-font-semibold tw-mb-3">
                  {N ? N : "0"} years
                </p>
                <input
                  type="range"
                  id="loan-period"
                  min="1"
                  max="5"
                  step="1"
                  value={N}
                  onChange={(e) => setN(parseFloat(e.target.value))}
                  className="tw-w-full"
                />
                <div className="tw-flex tw-justify-between tw-text-sm tw-font-thin">
                  <p>1</p>
                  <p>5</p>
                </div>
              </div>

              {/* Interest rate */}
              <div className="tw-mb-12">
                <p className="tw-opacity-70 tw-text-md">Interest Rate</p>
                <p
                  id="interest-rate-text"
                  className="tw-text-2xl tw-font-semibold tw-mb-3"
                >
                  {R ? R : "0"}%
                </p>
                <input
                  type="range"
                  id="interest-rate"
                  min="1.9"
                  max="8"
                  step="0.1"
                  value={R}
                  onChange={(e) => setR(parseFloat(e.target.value))}
                  className="tw-w-full"
                />
                <div className="tw-flex tw-justify-between tw-text-sm tw-font-thin">
                  <p>1.9%</p>
                  <p id="loan-amt-text">8%</p>
                </div>
              </div>

              {/* Down Payment */}
              <div className="tw-mb-12">
                <p className="tw-opacity-70 tw-text-md">Down Payment (%)</p>
                <p className="tw-text-2xl tw-font-semibold tw-mb-3">
                  {downPayment ? downPayment : "0"}%
                </p>
                <input
                  type="range"
                  id="down-payment"
                  min="20"
                  max="80"
                  step="1"
                  value={downPayment}
                  onChange={(e) => setDownPayment(parseFloat(e.target.value))}
                  className="tw-w-full"
                />
                <div className="tw-flex tw-justify-between tw-text-sm tw-font-thin">
                  <p>20%</p>
                  <p>80%</p>
                </div>
              </div>
            </div>

            {/* Doughnut Chart */}
            <div className="sm:tw-col-span-6 sm:tw-block">
              <Doughnut className="tw-w-2/3" data={pieData} />
              <div className="tw-flex tw-text-sm sm:tw-text-base tw-justify-between tw-w-full tw-my-4">
                <div className="tw-flex tw-justify-between">
                  <p id="price-container" className="tw-opacity-70 tw-mt-0">
                    Monthly EMI
                  </p>
                  <span id="price" className="tw-mx-2 tw-font-semibold">
                    AED {emi ? emi.toFixed(2).toLocaleString("en-US") : "0"}*
                  </span>
                </div>
                <div className="tw-flex tw-justify-between">
                  <p className="tw-opacity-70 tw-mt-0">Total Interest</p>
                  <span id="ci" className="tw-mx-2 tw-font-semibold">
                    AED{" "}
                    {payableInterest
                      ? payableInterest.toLocaleString("en-US")
                      : "0"}
                    *
                  </span>
                </div>
              </div>
              <div className="tw-text-center tw-text-sm sm:tw-text-base tw-font-semibold tw-flex tw-justify-between tw-bg-gray-100 tw-rounded-lg tw-p-6">
                <div>Total Amount Payable:</div>
                <div id="ct" className="tw-text-gray-800">
                  AED{" "}
                  {P && payableInterest
                    ? (P + payableInterest).toLocaleString("en-US")
                    : "0"}
                  *
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
