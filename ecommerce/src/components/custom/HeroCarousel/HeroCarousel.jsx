import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./HeroCarousel.module.css";

const HeroCarousel = () => {
  const slides = [
    {
      id: 1,
      title: "New Arrivals are Here!",
      description: "Discover the latest trends at unbeatable prices.",
      image: "https://source.unsplash.com/1200x500/?fashion,shopping",
    },
    {
      id: 2,
      title: "Exclusive Deals Just for You!",
      description: "Grab up to 50% off on selected items.",
      image: "https://source.unsplash.com/1200x500/?ecommerce,sale",
    },
    {
      id: 3,
      title: "Upgrade Your Style Today",
      description: "Shop from premium collections now.",
      image: "https://source.unsplash.com/1200x500/?clothing,store",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
  };

  return (
    <div className={styles.heroContainer}>
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className={styles.slide}>
            <img src={slide.image} alt={slide.title} className={styles.image} />
            <div className={styles.overlay}>
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
              <button className={styles.ctaButton}>Shop Now</button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroCarousel;
