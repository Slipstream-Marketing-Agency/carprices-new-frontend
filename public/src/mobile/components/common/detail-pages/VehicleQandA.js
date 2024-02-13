import React from "react";

export default function VehicleQandA() {
  return (
    <div id="QandA" className="my-3">
      <div className="white_bg_wrapper mt-3">
        <h4 className="fw-bold">
          <span>Toyota </span>
          <span>Land Cruiser</span> Questions &amp; Answers
        </h4>
        <div className="accordion mt-3" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#QAcollapseOne"
                aria-expanded="true"
                aria-controls="QAcollapseOne"
              >
                Is Toyota Land Cruiser available in Automatic Transmission?
              </button>
            </h2>
            <div
              id="QAcollapseOne"
              className="accordion-collapse collapse show"
              data-bs-parent="#accordionExampleTwo"
            >
              <div className="accordion-body">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  quis neque tempus, dictum leo nec, gravida ipsum.
                </p>
                <button
                  type="button"
                  className="btn btn-outline-danger mt-3 p-1"
                >
                  <i className="bi bi-reply-fill fs-6" />
                  <small className="fw-bold ms-1 fs-6">Answer</small>
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger mt-3 p-1"
                >
                  <small className="fw-bold ms-1 fs-6">View Answer</small>
                </button>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#QAcollapseTwo"
                aria-expanded="false"
                aria-controls="QAcollapseTwo"
              >
                Is Toyota Land Cruiser available in Automatic Transmission?
              </button>
            </h2>
            <div
              id="QAcollapseTwo"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExampleTwo"
            >
              <div className="accordion-body">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  quis neque tempus, dictum leo nec, gravida ipsum.
                </p>
                <button
                  type="button"
                  className="btn btn-outline-danger mt-3 p-1"
                >
                  <i className="bi bi-reply-fill fs-6" />
                  <small className="fw-bold ms-1 fs-6">Answer</small>
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger mt-3 p-1"
                >
                  <small className="fw-bold ms-1 fs-6">View Answer</small>
                </button>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                What is the power output of Toyota Land Cruiser 2023?
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  quis neque tempus, dictum leo nec, gravida ipsum.
                </p>
                <button
                  type="button"
                  className="btn btn-outline-danger mt-3 p-1"
                >
                  <i className="bi bi-hand-thumbs-up-fill fs-6" />
                  <small className="fw-bold ms-1 fs-6">Helpful</small>
                  <small className="ms-1 fw-bold">(2)</small>
                </button>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
                aria-expanded="false"
                aria-controls="collapseFour"
              >
                What is the power output of Toyota Land Cruiser 2023?
              </button>
            </h2>
            <div
              id="collapseFour"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  quis neque tempus, dictum leo nec, gravida ipsum.
                </p>
                <button
                  type="button"
                  className="btn btn-outline-danger mt-3 p-1"
                >
                  <i className="bi bi-hand-thumbs-up-fill fs-6" />
                  <small className="fw-bold ms-1 fs-6">Helpful</small>
                  <small className="ms-1 fw-bold">(2)</small>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
