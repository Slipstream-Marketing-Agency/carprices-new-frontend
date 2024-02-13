import Ad300x250 from "@/components/ads/Ad300x250";
import Ad300x600 from "@/components/ads/Ad300x600";
import Ad728x90 from "@/components/ads/Ad728x90";
import CompareWithSimilarCars from "@/components/common/detail-pages/CompareWithSimilarCars";
import Dealer from "@/components/common/detail-pages/Dealer";
import EmiStartsEditor from "@/components/common/detail-pages/EmiStartsEditor";
import KeySpec from "@/components/common/detail-pages/KeySpec";
import VehicleComment from "@/components/common/detail-pages/VehicleComment";
import VehicleFaq from "@/components/trim-detail-page/VehicleFaq";
import VehicleQandA from "@/components/common/detail-pages/VehicleQandA";
import VehicleReview from "@/components/common/detail-pages/VehicleReview";
import VehicleUserReview from "@/components/common/detail-pages/VehicleUserReview";
import Layout from "@/components/layout/Layout";
import DetailedSpecification from "@/components/trim-detail-page/DetailedSpecification";
import SubNavbar from "@/components/trim-detail-page/SubNavbar";
import TrimDescription from "@/components/trim-detail-page/TrimDescription";
import TrimOverview from "@/components/trim-detail-page/TrimOverview";
import React from "react";
import axios from "axios";
import { ModelProvider } from "@/components/model-detail-page/ModelContext";
import VariantsListing from "@/components/trim-detail-page/VariantsListing";
import VehicleGallery from "@/components/trim-detail-page/VehicleGallery";
import VehicleArticle from "@/components/trim-detail-page/VehicleArticle";
import PopularCars from "@/components/trim-detail-page/PopularCars";
import Breadcrumb from "@/components/common/BreadCrumb";
import Ad250x250 from "@/components/ads/Ad250x250";

export default function TrimDetailPage({ article, trim }) {
  return (
    <Layout>
      <div className="app-content ">
        <section className="container">
          <Breadcrumb />
          <div className="row mb-4">
            <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 left_section">
              <div className="my-1">
                {/*<Ad728x90 />*/}
              </div>
              {/* <SubNavbar /> */}
              <TrimOverview trim={trim} />
              <Ad728x90 dataAdSlot="6843043000" />
              <KeySpec trim={trim} />
              <TrimDescription trim={trim} />
              <Ad728x90 dataAdSlot="5903751455" />
              <DetailedSpecification trim={trim} />
              <Ad728x90 dataAdSlot="9086062963" />
              {/* <VariantsListing trim={trim}/> */}
              {/*<Ad728x90 />*/}
              <VehicleGallery trim={trim} />
              {/*<Ad728x90 />*/}
              {/* <CompareWithSimilarCars /> */}
              {/*<Ad728x90 />*/}
              <VehicleReview trim={trim} />
              <Ad728x90 dataAdSlot="3833736280" />
              {/*<Ad728x90 />*/}
              {article.blogs.length <= 0 ? (
                ""
              ) : (
                <>
                  <VehicleArticle article={article} trim={trim} />
                  <Ad728x90 dataAdSlot="7916489517" />
                </>
              )}

              {/* <VehicleUserReview /> */}
              <VehicleFaq trim={trim} />
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
                <div className="mt-2 mb-2s">
                  <Ad250x250 dataAdSlot="8043663782" />
                </div>
                <PopularCars trim={trim} />
              </div>
              {/* <div className="sticky_scroll">
                  <Dealer />

                  <Ad300x250 />
                </div> */}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
