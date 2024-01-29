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
            <h5 className="accordion-header fw-bold">
              <button
                className={`fw-bold accordion-button ${!isOpen ? 'collapsed' : ''}`}
                type="button"
                onClick={handleClick}
                aria-expanded={isOpen}
              >
                {question}
              </button>
            </h5>
            {isOpen && (
              <div className="accordion-collapse">
                <div className="accordion-body">
                  {answer}
                </div>
              </div>
            )}
          </div>

      )}
    </>
  );
}
