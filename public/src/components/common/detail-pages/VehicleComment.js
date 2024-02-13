import React from "react";

export default function VehicleComment() {
  return (
    <div id="comment" className="my-3">
      <div className="white_bg_wrapper mt-3">
        <h4 className="fw-bold">
          Write your Comment on <span>Toyota </span>
          <span>Land Cruiser</span>
        </h4>
        <input
          type="text"
          className="w-100 text-grey p-2 mt-2"
          placeholder="Write a Comment..."
        />
        <button className="btn btn-primary mt-2">Post Comment</button>
        <h6 className="fw-bold mt-3">
          <span>5</span> Comments
        </h6>
        <div className="white_bg_wrapper mt-3">
          <div className="d-flex align-items-center">
            <div
              className="rounded-circle border d-flex justify-content-center align-items-center p-3"
              style={{ width: 30, height: 30 }}
            >
              C
            </div>
            <div className="d-flex flex-column ms-2">
              <small className="fw-bold">Sahil</small>
              <small>Feb 20, 2023 3:07:44 PM</small>
            </div>
          </div>
          <p className="mt-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam quis
            neque tempus, dictum leo nec, gravida ipsum.
          </p>
          <button
            type="button"
            className="btn btn-outline-success mt-3 px-3 py-1"
          >
            <i className="bi bi-reply-fill fs-6" />
            <small className="fw-bold ms-1 fs-6">Reply</small>
          </button>
        </div>
        <div className="white_bg_wrapper mt-3">
          <div className="d-flex align-items-center">
            <div
              className="rounded-circle border d-flex justify-content-center align-items-center p-3"
              style={{ width: 30, height: 30 }}
            >
              C
            </div>
            <div className="d-flex flex-column ms-2">
              <small className="fw-bold">Sahil</small>
              <small>Feb 20, 2023 3:07:44 PM</small>
            </div>
          </div>
          <p className="mt-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam quis
            neque tempus, dictum leo nec, gravida ipsum.
          </p>
          <button
            type="button"
            className="btn btn-outline-success mt-3 px-3 py-1"
          >
            <i className="bi bi-reply-fill fs-6" />
            <small className="fw-bold ms-1 fs-6">Reply</small>
          </button>
        </div>
      </div>
    </div>
  );
}
