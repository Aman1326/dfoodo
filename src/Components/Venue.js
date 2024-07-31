import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Link, useLocation } from "react-router-dom";
import Header from "./Header";
import filter from "../Assets/filter.svg";
import "../Components/Css/Venue.css";

import rightArrow from "../Assets/rightArrow.svg";
import rigthArrow from "../Assets/right_svg_button.svg";
import leftArrow from "../Assets/left_svg_button.svg";
import star from "../Assets/star.svg";
// import ListYourVenue from "./ListYourVenue";
import Footer from "./Footer";
// import VenueCategories from "./VenueCategories";
import Heart from "../Assets/heart.svg";
import HeartRed from "../Assets/HeartRed.svg";
import barPresent from "../Assets/bars-3x.png.svg";
import alcoholPresent from "../Assets/alcohol-served3x.png.svg";
import valetParking from "../Assets/valet-parking3x.png.svg";
import home from "../Assets/home_backbtn.svg";
import filterimg1 from "../Assets/filterImg1.svg";
import filterimg2 from "../Assets/filterImg2.svg";
import filterimg3 from "../Assets/filterImg3.svg";
import filterimg4 from "../Assets/filterImg4.svg";
import filterimg5 from "../Assets/filterImg5.svg";
import filterimg6 from "../Assets/filterImg6.svg";
import filterimg7 from "../Assets/filterImg7.svg";
import DownloadApp from "./DownloadApp";
import contactus from "../Assets/averagePrice.svg";
// import Heart from "react-heart";
import {
  server_post_data,
  get_categorypage_webapp,
  save_favourite,
  get_restropage_webapp,
  APL_LINK,
} from "../ServiceConnection/serviceconnection";
import { handleError } from "../CommonJquery/CommonJquery.js";

let login_flag_res = "0";
let customer_id = "1";
let customer_name = "0";
let customer_mobile_no = "0";
let customer_email = "0";
const Venue = () => {
  const location = useLocation();
  const currentUrl = location.pathname.substring(1);

  const [GetVenueData, SetVenueData] = useState([]);

  const [showLoaderAdmin, setshowLoaderAdmin] = useState([]);
  const [numberOfVenuesFound, setNumberOfVenuesFound] = useState(0);

  const [HeartImg, setHeartImages] = useState([]);

  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const master_data_get = async (category_id) => {
    setshowLoaderAdmin(true);
    const fd = new FormData();
    fd.append("current_url", "/" + currentUrl);
    fd.append("category_id", "category_id");
    fd.append("call_id", "1");
    await server_post_data(get_restropage_webapp, fd)
      .then((Response) => {
        console.log("catagory dta", Response.data.message.restro);

        if (Response.data.error) {
          handleError(Response.data.message);
        } else {
          const venues = Response.data.message.restro || [];
          SetVenueData(venues);

          setHeartImages(Response.data.message.favourite || []);

          setNumberOfVenuesFound(venues.length);
          const restroData = Response.data.message.restro || [];
          const venueData = restroData[0] || {};
          const catagoryData = restroData[0].category[0] || {};
          console.log("tarun", catagoryData);

          // Extract categories
          const newBreadcrumbs = [
            { name: "Home", path: "/" },
            {
              name: venueData.restaurant_country || "",
            },
            { name: venueData.restaurant_city || "" },
            {
              name: catagoryData.category_master_name || "",
              path: "",
            },
          ];
          setBreadcrumbs(newBreadcrumbs);
        }
        setshowLoaderAdmin(false);
      })
      .catch((error) => {
        setshowLoaderAdmin(false);
      });
  };

  // const master_filter_data_get = async (category_id) => {
  //   setshowLoaderAdmin(true);
  //   const fd = new FormData();
  //   fd.append("current_url", "/" + currentUrl);
  //   fd.append("category_id", "category_id");
  //   fd.append("call_id", "1");
  //   await server_post_data(get_restropage_webapp, fd)
  //     .then((Response) => {
  //       if (Response.data.error) {
  //         handleError(Response.data.message);
  //       } else {
  //         SetVenueData(Response.data.message.restro || []);
  //         setHeartImages(Response.data.message.favourite || []);
  //       }
  //       setshowLoaderAdmin(false);
  //     })
  //     .catch((error) => {
  //       setshowLoaderAdmin(false);
  //     });
  // };

  useEffect(() => {
    master_data_get();
    // master_filter_data_get();
  }, []);

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
  const venues_data_labeled = GetVenueData;
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

  const handleCloseFilterModal = () => setShowFilterModal(false);
  const handleShowFilterModal = () => setShowFilterModal(true);

  const [selectedSort, setSelectedSort] = useState("Popularity");

  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
  };

  const [selectedTab, setSelectedTab] = useState(0);

  // Toggle the like state for a specific venue
  const handleHeartClick = async (venueId) => {
    try {
      // Assuming you have a function to handle save changes dynamically
      await handleSaveChangesdynamic(venueId);

      // Toggle favorite status
      const updatedFavorites = HeartImg.some(
        (fav) => fav.restaurant_id === venueId
      )
        ? HeartImg.filter((fav) => fav.restaurant_id !== venueId) // Remove from favorites
        : [...HeartImg, { restaurant_id: venueId }];

      // Update state with the new list of favorites
      setHeartImages(updatedFavorites);

      // Optionally, you can update the backend or local storage here
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  const isFavorite = (venueId) => {
    return HeartImg.some((fav) => fav.restaurant_id === venueId);
  };

  const handleSaveChangesdynamic = async (id) => {
    // seterror_show("");
    const form_data = new FormData();

    form_data.append("venue_id", id);
    form_data.append("customer_id", "1");
    form_data.append("flag", "0");
    await server_post_data(save_favourite, form_data)
      .then((Response) => {
        if (Response.data.error) {
          handleError(Response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div venue_wrapper>
        <Header />
        {/* venue categories section */}
        <section>
          <div className="container-lg mt-3 mb-1">
            <div className="venuePage_venueCategory_heading">
              {/* <Link to="/">Home</Link>
              <img src={rightArrow} alt="rightArrow" />
              <Link>Pais Restaurants</Link>
              <img src={rightArrow} alt="rightArrow" />
              <Link> {"<restaurant name>"} </Link> */}
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <img src={rightArrow} alt="rightArrow" />}
                  {index === breadcrumbs.length - 1 ? (
                    <span>{crumb.name}</span>
                  ) : (
                    <Link to={crumb.path}>{crumb.name}</Link>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
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
          <div className="container-lg">
            <section>
              <div className="popularVenues_section">
                <div className="">
                  <div className="popularVenues_heading_container">
                    <h5>{numberOfVenuesFound} Venues Found</h5>
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
                        <div key={index} className="col-xl-6 col-12 margin24px">
                          <div className="VenuePage_venue_container">
                            <div className="row m-0">
                              <div className="col-sm-5 px-0">
                                <Link
                                  to="/detailedVenue"
                                  style={{ textDecoration: "none" }}
                                >
                                  <div className="venuePage_image_container">
                                    <img
                                      src={`${APL_LINK}/assets/${
                                        venue.restaurant_image || "default.png"
                                      }`}
                                      alt={
                                        venue.restaurant_name || "Venue Image"
                                      }
                                    />
                                    <div className="venuePage_ratingSection">
                                      <p>{venue.rating || "N/A"}</p>
                                      <img src={star} alt="star" />
                                    </div>
                                  </div>
                                </Link>
                              </div>
                              <div className="col-sm-7">
                                <div className="venuePage_text_section">
                                  <div className="venueContainer_rowtext">
                                    <div className="venueContainer_nameAndAddress">
                                      <h6>
                                        {venue.restaurant_name || "No Name"}
                                      </h6>
                                    </div>
                                    <div className="heart_section">
                                      <button
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
                                          className="heart_icon favHeartIcon"
                                        />
                                      </button>
                                    </div>
                                  </div>
                                  <p>
                                    {venue.restaurant_full_adrress || "No  add"}
                                  </p>

                                  <h6 className="avrgPrice">
                                    <img
                                      src={contactus}
                                      alt="contactus"
                                      width={15}
                                    />
                                    Average Price {venue.restaurant_price} ₹
                                  </h6>
                                  <span className="venuePage_venue_category_titles marginNone">
                                    {venue.amenities?.map(
                                      (amenity, amenityIndex) => (
                                        <div
                                          key={amenityIndex}
                                          className="amenityItem"
                                        >
                                          <img
                                            src={`${APL_LINK}/assets/${amenity.image}`}
                                            alt={amenity.amenities_name}
                                          />
                                          <label>
                                            {amenity.amenities_name}
                                          </label>
                                        </div>
                                      )
                                    )}
                                  </span>

                                  <div className="TimingButtons2">
                                    <div className="timesBtns">
                                      <p>17:30</p>
                                      <div className="childtime">
                                        {venue.discount_upto}%
                                      </div>
                                    </div>
                                  </div>
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
