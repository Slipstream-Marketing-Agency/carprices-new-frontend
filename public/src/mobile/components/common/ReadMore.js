import React, { useState } from 'react';

const ReadMore = ({ text, maxLength }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      {text.length > maxLength && !isExpanded ? (
        <div>
          {text.slice(0, maxLength)}
          <span className="text-primary fw-bold pointer ms-1" onClick={handleToggle}>Read More</span>
        </div>
      ) : (
        <div>
          {text}
          {text.length > maxLength && (
            <span className="text-primary fw-bold pointer ms-1" onClick={handleToggle}>Read Less</span>
          )}
        </div>
      )}
    </div>
  );
};

export default ReadMore;