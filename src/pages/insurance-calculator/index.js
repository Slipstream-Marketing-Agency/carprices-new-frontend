import Sidebar1 from "@/src/components/insuranceQuotePage/sidebar1/Sidebar1";
import ChooseCarDiv from "../../components/insuranceQuotePage/recommendationDiv/RecommendationDiv";
import InsuranceQuote from "@/src/components/insuranceQuotePage/insuranceQuoteSection/InsuranceQuoteSection";
import Sidebar2 from "@/src/components/insuranceQuotePage/sidebar2/Sidebar2";
import MainLayout from "@/src/layout/MainLayout";
import Ad300x600 from "@/src/components-old/ads/Ad300x600";
import Ad300X250 from "@/src/components-old/ads/Ad300x250";

function InsuranceCalculatorPage() {
  return (
    <MainLayout>
      <section className="tw-container">
        {/* <Header /> */}
        <div className="tw-grid sm:tw-grid-cols-12 tw-gap-8 ">
          <div className="tw-h-1/2 sm:tw-col-span-3 tw-block tw-space-y-10">
            <Ad300x600 dataAdSlot="3792539533" />
            <div className="md:tw-hidden tw-block tw-mt-10" >
              <Ad300X250 dataAdSlot="9351332409" />
            </div>
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
