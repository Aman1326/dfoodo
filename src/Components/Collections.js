import React from "react";
import "./Css/Collections.css";
import city1 from "../Assets/city1.png";
import city2 from "../Assets/city2.png";
import city3 from "../Assets/city3.png";
import city4 from "../Assets/city4.png";
import city5 from "../Assets/city5.png";
import city6 from "../Assets/city6.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Collections = () => {
  //browse cities section
  const Browse_cities = [
    { image: city1, description: "Mumbai" },
    { image: city2, description: "Bhopal" },
    { image: city3, description: "Nasik" },
    { image: city4, description: "Indore" },
    { image: city5, description: "Pune" },
    { image: city6, description: "Ujjain" },
  ];
  // Custom Next Arrow
  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  };

  // Custom Prev Arrow
  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      {/* browse other cities */}
      <section>
        <div className="browse_otherCities_section">
          <div className="container">
            <div className="cities_mapped ">
              <Slider {...settings}>
                {Browse_cities.map((venue, index) => (
                  <div key={index} className="city-item">
                    <img
                      className="city-image"
                      src={venue.image}
                      alt={`Venue ${index + 1}`}
                    />
                    <div className="city-description">{venue.description}</div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Collections;
