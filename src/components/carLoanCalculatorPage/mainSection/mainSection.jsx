import { useState, useEffect } from "react";
import Modal from "../modal/Modal";
import LoanDetails from "../loanDetails/LoanDetails";
import DimensionSection from "../dimensionsSection/DimensionSection";
import FrequentlySearched from "../frequentlySearched/FrequentlySearched";
import { carLoanPage } from "@/src/mocks/labels";
import BannerSection from "../bannerSection/bannerSection";

function MainSection() {
  const [carSelected, setCarSelected] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <div className="">
      <div className="tw-text-4xl tw-leading-loose tw-text-lightgray ">
        {carLoanPage.heading1}
      </div>
      <div className="tw-para tw-text-lightgray">{carLoanPage.para1}</div>
      {isOpen && (
        <Modal
          modal={isOpen}
          setIsOpen={setIsOpen}
          setCarSelected={setCarSelected}
        />
      )}

      {/* bannersection */}
      {carSelected ? (
        <LoanDetails setIsOpen={setIsOpen} />
      ) : (
        <BannerSection
          modal={isOpen}
          setIsOpen={setIsOpen}
          setCarSelected={setCarSelected}
        />
      )}
      {/* section2 */}
      <div>
        <h2 className="tw-mt-8 tw-mb-3 tw-font-medium tw-text-2xl  tw-text-lightgray">
          {carLoanPage.Heading2}
        </h2>
        <div className="tw-grid tw-para tw-gap-2">
          <p className="tw-mt-1">
            When it comes to financing your dream car in the UAE, securing a car
            loan is a common route taken by many residents and expatriates
            alike. Car ownership is a symbol of status and convenience in the
            Emirates, and obtaining the right car loan can make it easily
            attainable. The allure of owning a car in the UAE, with its
            well-maintained roads and world-class infrastructure, is a dream
            shared by many residents and expatriates alike. However, the reality
            is that purchasing a car in the UAE often requires a substantial
            financial commitment, and that's where a car loan can make all the
            difference.
          </p>
          <h2 className="tw-mt-1 tw-font-medium">Car Loan EMI and Downpayment</h2>
          <h4 className="tw-mt-1 tw-font-medium">
            Interest Rate and Monthly Installment
          </h4>
          <p className="tw-mt-2">
            Interest rates play a pivotal role in determining the cost of your
            car loan. Typically, car loan interest rates in the UAE can vary
            depending on the lender and the prevailing market conditions.
            Therefore, it's essential to compare interest rates across different
            financial institutions to secure the most favorable deal. Lower
            interest rates translate to reduced monthly installments, which
            means less financial strain over the loan tenure. By doing your
            research and finding the best interest rate, you can optimize your
            car loan for affordability.
          </p>
          <h4 className="tw-mt-1 tw-font-medium">
            Loan Installment and Downpayment Variability on Car Finance
          </h4>
          <p className="tw-mt-2">
            Car loan providers in the UAE offer various loan tenures and down
            payment options, allowing you to choose the one that aligns with
            your financial goals. Whether you prefer a shorter loan tenure with
            higher EMI instalments or a longer tenure with lower monthly
            payments, the flexibility offered by car loan providers ensures you
            can adapt the loan structure to suit your unique financial
            situation. Moreover, the down payment amount can also vary, giving
            you the freedom to decide how much you can contribute upfront.
          </p>
          <h4 className="tw-mt-1 tw-font-medium">
            Monthly Budgeting with Car Loans
          </h4>
          <p className="tw-mt-2">
            A significant advantage of opting for a car loan in the UAE is the
            ability to plan your monthly budget effectively. With a fixed EMI
            amount, you can confidently allocate your resources and manage your
            finances without unexpected surprises. This predictability allows
            you to strike a balance between fulfilling your car ownership dreams
            and maintainin
          </p>
        </div>
      </div>
    </div>
  );
}

export default MainSection;
