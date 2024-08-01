import React, { useState, useEffect, useRef } from "react";
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
import preview from "../Assets/preview.svg";
import rightArrow from "../Assets/rightArrow.svg";

import locationsvg from "../Assets/locationSvg.svg";
import redStar from "../Assets/StarRating.svg";
import timerClock from "../Assets/timerClock.svg";
import quesMark from "../Assets/questionMark.svg";
import avgpriceIcon from "../Assets/averagePriceDetailedVenue.svg";
import Menu from "./Menu";
import rightArrowWhite from "../Assets/rightArrow_white.svg";
import view_photos from "../Assets/view_photos.svg";
import AddBtn from "../Assets/addNewInput.svg";
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
  const footerRef = useRef(null);
  const currentUrl = location.pathname.substring(1);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showEmailLoginModal, setShowEmailLoginModal] = useState(false);
  const [isPhoneLogin, setIsPhoneLogin] = useState(true); // State to toggle between phone and email
  const [userNumber, setUserNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [searchShow, setsearchShow] = useState(false);
  const [detail, setDetail] = useState([]);
  const [reviews, setreviews] = useState([]);
  const [thankYouOpen, setthankYouOpen] = useState(false);
  const [otpSent, setOtpSent] = useState(false); // State to manage OTP view
  const [otp, setOtp] = useState(""); // State to manage the entered OTP
  const [breadcrumbs, setBreadcrumbs] = useState([]);
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

  const time_discounts = [
    {
      time: [
        "17:30",
        "18:00",
        "18:30",
        "19:00",
        "19:00",
        "19:00",
        "19:00",
        "19:00",
        ,
        "19:00",
        ,
        "19:00",
        ,
        "19:00",
        ,
        "19:00",
        ,
        "19:00",
        ,
        "19:00",
        "19:00",
        "19:00",
      ],
      time_discount: [
        "20%",
        "15%",
        "23%",
        "8%",
        "8%",
        "8%",
        "8%",
        "8%",
        "8%",
        "8%",
        ,
        "8%",
        ,
        "8%",
        ,
        "8%",
        ,
        "8%",
        "8%",
      ],
    },
  ];
  // Map the arrays into a single array of objects
  const mappedTimeDiscounts = time_discounts[0].time.map((time, index) => {
    return {
      time: time || "N/A",
      discount: time_discounts[0].time_discount[index] || "N/A",
    };
  });
  const [eventSelected, setEventSelected] = useState(null);

  const handleSelection = (selectedValue) => {
    setEventSelected(selectedValue);
  };

  const [value, setValue] = useState(dayjs()); // Initialize with today's date or any initial value
  const handleDateSelection = (newValue) => {
    setValue(newValue); // Update state with selected date
  };

  // states for calendar model:

  const [step, setStep] = useState(0);

  const master_data_get = async () => {
    // setshowLoaderAdmin(true);
    const fd = new FormData();
    fd.append("current_url", "/" + currentUrl);
    fd.append("restuarant_id", customer_id);
    await server_post_data(get_restropage_webapp, fd)
      .then((Response) => {
        console.log(Response.data.message.restro[0]);
        if (Response.data.error) {
          // handleError(Response.data.message);
        } else {
          setDetail(Response.data.message.restro);
          setreviews(Response.data.message.restro.review);
          console.log(Response.data.message.restro[0].review);

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
        // setshowLoaderAdmin(false);
      })
      .catch((error) => {
        // setshowLoaderAdmin(false);
      });
  };

  useEffect(() => {
    master_data_get();
  }, []);

  let child_length = 4;
  let pet_length = 4;
  let guest_length = 4;
  const [selectedchild, setselectedchild] = useState(0);
  const [addCustomChild, setAddCustomChild] = useState(false);
  const [selectedpet, setselectedpet] = useState(0);
  const [addCustomPet, setAddCustomPet] = useState(false);
  const [selectedGuest, setselectedGuest] = useState(0);
  const [addCustomGuest, setAddCustomGuest] = useState(false);
  const SelectedChangeChild = (child_name, click_type) => {
    if (click_type === "1") {
      setselectedchild(child_name);
      setAddCustomChild(false);
    } else {
      child_name.target.value = child_name.target.value.replace(/[^0-9]/g, "");
      if (child_name.target.value === "") {
        child_name.target.value = 1;
      } else if (Number(child_name.target.value) < 1) {
        child_name.target.value = 1;
      }
      setselectedchild(child_name.target.value);
    }
  };
  const addCustomChildInput = () => {
    setAddCustomChild(true);
    setselectedchild("");
  };

  const SelectedChangePet = (pet_name, click_type) => {
    if (click_type === "1") {
      setselectedpet(pet_name);
      setAddCustomPet(false);
    } else {
      pet_name.target.value = pet_name.target.value.replace(/[^0-9]/g, "");
      if (pet_name.target.value === "") {
        pet_name.target.value = 1;
      } else if (Number(pet_name.target.value) < 1) {
        pet_name.target.value = 1;
      }
      setselectedpet(pet_name.target.value);
    }
  };
  const addCustomPetInput = () => {
    setAddCustomPet(true);
    setselectedpet("");
  };
  const SelectedChangeGuest = (pet_name, click_type) => {
    if (click_type === "1") {
      setselectedGuest(pet_name);
      setAddCustomGuest(false);
    } else {
      pet_name.target.value = pet_name.target.value.replace(/[^0-9]/g, "");
      if (pet_name.target.value === "") {
        pet_name.target.value = 1;
      } else if (Number(pet_name.target.value) < 1) {
        pet_name.target.value = 1;
      }
      setselectedGuest(pet_name.target.value);
    }
  };
  const addCustomGuestInput = () => {
    setAddCustomGuest(true);
    setselectedGuest("");
  };
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.6, // 10% of the footer must be visible to trigger the callback
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);
  const greyBackgroundClass = step === 4 ? "greyBackground" : "";
  return (
    <>
      <div className="detailed_venue_wrapper">
        <Header />
        <section>
          <div className="container-lg mt-3 mb-1">
            <div className="venuePage_venueCategory_heading">
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
                      <h6>{detail.cuisie && detail.cuisie[0].cuisine_name}</h6>
                    </div>
                    <div className="first_row_black_section_carousel align-items-center">
                      <span className="d-flex reviews_black_section">
                        <img src={redStar} alt="redStar" />
                        <p className="m-0">{detail.total_service_rating_sum}</p>
                      </span>
                      <span>
                        <p className="m-0">
                          {detail.review && detail.total_reviews} reviews
                        </p>
                      </span>
                    </div>
                  </span>
                  <hr />
                  <span className="first_row_black_section_carousel mb-4">
                    <div className="first_row_black_section_carousel">
                      <img src={timerClock} alt="timerClock" />
                      {detail.timing && detail.timing.length > 0 && (
                        <p style={{ marginBottom: "0" }}>
                          Open from {detail.timing[0].start_time} -{" "}
                          {detail.timing[0].end_time}
                        </p>
                      )}
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
                className="col-lg-4"
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
                    {step !== 4 && (
                      <span className="todays_booking">
                        🔥 Already 8 bookings today
                      </span>
                    )}
                  </div>
                  <div className="calenday_modelSubHead">
                    {step === 0 && (
                      <div className="d-flex">
                        <span className="steps firstStep">
                          <span className="d-flex">
                            <img src={calendarfrom} alt="calendarfrom" />
                            <p>Date</p>
                          </span>
                        </span>
                        <div class="rhombus"></div>
                      </div>
                    )}
                    {step === 1 && (
                      <div className="d-flex">
                        <span className="steps">
                          <img src={calendarfrom} alt="calendarfrom" />
                          <p>Date</p>
                          <img
                            src={rightArrowWhite}
                            alt="rightArrowWhite"
                            className="rightArrowWhite"
                          />
                          <img src={timerClock} alt="timerClock" />
                        </span>
                        <div class="rhombus"></div>
                      </div>
                    )}
                    {step === 2 && (
                      <div className="d-flex">
                        <span className="steps">
                          <img src={calendarfrom} alt="calendarfrom" />
                          <p>Date</p>
                          <img
                            src={rightArrowWhite}
                            alt="rightArrowWhite"
                            className="rightArrowWhite"
                          />
                          <img src={timerClock} alt="timerClock" />
                          <img
                            src={rightArrowWhite}
                            alt="rightArrowWhite"
                            className="rightArrowWhite"
                          />
                          <img src={personCalendar} alt="personCalendar" />
                        </span>
                        <div class="rhombus"></div>
                      </div>
                    )}
                    {step === 3 && (
                      <div className="d-flex">
                        <span className="steps">
                          <img src={calendarfrom} alt="calendarfrom" />
                          <p>Date</p>
                          <img
                            src={rightArrowWhite}
                            alt="rightArrowWhite"
                            className="rightArrowWhite"
                          />
                          <img src={timerClock} alt="timerClock" />
                          <img
                            src={rightArrowWhite}
                            alt="rightArrowWhite"
                            className="rightArrowWhite"
                          />
                          <img src={personCalendar} alt="personCalendar" />
                          <img
                            src={rightArrowWhite}
                            alt="rightArrowWhite"
                            className="rightArrowWhite"
                          />
                          <img src={preview} alt="preview" />
                        </span>
                        <div class="square"></div>
                      </div>
                    )}
                  </div>
                  <div
                    className={`calenday_modelScreen ${greyBackgroundClass}`}
                  >
                    {step === 0 && (
                      <div className="calenderDiv">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DateCalendar
                            value={value}
                            onChange={() => {
                              handleDateSelection();
                              setStep(1);
                            }}
                            minDate={dayjs()} // Optional: Set minimum selectable date
                          />
                        </LocalizationProvider>
                      </div>
                    )}
                    {step === 1 && (
                      <div>
                        <h6 className="calendar_modal_heading">Booking Time</h6>
                        <div className="">
                          <span className="venuePage_venue_capacity_wrapper">
                            {mappedTimeDiscounts &&
                              mappedTimeDiscounts.length > 0 && (
                                <div className="time_discount_container_detailedVenue">
                                  {mappedTimeDiscounts.map((item, idx) => (
                                    <div
                                      key={idx}
                                      className="time_discount_section"
                                      onClick={() => setStep(2)}
                                    >
                                      <div className="time_section">
                                        <p>{item.time}</p>
                                      </div>
                                      <div className="discount_section">
                                        <p>-{item.discount}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                          </span>
                        </div>
                      </div>
                    )}
                    {step === 2 && (
                      <div className="wrapper_calendar_modal">
                        <h6 className="calendar_modal_heading">
                          Number of Guests
                        </h6>
                        {/* <div className="guests_calendar_modal">
                          <p>2</p>
                          <p>4</p>
                          <p>6</p>
                          <p>8</p>
                          <p>10</p>
                        </div>
                        <input
                          type="phone"
                          placeholder="Enter no of guests.."
                        /> */}
                        <div className="resrvDateSelect">
                          <ul>
                            {Array.from(
                              { length: guest_length },
                              (_, index) => index + 1
                            ).map((digit, index) => (
                              <li key={index}>
                                <div
                                  className={`dateBox ${
                                    selectedGuest === index
                                      ? "selectedFormItems"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    SelectedChangeGuest(index, "1")
                                  }
                                >
                                  <p>{index}</p>
                                </div>
                              </li>
                            ))}
                            <li
                              className={`${
                                addCustomGuest ? " " : "hideInput"
                              }`}
                            >
                              <div className="customRsrvInput">
                                <input
                                  type="text"
                                  maxLength={3}
                                  defaultValue={selectedGuest}
                                  name="custom_pet_count"
                                  onChange={(e) => SelectedChangeGuest(e, "2")}
                                />
                              </div>
                            </li>
                          </ul>
                          <div
                            className={`addInputBtn ${
                              addCustomPet ? "hideInput" : ""
                            }`}
                            onClick={addCustomGuestInput}
                          >
                            <img src={AddBtn} alt="add btn" />
                          </div>
                        </div>
                        {/* ===== */}
                        <h6 className="calendar_modal_heading">
                          Number of Children
                        </h6>
                        {/* <input
                          type="phone"
                          placeholder="Enter no of children.."
                        /> */}
                        <div className="resrvDateSelect">
                          <ul>
                            {Array.from(
                              { length: child_length },
                              (_, index) => index + 1
                            ).map((digit, index) => (
                              <li key={index}>
                                <div
                                  className={`dateBox ${
                                    selectedchild === index
                                      ? "selectedFormItems"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    SelectedChangeChild(index, "1")
                                  }
                                >
                                  <p>{index}</p>
                                </div>
                              </li>
                            ))}
                            <li
                              className={`${
                                addCustomChild ? " " : "hideInput"
                              }`}
                            >
                              <div className="customRsrvInput">
                                <input
                                  type="text"
                                  maxLength={3}
                                  defaultValue={selectedchild}
                                  name="custom_child_count"
                                  onBlur={(e) => SelectedChangeChild(e, "2")}
                                  placeholder="No. of Child"
                                />
                              </div>
                            </li>
                          </ul>
                          <div
                            className={`addInputBtn ${
                              addCustomChild ? "hideInput" : ""
                            }`}
                            onClick={addCustomChildInput}
                          >
                            <img src={AddBtn} alt="addbtn" />
                          </div>
                        </div>

                        <h6 className="calendar_modal_heading">
                          Number of Pets
                        </h6>
                        {/* <input type="phone" placeholder="Enter no of pets.." /> */}
                        <div className="resrvDateSelect">
                          <ul>
                            {Array.from(
                              { length: pet_length },
                              (_, index) => index + 1
                            ).map((digit, index) => (
                              <li key={index}>
                                <div
                                  className={`dateBox ${
                                    selectedpet === index
                                      ? "selectedFormItems"
                                      : ""
                                  }`}
                                  onClick={() => SelectedChangePet(index, "1")}
                                >
                                  <p>{index}</p>
                                </div>
                              </li>
                            ))}
                            <li
                              className={`${addCustomPet ? " " : "hideInput"}`}
                            >
                              <div className="customRsrvInput">
                                <input
                                  type="text"
                                  maxLength={3}
                                  defaultValue={selectedpet}
                                  name="custom_pet_count"
                                  onChange={(e) => SelectedChangePet(e, "2")}
                                  placeholder="No. of Pets"
                                />
                              </div>
                            </li>
                          </ul>
                          <div
                            className={`addInputBtn ${
                              addCustomPet ? "hideInput" : ""
                            }`}
                            onClick={addCustomPetInput}
                          >
                            <img src={AddBtn} alt="Barley's Dashboard" />
                          </div>
                        </div>

                        <span>
                          <Link onClick={() => setStep(3)}>Next</Link>
                        </span>
                      </div>
                    )}
                    {step === 3 && (
                      <div className="wrapper_calendar_modal">
                        <h6 className="calendar_modal_heading">
                          Review Details
                        </h6>
                        <div className="details_step_calendar_modal">
                          <span className="row">
                            <h6 className="col-4">Date: </h6>
                            <p className="col-8">17.Nov.2024 | 17:50</p>
                          </span>
                          <span className="row">
                            <h6 className="col-4">Person: </h6>
                            <p className="col-8">02</p>
                          </span>
                          <span className="row">
                            <h6 className="col-4">Children: </h6>
                            <p className="col-8">00</p>
                          </span>
                          <span className="row">
                            <h6 className="col-4">Pets: </h6>
                            <p className="col-8">00</p>
                          </span>
                          <span className="row">
                            <h6 className="col-4">Discount: </h6>
                            <p className="col-8">20%</p>
                          </span>

                          <input
                            type="text"
                            placeholder="Add Instruction/Comment"
                          />

                          <span>
                            {" "}
                            <input type="checkbox" className="checkBoxUnique" />
                            <label>
                              I agree to the Terms & Conditions & Privacy Policy
                            </label>
                          </span>
                          <Link onClick={() => setStep(4)}>Book Now</Link>
                        </div>
                      </div>
                    )}
                    {step === 4 && (
                      <div className="final_step_wrapper">
                        <h6>Reservation </h6>
                        <span>
                          <p>17 No, 2024 • 7 Person • 9.00 PM</p>
                        </span>

                        <div className="confirmed_booking_span">
                          <h6>Booking Confirmed! </h6>
                          <desc>
                            Your reservation is now secured. Thank you for
                            choosing us!
                          </desc>
                        </div>
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
                        <Reviews review={reviews} totalReview={detail} />
                        <div className="see_more_reviews">
                          <Link onClick={() => setActiveTab("reviews")}>
                            See more reviews (
                            {detail.review && detail.review.length})
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
                      <Reviews review={reviews} totalReview={detail} />
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
