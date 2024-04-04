import React, { useState } from "react";

export default function AccordionFaq({ question, answer, condition, id }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {condition && (
        <div className="accordion-item">
          <p className="accordion-header fw-bold">
            <button
              className={`fw-bold accordion-button ${
                !isOpen ? "collapsed" : ""
              }`}
              type="button"
              onClick={handleClick}
              aria-expanded={isOpen}
            >
              <span className="mb-0 fw-bold">{question}</span>
            </button>
          </p>
          {isOpen && (
            <div className="accordion-collapse">
              <p className="accordion-body fw-light mb-0">{answer}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
