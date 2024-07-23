import React, { useState } from "react";
import Header from "./Header";
import "./Css/Home.css";
import { Link } from "react-router-dom";
import homebg from "../Assets/homebg.png";
import SearchBar from "./SearchBar";
import Collections from "./Collections";
import star from "../Assets/star.svg";
import rigthArrow from "../Assets/rightArrow.svg";
import leftArrow from "../Assets/leftArrow.svg";
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
import Footer from "./Footer";
function Home() {
  const venues_data_labeled = [
    {
      venue_image: discoverbg4,
      Venue: ["French"],
      Rating: 4.1,
      Name: "Majestic Manor",
      Address: "Royal Plaza, Anand Nagar",
      Capacity: "25",
      Discount: "25",
    },
    {
      venue_image: discoverbg2,
      Venue: ["French"],
      Rating: 4.3,
      Name: "Business Hall",
      Address: "Tech Park, Sector 5, Downtown",
      Capacity: "50",
      Discount: "50",
    },
    {
      venue_image: discoverbg3,
      Venue: ["French"],
      Rating: 4.8,
      Name: "Grand Arena",
      Address: "City Center, Main Square",
      Capacity: "45",
      Discount: "45",
    },
    {
      venue_image: discoverbg4,
      Venue: ["French"],
      Rating: 4.5,
      Name: "Royal Banquet Hall",
      Address: "East Wing, Palace Grounds",
      Capacity: "23",
      Discount: "23",
    },
  ];
  // pagination of popular venues
  const [currentPaginationPage, setCurrentPaginationPage] = useState(1);
  const itemsPerPage = 8;

  const totalPaginationPages = Math.ceil(
    venues_data_labeled.length / itemsPerPage
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
  const currentPaginationItems = venues_data_labeled.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div>
      <Header />
      <div>
        <section className="heroSection">
          <div className="container">
            <div className="row">
              <div className="heroSection_wrapper col-lg-12 col-12">
                <img src={homebg} alt="home bg" id="homeBG" />
                <div className="searchBar_container_homeScreen">
                  <div className="Heading_herosection">
                    <h1>Secure your table for every special moment.</h1>
                  </div>
                  <div className="searchBarInHeroSection">
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
            <Collections />
          </div>
        </section>
        {/* Popular Venues */}
        <section>
          <div className="popularVenues_section">
            <div className="container">
              <div className="popularVenues_heading_container">
                <h3>Popular Restaurants in Sweden </h3>
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
                <Link to="/detailedVenue" style={{ textDecoration: "none" }}>
                  <div className="venue_cards_container row mt-1">
                    {currentPaginationItems.map((venue, index) => (
                      <div className="col-lg-3 col-md-4 col-sm-6">
                        <div
                          key={index}
                          className="popularVenues_venue_container"
                        >
                          <div className="venue_image_holder">
                            <img src={venue.venue_image} alt="venueImg" />
                          </div>
                          <div className="venueDetailCOntainer">
                            <div className="venue_category_div">
                              <span className="venue_category_titles">
                                {venue.Venue.map((category, idx) => (
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
                                {/* <img src={person} alt="person" /> */}
                                <p>€{venue.Capacity} average price</p>
                              </span>
                              <span className="venue_discount_wrapper">
                                {/* <img src={person} alt="person" /> */}
                                <p>-{venue.Discount}%</p>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Venues */}
        <section>
          <div className="popularVenues_section">
            <div className="container">
              <div className="popularVenues_heading_container">
                <h3>Wins Bar in Stockholm </h3>
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
                <Link to="/detailedVenue" style={{ textDecoration: "none" }}>
                  <div className="venue_cards_container row mt-1">
                    {currentPaginationItems.map((venue, index) => (
                      <div className="col-lg-3 col-md-4 col-sm-6">
                        <div
                          key={index}
                          className="popularVenues_venue_container"
                        >
                          <div className="venue_image_holder">
                            <img src={venue.venue_image} alt="venueImg" />
                          </div>
                          <div className="venueDetailCOntainer">
                            <div className="venue_category_div">
                              <span className="venue_category_titles">
                                {venue.Venue.map((category, idx) => (
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
                                {/* <img src={person} alt="person" /> */}
                                <p>€{venue.Capacity} average price</p>
                              </span>
                              <span className="venue_discount_wrapper">
                                {/* <img src={person} alt="person" /> */}
                                <p>-{venue.Discount}%</p>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Venues */}
        <section>
          <div className="popularVenues_section">
            <div className="container">
              <div className="popularVenues_heading_container">
                <h3>Wins Bar in Stockholm </h3>
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
                <Link to="/detailedVenue" style={{ textDecoration: "none" }}>
                  <div className="venue_cards_container row mt-1">
                    {currentPaginationItems.map((venue, index) => (
                      <div className="col-lg-3 col-md-4 col-sm-6">
                        <div
                          key={index}
                          className="popularVenues_venue_container"
                        >
                          <div className="venue_image_holder">
                            <img src={venue.venue_image} alt="venueImg" />
                          </div>
                          <div className="venueDetailCOntainer">
                            <div className="venue_category_div">
                              <span className="venue_category_titles">
                                {venue.Venue.map((category, idx) => (
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
                                {/* <img src={person} alt="person" /> */}
                                <p>€{venue.Capacity} average price</p>
                              </span>
                              <span className="venue_discount_wrapper">
                                {/* <img src={person} alt="person" /> */}
                                <p>-{venue.Discount}%</p>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Venues */}
        <section>
          <div className="popularVenues_section">
            <div className="container">
              <div className="popularVenues_heading_container">
                <h3>Wins Bar in Stockholm </h3>
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
                <Link to="/detailedVenue" style={{ textDecoration: "none" }}>
                  <div className="venue_cards_container row mt-1">
                    {currentPaginationItems.map((venue, index) => (
                      <div className="col-lg-3 col-md-4 col-sm-6">
                        <div
                          key={index}
                          className="popularVenues_venue_container"
                        >
                          <div className="venue_image_holder">
                            <img src={venue.venue_image} alt="venueImg" />
                          </div>
                          <div className="venueDetailCOntainer">
                            <div className="venue_category_div">
                              <span className="venue_category_titles">
                                {venue.Venue.map((category, idx) => (
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
                                {/* <img src={person} alt="person" /> */}
                                <p>€{venue.Capacity} average price</p>
                              </span>
                              <span className="venue_discount_wrapper">
                                {/* <img src={person} alt="person" /> */}
                                <p>-{venue.Discount}%</p>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Venues */}
        <section>
          <div className="popularVenues_section">
            <div className="container">
              <div className="popularVenues_heading_container">
                <h3>Wins Bar in Stockholm </h3>
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
                <Link to="/detailedVenue" style={{ textDecoration: "none" }}>
                  <div className="venue_cards_container row mt-1">
                    {currentPaginationItems.map((venue, index) => (
                      <div className="col-lg-3 col-md-4 col-sm-6">
                        <div
                          key={index}
                          className="popularVenues_venue_container"
                        >
                          <div className="venue_image_holder">
                            <img src={venue.venue_image} alt="venueImg" />
                          </div>
                          <div className="venueDetailCOntainer">
                            <div className="venue_category_div">
                              <span className="venue_category_titles">
                                {venue.Venue.map((category, idx) => (
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
                                {/* <img src={person} alt="person" /> */}
                                <p>€{venue.Capacity} average price</p>
                              </span>
                              <span className="venue_discount_wrapper">
                                {/* <img src={person} alt="person" /> */}
                                <p>-{venue.Discount}%</p>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* how does it works section */}
        <section className="how_does_it_work_section">
          <div className="how_does_it_work_wrapper">
            <div className="container">
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
                <div className="col-lg-4 col-md-6 mb-3">
                  <div className="discoverMore_container">
                    <Link
                      to="//blog/blog_detail/:id"
                      style={{
                        textDecoration: "none",
                        color: "var(--text-black)",
                      }}
                    >
                      <img src={discoverbg_1} alt="discoverImg" />
                      <div className="discoverMore_containerText">
                        <h6>
                          Meet three SF chefs proudly repping the API community
                          in the...
                        </h6>
                        <p>
                          The first-ever Gold Chef Prize recognizes someof the
                          most exciting API chefs...
                        </p>
                        <p
                          style={{
                            color: "var(--primary-color)",
                            paddingBottom: "0.5rem",
                            margin: "0",
                          }}
                        >
                          April 30, 2024
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-3">
                  <div className="discoverMore_container">
                    <Link
                      to="//blog/blog_detail/:id"
                      style={{
                        textDecoration: "none",
                        color: "var(--text-black)",
                      }}
                    >
                      <img src={discoverbg_2} alt="discoverImg" />
                      <div className="discoverMore_containerText">
                        <h6>
                          Meet three SF chefs proudly repping the API community
                          in the...
                        </h6>
                        <p>
                          The first-ever Gold Chef Prize recognizes someof the
                          most exciting API chefs...
                        </p>
                        <p
                          style={{
                            color: "var(--primary-color)",
                            paddingBottom: "0.5rem",
                            margin: "0",
                          }}
                        >
                          April 30, 2024
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="col-lg-4 d-none d-lg-block mb-3">
                  <div className="verticle_container_discoverMore">
                    <div className="smaller_container_discoverMore">
                      <img src={discoverbg1} alt="discoverbg1" />
                      <div className="heading_discoverMore">
                        <h6>
                          How to have the best time at the East Bay’s only two-…
                        </h6>
                        <p>April 30, 2024</p>
                        <hr />
                      </div>
                    </div>
                    <div className="smaller_container_discoverMore">
                      <img src={discoverbg2} alt="discoverbg1" />
                      <div className="heading_discoverMore">
                        <h6>
                          12 quintessential date-night restaurants in San
                          Francisco
                        </h6>
                        <p>January 9, 2024</p>
                        <hr />
                      </div>
                    </div>
                    <div className="smaller_container_discoverMore">
                      <img src={discoverbg3} alt="discoverbg1" />
                      <div className="heading_discoverMore">
                        <h6>
                          OpenTable restaurants to save for your 2024 dining
                          wishlist
                        </h6>
                        <p>December 15, 2023</p>
                        <hr />
                      </div>
                    </div>
                    <div className="smaller_container_discoverMore">
                      <img src={discoverbg4} alt="discoverbg1" />
                      <div className="heading_discoverMore">
                        <h6>
                          How to have the best time at the East Bay’s only two-…
                        </h6>
                        <p>February 9, 2024</p>
                        <hr />
                      </div>
                    </div>
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
