import React, { useState, useEffect } from "react";
import "./Css/DetailedVenue.css";
import Header from "./Header";
import { Link, useLocation } from "react-router-dom";
import img1 from "../Assets/imageGallery3.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import featureImg1 from "../Assets/featureImg1.svg";
import featureImg2 from "../Assets/featureImg2.svg";
import featureImg3 from "../Assets/featureImg3.svg";
import featureImg4 from "../Assets/featureImg.svg";
import featureImg5 from "../Assets/featureImg5.svg";
import featureImg6 from "../Assets/featureImg6.svg";
import featureImg7 from "../Assets/featureImg7.svg";
import featureImg8 from "../Assets/featureImg8.svg";
import right from "../Assets/right_arrow.svg";
import Weeding from "../Assets/wedding.png";
import Event from "../Assets/event.png";
import Engagement from "../Assets/engagment.png";
import Birthday from "../Assets/birthday.png";
import Yoga from "../Assets/yoga.png";
import Photoshoot from "../Assets/photoshoot.png";
import Successs from "../Assets/check.png";
import Reviews from "./Reviews";
// import BrowseCity from "./BrowseCity";
// import ListYourVenue from "./ListYourVenue";
import Footer from "./Footer";
import { Dropdown } from "primereact/dropdown";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PhoneInput } from "react-international-phone";
import leftArrowIcon from "../Assets/leftArrowIcon.svg";
import rightArrowIcon from "../Assets/rightArrowIcon.svg";

import personCalendar from "../Assets/personSvg_detailedVenue.svg";
import calendarfrom from "../Assets/calendar_detailedVenue.svg";
import rightArrow from "../Assets/rightArrow.svg";

import locationsvg from "../Assets/locationSvg.svg";
import redStar from "../Assets/StarRating.svg";
import timerClock from "../Assets/timerClock.svg";
import quesMark from "../Assets/questionMark.svg";
import avgpriceIcon from "../Assets/averagePriceDetailedVenue.svg";
import Menu from "./Menu";
import rightArrowWhite from "../Assets/rightArrow_white.svg";
import view_photos from "../Assets/view_photos.svg";
import {
  server_post_data,
  get_restropage_webapp,
  imageApi,
} from "../ServiceConnection/serviceconnection.js";

let login_flag_res = "0";
let customer_id = "1";
let customer_name = "0";
let customer_mobile_no = "0";
let customer_email = "0";
const DetailedVenue = () => {
  const location = useLocation();
  const currentUrl = location.pathname.substring(1);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showEmailLoginModal, setShowEmailLoginModal] = useState(false);
  const [isPhoneLogin, setIsPhoneLogin] = useState(true); // State to toggle between phone and email
  const [userNumber, setUserNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [searchShow, setsearchShow] = useState(false);
  const [detail, setDetail] = useState(false);
  const [thankYouOpen, setthankYouOpen] = useState(false);
  const [otpSent, setOtpSent] = useState(false); // State to manage OTP view
  const [otp, setOtp] = useState(""); // State to manage the entered OTP

  const Venue_tags = [
    "Wedding ",
    "Engagement",
    "Corporate Event",
    "Birthday Party",
  ];
  // react tabs:
  const [activeTab, setActiveTab] = useState("about");

  //readmore section:
  function ReadMore() {
    const [isReadMore, setIsReadMore] = useState(true);

    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };

    const text = detail.restaurant_about;
    const maxLength = 500;

    return (
      <div className="read-more-section ">
        <p>
          {isReadMore
            ? `${detail.restaurant_about && text.slice(0, maxLength)}...`
            : text}
          <span
            onClick={toggleReadMore}
            className="read-more-toggle"
            style={{
              color: "var(--primary-color)",
              fontWeight: "bolder",
              cursor: "pointer",
            }}
          >
            {isReadMore ? "Read more" : "Show less"}
          </span>
        </p>
      </div>
    );
  }
  //  array for venue features:
  const features_venue = [
    {
      venue_feature_image: featureImg1,
      venue_feature_name: "Buffet",
    },
    {
      venue_feature_image: featureImg2,
      venue_feature_name: "Coffee",
    },
    {
      venue_feature_image: featureImg3,
      venue_feature_name: "Pets Allowed",
    },
    {
      venue_feature_image: featureImg4,
      venue_feature_name: "Rooftop ",
    },
    {
      venue_feature_image: featureImg5,
      venue_feature_name: "Garden",
    },
    {
      venue_feature_image: featureImg6,
      venue_feature_name: "Bridal Suite",
    },
    {
      venue_feature_image: featureImg7,
      venue_feature_name: "Catering",
    },
    {
      venue_feature_image: featureImg8,
      venue_feature_name: "Outdoors ",
    },
  ];

  const eventData = [
    { label: "Conference" },
    { label: "Workshop" },
    { label: "Seminar" },
    { label: "Meetup" },
    { label: "Retreat" },
    { label: "Exhibition" },
  ];

  const events = [
    {
      label: "Wedding",
      image: Weeding,
    },
    {
      label: "Event",
      image: Event,
    },
    {
      label: "Engagement",
      image: Engagement,
    },
    {
      label: "Birthday",
      image: Birthday,
    },
    {
      label: "Yoga",
      image: Yoga,
    },
    {
      label: "Photoshoot",
      image: Photoshoot,
    },
  ];

  const timePeriods = [
    {
      label: "Early Morning",
      startTime: "5:00 AM",
      endTime: "7:00 AM",
    },
    {
      label: "Morning",
      startTime: "7:00 AM",
      endTime: "11:00 AM",
    },
    {
      label: "Afternoon",
      startTime: "12:00 PM",
      endTime: "3:30 PM",
    },
    {
      label: "Evening",
      startTime: "4:00 PM",
      endTime: "5:00 PM",
    },
    {
      label: "Night",
      startTime: "7:00 PM",
      endTime: "12:00 AM", // technically next day, consider wrapping around
    },
    {
      label: "Midnight",
      startTime: "12:00 AM",
      endTime: "3:00 AM",
    },
  ];

  const numberRanges = [
    {
      label: "Less than 100",
    },
    {
      label: "100-200",
    },
    {
      label: "200-300",
    },
    {
      label: "300-400",
    },
    {
      label: "400-500",
    },
    {
      label: "Above 500",
    },
  ];

  const [eventSelected, setEventSelected] = useState(null);

  const handleSelection = (selectedValue) => {
    setEventSelected(selectedValue);
  };

  const [value, setValue] = useState(dayjs()); // Initialize with today's date or any initial value
  const handleDateSelection = (newValue) => {
    setValue(newValue); // Update state with selected date
  };

  const handleCloseLoginModal = () => setShowLoginModal(false);
  const handleOpenLoginModal = () => setShowLoginModal(true);
  const handleLoginSubmit = () => {
    // Assume sending OTP is successful
    if (
      (isPhoneLogin && userNumber.length >= 10) ||
      (!isPhoneLogin && userEmail.includes("@"))
    ) {
      setOtpSent(true);
    }
  };
  const handleOtpSubmit = () => {
    setthankYouOpen(true);
  };
  const isPhoneNumberValid = userNumber.length >= 10;
  const isEmailValid = userEmail.includes("@");

  // user registration modal after logging in after phone otp
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const handleCloseRegistrationModal = () => setShowRegistrationModal(false);
  const handleShowRegistrationModal = () => setShowRegistrationModal(true);

  // states for calendar model:
  const [selectedCardValue, setSelectedCardValue] = useState(null);
  const [step, setStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedGuestCount, setSelectedGuestCount] = useState(null);

  const master_data_get = async () => {
    // setshowLoaderAdmin(true);
    const fd = new FormData();
    fd.append("current_url", "/" + currentUrl);
    fd.append("restuarant_id", customer_id);
    await server_post_data(get_restropage_webapp, fd)
      .then((Response) => {
        if (Response.data.error) {
          // handleError(Response.data.message);
        } else {
          console.log(Response.data.message);
          setDetail(Response.data.message.restro);
        }
        // setshowLoaderAdmin(false);
      })
      .catch((error) => {
        // setshowLoaderAdmin(false);
      });
  };

  useEffect(() => {
    master_data_get();
  }, []);

  return (
    <>
      <div className="detailed_venue_wrapper">
        <Header />
        <section>
          <div className="container-lg mt-3 mb-1">
            <div className="venuePage_venueCategory_heading">
              <Link to="/">Home</Link>
              <img src={rightArrow} alt="rightArrow" />
              <Link>Pais Restaurants</Link>
              <img src={rightArrow} alt="rightArrow" />
              <Link> {"<restaurant name>"} </Link>
            </div>
          </div>
        </section>
        {/* images gallery section */}
        <section className="image_gallery_section">
          <div className="container-lg">
            <div className="row d-none d-lg-flex">
              <div className="col-lg-8 m-0 p-0 wrapper_carousel">
                <Carousel
                  className="fade-img"
                  showIndicators={false}
                  showStatus={false}
                  showThumbs={false}
                  renderArrowPrev={(clickHandler, hasPrev) =>
                    hasPrev && (
                      <button
                        type="button"
                        onClick={clickHandler}
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "15px",
                          transform: "translateY(-50%)",
                          zIndex: 2,
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          outline: "none",
                        }}
                      >
                        <img
                          src={leftArrowIcon}
                          alt="Previous"
                          style={{ width: "42px", height: "42px" }}
                        />
                      </button>
                    )
                  }
                  renderArrowNext={(clickHandler, hasNext) =>
                    hasNext && (
                      <button
                        type="button"
                        onClick={clickHandler}
                        style={{
                          position: "absolute",
                          top: "50%",
                          right: "15px",
                          transform: "translateY(-50%)",
                          zIndex: 2,
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          outline: "none",
                        }}
                      >
                        <img
                          src={rightArrowIcon}
                          alt="Next"
                          style={{ width: "42px", height: "42px" }}
                        />
                      </button>
                    )
                  }
                >
                  <div>
                    <img src={imageApi + detail.restaurant_image} alt="img1" />
                  </div>
                  <div>
                    <img src={img1} alt="img2" />
                  </div>
                  <div>
                    <img src={img1} alt="img3" />
                  </div>
                  <div>
                    <img src={img1} alt="img3" />
                  </div>
                  <div>
                    <img src={img1} alt="img3" />
                  </div>
                  <div>
                    <img src={img1} alt="img3" />
                  </div>
                </Carousel>
                <div className="black_section_carousel">
                  <span className="first_row_black_section_carousel">
                    <div>
                      <h6>{detail.restaurant_name}</h6>
                      <p>{detail.restaurant_full_adrress}</p>
                    </div>
                    <div className="first_row_black_section_carousel">
                      <p>1.16 km</p>
                      <img src={locationsvg} alt="location" />
                    </div>
                  </span>
                  <span className="first_row_black_section_carousel align-items-center">
                    <div className="french_text">
                      <h6>French</h6>
                    </div>
                    <div className="first_row_black_section_carousel align-items-center">
                      <span className="d-flex reviews_black_section">
                        <img src={redStar} alt="redStar" />
                        <p className="m-0">{detail.total_service_rating_sum}</p>
                      </span>
                      <span>
                        <p className="m-0">
                          {detail.review && detail.review.length} reviews
                        </p>
                      </span>
                    </div>
                  </span>
                  <hr />
                  <span className="first_row_black_section_carousel mb-4">
                    <div className="first_row_black_section_carousel">
                      <img src={timerClock} alt="timerClock" />
                      <p style={{ marginBottom: "0" }}>
                        Open from 11:30 AM - 01:30 AM
                      </p>
                    </div>
                    <div className="first_row_black_section_carousel">
                      <img src={avgpriceIcon} alt="avgpriceIcon" />
                      <p style={{ marginBottom: "0" }}>Average price €27</p>
                      <img src={quesMark} alt="quesMark" />
                    </div>
                  </span>
                </div>
              </div>

              <div
                className=" col-lg-4"
                style={{
                  position: "fixed",
                  top: "17%",
                  left: "64%",
                  width: "400px",
                }}
              >
                <div className="calenday_modelContainer">
                  <div className="calenday_model-section">
                    <div className="calendy_modelHead">
                      <h4>Find a table</h4>
                      <p>Book for free</p>
                    </div>
                    <span className="todays_booking">
                      🔥 Already 8 bookings today
                    </span>
                  </div>
                  <div className="calenday_modelSubHead">
                    {step === 0 && (
                      <span className="steps">
                        <img src={calendarfrom} alt="calendarfrom" />
                        <p>Date</p>
                      </span>
                    )}
                    {step === 1 && <p>Selection Date</p>}
                    {step === 2 && <p>What Time is your {selectedCardValue}</p>}
                    {step === 3 && (
                      <p>
                        How many guests do you expect for your{" "}
                        {selectedCardValue}
                      </p>
                    )}
                    {step === 4 && (
                      <p>Please Enter Your Details to Get A Quote</p>
                    )}
                  </div>
                  <div className="calenday_modelScreen">
                    {step === 0 && (
                      <div className="eventSelect">
                        <div className="row">
                          {events.map((event, index) => (
                            <div key={index} className="col-4">
                              <div
                                className="eventBox"
                                onClick={() => {
                                  setSelectedCardValue(event.label);
                                  setStep(1);
                                }}
                              >
                                <img src={event.image} alt={event.label} />
                                <p>{event.label}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="eventDropdown">
                          <Dropdown
                            value={eventSelected}
                            onChange={(e) => {
                              handleSelection(e.value);
                              setStep(2);
                            }}
                            options={eventData}
                            optionLabel="label"
                            placeholder="Others"
                            className="ocsnDopdown"
                          />
                        </div>
                      </div>
                    )}
                    {step === 1 && (
                      <div className="calenderDiv">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DateCalendar
                            value={value}
                            onChange={() => {
                              handleDateSelection();
                              setStep(2);
                            }}
                            minDate={dayjs()} // Optional: Set minimum selectable date
                          />
                        </LocalizationProvider>
                      </div>
                    )}
                    {step === 2 && (
                      <div className="selectTime">
                        <div className="row">
                          {timePeriods.map((period, index) => (
                            <div className="col-6" key={index}>
                              <div
                                className="timeBox"
                                onClick={() => {
                                  setSelectedTime(period.label);
                                  setStep(3);
                                }}
                              >
                                <h6>{period.label}</h6>
                                <p>
                                  {period.startTime} to {period.endTime}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {step === 3 && (
                      <div className="selectTime">
                        <div className="row">
                          {numberRanges.map((period, index) => (
                            <div className="col-6" key={index}>
                              <div
                                className="timeBox personBox"
                                onClick={() => {
                                  setSelectedGuestCount(period.label);
                                  setStep(4);
                                }}
                              >
                                <h6>{period.label}</h6>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {step === 4 && (
                      <div className="personInfo">
                        {!otpSent ? (
                          <>
                            <input
                              type="name"
                              id="name"
                              name="name"
                              placeholder="Enter Your Name"
                              className="mt-2 form-control border0"
                              value={userName}
                              onChange={(e) => setUserName(e.target.value)}
                            />
                            <PhoneInput
                              id="phone"
                              name="phone"
                              placeholder="Phone Number"
                              className="mt-2 border0"
                              defaultCountry="in"
                              value={userNumber}
                              onChange={(phone) => setUserNumber(phone)}
                            />
                            <input
                              type="email"
                              id="email"
                              name="email"
                              placeholder="Enter Email ID "
                              className="mt-2 form-control border0"
                              value={userEmail}
                              onChange={(e) => setUserEmail(e.target.value)}
                            />
                          </>
                        ) : (
                          <div className="varifuy">
                            <h6>Verify It’s you</h6>
                            <p className="sentOtp">
                              we’ve Sent a code to <span>{userNumber}</span>.
                              Enter the code to continue
                            </p>
                            <input
                              type="text"
                              id="otp"
                              name="otp"
                              placeholder="Enter verification code"
                              className="mt-2 form-control border0"
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                            />
                          </div>
                        )}
                        {!otpSent ? (
                          <button
                            className="PhoneloginButton"
                            onClick={handleLoginSubmit}
                            style={{
                              backgroundColor:
                                (isPhoneLogin && !isPhoneNumberValid) ||
                                (!isPhoneLogin && !isEmailValid)
                                  ? "grey"
                                  : "",
                              borderColor:
                                (isPhoneLogin && !isPhoneNumberValid) ||
                                (!isPhoneLogin && !isEmailValid)
                                  ? "grey"
                                  : "",
                              cursor:
                                (isPhoneLogin && !isPhoneNumberValid) ||
                                (!isPhoneLogin && !isEmailValid)
                                  ? "not-allowed"
                                  : "pointer",
                            }}
                            disabled={
                              (isPhoneLogin && !isPhoneNumberValid) ||
                              (!isPhoneLogin && !isEmailValid)
                            }
                          >
                            Continue
                          </button>
                        ) : (
                          <button
                            className="PhoneloginButton"
                            onClick={() => {
                              handleOtpSubmit();
                              handleShowRegistrationModal();
                              setStep(5);
                            }}
                            style={{
                              backgroundColor: otp.length < 4 ? "grey" : "",
                              borderColor: otp.length < 4 ? "grey" : "",
                              cursor:
                                otp.length < 4 ? "not-allowed" : "pointer",
                            }}
                            disabled={otp.length < 4}
                          >
                            Confirm OTP
                          </button>
                        )}
                      </div>
                    )}
                    {step === 5 && (
                      <div className="thankYou">
                        <img src={Successs} alt="success-icon" />
                        <h6>
                          Thank your for your interest our Team will connect to
                          you Soon
                        </h6>
                      </div>
                    )}
                  </div>
                </div>

                <div className="want_more_section">
                  <span>
                    <h6>Can’t find the available you want?</h6>
                    <p>Find a table at a similar restaurant </p>
                  </span>
                  <img src={rightArrowWhite} alt="right" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="venue_about_section">
          <div className="container">
            <div className="tabs row">
              <div className="tab-buttons col-lg-3">
                <button
                  className={activeTab === "about" ? "active" : ""}
                  onClick={() => setActiveTab("about")}
                >
                  About
                </button>
                <button
                  className={activeTab === "menu" ? "active" : ""}
                  onClick={() => setActiveTab("menu")}
                >
                  Menu
                </button>
                <button
                  className={activeTab === "reviews" ? "active" : ""}
                  onClick={() => setActiveTab("reviews")}
                >
                  Reviews
                </button>
              </div>
              <div className="row">
                <div className="tab-content col-lg-8">
                  {activeTab === "about" && (
                    <div className="about_venue_tabContent">
                      <h2>{detail.restaurant_name}</h2>
                      <p>{detail.restaurant_full_adrress}</p>
                      <h6>About this venue</h6>
                      <ReadMore />
                      <div className="venue_features_section row">
                        {detail.amenities &&
                          detail.amenities.length > 0 &&
                          detail.amenities.map((features, idx) => (
                            <div
                              className="col-lg-3 venue_features_wrapper"
                              key={idx}
                            >
                              <img
                                src={imageApi + features.image}
                                alt="{features.venue_feature_name}"
                              />
                              <p className="venue_feature_name">
                                {features.amenities_name}
                              </p>
                            </div>
                          ))}
                      </div>
                      <section className="Reviews_section">
                        <div className="menu_wrapper">
                          <div className="menu_wrapper_heading mt-2 mb-2">
                            <h3>Restaurant Menu</h3>
                          </div>
                          <div className="menu_image_wrapper ">
                            {detail.menuimages &&
                              detail.menuimages.length > 0 &&
                              detail.menuimages.map((menu_img, idx) => (
                                <img
                                  key={idx}
                                  src={imageApi + menu_img.image_name}
                                  alt="menu_img"
                                />
                              ))}
                          </div>
                        </div>
                        <Reviews />
                        <div className="see_more_reviews">
                          <Link onClick={() => setActiveTab("reviews")}>
                            See more reviews ({detail.review.length})
                            <img src={right} alt="right" />
                          </Link>
                        </div>
                      </section>
                    </div>
                  )}
                  {activeTab === "menu" && (
                    <div>
                      <Menu />
                    </div>
                  )}
                  {activeTab === "reviews" && (
                    <div>
                      <Reviews />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-5"></section>
        <Footer />
      </div>
    </>
  );
};

export default DetailedVenue;
