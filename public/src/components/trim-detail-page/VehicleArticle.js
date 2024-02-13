import React from "react";
import ViewAllButton from "../common/ViewAllButton";
import Link from "next/link";
import FeaturedImage from "../common/FeaturedImage";
import moment from "moment";

export default function VehicleArticle({ article, trim }) {
  
  return (
    <div id="news" className="my-3">
      <div className="white_bg_wrapper pb-3 ">
       
        <h4 className="fw-bold">
        {trim?.trim?.brand?.name} {trim?.trim?.name} In The news
        </h4>
       
        
        <div className="row mt-2">
          {article?.blogs?.map((item, index) => (
            <div className="col-md-4" key={index}>
              <div className="white_bg_wrapper">
              <Link href={`/${item?.type}/${item?.slug}`}>
                <div className="cover_card_image">
                  <FeaturedImage width={100} height={100} src={item.coverImage}/>
                </div>
                </Link>
                <div className="mt-2">
                  <h6 className="head_truncate fw-bold">
                    {item.title}
                  </h6>
                  <small className="text_truncate">
                    Nissan Motor yesterday announced financial results for the
                    April-December period of fiscal year 2022.
                  </small>
                </div>
                <div className="d-flex align-items-center mt-3">
                  <div
                    className="rounded-circle border d-flex justify-content-center align-items-center p-3"
                    style={{ width: 30, height: 30 }}
                  >
                  {`${item?.author?.firstName}`.charAt(0)}
                  </div>
                  <div className="d-flex flex-column ms-2">
                    <small className="fw-bold">{item?.author?.firstName}</small>
                    <small> {moment(item.publishedAt).format("MMMM Do YYYY")}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ViewAllButton text={"View All Latest News"} link={"/news"}/>
      </div>
    </div>
  );
}
