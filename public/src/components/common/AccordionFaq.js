import React from "react";
import { useState } from "react";

export default function AccordionFaq({ question, answer, condition }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  
  return (
    <>
      {condition && (
        <div className="accordion filter_accordion mt-2">
          <div className="accordion-item">
            <h2 className="accordion-header" onClick={handleClick}>
              <button
                className={`accordion-button ${isOpen ? "" : "collapsed"}`}
                type="button"
              >
                {question}
              </button>
            </h2>
            <div
              className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}
              aria-labelledby="panelsStayOpen-headingOne"
            >
              <div className="accordion-body">{answer}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
