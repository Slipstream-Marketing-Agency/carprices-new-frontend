import Ad300x600 from "@/components/ads/Ad300x600";
import Ad728x90 from "@/components/ads/Ad728x90";
import VariantsListing from "@/components/common/detail-pages/VariantsListing";
import Layout from "@/components/layout/Layout";
import CompareWithSimilarCars from "@/components/common/detail-pages/CompareWithSimilarCars";
import ModelDescription from "@/components/model-detail-page/ModelDescription";
import ModelOverview from "@/components/model-detail-page/ModelOverview";
import React from "react";
import VehicleGallery from "@/components/common/detail-pages/VehicleGallery";
import VehicleReview from "@/components/common/detail-pages/VehicleReview";
import VehicleArticle from "@/components/common/detail-pages/VehicleArticle";
import VehicleUserReview from "@/components/common/detail-pages/VehicleUserReview";
import VehicleFaq from "@/components/model-detail-page/VehicleFaq";
import VehicleQandA from "@/components/common/detail-pages/VehicleQandA";
import VehicleComment from "@/components/common/detail-pages/VehicleComment";
import Ad300x250 from "@/components/ads/Ad300x250";
import PopularCars from "@/components/common/detail-pages/PopularCars";
import EmiStartsEditor from "@/components/common/detail-pages/EmiStartsEditor";
import Dealer from "@/components/common/detail-pages/Dealer";
import OldModel from "@/components/common/detail-pages/OldModel";
import SubNavbar from "@/components/trim-detail-page/SubNavbar";
import axios from "axios";
import { createContext, useContext } from "react";
import Breadcrumb from "@/components/common/BreadCrumb";
import MobileVariantsListing from "@/mobile/components/common/detail-pages/VariantsListing";
import Ad250x250 from "@/components/ads/Ad250x250";

// Create a context for the model data
const ModelContext = createContext();

export default function MobileModelDetailPage({ model, article }) {
  const data = model.model;


  return (
    <Layout>
      <div className="container">
        <Breadcrumb />
        <div className="row mt-2 mb-4">
          <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9">
            {/*<Ad728x90 />*/}
            {/* <SubNavbar /> */}
            <ModelOverview model={data} />
            <Ad728x90 dataAdSlot="8830077940" />
            <ModelDescription model={data} />
            <Ad728x90 dataAdSlot="6487819782" />
            <MobileVariantsListing model={data} />
            <Ad728x90 dataAdSlot="8682776279" />
            {/* <CompareWithSimilarCars /> */}
            {/*<Ad728x90 />*/}
            {data?.mainTrim?.images?.length === 0 ? "" : <><VehicleGallery model={data} />
              <Ad728x90 dataAdSlot="7369694604" />
            </>
            }

            {data?.allYearMainTrims <= 0 ? "" : <OldModel model={data} />}

            {/*<Ad728x90 />*/}
            {article.blogs.length <= 0 ? (
              ""
            ) : (
              <>
                <VehicleArticle article={article} model={data} />
                {/*<Ad728x90 />*/}
              </>
            )}

            {/* 
              <VehicleUserReview /> */}
            <VehicleFaq model={data} />
            {/*<Ad728x90 />*/}
            {/* <VehicleQandA /> */}
            {/*<Ad728x90 />*/}
            {/* <VehicleComment /> */}
          </div>
          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 right_section">
            <div className="mb-3">
              {/* <Ad300x600 /> */}
            </div>
            {/* <EmiStartsEditor /> */}

            <div className="d-flex flex-column mt-3 sticky_scroll">
              <div className="mt-3 mb-3">
                <Ad250x250 dataAdSlot="1043921411" />
              </div>
              <PopularCars brand={data.brand} model={data} />
            </div>
            {/* <div className="sticky_scroll">
              <Dealer />

              <Ad300x250 />
            </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
}


