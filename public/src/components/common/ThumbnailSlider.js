import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

const ThumbnailSlider = ({ images }) => {
    
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 1
  };

  return (
    <Slider {...settings}>
      {images.map((item, index) => (
        <div key={index}>
          <Image src={process.env.NEXT_PUBLIC_S3_URL+item?.image} alt={`Thumbnail ${index + 1}`} />
        </div>
      ))}
    </Slider>
  );
};

export default ThumbnailSlider;
