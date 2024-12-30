"use client";
import React, { useState } from "react";
import Image from "next/image";
import Banner from "./Banner";
import CarSelectionModal from "../compare-cars/CarSelectionModal";
import Calculator from "./Calculator";
// import CarSelectionModal from "./CarSelectionModal";
import SimpleLoanCalculator from "./SimpleLoanCalculator";

export default function CalculatorContent() {
    const [carSelected, setCarSelected] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedVariant, setSelectedVariant] = useState("");
    const [selectedVariantThumbnail, setSelectedVariantThumbnail] = useState("");
    const [price, setPrice] = useState(null);

    // New state values to track selected year, brand, and model
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [selectedModelName, setSelectedModelName] = useState("");

    // Handle variant selection from CarSelectionModal
    const handleVariantSelect = (variantData) => {
        console.log(variantData)
        setSelectedYear(variantData.year);
        setSelectedBrand(variantData.brand);
        setSelectedModel(variantData.model);
        setSelectedModelName(variantData.modelName); // Assuming the variantData contains modelName
        setSelectedVariant(variantData.name);
        setSelectedVariantThumbnail(variantData.featuredImage);
        setPrice(variantData.price);
        setShowModal(false);
    };

    return (
        <div className="">


            {/* CarSelectionModal component */}
            <CarSelectionModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onVariantSelect={handleVariantSelect}
            />

            {selectedVariant && (
                <Calculator setShowModal={setShowModal}
                    selectedBrand={selectedBrand}
                    selectedModel={selectedModel}
                    selectedModelName={selectedModelName}
                    selectedYear={selectedYear}
                    selectedVariant={selectedVariant}
                    price={price}
                    selectedVariantThumbnail={selectedVariantThumbnail} />
            )}
            {!selectedVariant && (
                <>
                <Banner
                    modal={showModal}
                    selectedModel={selectedModel}
                    setSelectedModel={setSelectedModel}
                    selectedVariant={selectedVariant}
                    setSelectedVariant={setSelectedVariant}
                    setShowModal={setShowModal}
                    setCarSelected={setCarSelected}
                />
                <div className="mt-5" />
                <SimpleLoanCalculator />
                </>
            )}

            <div>
                <h2 className="mt-8 mb-3 font-semibold text-2xl capitalize">
                    How can a Car Loan EMI Calculator Help You?
                </h2>
                <div className="grid para gap-2">
                    <p className="mt-1">
                        When it comes to financing your dream car in the UAE, securing a car
                        loan is a common route taken by many residents and expatriates
                        alike. Car ownership is a symbol of status and convenience in the
                        Emirates, and obtaining the right car loan can make it easily
                        attainable. The allure of owning a car in the UAE, with its
                        well-maintained roads and world-class infrastructure, is a dream
                        shared by many residents and expatriates alike. However, the reality
                        is that purchasing a car in the UAE often requires a substantial
                        financial commitment, and that&apos;s where a car loan can make all the
                        difference.
                    </p>
                    <h2 className="text-2xl mt-6 font-semibold capitalize">
                        Car Loan EMI and Downpayment
                    </h2>
                    <h4 className="mt-1 font-semibold capitalize">
                        Interest Rate and Monthly Installment
                    </h4>
                    <p className="">
                        Interest rates play a pivotal role in determining the cost of your
                        car loan. Typically, car loan interest rates in the UAE can vary
                        depending on the lender and the prevailing market conditions.
                        Therefore, it&apos;s essential to compare interest rates across different
                        financial institutions to secure the most favorable deal. Lower
                        interest rates translate to reduced monthly installments, which
                        means less financial strain over the loan tenure. By doing your
                        research and finding the best interest rate, you can optimize your
                        car loan for affordability.
                    </p>
                    <h4 className=" mt-3 font-semibold capitalize">
                        Loan Installment and Downpayment Variability on Car Finance Dubai
                    </h4>
                    <p className="">
                        Car loan providers in the UAE offer various loan tenures and down
                        payment options, allowing you to choose the one that aligns with
                        your financial goals. Whether you prefer a shorter loan tenure with
                        higher EMI instalments or a longer tenure with lower monthly
                        payments, the flexibility offered by car loan providers ensures you
                        can adapt the loan structure to suit your unique financial
                        situation. Moreover, the down payment amount can also vary, giving
                        you the freedom to decide how much you can contribute upfront.
                    </p>
                    <h4 className="mt-3 font-semibold capitalize">
                        Monthly Budgeting with Car Loans
                    </h4>
                    <p className="">
                        A significant advantage of opting for a car loan in the UAE is the
                        ability to plan your monthly budget effectively. With a fixed EMI
                        amount, you can confidently allocate your resources and manage your
                        finances without unexpected surprises. This predictability allows
                        you to strike a balance between fulfilling your car ownership dreams
                        and maintaining.
                    </p>
                </div>
            </div>
        </div>
    );
}
