import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import Image from "next/image";
Chart.register(...registerables);

const LoanDetails = ({ setIsOpen }) => {
  const [P, setP] = useState(33100);
  const [R, setR] = useState(1.9);
  const [N, setN] = useState(1);
  const [emi, setEmi] = useState(0);
  const [payableInterest, setPayableInterest] = useState(0);
  const [pieData, setPieData] = useState({
    labels: ["Principal", "Interest"],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ["#EEF0FF", " blue"],
        radius: "80%",
      },
    ],
  });

  useEffect(() => {
    const calculateLoanDetails = (p, r, emi) => {
      let totalInterest = 0;
      let yearlyInterest = [];
      let yearPrincipal = [];
      let years = [];
      let year = 1;
      let [counter, principal, interes] = [0, 0, 0];
      while (p > 0) {
        let interest = parseFloat(p) * parseFloat(r);
        p = parseFloat(p) - (parseFloat(emi) - interest);
        totalInterest += interest;
        principal += parseFloat(emi) - interest;
        interes += interest;
        if (++counter === 12) {
          years.push(year++);
          yearlyInterest.push(parseInt(interes));
          yearPrincipal.push(parseInt(principal));
          counter = 0;
        }
      }
      return totalInterest;
    };

    const displayDetails = () => {
      let r = parseFloat(R) / 1200;
      let n = parseFloat(N) * 12;
      let num = parseFloat(P) * r * Math.pow(1 + r, n);
      let denom = Math.pow(1 + r, n) - 1;
      let emi = parseFloat(num) / parseFloat(denom);
      setEmi(emi);

      let payabaleInterest = calculateLoanDetails(P, r, emi);
      setPayableInterest(payabaleInterest);

      setPieData({
        labels: ["Principal Amount ", "Interest Amount"],
        datasets: [
          {
            data: [P, payabaleInterest],
            // backgroundColor: ["#EEF0FF", " blue"],
            // borderWidth:1,
            // radius:"50%",
          },
        ],
      });
    };

    displayDetails();
  }, [P, R, N]);

  return (
    <>
      <div className="tw-my-2 tw-p-4 tw-bg-slate-200 tw-rounded-lg sm:tw-flex tw-justify tw-justify-between">
        <div className="tw-flex">
          <Image
            src={"/carLoanPage/bmw_change_car_icon.png"}
            alt="car-icon"
            width={90}
            height={90}
          />
          <div className="tw-mx-4">
            <div className="tw-text-blue-500 tw-text-sm tw-font-semibold">BMW</div>
            <div className="tw-text-md tw-font-semibold">M2 Coupe M Septronic</div>
          </div>
        </div>
        <div className="tw-mt-4">
          <button
            onClick={setIsOpen}
            className="tw-py-4 tw-px-12 tw-text-sm tw-bg-blue-700 tw-rounded-3xl tw-text-white tw-w-full"
          >
            Change Car
          </button>
        </div>
      </div>
      <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-mt-6">
        <div className="tw-w-full tw-p-8 tw-bg-white tw-rounded-2xl tw-border">
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
                  <p id="loan-amt-text" className="tw-text-2xl tw-font-semibold tw-mb-3">
                    AED {P.toLocaleString("en-US")}
                  </p>
                </div>
                <input
                  type="range"
                  id="loan-amount"
                  min="33100"
                  max="165500"
                  step="100"
                  value={P}
                  onChange={(e) => setP(parseFloat(e.target.value))}
                  className="tw-w-full"
                />
                <div className="tw-flex tw-justify-between tw-text-sm tw-font-thin">
                  <p>33,100</p>
                  <p id="loan-amt-text">165,500</p>
                </div>
              </div>

              {/* tenure */}
              <div className="tw-mb-12">
                <p className="tw-opacity-70 tw-text-md">Tenure</p>
                <p className="tw-text-2xl tw-font-semibold tw-mb-3">{N} years</p>
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

              {/* interest rate */}
              <div className="tw-mb-12">
                <p className="tw-opacity-70 tw-text-md">Interest Rate</p>
                <p id="interest-rate-text" className="tw-text-2xl tw-font-semibold tw-mb-3">
                  {R}%
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
            </div>
            {/* doughnut chart*/}
            <div className="sm:tw-col-span-6 sm:tw-block">
              <Doughnut className="tw-w-2/3" data={pieData} />
              <div className="tw-flex tw-text-sm sm:tw-text-base tw-justify-between tw-w-full tw-my-4">
                <div className="tw-flex tw-justify-between">
                  <p id="price-container" className="tw-opacity-70 tw-mt-0">
                    Monthly EMI
                  </p>
                  <span id="price" className="tw-mx-2 tw-font-semibold">
                    AED {emi.toFixed(2).toLocaleString("en-US")}*
                  </span>
                </div>
                <div className="tw-flex tw-justify-between">
                  <p className="tw-opacity-70 tw-mt-0">Total Interest</p>
                  <span id="ci" className="tw-mx-2 tw-font-semibold">
                    AED {payableInterest.toLocaleString("en-US")}*
                  </span>
                </div>
              </div>
              <div className="tw-text-center tw-text-sm sm:tw-text-base tw-font-semibold tw-flex tw-justify-between tw-bg-gray-100 tw-rounded-lg tw-p-6">
                <div>Total Amount Payable:</div>
                <div id="ct" className="tw-text-gray-800">
                  AED {(P + payableInterest).toLocaleString("en-US")}*
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
