import React from "react";
import "./Css/Collections.css";
import city1 from "../Assets/city1.png";
import city2 from "../Assets/city2.png";
import city3 from "../Assets/city3.png";
import city4 from "../Assets/city4.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import right from "../Assets/rightArrow_white.svg";
import { APL_LINK } from "../ServiceConnection/serviceconnection";
const Collections = ({ data }) => {
  //browse cities section
  const Browse_cities = [
    { image: city1, description: "Veggie Friendly", places: "8 Places" },
    { image: city2, description: "Wine bars", places: "8 Places" },
    { image: city3, description: "High Discount", places: "8 Places" },
    { image: city4, description: "Outdoor Seating ", places: "8 Places" },
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
    slidesToScroll: 2,
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
          <div className="container-lg">
            <div className="cities_mapped ">
              <Slider {...settings}>
                {data &&
                  data.length > 0 &&
                  data.map((venue, index) => (
                    <div key={index} className="city-item">
                      <img
                        className="city-image"
                        src={`${APL_LINK}/assets/${venue.category_master_image}`}
                        alt={`Venue ${index + 1}`}
                      />
                      <div className="city_description">
                        <h6>{venue.category_master_name}</h6>
                        <span className="d-flex flex-row">
                          <p>{venue.category_count} Places</p>
                          <img src={right} alt="right" />
                        </span>
                      </div>
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
