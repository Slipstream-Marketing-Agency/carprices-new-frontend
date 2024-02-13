const RangeSlider = ({ interestRate, setInterestRate }) => {
    const handleInputChange = (e) => {
      const newInterestRate = e.target.value;
      setInterestRate(newInterestRate);
      document.getElementById('interest-rate-value').innerHTML = newInterestRate + '%';
    };
  
    return (
      <input
        type="range"
        name="interestRate"
        id="interest-rate"
        className="form-control-range"
        defaultValue={interestRate}
        min={2.0}
        max={8.0}
        step="0.1"
        data-toggle="tooltip"
        data-placement="top"
        onChange={handleInputChange}
      />
    );
  };
  
  export default RangeSlider;
  