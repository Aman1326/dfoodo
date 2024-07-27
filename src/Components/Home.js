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
  APL_LINK,
} from "../ServiceConnection/serviceconnection.js";
let mohsinvariable;
function Home() {
  const [likedVenues, setLikedVenues] = useState({});
  const [SEOloop, setSEOloop] = useState([]);
  const [GetVenueData, SetVenueData] = useState([]);
  const [testimonials, Settestimonials] = useState([]);
  const [blogs, Setblogs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [country, setCountry] = useState("");
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
    fd.append("country_id", 2);
    await server_post_data(get_landingpage_webapp, fd)
      .then((Response) => {
        console.log(Response.data.message);
        if (Response.data.error) {
          // handleError(Response.data.message.title_name);
        } else {
          SetVenueData(Response.data.message.venue_active_data);
          Settestimonials(Response.data.message.testimonial_active_data);
          Setblogs(Response.data.message.blog_active_data);
          setSEOloop(Response.data.message.seo_loop);
          setCollection(Response.data.message.category_active_data);
          setCountry(Response.data.message.countries_name);
          setRestaurantByCountry(Response.data.message.restro_country);
          setRestaurantByCity(Response.data.message.restro_city);
          mohsinvariable = Response.data.message.restro_country;
          console.log(Response.data.message.restro_country);
        }
      })
      .catch((error) => {});
  };

  console.log(restaurantByCountry);

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
  // const currentPaginationItems =
  //   restaurantByCountry &&
  //   restaurantByCountry.slice(indexOfFirstItem, indexOfLastItem);
  // console.log(currentPaginationItems);

  useEffect(() => {
    master_data_get();
  }, []);

  return (
    <div>
      <Header />
      <div>
        <section className="heroSection">
          <div className="row container-lg m-auto">
            <div className="heroSection_wrapper col-lg-12 col-12">
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
          <div className="container">
            <div className="collections_sections_heading">
              <h3>Collections</h3>
              <h6>
                Explore curated lists of top restaurants, cafes, pubs, and bars
                in Gwalior, based on trends
              </h6>
            </div>
          </div>
          <div>
            <Collections data={collection} />
          </div>
        </section>
        {/* Popular Venues */}
        <section>
          <div className="popularVenues_section">
            <div className="container">
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
                  {restaurantByCountry &&
                    restaurantByCountry.length > 0 &&
                    restaurantByCountry.map((venue, index) => (
                      <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
                        <div className="popularVenues_venue_container">
                          <div className="venue_image_holder">
                            <img src={venue.venue_image} alt="venueImg" />
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
                            to="/detailedVenue"
                            style={{ textDecoration: "none" }}
                          >
                            <div className="venueDetailCOntainer">
                              <div className="venue_category_div">
                                <span className="venue_category_titles">
                                  {venue.Venue &&
                                    venue.Venue.length > 0 &&
                                    venue.Venue.map((category, idx) => (
                                      <React.Fragment key={idx}>
                                        <p>{category}</p>
                                      </React.Fragment>
                                    ))}
                                </span>
                                <div className="rating_greenDiv">
                                  <p>{venue.Rating}</p>
                                  <img src={star} alt="star" />
                                </div>
                              </div>
                              <div className="venue_address_wrapper">
                                <h6 className="venue_address_heading">
                                  {venue.Name}
                                </h6>
                                <desc>{venue.Address}</desc>
                                <span className="venue_capacity_wrapper">
                                  <p>€{venue.Capacity} average price</p>
                                </span>
                                <span className="venue_discount_wrapper">
                                  <p>-{venue.Discount}%</p>
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
