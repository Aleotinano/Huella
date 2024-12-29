import React from "react";
import Carousel from "react-bootstrap/Carousel";
import remera1 from "../assets/remera1.jpg";
import remera2 from "../assets/remera2.jpg";
import remera3 from "../assets/remera3.jpg";
import "bootstrap/dist/css/bootstrap.min.css";

export const CarruselComponent = ({ carruselContainer, imageWrapper }) => {
  return (
    <Carousel data-bs-theme="dark" className={carruselContainer}>
      <Carousel.Item interval={1000}>
        <div className={imageWrapper}>
          <img src={remera1} alt="First slide" />
        </div>
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1000}>
        <div className={imageWrapper}>
          <img src={remera2} alt="Second slide" />
        </div>
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1000}>
        <div className={imageWrapper}>
          <img src={remera3} alt="Third slide" />
        </div>
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};
