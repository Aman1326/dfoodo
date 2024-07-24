import React, { useState, useEffect } from "react";
import "./Css/ProfilePage.css";
import Header from "./Header";
import camera from "../Assets/camera.svg";
import message from "../Assets/messageSvg.svg";
import phone from "../Assets/phoneSvg.svg";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import bar1 from "../Assets/bar1.png";
import bar2 from "../Assets/bar2.png";
import barPresent from "../Assets/bars-3x.png.svg";
import alcoholPresent from "../Assets/alcohol-served3x.png.svg";
import valetParking from "../Assets/valet-parking3x.png.svg";
import star from "../Assets/star.svg";
import Heart from "react-heart";
import contactus from "../Assets/averagePrice.svg";
import Successs from "../Assets/check.png";
import { PhoneInput } from "react-international-phone";
import { Modal } from "react-bootstrap";
import $ from "jquery";
import {
  update_profile,
  server_post_data,
} from "../ServiceConnection/serviceconnection.js";
import { retrieveData } from "../LocalConnection/LocalConnection.js";
import {
  check_vaild_save,
  combiled_form_data,
  empty_form,
  handleAphabetsChange,
  handleEmailChange,
  handleError,
  handleIaphabetnumberChange,
  handleNumbersChange,
  ////handleSuccess,
} from "../CommonJquery/CommonJquery.js";
let customer_id = "0";
const ProfilePage = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isTabPanelVisible, setIsTabPanelVisible] = useState(false);

  const handleTabClick = (index) => {
    setActiveTabIndex(index);
    setIsTabPanelVisible(true);
  };

  const handleBackClick = () => {
    setIsTabPanelVisible(false);
  };

  const [activeTab, setActiveTab] = useState("upcomming");

  //favuorite restaurant details :
  const venues_data_labeled = [
    {
      venue_image: bar1,
      Venue: [" ₹500 Average Price"],
      Rating: 4.1,
      Name: "Majestic Manor",
      Address: "Royal Plaza, Anand Nagar",
      time: ["17:30", "18:00", "18:30", "19:00"],
      time_discount: ["20%", "15%", "23%", "8%"],
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
      time: ["17:30", "18:00", "18:30", "19:00"],
      time_discount: ["20%", "20%", "20%", "20%"],
      average_price: "3000",
      facilities: ["bar", "valet parking", "alcohol served"],
      facilities_images: [barPresent, valetParking, alcoholPresent],
    },
    {
      venue_image: bar2,
      Venue: [" ₹500 Average Price"],
      Rating: 4.3,
      Name: "Business Hall",
      Address: "Tech Park, Sector 5, Downtown",
      time: ["17:30", "18:00", "18:30", "19:00"],
      time_discount: ["20%", "20%", "20%", "20%"],
      average_price: "3000",
      facilities: ["bar", "valet parking", "alcohol served"],
      facilities_images: [barPresent, valetParking, alcoholPresent],
    },
    {
      venue_image: bar2,
      Venue: [" ₹500 Average Price"],
      Rating: 4.3,
      Name: "Business Hall",
      Address: "Tech Park, Sector 5, Downtown",
      time: ["17:30", "18:00", "18:30", "19:00"],
      time_discount: ["20%", "20%", "20%", "20%"],
      average_price: "3000",
      facilities: ["bar", "valet parking", "alcohol served"],
      facilities_images: [barPresent, valetParking, alcoholPresent],
    },
    {
      venue_image: bar2,
      Venue: [" ₹500 Average Price"],
      Rating: 4.3,
      Name: "Business Hall",
      Address: "Tech Park, Sector 5, Downtown",
      time: ["17:30", "18:00", "18:30", "19:00"],
      time_discount: ["20%", "20%", "20%", "20%"],
      average_price: "3000",
      facilities: ["bar", "valet parking", "alcohol served"],
      facilities_images: [barPresent, valetParking, alcoholPresent],
    },
    {
      venue_image: bar2,
      Venue: [" ₹500 Average Price"],
      Rating: 4.3,
      Name: "Business Hall",
      Address: "Tech Park, Sector 5, Downtown",
      time: ["17:30", "18:00", "18:30", "19:00"],
      time_discount: ["20%", "20%", "20%", "20%"],
      average_price: "3000",
      facilities: ["bar", "valet parking", "alcohol served"],
      facilities_images: [barPresent, valetParking, alcoholPresent],
    },
    {
      venue_image: bar2,
      Venue: [" ₹500 Average Price"],
      Rating: 4.3,
      Name: "Business Hall",
      Address: "Tech Park, Sector 5, Downtown",
      time: ["17:30", "18:00", "18:30", "19:00"],
      time_discount: ["20%", "20%", "20%", "20%"],
      average_price: "3000",
      facilities: ["bar", "valet parking", "alcohol served"],
      facilities_images: [barPresent, valetParking, alcoholPresent],
    },
    {
      venue_image: bar2,
      Venue: [" ₹500 Average Price"],
      Rating: 4.3,
      Name: "Business Hall",
      Address: "Tech Park, Sector 5, Downtown",
      time: ["17:30", "18:00", "18:30", "19:00"],
      time_discount: ["20%", "20%", "20%", "20%"],
      average_price: "3000",
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

  const [likedVenues, setLikedVenues] = useState({});

  // Toggle the like state for a specific venue
  const toggleLike = (index) => {
    setLikedVenues((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // profile page:
  customer_id = retrieveData("customer_id");
  const [showLoaderAdmin, setshowLoaderAdmin] = useState(false);

  const [editProfileData, seteditProfileData] = useState([]);
  const [userNumber, setUserNumber] = useState("");
  const [dob, setDob] = useState([]);
  const [formChanged, setFormChanged] = useState(false);

  useEffect(() => {
    master_data_get();
  }, []);

  const master_data_get = async () => {
    setshowLoaderAdmin(true);
    const fd = new FormData();
    fd.append("call_id", customer_id);
    await server_post_data(update_profile, fd)
      .then((Response) => {
        if (Response.data.error) {
          // handleError(Response.data.message);
        } else {
          if (Response.data.message.owner_data.length > 0) {
            seteditProfileData(Response.data.message.owner_data[0]);
            setUserNumber(
              Response.data.message.owner_data[0].owner_moblie_no_without_zip
            );

            const ownerData = Response.data.message.owner_data[0];
            if (ownerData.owner_dob) {
              setDob(ownerData.owner_dob);
            }
          }
        }
        setshowLoaderAdmin(false);
      })
      .catch((error) => {
        setshowLoaderAdmin(false);
      });
  };

  const handleInputChange = (event) => {
    setFormChanged(true); // Set formChanged to true whenever there's an input change
  };
  const handleSaveChangesdynamic = async (form_data, update_profile) => {
    let isValid = true;

    // Check first name
    const firstName = document.getElementById("name").value.trim();
    if (!firstName) {
      document.getElementById("nameError").innerText =
        "Please enter the first name";
      isValid = false;
    } else {
      document.getElementById("nameError").innerText = "";
    }

    // Check last name
    const lastName = document.getElementById("lname").value.trim();
    if (!lastName) {
      document.getElementById("lnameError").innerText =
        "Please enter the last name";
      isValid = false;
    } else {
      document.getElementById("lnameError").innerText = "";
    }

    // Check email
    const email = document.getElementById("email").value.trim();
    if (!email) {
      document.getElementById("emailError").innerText =
        "Please enter the email";
      isValid = false;
    } else {
      document.getElementById("emailError").innerText = "";
    }

    // Check date of birth
    const day = document.getElementById("day").value.trim();
    const month = document.getElementById("month").value.trim();
    const year = document.getElementById("year").value.trim();
    if (!day || !month || !year) {
      document.getElementById("dobError").innerText =
        "Please enter the complete date of birth";
      isValid = false;
    } else {
      document.getElementById("dobError").innerText = "";
    }

    // Check gender
    const gender = document.querySelector('input[name="gender"]:checked');
    if (!gender) {
      document.getElementById("genderError").innerText =
        "Please select a gender";
      isValid = false;
    } else {
      document.getElementById("genderError").innerText = "";
    }

    if (!isValid) {
      // Scroll to the top to show the error messages
      window.scrollTo(0, 0);
      return;
    }

    // Proceed with form submission
    let fd_from = combiled_form_data(form_data, null);
    const dobString = `${year}-${month}-${day}`;
    fd_from.append("dob", dobString);
    fd_from.append("call_id", customer_id);

    try {
      setshowLoaderAdmin(true);
      const response = await server_post_data(update_profile, fd_from);
      setshowLoaderAdmin(false);
      if (response.data.error) {
        // handleError(response.data.message);
      } else {
        handleOpenModal();
      }
    } catch (error) {
      console.error(error);
      setshowLoaderAdmin(false);
    }
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  //success modal
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    let timer;
    if (showModal) {
      timer = setTimeout(() => {
        setShowModal(false);
      }, 3000); // 3000ms = 3 seconds
    }
    return () => clearTimeout(timer);
  }, [showModal]);
  return (
    <>
      <Header />
      <div className="profile_section">
        <div className="container-lg">
          <section className="header_Section_profile_page row">
            <div className="profile_picture_section">
              <div className="person_name">
                <h3>RS</h3>
                <div className="camera_icon_background">
                  {" "}
                  <img src={camera} alt="camera" />
                </div>
              </div>{" "}
              <div className="profile_name_text_section">
                <h3>Hi, person name</h3>
                <span className="d-flex g-2 mb-2">
                  <img src={phone} alt="phone" />
                  <p>+91-7453786769</p>
                </span>
                <span className="d-flex g-2">
                  <img src={message} alt="phone" />
                  <p>xyz@gmail.com</p>
                </span>
              </div>
              <div className="update_button_profile_page">
                <Link>Update Profile</Link>
              </div>
            </div>
          </section>
          <section>
            <Tabs
              className="vertical-tabs col-sm-10 m-auto"
              selectedIndex={activeTabIndex}
              onSelect={handleTabClick}
            >
              <TabList className="tab-list col-md-3">
                <Tab className="tab" selectedClassName="active-tab">
                  <h6>Reservation</h6>
                </Tab>
                <Tab className="tab" selectedClassName="active-tab">
                  <h6>Favourites</h6>
                </Tab>
                <Tab className="tab" selectedClassName="active-tab">
                  <h6>Profile Details</h6>
                </Tab>
                <Tab className="tab" selectedClassName="active-tab">
                  <h6>Settings</h6>
                </Tab>
                <Tab className="tab" selectedClassName="active-tab">
                  <h6>Help</h6>
                </Tab>
              </TabList>

              <TabPanel
                className={`tab-panel ${
                  isTabPanelVisible && activeTabIndex === 0 ? "active" : ""
                }`}
              >
                <button className="back-button" onClick={handleBackClick}>
                  Back
                </button>
                <section className="venue_about_section">
                  <div className="tabs">
                    <div className="tab-buttonss reservations_section">
                      <button
                        className={activeTab === "about" ? "active" : ""}
                        onClick={() => setActiveTab("upcomming")}
                      >
                        <h6>upcomming</h6>
                      </button>
                      <button
                        className={activeTab === "menu" ? "active" : ""}
                        onClick={() => setActiveTab("past&cancel")}
                      >
                        <h6>past&cancel</h6>
                      </button>
                    </div>
                    <hr width={"100%"} />
                    <div className="row">
                      <div className="tab-content col-lg-8">
                        {activeTab === "upcomming" && <p>upcomming</p>}
                        {activeTab === "past&cancel" && <p>past&cancel</p>}
                      </div>
                    </div>
                  </div>
                </section>
              </TabPanel>
              <TabPanel
                className={`tab-panel ${
                  isTabPanelVisible && activeTabIndex === 1 ? "active" : ""
                }`}
              >
                <button className="back-button" onClick={handleBackClick}>
                  Back
                </button>
                <div className="favourite_section">
                  <h6>My Favorite Restaurant </h6>
                  <div className="favourite_restaurant_cards_section row">
                    {currentPaginationItems.map((venue, index) => (
                      <div key={index} className="col-12 margin24px">
                        <div className="VenuePage_venue_container">
                          <div className="row m-0">
                            <div className="col-sm-5 px-0">
                              <Link
                                to="/detailedVenue"
                                style={{ textDecoration: "none" }}
                              >
                                <div className="venuePage_image_container">
                                  <img src={venue.venue_image} alt="venueImg" />
                                  <div className="venuePage_ratingSection">
                                    <p>{venue.Rating}</p>
                                    <img src={star} alt="star" />
                                  </div>
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
                                        isActive={likedVenues[index] || false}
                                        onClick={() => toggleLike(index)}
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
                                  <img
                                    src={contactus}
                                    alt="contactus"
                                    width={15}
                                  />
                                  Average Price ₹{venue.average_price}
                                </h6>
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
                                  {venue.time &&
                                    venue.time_discount &&
                                    venue.time.length > 0 &&
                                    venue.time_discount.length > 0 && (
                                      <div className="time_discount_container">
                                        {venue.time.map((time, idx) => (
                                          <div
                                            key={idx}
                                            className="time_discount_section"
                                          >
                                            <div className="time_section">
                                              <p>{time}</p>
                                            </div>
                                            <div className="discount_section">
                                              <p>-{venue.time_discount[idx]}</p>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabPanel>
              <TabPanel
                className={`tab-panel ${
                  isTabPanelVisible && activeTabIndex === 2 ? "active" : ""
                }`}
              >
                <button className="back-button" onClick={handleBackClick}>
                  Back
                </button>
                <div>
                  <section className="container-lg">
                    <div className="row">
                      <div className="col-md-12 ">
                        <div className="ProfileCont">
                          <div className="profile_section">
                            <div>
                              <div className="register-venue-form-heading">
                                <h2>My Profile</h2>
                                <p>Manage my personal Information </p>
                                <desc>
                                  Your Contact information will be send to the
                                  Venue Owner when you make a Enquiry
                                </desc>
                              </div>
                              <form
                                className="venue-registration-form profile_pafe_form"
                                id="UpateProfile"
                              >
                                <div className="row">
                                  <div className="col-md-6">
                                    <label htmlFor="venueName">
                                      First Name
                                    </label>
                                    <input
                                      type="text"
                                      id="name"
                                      name="name"
                                      className="form-control"
                                      defaultValue={
                                        editProfileData.owner_fname || ""
                                      }
                                      onChange={handleInputChange}
                                    />
                                    <span
                                      id="nameError"
                                      className="error-message"
                                    ></span>
                                  </div>
                                  <div className="col-md-6">
                                    <label htmlFor="venueLocation">
                                      Last Name
                                    </label>
                                    <input
                                      type="text"
                                      id="lname"
                                      name="lname"
                                      className="form-control"
                                      defaultValue={
                                        editProfileData.owner_lname || ""
                                      }
                                      onChange={handleInputChange}
                                    />
                                    <span
                                      id="lnameError"
                                      className="error-message"
                                    ></span>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-6">
                                    <label htmlFor="contactPerson">Email</label>
                                    <input
                                      type="text"
                                      id="email"
                                      name="email"
                                      className="form-control"
                                      defaultValue={
                                        editProfileData.owner_email || ""
                                      }
                                      onChange={handleInputChange}
                                    />
                                    <span
                                      id="emailError"
                                      className="error-message"
                                    ></span>
                                  </div>
                                  <div className="col-md-6 birth_date_profile">
                                    <label className="mb-2">
                                      Date of Birth
                                    </label>
                                    <div className="DOBCalander">
                                      <select
                                        id="day"
                                        name="day"
                                        className="form-control  custom-select"
                                        defaultValue={dob.day || ""}
                                      >
                                        {days.map((day) => (
                                          <option key={day} value={day}>
                                            {day}
                                          </option>
                                        ))}
                                      </select>
                                      <select
                                        id="month"
                                        name="month"
                                        className="form-control  custom-select mr-2"
                                        defaultValue={dob.month || ""}
                                      >
                                        {months.map((month, index) => (
                                          <option key={month} value={index + 1}>
                                            {month}
                                          </option>
                                        ))}
                                      </select>
                                      <select
                                        id="year"
                                        name="year"
                                        className="form-control  custom-select"
                                        defaultValue={dob.year || ""}
                                      >
                                        {years.map((year) => (
                                          <option key={year} value={year}>
                                            {year}
                                          </option>
                                        ))}
                                      </select>
                                      <span
                                        id="dobError"
                                        className="error-message"
                                      ></span>
                                    </div>
                                  </div>
                                  <label htmlFor="venueLocation ">City*</label>
                                  <input
                                    type="text"
                                    className="form-control trio_mandatory "
                                    name="searchInput"
                                    id="searchInput"
                                    maxLength={30}
                                    onChange={handleInputChange}
                                    onInput={handleAphabetsChange}
                                    style={{
                                      width: "48%",
                                      marginLeft: "0.5rem",
                                    }}
                                  />
                                </div>
                                <div className="row">
                                  <div className="col-md-6">
                                    <label htmlFor="phone">Phone</label>
                                    <PhoneInput
                                      id="phoneNumberProfilePage"
                                      placeholder="Phone Number"
                                      className="form-control mt-2"
                                      defaultCountry="in"
                                      value={userNumber}
                                      onChange={(phone) => setUserNumber(phone)}
                                      name="phone"
                                      disabled
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <label htmlFor="phone">Gender</label>
                                    <span className="radio_buttons_reg_form mt-2 ">
                                      <input
                                        type="radio"
                                        id="1"
                                        name="gender"
                                        value="Male"
                                        defaultChecked={
                                          editProfileData.owner_gender ===
                                            "Male" || ""
                                        }
                                      />
                                      <label>Male</label>
                                      <br />
                                      <input
                                        type="radio"
                                        id="2"
                                        name="gender"
                                        value="Female"
                                        defaultChecked={
                                          editProfileData.owner_gender ===
                                            "Female" || ""
                                        }
                                      />
                                      <label>Female</label>
                                      <br />
                                      <input
                                        type="radio"
                                        id="3"
                                        name="gender"
                                        value="Others"
                                        defaultChecked={
                                          editProfileData.owner_gender ===
                                            "Others" || ""
                                        }
                                      />
                                      <label>Others</label>
                                    </span>
                                    <span
                                      id="genderError"
                                      className="error-message"
                                    ></span>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-12 checkBox_registerMyVenue">
                                    <br />
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleSaveChangesdynamic(
                                          "UpateProfile",
                                          update_profile
                                        );
                                      }}
                                      type="submit"
                                      style={{ opacity: formChanged ? 1 : 0.5 }}
                                      disabled={!formChanged}
                                    >
                                      Submit
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  <Modal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    centered
                    className="success_modal_reg "
                  >
                    <Modal.Body>
                      <div className="success_modal_register_my_venue ">
                        <img src={Successs} alt="success" />
                        <h3>Your profile have been updated successfully !</h3>
                      </div>
                    </Modal.Body>
                  </Modal>
                </div>
              </TabPanel>
              <TabPanel
                className={`tab-panel ${
                  isTabPanelVisible && activeTabIndex === 3 ? "active" : ""
                }`}
              >
                <button className="back-button" onClick={handleBackClick}>
                  Back
                </button>
                <div className="settings_section_profile_page">
                  <h6>Settings</h6>
                  <div className="settings_text_profile_page">
                    <h5>Manage My Notification </h5>
                    <p>Newsletter</p>
                    <div className="toggle_switches_settings">
                      <span>
                        <label class="switch">
                          <input type="checkbox" />
                          <span class="slider round"></span>
                        </label>
                        <p>
                          I agree to receive offeres and update from the Dfoodo
                          by SMS
                        </p>
                      </span>
                      <span>
                        <label class="switch">
                          <input type="checkbox" />
                          <span class="slider round"></span>
                        </label>
                        <p>
                          {" "}
                          I agree to receive email offers and Communications
                          from DFOODO{" "}
                        </p>
                      </span>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel
                className={`tab-panel ${
                  isTabPanelVisible && activeTabIndex === 4 ? "active" : ""
                }`}
              >
                <button className="back-button" onClick={handleBackClick}>
                  Back
                </button>
                <p>help</p>
              </TabPanel>
            </Tabs>
          </section>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
