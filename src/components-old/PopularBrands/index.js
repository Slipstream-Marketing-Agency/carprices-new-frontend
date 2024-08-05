import React from "react";
import Brands from "../brands";
import ViewAllButton from "../viewAllButton/ViewAllButton";
import Link from "next/link";



export default function PopularBrands(props) {

  return (
    <div className="pt-4 ">
      <div className="container ">
        <section className="my-2 ">
          <div className="card_wrapper ">
            <h2 className="popularCarText">Popular Car Brands</h2>
            <div className="row mt-4">
              <Brands props={props.brands} />
            </div>
            <div className="view-btn-area mt-2">
  
            <Link className="primary-btn1 text-white d-flex align-items-center gap-0 "  href="/brands"><span>View All Brands</span></Link>           
         
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
