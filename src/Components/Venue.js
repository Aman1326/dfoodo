import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Link } from "react-router-dom";
import Header from "./Header";
import filter from "../Assets/filter.svg";
import "../Components/Css/Venue.css";
import bar1 from "../Assets/bar1.png";
import bar2 from "../Assets/bar2.png";
import bar3 from "../Assets/bar3.png";
import bar4 from "../Assets/bar4.png";
import bar5 from "../Assets/bar5.png";
import bar6 from "../Assets/bar6.png";
import bar7 from "../Assets/bar7.png";
import rigthArrow from "../Assets/rightArrow.svg";
import leftArrow from "../Assets/leftArrow.svg";
import star from "../Assets/star.svg";
import person from "../Assets/person.svg";
// import ListYourVenue from "./ListYourVenue";
import Footer from "./Footer";
// import VenueCategories from "./VenueCategories";
import barPresent from "../Assets/bars-3x.png.svg";
import alcoholPresent from "../Assets/alcohol-served3x.png.svg";
import valetParking from "../Assets/valet-parking3x.png.svg";
import home from "../Assets/home_backbtn.svg";
import right from "../Assets/right_arrow_grey.svg";
import filterimg1 from "../Assets/filterImg1.svg";
import filterimg2 from "../Assets/filterImg2.svg";
import filterimg3 from "../Assets/filterImg3.svg";
import filterimg4 from "../Assets/filterImg4.svg";
import filterimg5 from "../Assets/filterImg5.svg";
import filterimg6 from "../Assets/filterImg6.svg";
import filterimg7 from "../Assets/filterImg7.svg";
import DownloadApp from "./DownloadApp";
import Heart from "react-heart";
const Venue = () => {
  //   const filters = ["Rating: 4,0+", "Popular", "Budget Friendly", "High Rated"];
  const filters = [
    {
      filter_image: filterimg1,
      filter_name: "Special offers",
    },
    {
      filter_image: filterimg2,
      filter_name: "Best Rating",
    },
    {
      filter_image: filterimg3,
      filter_name: "Price",
    },
    {
      filter_image: filterimg4,
      filter_name: "Special offers",
    },
    {
      filter_image: filterimg5,
      filter_name: "Popularity",
    },
    {
      filter_image: filterimg6,
      filter_name: "New Restaurant ",
    },
    {
      filter_image: filterimg7,
      filter_name: "Chinese ",
    },
    {
      filter_image: barPresent,
      filter_name: "Bar ",
    },
    {
      filter_image: alcoholPresent,
      filter_name: "Alcohol Served  ",
    },
  ];
  const venues_data_labeled = [
    {
      venue_image: bar1,
      Venue: [" ₹500 Average Price"],
      Rating: 4.1,
      Name: "Majestic Manor",
      Address: "Royal Plaza, Anand Nagar",
      Capacity: "180-600",
      average_price: "5000",
      facilities: ["bar", "valet parking", "alcohol served"],
      facilities_images: [barPresent, valetParking, alcoholPresent],
    },
    {
      venue_image: bar2,
      Venue: [" ₹500 Average Price"],
      Rating: 4.3,
      Name: "Business Hall",
      Address: "Tech Park, Sector 5, Downtown",
      Capacity: "50-200",
      average_price: "3000",
      facilities: ["bar", "valet parking", "alcohol served"],
      facilities_images: [barPresent, valetParking, alcoholPresent],
    },
    {
      venue_image: bar3,
      Venue: [" ₹500 Average Price"],
      Rating: 4.8,
      Name: "Grand Arena",
      Address: "City Center, Main Square",
      Capacity: "500-2000",
      average_price: "8000",
      facilities: ["bar", "valet parking", "alcohol served"],
      facilities_images: [barPresent, valetParking, alcoholPresent],
    },
    {
      venue_image: bar4,
      Venue: [" ₹500 Average Price"],
      Rating: 4.5,
      Name: "Royal Banquet Hall",
      Address: "East Wing, Palace Grounds",
      Capacity: "100-400",
      average_price: "4500",
      facilities: ["bar", "valet parking", "alcohol served"],
      facilities_images: [barPresent, valetParking, alcoholPresent],
    },
    {
      venue_image: bar5,
      Venue: [" ₹500 Average Price"],
      Rating: 4.0,
      Name: "Summit Center",
      Address: "Highland Boulevard, Peak District",
      Capacity: "150-400",
      average_price: "4000",
      facilities: ["bar", "valet parking", "alcohol served"],
      facilities_images: [barPresent, valetParking, alcoholPresent],
    },
    {
      venue_image: bar6,
      Venue: [" ₹500 Average Price"],
      Rating: 4.4,
      Name: "Paradise Point",
      Address: "Beachside, Coastal Highway",
      Capacity: "200-600",
      average_price: "5500",
      facilities: ["bar", "valet parking", "alcohol served"],
      facilities_images: [barPresent, valetParking, alcoholPresent],
    },
    {
      venue_image: bar7,
      Venue: [" ₹500 Average Price"],
      Rating: 4.6,
      Name: "Empire Hall",
      Address: "Downtown, Main Street",
      Capacity: "350-900",
      average_price: "7000",
      facilities: ["bar", "valet parking", "alcohol served"],
      facilities_images: [barPresent, valetParking, alcoholPresent],
    },
    {
      venue_image: bar1,
      Venue: [" ₹500 Average Price"],
      Rating: 4.1,
      Name: "Sunset Gardens",
      Address: "Hillside, Vista Drive",
      Capacity: "180-600",
      average_price: "5000",
      facilities: ["bar", "valet parking", "alcohol served"],
      facilities_images: [barPresent, valetParking, alcoholPresent],
    },
    {
      venue_image: bar3,
      Venue: [" ₹500 Average Price"],
      Rating: 3.8,
      Name: "Happy Times Hall",
      Address: "Sunnyvale, Bright Road",
      Capacity: "100-350",
      average_price: "3800",
      facilities: ["bar", "valet parking", "alcohol served"],
      facilities_images: [barPresent, valetParking, alcoholPresent],
    },
    {
      venue_image: bar4,
      Venue: [" ₹500 Average Price"],
      Rating: 4.5,
      Name: "Starlight Banquet",
      Address: "Midtown, Star Avenue",
      Capacity: "300-800",
      average_price: "6000",
      facilities: ["bar", "valet parking", "alcohol served"],
      facilities_images: [barPresent, valetParking, alcoholPresent],
    },
    {
      venue_image: bar5,
      Venue: [" ₹500 Average Price"],
      Rating: 4.2,
      Name: "Harmony Hall",
      Address: "Harmony Street, Peace Park",
      Capacity: "200-500",
      average_price: "5000",
      facilities: ["bar", "valet parking", "alcohol served"],
      facilities_images: [barPresent, valetParking, alcoholPresent],
    },
    {
      venue_image: bar3,
      Venue: [" ₹500 Average Price"],
      Rating: 4.0,
      Name: "Elegant Venue",
      Address: "Fashion Street, Glamour District",
      Capacity: "250-650",
      average_price: "4800",
      facilities: ["bar", "valet parking", "alcohol served"],
      facilities_images: [barPresent, valetParking, alcoholPresent],
    },
    {
      venue_image: bar3,
      Venue: [" ₹500 Average Price "],
      Rating: 3.9,
      Name: "Joyful Hall",
      Address: "River Road, Lakeside",
      Capacity: "150-400",
      average_price: "3900",
      facilities: ["bar", "valet parking", "alcohol served"],
      facilities_images: [barPresent, valetParking, alcoholPresent],
    },
    {
      venue_image: bar3,
      Venue: [" ₹500 Average Price"],
      Rating: 4.3,
      Name: "Royal Palace",
      Address: "Queen's Avenue, Majestic Park",
      Capacity: "300-700",
      average_price: "6500",
      facilities: ["bar", "valet parking", "alcohol served"],
      facilities_images: [barPresent, valetParking, alcoholPresent],
    },
    {
      venue_image: bar3,
      Venue: [" ₹500 Average Price"],
      Rating: 4.4,
      Name: "Summit Hall",
      Address: "Mountain Road, High Peaks",
      Capacity: "200-600",
      average_price: "5500",
      facilities: ["bar", "valet parking", "alcohol served"],
      facilities_images: [barPresent, valetParking, alcoholPresent],
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

  // filter modal states
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState("popularity");

  const handleCloseFilterModal = () => setShowFilterModal(false);
  const handleShowFilterModal = () => setShowFilterModal(true);

  const [selectedSort, setSelectedSort] = useState("Popularity");

  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
  };

  const [selectedTab, setSelectedTab] = useState(0);
  const [active, setActive] = useState(false);
  return (
    <>
      <div venue_wrapper>
        <Header />
        {/* venue categories section */}
        <section>
          <div className="container-lg mt-3">
            <div className="venuePage_venueCategory_heading">
              <Link to="/">
                <img src={home} alt="hdbhjb" width={"14px"} />
              </Link>{" "}
              <img src={right} alt="right" />
              <Link to="/venue">Paris restaurants</Link>
              <img src={right} alt="right" />
              <Link>TT nagar</Link>
            </div>
          </div>
          {/* <VenueCategories /> */}
        </section>
        <section>
          <div className="filters_section">
            <div className="container-lg">
              <div className="filters_wrapper">
                <ul>
                  <li onClick={handleShowFilterModal} id="filter_filter_row">
                    <img src={filter} alt="filter" /> Filter
                  </li>
                  {filters.map((text, index) => (
                    <li key={index} className="filters_section_row">
                      {" "}
                      <img src={text.filter_image} alt="filter_image" />
                      {text.filter_name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="found_venues_section">
          <div className="container">
            <section>
              <div className="popularVenues_section">
                <div className="">
                  <div className="popularVenues_heading_container">
                    <h5>15 Venues Found</h5>
                    <span className="seAll_span">
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
                    </span>
                  </div>
                  <div className="popularVenues">
                    <div className="row mt-1">
                      {currentPaginationItems.map((venue, index) => (
                        <div className="col-lg-6 col-12 margin24px">
                          <div
                            key={index}
                            className="VenuePage_venue_container"
                          >
                            <div className="row m-0">
                              <div className="col-sm-5 px-0">
                                <Link
                                  to="/detailedVenue"
                                  style={{ textDecoration: "none" }}
                                >
                                  <div className="venuePage_image_container">
                                    <img
                                      src={venue.venue_image}
                                      alt="venueImg"
                                    />
                                  </div>
                                </Link>
                              </div>
                              <div className="col-sm-7">
                                <div className="venuePage_text_section">
                                  <div className="venueContainer_rowtext">
                                    <div className="venueContainer_nameAndAddress">
                                      <h6>{venue.Name}</h6>
                                    </div>
                                    <div className="heart_section">
                                      <div style={{ width: "1.5rem" }}>
                                        <Heart
                                          isActive={active}
                                          onClick={() => setActive(!active)}
                                          activeColor="red"
                                          inactiveColor="red"
                                          animationTrigger="hover"
                                          animationScale={1.5}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <p>{venue.Address}</p>
                                  <h6 className="avrgPrice">
                                    Starting From ₹{venue.average_price}
                                  </h6>
                                  <span className="venuePage_venue_category_titles">
                                    {venue.Venue.map((category, idx) => (
                                      <p id="category_venuePage" key={idx}>
                                        {category}
                                      </p>
                                    ))}
                                  </span>
                                  <span className="venuePage_venue_category_titles mb-4">
                                    {venue.facilities.map((facility, idx) => (
                                      <div key={idx} className="facility_item">
                                        <img
                                          id="facilities_venuePage"
                                          src={venue.facilities_images[idx]}
                                          alt={facility}
                                        />
                                        <p id="facilities_venuePage">
                                          {facility}
                                        </p>
                                      </div>
                                    ))}
                                  </span>
                                  <span className="venuePage_venue_capacity_wrapper">
                                    <img src={person} alt="person" />
                                    <p>{venue.Capacity} Capacity</p>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
        <section className="venuePage_listyourVenue_section">
          <DownloadApp />
        </section>
        <Footer />
      </div>

      <Modal
        show={showFilterModal}
        onHide={handleCloseFilterModal}
        centered
        className="modal-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title className="filters_modal_heading">Filters</Modal.Title>
        </Modal.Header>
        <Modal.Body id="filters_modal">
          <Tabs
            className="vertical-tabs"
            selectedIndex={selectedTab}
            onSelect={(index) => setSelectedTab(index)}
          >
            <TabList className="vertical-tab-list">
              <Tab>
                Sort by
                <br />
                <p className="colored_text_verticle_tabs">{selectedSort}</p>
              </Tab>
              <Tab onClick={() => setSelectedTab(1)}>Rating</Tab>
            </TabList>

            <TabPanel>
              {selectedTab === 0 && (
                <div>
                  <form className="filters_modal_venuesPage">
                    <label>
                      <input
                        type="radio"
                        name="sort"
                        value="Popularity"
                        checked={selectedSort === "Popularity"}
                        onChange={handleSortChange}
                      />
                      Popularity
                    </label>
                    <br />
                    <label>
                      <input
                        type="radio"
                        name="sort"
                        value="Rating: High to Low"
                        checked={selectedSort === "Rating: High to Low"}
                        onChange={handleSortChange}
                      />
                      Rating: High to Low
                    </label>
                    <br />
                    <label>
                      <input
                        type="radio"
                        name="sort"
                        value="Delivery Time"
                        checked={selectedSort === "Delivery Time"}
                        onChange={handleSortChange}
                      />
                      Delivery Time
                    </label>
                    <br />
                    <label>
                      <input
                        type="radio"
                        name="sort"
                        value="Cost: Low to High"
                        checked={selectedSort === "Cost: Low to High"}
                        onChange={handleSortChange}
                      />
                      Cost: Low to High
                    </label>
                    <br />
                    <label>
                      <input
                        type="radio"
                        name="sort"
                        value="Cost: High to Low"
                        checked={selectedSort === "Cost: High to Low"}
                        onChange={handleSortChange}
                      />
                      Cost: High to Low
                    </label>
                  </form>
                </div>
              )}
              {selectedTab === 1 && (
                <div>
                  <h3>Rating</h3>
                  <p>Content for Rating tab</p>
                </div>
              )}
            </TabPanel>
          </Tabs>
        </Modal.Body>
        <Modal.Footer className="filter_modal_button">
          <Button onClick={handleCloseFilterModal}>Clear All</Button>
          <Button onClick={handleCloseFilterModal}>Apply</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Venue;
