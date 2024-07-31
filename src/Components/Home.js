import React, { useState, useEffect } from "react";
import Header from "./Header";
import "./Css/Home.css";
import { Link } from "react-router-dom";
import homebg from "../Assets/homebg.png";
import SearchBar from "./SearchBar";
import Collections from "./Collections";
import star from "../Assets/star.svg";
import rigthArrow from "../Assets/right_svg_button.svg";
import leftArrow from "../Assets/left_svg_button.svg";
import venueImg1 from "../Assets/venue1.png";
import str2 from "../Assets/5stars.svg";
import str1 from "../Assets/singleStar.svg";
import tick from "../Assets/tick.svg";
import percentage from "../Assets/percentage.svg";
import discoverbg_1 from "../Assets/Background.png";
import discoverbg_2 from "../Assets/background1.png";
import discoverbg1 from "../Assets/squareImg1.png";
import discoverbg2 from "../Assets/squareImg2.png";
import discoverbg3 from "../Assets/squareImg3.png";
import discoverbg4 from "../Assets/squareImg4.png";
import DownloadApp from "./DownloadApp";
import AreYouAVenueOwner from "./AreYouAVenueOwner";
import Heart from "react-heart";
import Footer from "./Footer";
import {
  server_post_data,
  get_landingpage_webapp,
  imageApi,
} from "../ServiceConnection/serviceconnection.js";
import { handleLinkClick } from "../CommonJquery/CommonJquery.js";
function Home() {
  const [likedVenues, setLikedVenues] = useState({});
  const [SEOloop, setSEOloop] = useState([]);
  const [GetVenueData, SetVenueData] = useState([]);
  const [testimonials, Settestimonials] = useState([]);
  const [blogs, Setblogs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [restaurantByCountry, setRestaurantByCountry] = useState([]);
  const [restaurantByCity, setRestaurantByCity] = useState([]);

  const [collection, setCollection] = useState([]);
  // Toggle the like state for a specific venue
  const toggleLike = (index) => {
    setLikedVenues((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  //get data
  const master_data_get = async () => {
    const fd = new FormData();
    fd.append("country", "Sweden");
    await server_post_data(get_landingpage_webapp, fd)
      .then((Response) => {
        if (Response.data.error) {
          // handleError(Response.data.message.title_name);
        } else {
          SetVenueData(Response.data.message.venue_active_data);
          Settestimonials(Response.data.message.testimonial_active_data);
          Setblogs(Response.data.message.blog_active_data);
          setSEOloop(Response.data.message.seo_loop);
          setCollection(Response.data.message.category_countsss);
          setCountry(Response.data.message.countries_name);
          setCity(Response.data.message.cities_name);
          setRestaurantByCountry(Response.data.message.restro_country);
          setRestaurantByCity(Response.data.message.restro_city);
          console.log(Response.data.message);
        }
      })
      .catch((error) => {});
  };

  const match_and_return_seo_link = (v_id) => {
    let data_seo_link_final = "/restro/restro_detail/" + v_id;
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

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  // pagination of popular venues
  const [currentPaginationPage, setCurrentPaginationPage] = useState(1);
  const itemsPerPage = 4;

  const totalPaginationPages = Math.ceil(
    restaurantByCountry && restaurantByCountry.length / itemsPerPage
  );

  const handleNextPage = () => {
    setCurrentPaginationPage((prevPage) =>
      Math.min(prevPage + 1, totalPaginationPages)
    );
  };

  const handlePreviousPage = () => {
    setCurrentPaginationPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const indexOfLastItem = currentPaginationPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPaginationItems =
    restaurantByCountry &&
    restaurantByCountry.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    master_data_get();
  }, []);

  return (
    <div>
      <Header />
      <div>
        <section className="heroSection">
          <div className="row container-lg m-auto">
            <div className="heroSection_wrapper p-0 col-lg-12 col-12">
              <img src={homebg} alt="home bg" id="homeBG" />
              <div className="searchBar_container_homeScreen">
                <div className="Heading_herosection">
                  <h1>Secure your table for every special moment.</h1>
                </div>
                <div className="serachBxx">
                  <div className="searchBarInHeroSection w-100 px-sm-5 px-4">
                    <SearchBar />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="collections_section">
          <div className="container-lg">
            <div className="collections_sections_heading">
              <h3>Collections</h3>
              <h6>
                Explore curated lists of top restaurants, cafes, pubs, and bars
                in {city}, based on trends
              </h6>
            </div>
          </div>
          <div>
            <Collections data={collection} SEOloop={SEOloop} />
          </div>
        </section>
        {/* Popular Venues */}
        <section>
          <div className="popularVenues_section">
            <div className="container-lg">
              <div className="popularVenues_heading_container">
                <h3>Popular Restaurants in {country} </h3>
                <span className="seAll_span">
                  <Link>
                    <p>
                      <strong>See All</strong>
                    </p>
                  </Link>
                  <div className="pagination_controls">
                    <button
                      onClick={handlePreviousPage}
                      disabled={currentPaginationPage === 1}
                    >
                      <img src={leftArrow} alt="leftArrow" />
                    </button>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPaginationPage === totalPaginationPages}
                    >
                      <img src={rigthArrow} alt="rightArrow" />
                    </button>
                  </div>
                </span>
              </div>
              <div className="popularVenues">
                <div className="venue_cards_container row mt-1">
                  {currentPaginationItems &&
                    currentPaginationItems.length > 0 &&
                    currentPaginationItems.map((venue, index) => (
                      <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
                        <div className="popularVenues_venue_container">
                          <div className="venue_image_holder">
                            <img
                              src={imageApi + venue.restaurant_image}
                              alt="venueImg"
                            />
                            <Heart
                              className="heart_icon"
                              isActive={likedVenues[index] || false}
                              onClick={() => toggleLike(index)}
                              activeColor="red"
                              inactiveColor="red"
                              animationTrigger="hover"
                              animationScale={1.1}
                            />
                          </div>
                          <Link
                            onClick={() =>
                              handleLinkClick(
                                match_and_return_seo_link(venue.primary_id)
                              )
                            }
                            style={{ textDecoration: "none" }}
                          >
                            <div className="venueDetailCOntainer">
                              <div className="venue_category_div">
                                <span className="venue_category_titles">
                                  {/* {venue.Venue &&
                                    venue.Venue.length > 0 &&
                                    venue.Venue.map((category, idx) => (
                                      <React.Fragment key={idx}>
                                        <p>{category}</p>
                                      </React.Fragment>
                                    ))} */}
                                  <p>{"FRENCH"}</p>
                                </span>
                                <div className="rating_greenDiv">
                                  <p>{venue.rating}</p>
                                  <img src={star} alt="star" />
                                </div>
                              </div>
                              <div className="venue_address_wrapper">
                                <h6 className="venue_address_heading">
                                  {venue.restaurant_name}
                                </h6>
                                <desc className="ellipsis">
                                  {venue.restaurant_temorary_adrress}
                                </desc>
                                <span className="venue_capacity_wrapper">
                                  <p>€{venue.restaurant_price} average price</p>
                                </span>
                                <span className="venue_discount_wrapper">
                                  <p>-{venue.discount_upto}%</p>
                                </span>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="popularVenues_section">
            <div className="container-lg">
              <div className="popularVenues_heading_container">
                <h3>Popular Restaurants in {city} </h3>
                <span className="seAll_span">
                  <Link>
                    <p>
                      <strong>See All</strong>
                    </p>
                  </Link>
                  <div className="pagination_controls">
                    <button
                      onClick={handlePreviousPage}
                      disabled={currentPaginationPage === 1}
                    >
                      <img src={leftArrow} alt="leftArrow" />
                    </button>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPaginationPage === totalPaginationPages}
                    >
                      <img src={rigthArrow} alt="rightArrow" />
                    </button>
                  </div>
                </span>
              </div>
              <div className="popularVenues">
                <div className="venue_cards_container row mt-1">
                  {restaurantByCity &&
                    restaurantByCity.length > 0 &&
                    restaurantByCity.map((venue, index) => (
                      <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
                        <div className="popularVenues_venue_container">
                          <div className="venue_image_holder">
                            <img
                              src={imageApi + venue.restaurant_image}
                              alt="venueImg"
                            />
                            <Heart
                              className="heart_icon"
                              isActive={likedVenues[index] || false}
                              onClick={() => toggleLike(index)}
                              activeColor="red"
                              inactiveColor="red"
                              animationTrigger="hover"
                              animationScale={1.1}
                            />
                          </div>
                          <Link
                            onClick={() =>
                              handleLinkClick(
                                match_and_return_seo_link(venue.primary_id)
                              )
                            }
                            style={{ textDecoration: "none" }}
                          >
                            <div className="venueDetailCOntainer">
                              <div className="venue_category_div">
                                <span className="venue_category_titles">
                                  {/* {venue.Venue &&
                                    venue.Venue.length > 0 &&
                                    venue.Venue.map((category, idx) => (
                                      <React.Fragment key={idx}>
                                        <p>{category}</p>
                                      </React.Fragment>
                                    ))} */}
                                  <p>{"FRENCH"}</p>
                                </span>
                                <div className="rating_greenDiv">
                                  <p>{venue.rating}</p>
                                  <img src={star} alt="star" />
                                </div>
                              </div>
                              <div className="venue_address_wrapper">
                                <h6 className="venue_address_heading">
                                  {venue.restaurant_name}
                                </h6>
                                <desc className="ellipsis">
                                  {venue.restaurant_temorary_adrress}
                                </desc>
                                <span className="venue_capacity_wrapper">
                                  <p>€{venue.restaurant_price} average price</p>
                                </span>
                                <span className="venue_discount_wrapper">
                                  <p>-{venue.discount_upto}%</p>
                                </span>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* how does it works section */}
        <section className="how_does_it_work_section">
          <div className="how_does_it_work_wrapper">
            <div className="container-lg">
              <div className="row how_it_works_content">
                <div className="how_it_works_content_heading">
                  <h5>How does it work?</h5>
                </div>
                <div className="col-lg-3">
                  <div className="sigle_star_section">
                    <img src={str1} alt="star" />
                    <h6>Best choice</h6>
                    <p>
                      An unrivaled selection of restaurants forwhatever you want
                    </p>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="multi_star_section">
                    <img src={str2} alt="star" id="multiStars" />
                    <h6>User reviews</h6>
                    <p>
                      Recommendations and reviews from a powerful community.
                    </p>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="percentage_section">
                    <img src={percentage} alt="star" />
                    <h6>Exclusive benefits</h6>
                    <p>
                      Offers for many restaurants and lots of other benefits
                      with our loyalty program.
                    </p>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="sigle_star_section">
                    <img src={tick} alt="star" />
                    <h6>Easy reservation</h6>
                    <p>Instant, free, everywhere. 24/7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <DownloadApp />
        </section>
        <section>
          <AreYouAVenueOwner />
        </section>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
