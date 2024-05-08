import React from 'react';
import Slider from 'react-slick';


const ImageSlider = () => {
  const images = [
    'assets/image1.jpg',
    'assets/image2.jpg',
    'assets/image3.jpg'
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 10,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoPlay: true,
    autoPlaySpeed: 5000,
  };

  return (
    <div className='w-full'>
    <Slider {...settings} >
      {images.map((image, index) => (
      <div key={index} className='h-96 w-full'>
      <img className='h-full sm:w-2/4 w-full object-cover mx-auto' src={image} alt={`Slide ${index + 1}`} />
       </div>
      )
      
      )}
      </Slider>
      
    </div>
  );
};

export default ImageSlider;