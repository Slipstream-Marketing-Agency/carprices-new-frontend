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
import { useRouter } from "next/router";
import { toCamelCase } from "@/utils/toCamelCase";

export default function TrimDetailPage({ article, trim }) {
  
  const router = useRouter()
  return (
    <Layout pageMeta={{
      title: `${router?.query?.year} ${trim?.trim?.brand?.name} ${trim?.trim?.model?.name} ${trim?.trim?.name} Car Prices, Specification, Variants & Features in UAE - CarPrices.ae`,
      description: `Explore the ${router?.query?.year} ${trim?.trim?.brand?.name} ${trim?.trim?.model?.name} ${trim?.trim?.name} in UAE. Discover its features, specifications, reviews, and compare models. Find your perfect car and make an informed decision. `,
      type: "Car Review Website",
    }}>
      <div className="app-content ">
        <section className="container mt-3">

          <div className="row mb-4">
            <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 left_section">
              <div className="my-1">
                {/*<Ad728x90 />*/}
              </div>
              <Breadcrumb />
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

              {/* <CompareWithSimilarCars />  */}
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
              {/* <VehicleComment />  */}
            </div>
            <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 right_section">
              <div className="mb-3">
                <Ad300x600 dataAdSlot="8511347892" />
              </div>
              {/* <EmiStartsEditor /> */}
              <div className="d-flex flex-column mt-3 sticky_scroll">

                <PopularCars trim={trim} />
                <div className="mt-3 mb-3">
                  <Ad300x250 dataAdSlot="6203914608" />
                </div>
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

export async function getServerSideProps({ req, res, params }) {

  const brandName = params.brandname;
  const model = params.model;
  const slug = params.trim;
  const year = params.year;
  // Fetch data from external API
  try {
    let resTrim = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "trim/" + model + "/" + slug + "/" + year
    )

    let resArticles = await axios.get(
      process.env.NEXT_PUBLIC_API_URL +
      `blog?pageSize=3&currentPage=1&orderBy=title&search=${brandName + " " + model + " " + slug + " "
      }`
    );

    // 

    let trim = resTrim.data;
    // Pass data to the page via props
    let article = resArticles.data;
    return {
      props: {
        trim,
        article,
      },
    };
  } catch (error) {

    if (error.response.status === 404) {
      try {
        let redirectTrim = await axios.post(
          process.env.NEXT_PUBLIC_API_URL + "trim/redirect",
          {
            oldPath: `${brandName}/${year}/${model}/${slug}/`
          }
        )
        return {
          redirect: {
            permanent: true,
            destination: `/brands/${redirectTrim.data.trim.brand.slug}/${redirectTrim.data.trim.year}/${redirectTrim.data.trim.model.slug}/${redirectTrim.data.trim.slug}`,
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
