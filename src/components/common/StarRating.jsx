import { useEffect, useState } from 'react';

const StarRating = ({ totalStars,selectedStars }) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };
  useEffect(()=>{
    handleStarClick(selectedStars)
  },[])
  return (
    <div className="starRating">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={starValue}
            className={starValue <= rating ? "starSelected" : "star"}
            // onClick={() => handleStarClick(starValue)}
            onClick={() => handleStarClick(selectedStars)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
