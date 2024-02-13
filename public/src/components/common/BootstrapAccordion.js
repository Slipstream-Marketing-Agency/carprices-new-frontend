import React, { useState } from "react";

export default function BootstrapAccordion({ id, title, content }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="accordion filter_accordion position-relative">
      <div className="accordion-item">
        <h2 className="accordion-header" onClick={handleClick}>
          <button
            className={`accordion-button ${isOpen ? "" : "collapsed"}`}
            type="button"
          >
            {title}
          </button>
        </h2>
        <div
          className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}
          aria-labelledby="panelsStayOpen-headingOne"
        >
          <div className="accordion-body search_options_container">{content}</div>
        </div>
      </div>
    </div>
  );
}
