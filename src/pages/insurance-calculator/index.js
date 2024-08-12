import Sidebar1 from "@/src/components/insuranceQuotePage/sidebar1/Sidebar1";
import ChooseCarDiv from "../../components/insuranceQuotePage/recommendationDiv/RecommendationDiv";
import InsuranceQuote from "@/src/components/insuranceQuotePage/insuranceQuoteSection/InsuranceQuoteSection";
import Sidebar2 from "@/src/components/insuranceQuotePage/sidebar2/Sidebar2";
import MainLayout from "@/src/layout/MainLayout";

function InsuranceCalculatorPage() {
  return (
    <MainLayout>
      <section className="">
        {/* <Header /> */}
        <div className="tw-grid sm:tw-grid-cols-12 tw-gap-8 tw-py-8 tw-px-6 sm:tw-px-24 md:tw-px-14 lg:tw-px-52">
          <div className="tw-h-1/2 sm:tw-col-span-3 sm:tw-block tw-hidden tw-space-y-10">
            <Sidebar1 />
            <Sidebar2 />
            <Sidebar1 />
          </div>
          <div className="sm:tw-col-span-9">
            <InsuranceQuote />
            {/* <ChooseCarDiv />
          <ChooseYourBrand />
          <DimensionSection />
          <ComparisonSection /> */}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default InsuranceCalculatorPage;
