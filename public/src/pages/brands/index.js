import Ad728x90 from "@/components/ads/Ad728x90";
import Brands from "@/components/common/Brands";
import Breadcrumb from "@/components/common/BreadCrumb";
import Layout from "@/components/layout/Layout";
import axios from "axios";
import Link from "next/link";
import React from "react";

export default function AllBrands(brands) {
  

  return (
    <Layout pageMeta={{
      title: "Explore the Top Car Brands in the UAE - Carprices",
      description: "Stay informed on the best car brands available in the UAE market with comprehensive reviews and insights from Carprices. Find the top brands and make an informed decision.",
      type: "Car Review Website",
    }}>
      <div className="container">
        <div className="my-2">
          <Ad728x90 dataAdSlot="6116322683" />
        </div>
        <Breadcrumb />
        <section className="my-2">
          <h1>Top Brands in UAE</h1>
          <div className="card_wrapper">
            <div className="row">
              {brands.brands.carBrands &&
                brands.brands.carBrands.map((item, index) => (
                  <div className="col-md-2 col-sm-3 col-4 mb-3">
                    <div className="card">
                      <Link
                        title=""
                        href={`/brands/${item.slug}`}
                        className="brand_img_wrapper d-flex flex-column justify-content-center align-items-center p-1"
                      >
                        <img
                          alt={item.name}
                          src={
                            item.image === null
                              ? "/assets/images/placeholders/car-placeholder.png"
                              : process.env.NEXT_PUBLIC_S3_URL + `${item.image}`
                          }
                        />
                        <h6>{item.name}</h6>
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
            {/* <ViewAllButton text={"View All Brands"}/> */}
          </div>
        </section>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req, res, params }) {
  let resBrands = await axios.get(
    process.env.NEXT_PUBLIC_API_URL +
    "brands?&currentPage=1&orderBy=name&search=a&isAll=1"
  );
  let brands = resBrands.data;
  return {
    props: {
      brands,
    },
  };
}
