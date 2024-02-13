import React from "react";

export default function Dealer() {
  return (
    <div id="car_dealers" className="my-3">
      <div className="white_bg_wrapper mt-3 pb-3">
        <h5 className="fw-bold">Looking for a Toyota Dealer?</h5>
        <div className="mt-1">
          <ul
            className="nav nav-pills mb-1 overflow-x-scroll"
            id="nav-tab"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="pills-sharjah-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-sharjah"
                type="button"
                role="tab"
                aria-controls="pills-sharjah"
                aria-selected="true"
              >
                Sharjah
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-dubai-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-dubai"
                type="button"
                role="tab"
                aria-controls="pills-dubai"
                aria-selected="false"
              >
                Dubai
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-profile"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                Ajman
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-profile"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                Fujairah
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-profile"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                Fujairah
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-profile"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                Fujairah
              </button>
            </li>
          </ul>
          <div className="tab-content" id="nav-tabContent">
            <div
              className="tab-pane fade show active px-2 pb-2"
              id="pills-sharjah"
              role="tabpanel"
              aria-labelledby="pills-sharjah-tab"
              tabIndex={0}
            >
              <div className="white_bg_wrapper mt-1">
                <a href="" className="d-flex ">
                  <i className="bi bi-geo-alt" />
                  <small className="ps-2">
                    Sharjah - Industrial Area, Sharjah- United Arab Emirates
                  </small>
                </a>
                <a href="" className="d-flex ">
                  <i className="bi bi-telephone" />
                  <small className="ps-2">1800869682</small>
                </a>
              </div>
              <div className="white_bg_wrapper mt-1">
                <a href="" className="d-flex ">
                  <i className="bi bi-geo-alt" />
                  <small className="ps-2">
                    Sharjah - Industrial Area, Sharjah- United Arab Emirates
                  </small>
                </a>
                <a href="" className="d-flex ">
                  <i className="bi bi-telephone" />
                  <small className="ps-2">1800869682</small>
                </a>
              </div>
              <div className="white_bg_wrapper mt-1">
                <a href="" className="d-flex ">
                  <i className="bi bi-geo-alt" />
                  <small className="ps-2">
                    Sharjah - Industrial Area, Sharjah- United Arab Emirates
                  </small>
                </a>
                <a href="" className="d-flex ">
                  <i className="bi bi-telephone" />
                  <small className="ps-2">1800869682</small>
                </a>
              </div>
              <div className="white_bg_wrapper mt-1">
                <a href="" className="d-flex ">
                  <i className="bi bi-geo-alt" />
                  <small className="ps-2">
                    Sharjah - Industrial Area, Sharjah- United Arab Emirates
                  </small>
                </a>
                <a href="" className="d-flex ">
                  <i className="bi bi-telephone" />
                  <small className="ps-2">1800869682</small>
                </a>
              </div>
              <div className="white_bg_wrapper mt-1">
                <a href="" className="d-flex ">
                  <i className="bi bi-geo-alt" />
                  <small className="ps-2">
                    Sharjah - Industrial Area, Sharjah- United Arab Emirates
                  </small>
                </a>
                <a href="" className="d-flex ">
                  <i className="bi bi-telephone" />
                  <small className="ps-2">1800869682</small>
                </a>
              </div>
            </div>
            <div
              className="tab-pane fade px-2 pb-2"
              id="pills-dubai"
              role="tabpanel"
              aria-labelledby="pills-dubai-tab"
              tabIndex={0}
            >
              <div className="white_bg_wrapper mt-1">
                <a href="" className="d-flex ">
                  <i className="bi bi-geo-alt" />
                  <small className="ps-2">
                    Dubai - Industrial Area, Sharjah- United Arab Emirates
                  </small>
                </a>
                <a href="" className="d-flex ">
                  <i className="bi bi-telephone" />
                  <small className="ps-2">1800869682</small>
                </a>
              </div>
              <div className="white_bg_wrapper mt-1">
                <a href="" className="d-flex ">
                  <i className="bi bi-geo-alt" />
                  <small className="ps-2">
                    Dubai - Industrial Area, Sharjah- United Arab Emirates
                  </small>
                </a>
                <a href="" className="d-flex ">
                  <i className="bi bi-telephone" />
                  <small className="ps-2">1800869682</small>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
