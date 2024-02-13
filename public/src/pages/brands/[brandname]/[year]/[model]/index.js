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
import MobileModelDetailPage from "@/mobile/pages/brands/[brandname]/[year]/[model]";
import { useMediaQuery } from "react-responsive";
import MobileVariantsListing from "@/mobile/components/common/detail-pages/VariantsListing";
import Ad250x250 from "@/components/ads/Ad250x250";
import { toCamelCase } from "@/utils/toCamelCase";



export default function ModelDetailPage({ model, article }) {
  const data = model?.model;



console.log(model,"model");

  const isMobile = useMediaQuery({ query: '(max-width: 500px)' })
  // if (isMobile) {
  //   // 
  //   return (
  //     <>
  //       <MobileModelDetailPage model={model} article={article} />      </>
  //   )
  // }

  
  
  
  return (
    <Layout pageMeta={{
      title: `${model?.model?.mainTrim?.year} ${model?.model?.brand?.name} ${model?.model?.name} Car Prices, Specification, Variants & Features in UAE - CarPrices.ae`,
      description: `Explore the ${model?.model?.mainTrim?.year} ${model?.model?.brand?.name} ${model?.model?.name} in UAE. Discover its features, specifications, reviews, and compare models. Find your perfect car and make an informed decision. `,
      type: "Car Review Website",
    }}>
      <div className="container mt-3">

        <div className="row mt-2 mb-4">
          <div className="col-xl-9 col-lg-8 col-md-7 col-xs-12 col-sm-12 ">
            {/* <SubNavbar /> */}
            <Breadcrumb />
            <div className="mb-2"><ModelOverview model={data} /></div>
            <Ad728x90 dataAdSlot="8830077940" />
            <div className="mt-3"><ModelDescription model={data} /></div>
            <Ad728x90 dataAdSlot="6487819782" />
            {isMobile ? <MobileVariantsListing model={data} /> : <VariantsListing model={data} />}

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
          <div className="col-xl-3 col-lg-4 col-md-5 col-xs-12 col-sm-12 col-md-3 col-lg-3 right_section">
            {isMobile ? "" :
              <div className="mb-3">
                <Ad300x600 dataAdSlot="9804286257" />
              </div>}
            {/* <EmiStartsEditor /> */}
            {isMobile ?
              <div className="d-flex flex-column sticky_scroll">
                <div className="mb-3">
                  <Ad250x250 dataAdSlot="1043921411" />
                </div>
                <PopularCars brand={data.brand} model={data} />
              </div> :
              <div className="d-flex flex-column mt-3 sticky_scroll">

                <PopularCars brand={data.brand} model={data} />
                <div className="mt-3 mb-3">
                  <Ad300x250 dataAdSlot="7034614698" />
                </div>
              </div>}
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

export async function getServerSideProps({ req, res, params }) {

  const slug = params.model;
  const brandName = params.brandname;
  const modelName = params.model;
  const year = params.year;
  // Fetch data from external API
  try {
    let resModel = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + `model/${brandName}/${modelName}/${year}`
    )

    let resArticles = await axios.get(
      process.env.NEXT_PUBLIC_API_URL +
      `blog?pageSize=3&currentPage=1&orderBy=title&search=${brandName} ${modelName}`
    );

    let model = resModel.data;
    let article = resArticles.data;
    // Pass data to the page via props
    return {
      props: {
        model,
        article,
      },
    };
  } catch (error) {

    if (error.response?.status === 404) {
      try {
        let redirectModel = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + "model/old-slug/" + modelName,
        )
        return {
          redirect: {
            permanent: true,
            destination: `/brands/${brandName}/${year}/${redirectModel.data.model.slug}`,
          },
          props: {},
        };
      } catch (error) {
        if (error.response && error.response.status !== 200) {
          return {
            notFound: true, // Treat non-200 responses as 404 errors
          };
        }
      }
    } else {
      return {
        notFound: true, // Treat non-200 responses as 404 errors
      };
    }
  }
}
