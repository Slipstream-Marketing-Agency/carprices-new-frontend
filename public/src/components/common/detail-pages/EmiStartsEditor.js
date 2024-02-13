import React from "react";

export default function EmiStartsEditor() {
  return (
    <div className="white_bg_wrapper emi_start my-3">
      <p>EMI Starts</p>
      <p className="fs-5 fw-bold">
        AED 140,000<span className="fs-6 fw-bold">/Month</span>
      </p>
      <small>Interest calculated at 7% for 60 months.</small>
      <div className="btn btn-outline-primary w-100 text-center mt-2">
        <i className="bi bi-pencil-fill me-2 fs-6" />
        Edit
      </div>
    </div>
  );
}
