import React from "react";

export default function VehicleUserReview() {
  return (
    <div id="user_review" className="my-3">
      <div className="white_bg_wrapper pb-3">
        <h4 className="fw-bold">
          User Reviews of <span>Toyota </span>
          <span>Land Cruiser</span>
        </h4>
        <div className="row mt-2 mb-2">
          <div className="col-6">
            <div className="d-flex align-items-center">
              <i className="bi bi-star-fill fs-2" />
              <p className="fw-bold fs-2 ms-2">4.1/5</p>
              <p className="ms-4">
                Based on <span>300</span> reviews
              </p>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex align-items-center">
              <button className="btn btn-outline-primary ms-5 w-50">
                Write A Review
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-4 user_review_card">
            <div className="white_bg_wrapper">
              <p className="fw-bold">Beast At This Affordable Price Segment.</p>
              <div className="startRating">
                <i className="bi bi-star-fill" />
                <i className="bi bi-star-fill" />
                <i className="bi bi-star-half" />
                <i className="bi bi-star" />
                <i className="bi bi-star" />
              </div>
              <p>
                <span className="review_truncate">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  quis neque tempus, dictum leo nec, gravida ipsum.Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit. Etiam quis neque
                  temp
                </span>
                <small className="text-primary fw-bold">Read More...</small>
              </p>
              <div className="d-flex align-items-center mt-3">
                <div
                  className="rounded-circle border d-flex justify-content-center align-items-center p-3"
                  style={{ width: 30, height: 30 }}
                >
                  C
                </div>
                <div className="d-flex flex-column ms-2">
                  <small className="fw-bold">Sahil</small>
                  <small>Feb 20, 2023</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4 user_review_card">
            <div className="white_bg_wrapper">
              <p className="fw-bold">Beast At This Affordable Price Segment.</p>
              <div className="startRating">
                <i className="bi bi-star-fill" />
                <i className="bi bi-star-fill" />
                <i className="bi bi-star-half" />
                <i className="bi bi-star" />
                <i className="bi bi-star" />
              </div>
              <p>
                <span className="review_truncate">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  quis neque tempus, dictum leo nec, gravida ipsum.Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit. Etiam quis neque
                  temp
                </span>
                <small className="text-primary fw-bold">Read More...</small>
              </p>
              <div className="d-flex align-items-center mt-3">
                <div
                  className="rounded-circle border d-flex justify-content-center align-items-center p-3"
                  style={{ width: 30, height: 30 }}
                >
                  C
                </div>
                <div className="d-flex flex-column ms-2">
                  <small className="fw-bold">Sahil</small>
                  <small>Feb 20, 2023</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4 user_review_card">
            <div className="white_bg_wrapper">
              <p className="fw-bold">Beast At This Affordable Price Segment.</p>
              <div className="startRating">
                <i className="bi bi-star-fill" />
                <i className="bi bi-star-fill" />
                <i className="bi bi-star-half" />
                <i className="bi bi-star" />
                <i className="bi bi-star" />
              </div>
              <p>
                <span className="review_truncate">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  quis neque tempus, dictum leo nec, gravida ipsum.Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit. Etiam quis neque
                  temp
                </span>
                <small className="text-primary fw-bold">Read More...</small>
              </p>
              <div className="d-flex align-items-center mt-3">
                <div
                  className="rounded-circle border d-flex justify-content-center align-items-center p-3"
                  style={{ width: 30, height: 30 }}
                >
                  C
                </div>
                <div className="d-flex flex-column ms-2">
                  <small className="fw-bold">Sahil</small>
                  <small>Feb 20, 2023</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card_wrapper_bottom_link">
        <a href="" title="">
          <span>View All Reviews</span>
          <i className="bi bi-chevron-right" />
        </a>
      </div>
    </div>
  );
}
