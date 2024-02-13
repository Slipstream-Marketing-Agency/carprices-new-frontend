import React from "react";

export default function CompareWithSimilarCars() {
  return (
    <div id="compare" className="my-3">
      <div className="card_wrapper">
        <h4 className="fw-bold">
          Compare <span>Toyota</span>
          <span> Land Cruiser</span> With Similar Cars
        </h4>
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-3">
                <div className="card">
                  <img
                    title="Toyota"
                    alt="Toyota-LandCruiser"
                    src="/assets/images/cars/2022-MG-RX5-Banner.png"
                  />
                  <div className="p-3 position-relative">
                    <h6 className="card-title fw-bold">MG</h6>
                    <h6 className="card-text text-danger fw-bold">
                      <small className="text-black">From</small> AED 65,178
                    </h6>
                    <p className="card-text">
                      <small>EMI : AED 1,773 x 60</small>
                    </p>
                    <small className="card-text">
                      <i className="bi bi-star-fill me-1 " />5
                      <span className="me-1">(1 Review(s))</span>
                    </small>
                    <div className="compare_checkbox">
                      <input
                        className="form-check-input mb-1"
                        type="checkbox"
                        defaultValue=""
                        id="flexCheckDefault"
                      />
                    </div>
                  </div>
                  <a className="btn-view-all" href="" title="">
                    <span>Land Cruiser vs MG</span>
                    <i className="bi bi-chevron-right" />
                  </a>
                </div>
              </div>
              <div className="col-3">
                <div className="card">
                  <img
                    title="Toyota"
                    alt="Toyota-LandCruiser"
                    src="/assets/images/cars/2022-MG-RX5-Banner.png"
                  />
                  <div className="p-3 position-relative">
                    <h6 className="card-title fw-bold">MG</h6>
                    <h6 className="card-text text-danger fw-bold">
                      <small className="text-black">From</small> AED 65,178
                    </h6>
                    <p className="card-text">
                      <small>EMI : AED 1,773 x 60</small>
                    </p>
                    <small className="card-text">
                      <i className="bi bi-star-fill me-1 " />5
                      <span className="me-1">(1 Review(s))</span>
                    </small>
                    <div className="compare_checkbox">
                      <input
                        className="form-check-input mb-1"
                        type="checkbox"
                        defaultValue=""
                        id="flexCheckDefault"
                      />
                    </div>
                  </div>
                  <a className="btn-view-all" href="" title="">
                    <span>Land Cruiser vs MG</span>
                    <i className="bi bi-chevron-right" />
                  </a>
                </div>
              </div>
              <div className="col-3">
                <div className="card">
                  <img
                    title="Toyota"
                    alt="Toyota-LandCruiser"
                    src="/assets/images/cars/2022-MG-RX5-Banner.png"
                  />
                  <div className="p-3 position-relative">
                    <h6 className="card-title fw-bold">MG</h6>
                    <h6 className="card-text text-danger fw-bold">
                      <small className="text-black">From</small> AED 65,178
                    </h6>
                    <p className="card-text">
                      <small>EMI : AED 1,773 x 60</small>
                    </p>
                    <small className="card-text">
                      <i className="bi bi-star-fill me-1 " />5
                      <span className="me-1">(1 Review(s))</span>
                    </small>
                    <div className="compare_checkbox">
                      <input
                        className="form-check-input mb-1"
                        type="checkbox"
                        defaultValue=""
                        id="flexCheckDefault"
                      />
                    </div>
                  </div>
                  <a className="btn-view-all" href="" title="">
                    <span>Land Cruiser vs MG</span>
                    <i className="bi bi-chevron-right" />
                  </a>
                </div>
              </div>
              <div className="col-3">
                <div className="card">
                  <img
                    title="Toyota"
                    alt="Toyota-LandCruiser"
                    src="/assets/images/cars/2022-MG-RX5-Banner.png"
                  />
                  <div className="p-3 position-relative">
                    <h6 className="card-title fw-bold">MG</h6>
                    <h6 className="card-text text-danger fw-bold">
                      <small className="text-black">From</small> AED 65,178
                    </h6>
                    <p className="card-text">
                      <small>EMI : AED 1,773 x 60</small>
                    </p>
                    <small className="card-text">
                      <i className="bi bi-star-fill me-1" />5
                      <span className="me-1"> & 45 Reviews</span>
                    </small>
                    <div className="compare_checkbox">
                      <input
                        className="form-check-input mb-1"
                        type="checkbox"
                        defaultValue=""
                        id="flexCheckDefault"
                      />
                    </div>
                  </div>
                  <a className="btn-view-all" href="" title="">
                    <span>Land Cruiser vs MG</span>
                    <i className="bi bi-chevron-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card_wrapper_bottom_link">
        <a href="" title="">
          <span>Compare All</span>
          <i className="bi bi-chevron-right" />
        </a>
      </div>
    </div>
  );
}
