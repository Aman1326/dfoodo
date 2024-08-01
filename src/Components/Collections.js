import React from "react";
import "./Css/Collections.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import right from "../Assets/rightArrow_white.svg";
import leftArrowIcon from "../Assets/leftArrowIcon.svg";
import rightArrowSvg from "../Assets/rightArrowIcon.svg";
import { APL_LINK } from "../ServiceConnection/serviceconnection";
import { handleLinkClick } from "../CommonJquery/CommonJquery";
import { Link } from "react-router-dom";
const Collections = ({ data, SEOloop }) => {
  //browse cities section

  // Custom Next Arrow
  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <img
        className={className}
        src={rightArrowSvg}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  };

  // Custom Prev Arrow
  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <img
        src={leftArrowIcon}
        className={className}
        style={{
          ...style,
          display: "block",
          opacity: "1",
        }}
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

  const match_and_return_seo_link = (v_id, catagory) => {
    let data_seo_link_final = "/restro/" + catagory + "/" + v_id;
    let data_seo_link = data_seo_link_final;
    if (SEOloop) {
      const matchedItem = SEOloop.find((data) => {
        return data_seo_link === data.call_function_name;
      });

      if (matchedItem) {
        data_seo_link_final = matchedItem.pretty_function_name;
      }
    }
    return data_seo_link_final;
  };
  console.log(data);

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
                      <Link
                        onClick={() =>
                          handleLinkClick(
                            match_and_return_seo_link(
                              venue.primary_id,
                              venue.category_master_name
                            )
                          )
                        }
                      >
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
                      </Link>
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
