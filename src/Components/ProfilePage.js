import React, { useState, useEffect } from "react";
import "./Css/ProfilePage.css";
import Header from "./Header";
import camera from "../Assets/camera.svg";
import message from "../Assets/messageSvg.svg";
import phone from "../Assets/phoneSvg.svg";
import { Link, useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import HeartRed from "../Assets/HeartRed.svg";
import contactus from "../Assets/averagePrice.svg";
import star from "../Assets/star.svg";
import calendar from "../Assets/calendarSearchBar.svg";
import Successs from "../Assets/check.png";
import { PhoneInput } from "react-international-phone";
import { Modal } from "react-bootstrap";
import OnBoardingTick from "../Assets/OnBoardingTick.svg";
import mainLogo from "../Assets/mainLogo.png";
import {
  update_profile,
  get_profile,
  server_post_data,
  save_favourite,
  cancel_booking,
  update_notifiction_sms_status,
  APL_LINK,
} from "../ServiceConnection/serviceconnection.js";
import {
  removeData,
  retrieveData,
} from "../LocalConnection/LocalConnection.js";
import {
  combiled_form_data,
  handleAphabetsChange,
  handleError,
  handleLinkClick,
  make_image_from_letter,
  inputdateformateChange,
  formatTimeintotwodigit,
  handleEmailChange,
} from "../CommonJquery/CommonJquery.js";
let customer_id = "0";
let customer_name = "";
let customer_mobile_no = "";
let customer_email = "";
const ProfilePage = () => {
  const navigate = useNavigate();
  customer_id = retrieveData("customer_id");
  customer_name = retrieveData("customer_name");
  customer_mobile_no = retrieveData("customer_mobile_no");
  customer_email = retrieveData("customer_email");
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isTabPanelVisible, setIsTabPanelVisible] = useState(false);
  const [getFavrate, setFavrate] = useState([]);
  const [GetRegistration, setRegistration] = useState([]);
  const [SEOloop, setSEOloop] = useState([]);
  const [activeTab, setActiveTab] = useState("upcomming");
  const [showLoaderAdmin, setshowLoaderAdmin] = useState(false);
  const [editProfileData, seteditProfileData] = useState([]);
  const [userNumber, setUserNumber] = useState("");
  const [dob, setDob] = useState([]);
  const [formChanged, setFormChanged] = useState(false);
  const [ImageLink, setImageLink] = useState("");
  const [rupees_icon_left, setrupees_icon_left] = useState("");
  const [rupees_icon_right, setrupees_icon_right] = useState([]);
  const handleTabClick = (index) => {
    setActiveTabIndex(index);
    setIsTabPanelVisible(true);
  };
  const handleBackClick = () => {
    setIsTabPanelVisible(false);
  };
  useEffect(() => {
    master_data_get();
  }, []);
  //get --Profile data
  const master_data_get = async () => {
    setshowLoaderAdmin(true);
    const fd = new FormData();
    fd.append("call_id", customer_id);
    await server_post_data(get_profile, fd)
    .then((Response) => {
        console.log(Response.data.message)
        if (Response.data.error) {
          // handleError(Response.data.message);
        } else {
          if (Response.data.message.guest_data.length > 0) {
            seteditProfileData(Response.data.message.guest_data[0]);
            setUserNumber(Response.data.message.guest_data[0].guest_mobile_no);
            setFavrate(Response.data.message.restro_data);
            setSEOloop(Response.data.message.data_seo);
            setImageLink(Response.data.message.image_link);
            setrupees_icon_left(Response.data.message.rupees_icon_left);
            setrupees_icon_right(Response.data.message.rupees_icon_right);
            if (Response.data.message.data_reservation.length > 0) {
              setRegistration(Response.data.message.data_reservation);
              console.log(Response.data.message.data_reservation);
            }
            const ownerData = Response.data.message.guest_data[0];
            if (ownerData.guest_dob) {
              const dobArray = ownerData.guest_dob.split("-");
              setDob({
                day: parseInt(dobArray[2], 10),
                month: parseInt(dobArray[1], 10),
                year: parseInt(dobArray[0], 10),
              });
            }
          }
        }
        setshowLoaderAdmin(false);
      })
      .catch((error) => {
        setshowLoaderAdmin(false);
      });
  };

  //get reservation data
  const master_Reservation_data_get = async () => {
    setshowLoaderAdmin(true);
    const fd = new FormData();
    fd.append("call_id", "1");
    await server_post_data(get_reservation_webapp, fd)
      .then((Response) => {
        console.log(Response.data.message.data_reservation);
        if (Response.data.error) {
          // handleError(Response.data.message);
        } else {
          setRegistration(
            Response.data.message.data_reservation || "No data found"
          );
        }
        setshowLoaderAdmin(false);
      })
      .catch((error) => {
        setshowLoaderAdmin(false);
      });
  };
  //get favrate vanue data
  const master_data_Favrate = async () => {
    setshowLoaderAdmin(true);
    try {
      const fd = new FormData();

      fd.append("call_id", "1");
      fd.append("flag", "1");

      const Response = await server_post_data(get_favourite, fd);

      if (Response.data.error) {
        handleError(Response.data.message);
      } else {
        setFavrate(Response.data.message.like_lt);
        console.log(Response.data.message.like_lt);
      }
    } catch (error) {
      handleError(error.message);
    } finally {
      setshowLoaderAdmin(false);
    }
  };
  //post profile or update profile
  const handleInputChange = (event) => {
    setFormChanged(true);
  };
  const handleSaveChangesdynamic = async (form_data, update_profile) => {
    let isValid = true;

    // Check first name
    const firstName = document.getElementById("fname").value.trim();
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
        handleError(response.data.message);
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

  //download app qr modal
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [SelectedData, setSelectedData] = useState([]);

  const handleOpenCancelModal = (data) => {
    setSelectedData(data);
    setShowCancelModal(true);
  };
  const handleCloseCancelModal = () => {
    setShowCancelModal(false);
  };
  const update_notifiction_sms_status_api = async (isChecked, flag_click) => {
    const click_yes_no = isChecked ? 1 : 0;
    const form_data = new FormData();
    form_data.append("flag_click", flag_click);
    form_data.append("click_yes_no", click_yes_no);
    setshowLoaderAdmin(true);
    await server_post_data(update_notifiction_sms_status, form_data)
      .then((Response) => {
        console.log(Response.data.message);
        if (Response.data.error) {
          handleError(Response.data.message);
        }
        setshowLoaderAdmin(false);
      })
      .catch((error) => {
        setshowLoaderAdmin(false);
      });
  };

  const handleCheckboxChange = (event, click_type) => {
    const isChecked = event.target.checked;
    update_notifiction_sms_status_api(isChecked, click_type);
  };
  const cancelbooking = async (booking_id) => {
    const form_data = new FormData();
    form_data.append("booking_id", booking_id);
    setshowLoaderAdmin(true);
    await server_post_data(cancel_booking, form_data)
      .then((Response) => {
        if (Response.data.error) {
          handleError(Response.data.message);
        } else {
          handleCloseCancelModal();
          handleLinkClick("");
        }
        setshowLoaderAdmin(false);
      })
      .catch((error) => {
        setshowLoaderAdmin(false);
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

  const handleHeartClick = (venueId) => {
    if (customer_id !== "0") {
      handleSaveChangesdynamicheart(venueId);
    } else {
      var event = new CustomEvent("customEvent");
      document.getElementById("login_check_jquery").dispatchEvent(event);
    }
  };

  const handleSaveChangesdynamicheart = async (venueId) => {
    const form_data = new FormData();
    form_data.append("venue_id", venueId);
    await server_post_data(save_favourite, form_data)
      .then((Response) => {
        if (Response.data.error) {
          handleError(Response.data.message);
        } else {
          handleLinkClick("");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Header />
      <div className="profile_section">
        <div className="container-lg">
          <section className="header_Section_profile_page row">
            <div className="profile_picture_section">
              <div className="person_name">
                <img
                  src={make_image_from_letter(customer_name)}
                  onError={(e) => {
                    e.target.src = mainLogo; // Provide the path to your fallback image
                  }}
                  alt={customer_name}
                />
              </div>{" "}
              <div className="profile_name_text_section">
                <h3>Hi, {customer_name}</h3>
                <span className="d-flex g-2 mb-2">
                  <img src={phone} alt="phone" />
                  <p>{" "}{customer_mobile_no}</p>
                </span>
                <span className="d-flex g-2">
                  <img src={message} alt="phone" />
                  <p>{" "}{customer_email}</p>
                </span>
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
                        <h6>Upcoming</h6>
                      </button>
                      <button
                        className={activeTab === "menu" ? "active" : ""}
                        onClick={() => {
                          setActiveTab("past&cancel");
                        }}
                      >
                        <h6>Past & Cancel</h6>
                      </button>
                    </div>
                    <hr width={"100%"} style={{ marginTop: "0" }} />
                    <div className="row">
                      <div className="tab-content col-md-12">
                        {activeTab === "upcomming" && (
                          <div>
                            <div className="container_venues_profile_page">
                              <h6 className="profile_page_upcomming_section_heading">
                                Upcoming reservations
                              </h6>
                              <div className="row">
                                {GetRegistration &&
                                  GetRegistration.length > 0 &&
                                  GetRegistration.map(
                                    (venue, index) =>
                                      venue.type === "upcomming" && (
                                        <div
                                          key={index}
                                          className="col-12 margin24px"
                                        >
                                          <div className="row m-0 px-2 container_profile_section_venue">
                                            <div className="col-sm-4 px-0">
                                              <Link
                                                onClick={() =>
                                                  handleLinkClick(
                                                    match_and_return_seo_link(
                                                      venue.data_res.primary_id
                                                    )
                                                  )
                                                }
                                                style={{
                                                  textDecoration: "none",
                                                }}
                                              >
                                                <div className="venuePage_image_container ProfilePage_image_container">
                                                  <img
                                                    src={
                                                      APL_LINK +
                                                      ImageLink +
                                                      venue.data_res
                                                        .restaurant_image
                                                    }
                                                    alt={
                                                      venue.data_res
                                                        .restaurant_name ||
                                                      "Venue Image"
                                                    }
                                                  />
                                                </div>
                                              </Link>
                                            </div>
                                            <div className="col-sm-8 p-0">
                                              <div className="venuePage_text_section ProfilePage_text_section">
                                                <div className="venueContainer_rowtext">
                                                  <div className="venueContainer_nameAndAddress">
                                                    <h6>
                                                      {
                                                        venue.data_res
                                                          .restaurant_name
                                                      }
                                                    </h6>
                                                  </div>
                                                </div>
                                                <span className="reservation_text">
                                                  <img
                                                    src={OnBoardingTick}
                                                    alt="OnBoardingTick"
                                                  />
                                                  <p>
                                                    {venue.booking_status === 1
                                                      ? "Waiting for Confirmation"
                                                      : venue.booking_status ===
                                                        2
                                                      ? "Reservation Confirmed"
                                                      : venue.booking_status ===
                                                        3
                                                      ? "Reservation Complete"
                                                      : venue.booking_status ===
                                                        6
                                                      ? "Reservation Canceled"
                                                      : ""}
                                                  </p>
                                                </span>

                                                <div className="venue_details_profile_page">
                                                  <span className="people_span">
                                                    <img
                                                      src={contactus}
                                                      alt="contactus"
                                                    />
                                                    <strong>
                                                      {venue.no_of_guest}
                                                    </strong>
                                                  </span>
                                                  <span className="people_span">
                                                    <img
                                                      src={calendar}
                                                      alt="calendar"
                                                    />
                                                    <strong>
                                                      {inputdateformateChange(
                                                        venue.book_date
                                                      )}{" "}
                                                      at{" "}
                                                      {formatTimeintotwodigit(
                                                        venue.book_time
                                                      )}
                                                    </strong>
                                                  </span>
                                                </div>
                                                <div className="venue_details_profile_page">
                                                  <span
                                                    className="people_span"
                                                    onClick={() => {
                                                      handleOpenCancelModal(
                                                        venue
                                                      );
                                                    }}
                                                  >
                                                    <strong>
                                                      <h6>Cancel</h6>
                                                    </strong>
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )
                                  )}
                              </div>
                            </div>
                          </div>
                        )}
                        {activeTab === "past&cancel" && (
                          <div>
                            <div className="container_venues_profile_page">
                              <h6 className="profile_page_upcomming_section_heading">
                                Past reservations
                              </h6>
                              <div className="row">
                                {GetRegistration &&
                                  GetRegistration.length > 0 &&
                                  GetRegistration.map(
                                    (venue, index) =>
                                      venue.type === "past" && (
                                        <div
                                          key={index}
                                          className="col-12 margin24px"
                                        >
                                          <div className="row m-0 px-2 container_profile_section_venue">
                                            <div className="col-sm-4 px-0">
                                              <Link
                                                onClick={() =>
                                                  handleLinkClick(
                                                    match_and_return_seo_link(
                                                      venue.data_res.primary_id
                                                    )
                                                  )
                                                }
                                                style={{
                                                  textDecoration: "none",
                                                }}
                                              >
                                                <div className="venuePage_image_container ProfilePage_image_container">
                                                  <img
                                                    src={
                                                      APL_LINK +
                                                      ImageLink +
                                                      venue.data_res
                                                        .restaurant_image
                                                    }
                                                    alt={
                                                      venue.data_res
                                                        .restaurant_name ||
                                                      "Venue Image"
                                                    }
                                                  />
                                                </div>
                                              </Link>
                                            </div>
                                            <div className="col-sm-8 p-0">
                                              <div className="venuePage_text_section ProfilePage_text_section">
                                                <div className="venueContainer_rowtext">
                                                  <div className="venueContainer_nameAndAddress">
                                                    <h6>
                                                      {
                                                        venue.data_res
                                                          .restaurant_name
                                                      }
                                                    </h6>
                                                  </div>
                                                </div>
                                                <span className="reservation_text">
                                                  <img
                                                    src={OnBoardingTick}
                                                    alt="OnBoardingTick"
                                                  />
                                                  <p>
                                                    {venue.booking_status === 1
                                                      ? "Waiting for Confirmation"
                                                      : venue.booking_status ===
                                                        2
                                                      ? "Reservation Confirmed"
                                                      : venue.booking_status ===
                                                        3
                                                      ? "Reservation Complete"
                                                      : venue.booking_status ===
                                                        6
                                                      ? "Reservation Canceled"
                                                      : ""}
                                                  </p>
                                                </span>

                                                <div className="venue_details_profile_page">
                                                  <span className="people_span">
                                                    <img
                                                      src={contactus}
                                                      alt="contactus"
                                                    />
                                                    <strong>
                                                      {venue.no_of_guest}
                                                    </strong>
                                                  </span>
                                                  <span className="people_span">
                                                    <img
                                                      src={calendar}
                                                      alt="calendar"
                                                    />
                                                    <strong>
                                                      {inputdateformateChange(
                                                        venue.book_date
                                                      )}{" "}
                                                      at{" "}
                                                      {formatTimeintotwodigit(
                                                        venue.book_time
                                                      )}
                                                    </strong>
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )
                                  )}
                              </div>
                            </div>
                          </div>
                        )}
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

                <div className="favourite_section2">
                  <h6>My Favorite Restaurant</h6>
                  <div className="container">
                    {getFavrate &&
                      getFavrate.length > 0 &&
                      getFavrate.map((venue, index) => (
                        <div className="fevorateContanrr" key={index}>
                          <div className="leftCont">
                            {venue.data.map((item, itemIndex) => (
                              <div className="favImgs" key={itemIndex}>
                                <img
                                  src={`${APL_LINK}/assets/${
                                    item.restaurant_image || ""
                                  }`}
                                  alt="venueImg"
                                />
                              </div>
                            ))}
                          </div>
                          <div className="rightContainer">
                            <div className="ContnnrFavcratCard">
                              <div className="FaVCardcontent">
                                {venue.data.map((item, itemIndex) => (
                                  <div key={itemIndex}>
                                    <h5>{item.restaurant_name || ""}</h5>
                                    <div className="heart_section">
                                      <button
                                        onClick={() =>
                                          handleRemoveFavrate(
                                            index,
                                            venue.primary_id
                                          )
                                        }
                                      >
                                        <img
                                          src={HeartRed}
                                          alt="Heart"
                                          className="heart_icon favHeartIcon"
                                        />
                                      </button>
                                    </div>
                                    <p>{item.restaurant_full_address || ""}</p>
                                    <div className="AVrageSection">
                                      <img
                                        className="ContctSvgIon"
                                        src={contactus}
                                        alt="cont"
                                      />
                                      <label>
                                        ₹{item.restaurant_price} Average Price
                                      </label>
                                      <img
                                        className="QuestionTOol"
                                        src={qustionTOoltip}
                                        alt="tooltip"
                                      />
                                    </div>
                                    <div className="drinksSec">
                                      {item.amenities?.map(
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
                                    </div>
                                    <div className="TimingButtons">
                                      <div className="timesBtns">
                                        <p>17:30</p>
                                        <div className="childtime">
                                          -{item.discount_upto}%
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                    {showLoaderAdmin && <p>Loading...</p>}
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
                                      id="fname"
                                      name="fname"
                                      className="form-control"
                                      defaultValue={
                                        editProfileData.guest_fname || ""
                                      }
                                      onInput={handleAphabetsChange}
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
                                      className="form-control "
                                      onInput={handleAphabetsChange}
                                      defaultValue={
                                        editProfileData.guest_lname || ""
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
                                      onInput={handleEmailChange}
                                      className="form-control"
                                      defaultValue={
                                        editProfileData.guest_email || ""
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
                                          editProfileData.guest_gender ===
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
                                          editProfileData.guest_gender ===
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
                                          editProfileData.guest_gender ===
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
                                  <div
                                    className="col-md-12 checkBox_registerMyVenue"
                                    style={{ justifyContent: "end" }}
                                  >
                                    <br />
                                    <button
                                      className="SubmttBUTTTOnn"
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
                      <span className="switch_case">
                        <label class="switch">
                          <input
                            type="checkbox"
                            onChange={(event) =>
                              handleCheckboxChange(event, "1")
                            }
                            defaultChecked={
                              editProfileData.sms_come_dfoodo === 1
                                ? true
                                : false
                            }
                          />
                          <span class="slider round"></span>
                        </label>
                        <p>
                          I agree to receive offeres and update from the Dfoodo
                          by SMS
                        </p>
                      </span>
                      <span className="switch_case">
                        <label class="switch">
                          <input
                            type="checkbox"
                            onChange={(event) =>
                              handleCheckboxChange(event, "2")
                            }
                            defaultChecked={
                              editProfileData.email_come_dfoodo === 1
                                ? true
                                : false
                            }
                          />
                          <span class="slider round"></span>
                        </label>
                        <p>
                          {" "}
                          I agree to receive email offers and Communications
                          from DFOODO{" "}
                        </p>
                      </span>
                    </div>
                    <button
                      className="loginButton mt-3"
                      onClick={() => confirmVIP()}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </TabPanel>
            </Tabs>
          </section>
        </div>
      </div>

      <Modal
        show={showCancelModal}
        onHide={() => handleCloseCancelModal()}
        centered
        className="modal-md"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="">
            <div className="cancel_modal_style">
              <h5>Are you sure you want to cancel this reservation?</h5>
              <h6>
                {SelectedData.data_res && SelectedData.data_res.restaurant_name}
              </h6>
              <div className="venue_details_profile_page">
                <span className="people_span">
                  <img src={contactus} alt="contactus" />
                  <strong>{SelectedData.no_of_guest}</strong>
                </span>
                <span className="people_span">
                  <img src={calendar} alt="calendar" />
                  <strong>
                    {inputdateformateChange(SelectedData.book_date)} at{" "}
                    {formatTimeintotwodigit(SelectedData.book_time)}
                  </strong>
                </span>
              </div>
              <span className="buttons_cancel_modal">
                <button onClick={() => handleCloseCancelModal()}>
                  Never mind
                </button>
                <button onClick={() => cancelbooking(SelectedData.primary_id)}>
                  Confirm Cancellation
                </button>
              </span>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProfilePage;
