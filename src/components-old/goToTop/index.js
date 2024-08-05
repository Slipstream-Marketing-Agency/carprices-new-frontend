import { useState, useEffect } from 'react';


const GoToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the button when user scrolls down beyond a certain point
    const onScroll = () => {
      const scrollTop = window.scrollY;
      setIsVisible(scrollTop > 300); // Change this value as needed
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      className={`goToTopButton ${isVisible ? 'visible' : 'hidden'}`}
      onClick={scrollToTop}
      title="Go to Top"
    >
    <i className="bi bi-arrow-up-circle"></i>
    </button>
  );
};

export default GoToTopButton;