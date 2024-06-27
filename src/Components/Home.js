import React, { useState } from "react";
import Header from "./Header";
import "./Css/Home.css";
import { Link } from "react-router-dom";
import homebg from "../Assets/homebg.png";
import SearchBar from "./SearchBar";
import Collections from "./Collections";
import star from "../Assets/star.svg";
import person from "../Assets/person.svg";
import rigthArrow from "../Assets/rightArrow.svg";
import leftArrow from "../Assets/leftArrow.svg";
import venueImg1 from "../Assets/venue1.png";
function Home() {
  const venues_data_labeled = [
    {
      venue_image: venueImg1,
      Venue: ["Wedding", "Birthday party"],
      Rating: 4.1,
      Name: "Majestic Manor",
      Address: "Royal Plaza, Anand Nagar",
      Capacity: "180-600",
    },
    {
      venue_image: venueImg1,
      Venue: ["Conference", "Workshop"],
      Rating: 4.3,
      Name: "Business Hall",
      Address: "Tech Park, Sector 5, Downtown",
      Capacity: "50-200",
    },
    {
      venue_image: venueImg1,
      Venue: ["Concert", "Festival"],
      Rating: 4.8,
      Name: "Grand Arena",
      Address: "City Center, Main Square",
      Capacity: "500-2000",
    },
    {
      venue_image: venueImg1,
      Venue: ["Gala", "Banquet"],
      Rating: 4.5,
      Name: "Royal Banquet Hall",
      Address: "East Wing, Palace Grounds",
      Capacity: "100-400",
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
                    <h2>Secure your table for every special moment.</h2>
                  </div>
                  <div className="searchBarInHeroSection">
                    {/* <SearchBar /> */}
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
            <div>
              <Collections />
            </div>
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
                                    {idx < venue.Venue.length - 1 && <p>|</p>}
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
                                <p>{venue.Capacity} Capacity</p>
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
      </div>
    </div>
  );
}

export default Home;
