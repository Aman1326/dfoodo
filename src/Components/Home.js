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
import str2 from "../Assets/5stars.svg";
import str1 from "../Assets/singleStar.svg";
import tick from "../Assets/tick.svg";
import percentage from "../Assets/percentage.svg";
import Heart from "../Assets/heart.svg";
import HeartRed from "../Assets/HeartRed.svg";
import DownloadApp from "./DownloadApp";
import AreYouAVenueOwner from "./AreYouAVenueOwner";
import Footer from "./Footer";
import {
  server_post_data,
  get_landingpage_webapp,
  save_favourite,
  APL_LINK,
} from "../ServiceConnection/serviceconnection.js";
import {
  handleLinkClick,
  inputdateformateChange,
  handleError,
} from "../CommonJquery/CommonJquery.js";
import { retrieveData } from "../LocalConnection/LocalConnection.js";
let customer_id = "0";
function Home() {
  customer_id = retrieveData("customer_id");
  const [SEOloop, setSEOloop] = useState([]);
  const [blogs, Setblogs] = useState([]);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [restaurantByCountry, setRestaurantByCountry] = useState([]);
  const [restaurantByCity, setRestaurantByCity] = useState([]);
  const [ImageLink, setImageLink] = useState("");
  const [HeartImg, setHeartImages] = useState([]);
  const [collection, setCollection] = useState([]);
  const [rupees_icon_left, setrupees_icon_left] = useState("");
  const [rupees_icon_right, setrupees_icon_right] = useState([]);
  // Toggle the like state for a specific venue

  //get data
  const master_data_get = async () => {
    await server_post_data(get_landingpage_webapp, null)
      .then((Response) => {
        if (Response.data.error) {
          handleError(Response.data.message);
        } else {
          Setblogs(Response.data.message.blog_active_data);
          setSEOloop(Response.data.message.seo_loop);
          setCollection(Response.data.message.category_countsss);
          setCountry(Response.data.message.countries_name);
          setCity(Response.data.message.cities_name);
          setRestaurantByCountry(Response.data.message.restro_country);
          setRestaurantByCity(Response.data.message.restro_city);
          setImageLink(Response.data.message.image_link);
          setHeartImages(Response.data.message.data_favourite_data);
          setrupees_icon_left(Response.data.message.rupees_icon_left);
          setrupees_icon_right(Response.data.message.rupees_icon_right);
        }
      })
      .catch((error) => {
        console.log(error);
      });
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

  const match_and_return_seo_blog_link = (v_id) => {
    let data_seo_link_final = "/blog/blog_detail/" + v_id;
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

  const text_short = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };
  // pagination of popular venues country
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
  const currentPaginationItemsMobile =
    restaurantByCountry &&
    restaurantByCountry.slice(indexOfFirstItem, indexOfLastItem);

  // pagination of popular venues city
  const [currentPaginationPageCity, setCurrentPaginationPageCity] = useState(1);
  const itemsPerPageCity = 4;

  const indexOfLastItemCity = currentPaginationPageCity * itemsPerPageCity;
  const indexOfFirstItemCity = indexOfLastItemCity - itemsPerPageCity;
  const currentPaginationItemsCity =
    restaurantByCity &&
    restaurantByCity.slice(indexOfFirstItemCity, indexOfLastItemCity);
  const currentPaginationItemsCityMobile =
    restaurantByCity &&
    restaurantByCity.slice(indexOfFirstItemCity, indexOfLastItemCity);

  useEffect(() => {
    master_data_get();
  }, []);

  const handleHeartClick = (venueId) => {
    if (customer_id !== "0") {
      handleSaveChangesdynamic(venueId);
    } else {
      var event = new CustomEvent("customEvent");
      document.getElementById("login_check_jquery").dispatchEvent(event);
    }
  };

  const isFavorite = (venueId) => {
    return HeartImg.some((fav) => fav.restaurant_id === venueId);
  };

  const handleSaveChangesdynamic = async (venueId) => {
    const form_data = new FormData();
    form_data.append("venue_id", venueId);
    await server_post_data(save_favourite, form_data)
      .then((Response) => {
        if (Response.data.error) {
          handleError(Response.data.message);
        } else {
          try {
            const updatedFavorites = HeartImg.some(
              (fav) => fav.restaurant_id === venueId
            )
              ? HeartImg.filter((fav) => fav.restaurant_id !== venueId) // Remove from favorites
              : [...HeartImg, { restaurant_id: venueId }];

            // Update state with the new list of favorites
            setHeartImages(updatedFavorites);
          } catch (error) {
            console.error("Error updating favorite status:", error);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //mobile condition
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div>
      <Header />
      <div>
        <section className="heroSection ">
          <div className={`row ${isMobile ? "" : "container-lg m-auto"}`}>
            <div className="heroSection_wrapper p-0 col-lg-12 col-12">
              <img src={homebg} alt="home bg" id="homeBG" />
              <div className="searchBar_container_homeScreen">
                <div className="Heading_herosection">
                  <h1>Secure your table for every special moment.</h1>
                </div>
                <div className="serachBxx">
                  <div className="searchBarInHeroSection w-100 px-sm-12x px-2">
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
            <Collections
              data={collection}
              SEOloop={SEOloop}
              ImageLink={ImageLink}
            />
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
                  {!isMobile && (
                    <div className="pagination_controls">
                      <button
                        onClick={handlePreviousPage}
                        disabled={currentPaginationPage === 1}
                      >
                        <img src={leftArrow} alt="leftArrow" />
                      </button>
                      <button
                        onClick={handleNextPage}
                        disabled={
                          currentPaginationPage === totalPaginationPages
                        }
                      >
                        <img src={rigthArrow} alt="rightArrow" />
                      </button>
                    </div>
                  )}
                  {/* {isMobile && (
                    <div className="pagination_controls">
                      <Link>View More</Link>
                    </div>
                  )} */}
                </span>
              </div>
              <div className="popularVenues">
                <div className="venue_cards_container row mt-1">
                  {!isMobile &&
                    currentPaginationItems &&
                    currentPaginationItems.length > 0 &&
                    currentPaginationItems.map((venue, index) => (
                      <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
                        <div className="popularVenues_venue_container">
                          <div className="venue_image_holder">
                            <img
                              src={
                                APL_LINK + ImageLink + venue.restaurant_image
                              }
                              alt="venueImg"
                            />

                            <button
                              className="heartBttnn"
                              onClick={() => handleHeartClick(venue.primary_id)}
                            >
                              <img
                                src={
                                  isFavorite(venue.primary_id)
                                    ? HeartRed
                                    : Heart
                                }
                                alt="Heart"
                                className="HeartHomeIcon"
                              />
                            </button>
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
                                  <p>{venue.cuisine}&nbsp;</p>
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
                                <span className="ellipsis">
                                  {venue.restaurant_temorary_adrress}
                                </span>
                                <span className="venue_capacity_wrapper">
                                  <p>
                                    {rupees_icon_left} {venue.restaurant_price}{" "}
                                    {rupees_icon_right} average price
                                    {venue.restaurant_price} average price
                                  </p>
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
                  <div className="horizontal-scroll-container">
                    {isMobile &&
                      currentPaginationItemsMobile &&
                      currentPaginationItemsMobile.length > 0 &&
                      currentPaginationItemsMobile.map((venue, index) => (
                        <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
                          <div className="popularVenues_venue_container">
                            <div className="venue_image_holder">
                              <img
                                src={
                                  APL_LINK + ImageLink + venue.restaurant_image
                                }
                                alt="venueImg"
                              />
                              <button
                                className="heartBttnn"
                                onClick={() =>
                                  handleHeartClick(venue.primary_id)
                                }
                              >
                                <img
                                  src={
                                    isFavorite(venue.primary_id)
                                      ? HeartRed
                                      : Heart
                                  }
                                  alt="Heart"
                                  className="HeartHomeIcon"
                                />
                              </button>
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
                                    <p>{venue.cuisine}&nbsp;</p>
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
                                  <span className="ellipsis">
                                    {venue.restaurant_temorary_adrress}
                                  </span>
                                  <span className="venue_capacity_wrapper">
                                    <p>
                                      {rupees_icon_left}{" "}
                                      {venue.restaurant_price}{" "}
                                      {rupees_icon_right} average price
                                    </p>
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
                  {!isMobile && (
                    <div className="pagination_controls">
                      <button
                        onClick={handlePreviousPage}
                        disabled={currentPaginationPage === 1}
                      >
                        <img src={leftArrow} alt="leftArrow" />
                      </button>
                      <button
                        onClick={handleNextPage}
                        disabled={
                          currentPaginationPage === totalPaginationPages
                        }
                      >
                        <img src={rigthArrow} alt="rightArrow" />
                      </button>
                    </div>
                  )}
                </span>
              </div>
              <div className="popularVenues">
                <div className="venue_cards_container row mt-1">
                  {!isMobile &&
                    currentPaginationItemsCity &&
                    currentPaginationItemsCity.length > 0 &&
                    currentPaginationItemsCity.map((venue, index) => (
                      <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
                        <div className="popularVenues_venue_container">
                          <div className="venue_image_holder">
                            <img
                              src={
                                APL_LINK + ImageLink + venue.restaurant_image
                              }
                              alt="venueImg"
                            />
                            <button
                              style={{ display: "none" }}
                              onClick={() => handleHeartClick(venue.primary_id)}
                            >
                              <img
                                src={
                                  isFavorite(venue.primary_id)
                                    ? HeartRed
                                    : Heart
                                }
                                alt="Heart"
                                className="HeartHomeIcon"
                              />
                            </button>
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
                                  <p>{venue.cuisine}&nbsp;</p>
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
                                <span className="ellipsis">
                                  {venue.restaurant_temorary_adrress}
                                </span>
                                <span className="venue_capacity_wrapper">
                                  <p>
                                    {rupees_icon_left} {venue.restaurant_price}{" "}
                                    {rupees_icon_right} average price
                                  </p>
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
                  <div className="horizontal-scroll-container">
                    {isMobile &&
                      currentPaginationItemsCityMobile &&
                      currentPaginationItemsCityMobile.length > 0 &&
                      currentPaginationItemsCityMobile.map((venue, index) => (
                        <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
                          <div className="popularVenues_venue_container">
                            <div className="venue_image_holder">
                              <img
                                src={
                                  APL_LINK + ImageLink + venue.restaurant_image
                                }
                                alt="venueImg"
                              />
                              <button
                                className="heartBttnn"
                                onClick={() =>
                                  handleHeartClick(venue.primary_id)
                                }
                              >
                                <img
                                  src={
                                    isFavorite(venue.primary_id)
                                      ? HeartRed
                                      : Heart
                                  }
                                  alt="Heart"
                                  className="HeartHomeIcon"
                                />
                              </button>
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
                                    <p>{venue.cuisine}&nbsp;</p>
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
                                  <span className="ellipsis">
                                    {venue.restaurant_temorary_adrress}
                                  </span>
                                  <span className="venue_capacity_wrapper">
                                    <p>
                                      {rupees_icon_left}{" "}
                                      {venue.restaurant_price}{" "}
                                      {rupees_icon_right} average price
                                    </p>
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
          </div>
        </section>

        {/* how does it works section */}
        <section className="how_does_it_work_section">
          <div className="how_does_it_work_wrapper">
            <div className="container-lg">
              <div className="how_it_works_content">
                <div className="how_it_works_content_heading">
                  <h5>How does it work?</h5>
                </div>
                <div className="row m-0">
                  <div className="col-md-3">
                    <div className="sigle_star_section">
                      <img src={str1} alt="star" />
                      <h6>Best choice</h6>
                      <p>
                        An unrivaled selection of restaurants forwhatever you
                        want
                      </p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="multi_star_section">
                      <div
                        style={{
                          height: "65px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <img
                          style={{ marginBottom: "0" }}
                          src={str2}
                          alt="star"
                          id="multiStars"
                        />
                      </div>
                      <h6>User reviews</h6>
                      <p>
                        Recommendations and reviews from a powerful community.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="percentage_section">
                      <img src={percentage} alt="star" />
                      <h6>Exclusive benefits</h6>
                      <p>
                        Offers for many restaurants and lots of other benefits
                        with our loyalty program.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="sigle_star_section">
                      <img src={tick} alt="star" />
                      <h6>Easy reservation</h6>
                      <p>Instant, free, everywhere. 24/7</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* discover more great venues */}
        <section>
          <div className="discover_more_venues_section">
            <div className="container">
              <div className="row">
                <div className="popularVenues_heading_container">
                  <h2>Discover more great Venues</h2>
                  <span className="seAll_span">
                    <Link to="/blogs">
                      <p>Explore All</p>
                    </Link>
                  </span>
                </div>
                {blogs.slice(0, 2).map((blog, index) => (
                  <div className="col-lg-4 col-md-6 mb-3" key={index}>
                    <div className="discoverMore_container">
                      <Link
                        onClick={() =>
                          handleLinkClick(
                            match_and_return_seo_blog_link(blog.primary_id)
                          )
                        }
                        style={{
                          textDecoration: "none",
                          color: "var(--text-black)",
                        }}
                      >
                        <img src={blog.image_name} alt="discoverImg" />
                        <div className="discoverMore_containerText">
                          <h6>{text_short(blog.title_name, 34)}</h6>
                          <p>{text_short(blog.tag_line, 50)}</p>
                          <p
                            style={{
                              color: "var(--primary-color)",
                              paddingBottom: "0.5rem",
                              margin: "0",
                            }}
                          >
                            {inputdateformateChange(blog.entry_date)}
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
                <div className="col-lg-4 d-none d-lg-block mb-3">
                  <div className="verticle_container_discoverMore">
                    {blogs.slice(0, 4).map((blog, index) => (
                      <Link
                        onClick={() =>
                          handleLinkClick(
                            match_and_return_seo_blog_link(blog.primary_id)
                          )
                        }
                        key={index}
                        style={{
                          textDecoration: "none",
                          color: "var(--text-black)",
                        }}
                      >
                        <div
                          className="smaller_container_discoverMore"
                          key={index}
                        >
                          <img src={blog.image_name} alt="discoverbg1" />
                          <div className="heading_discoverMore">
                            <h6>{blog.title_name}</h6>
                            <p>{inputdateformateChange(blog.entry_date)}</p>
                            <hr width="100%" />
                          </div>
                        </div>
                      </Link>
                    ))}
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
