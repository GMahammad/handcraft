import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import React from "react";
const CarouselHome = () => {
  return (
    <div className="carousel-main">
    <Carousel showThumbs={false} width={"100%"}  showStatus={false} autoFocus={true} autoPlay={true} infiniteLoop={true} >
      <div>  
        <img src={require("../../Assets/Images/home1.jpg")} />
      </div>
      <div>
      <img src={require("../../Assets/Images/home2.jpg")} />
      </div>
      <div>
      <img src={require("../../Assets/Images/home3.jpeg")} />
      </div>
    </Carousel>
    <div className="my-5"></div>

    </div>
  );
};

export default CarouselHome;
