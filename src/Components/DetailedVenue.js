import React, { useState, useEffect, useRef } from "react";
import "./Css/DetailedVenue.css";
import Header from "./Header";
import { Link, useLocation } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import right from "../Assets/right_arrow.svg";
import $ from "jquery";
import Reviews from "./Reviews";
import Footer from "./Footer";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
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
import AddBtn from "../Assets/addNewInput.svg";
import crossIcon from "../Assets/crossIcon.svg";
import {
  server_post_data,
  get_restropage_webapp,
  get_all_timing_date_wise,
  create_table_reservation_website,
  imageApi,
} from "../ServiceConnection/serviceconnection.js";
import {
  formatTimeintotwodigit,
  handleIaphabetnumberChange,
  handleSuccess,
  handleError,
  formatDateStringdot,
} from "../CommonJquery/CommonJquery.js";
let customer_id = "1";
let customer_name = "shubham jain";
let customer_mobile_no = "8120473991";
let customer_email = "shubhamj@gmail.com";
const DetailedVenue = () => {
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(false);
  const currentUrl = location.pathname.substring(1);
  const [detail, setDetail] = useState([]);
  const [reviews, setreviews] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  // react tabs:
  const [activeTab, setActiveTab] = useState("about");
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDiscount, setSelectedDiscount] = useState(0);
  const [selectedGuest, setSelectedGuest] = useState(1);
  const [selectedChild, setselectedChild] = useState(0);
  const [selectedpet, setselectedpet] = useState(0);
  const [showModalKitchen, setShowModalKitchen] = useState(false);
  const [showModalKitchenMsg, setShowModalKitchenMsg] = useState("");
  const [showmsgforbook, setshowmsgforbook] = useState("");
  const [TimeData, setTimeData] = useState([]);
  const [errorform, seterrorform] = useState({ error: false });
  const [errormsg, seterrormsg] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [totalbookingtoday, settotalbookingtoday] = useState(0);
  const [selectedrtsd_idd, setSelectedrtsd_idd] = useState(null);
  const handleFetchData = async (date_for_book) => {
    setShowLoader(true);
    setData(null);
    var form_data = new FormData();

    form_data.append("special_date", date_for_book);
    form_data.append("reservation_id", "0");
    await server_post_data(get_all_timing_date_wise, form_data)
      .then((Response) => {
        setTimeData(Response.data.message.data_timedata);
        setShowModalKitchenMsg(Response.data.message.kichan_lose_msg);
        setShowLoader(false);
        let online_booking_status = 0;
        let start_stop_status = 0;
        if (Response.data.message.get_date_off_date.length > 0) {
          online_booking_status =
            Response.data.message.get_date_off_date[0].online_booking_status;
          start_stop_status =
            Response.data.message.get_date_off_date[0].start_stop_status;
        } else {
          if (Response.data.message.get_date_off_on_day.length > 0) {
            online_booking_status =
              Response.data.message.get_date_off_on_day[0]
                .online_booking_status;
            start_stop_status =
              Response.data.message.get_date_off_on_day[0].start_stop_status;
          }
        }
        if (
          Response.data.message.data_timedatadetails.length > 0 &&
          online_booking_status === 0 &&
          start_stop_status === 0
        ) {
          setData(Response.data.message.data_timedatadetails);
          seterrorform({ error: true });
        } else {
          seterrormsg(Response.data.message.msg_for_no_show);
          seterrorform({ error: false });
        }
        setSelectedTime(null);
        setSelectedGuest(1); // Set the selected guest count
        setCurrentStep(2);
      })
      .catch((error) => {
        setShowLoader(false);
      });
  };
  const handleclickstep = (step_click, data_for_update) => {
    if (customer_id !== "0") {
      if (step_click === 0) {
        setSelectedDate(null);
        setSelectedTime(null);
        setSelectedGuest(1); // Set the selected guest count
        setCurrentStep(1);
      } else if (step_click === 1) {
        let month = data_for_update.$M + 1;
        let day = data_for_update.$D;
        let year = data_for_update.$y;

        if (month < 10) {
          month = "0" + month;
        }
        if (day < 10) {
          day = "0" + day;
        }
        let full_date = year + "-" + month + "-" + day;

        setSelectedDate(full_date);

        handleFetchData(full_date);
      } else if (step_click === 2) {
        let make_data = data_for_update.split("~@~");
        setSelectedrtsd_idd(make_data[0]);
        setSelectedTime(make_data[1]);
        setSelectedDiscount(make_data[2]);
        setSelectedGuest(1); // Set the selected guest count
        let click_by_popup = 0;
        TimeData.map((item) => {
          if (make_data[1] >= item.last_arrival_time) {
            click_by_popup = 1;
            setShowModalKitchen(true);
          }
        });
        if (click_by_popup === 0) {
          setCurrentStep(3);
        }
      } else if (step_click === 3) {
        setSelectedGuest(data_for_update); // Set the selected guest count
        setCurrentStep(4);
      } else if (step_click === 4) {
      }
    } else {
      var event = new CustomEvent("customEvent");
      document.getElementById("login_check_jquery").dispatchEvent(event);
    }
  };

  const handleclickbackstep = (step_click, data_for_update) => {
    if (step_click === 0) {
      setSelectedDate(null);
      setSelectedTime(null);
      setSelectedGuest(1); // Set the selected guest count
      setCurrentStep(1);
    } else if (step_click === 1) {
      setSelectedTime(data_for_update);
      setSelectedGuest(1); // Set the selected guest count
      setCurrentStep(2);
    } else if (step_click === 2) {
      setSelectedGuest(data_for_update); // Set the selected guest count
      setCurrentStep(3);
    } else if (step_click === 3) {
      setSelectedGuest(data_for_update); // Set the selected guest count
      setCurrentStep(4);
    } else if (step_click === 4) {
    }
  };

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
  const value_date = dayjs();

  const master_data_get = async () => {
    // setshowLoaderAdmin(true);
    const fd = new FormData();
    fd.append("current_url", "/" + currentUrl);
    fd.append("customer_id", customer_id);
    await server_post_data(get_restropage_webapp, fd)
      .then((Response) => {
        console.log(Response.data.message.images);
        if (Response.data.error) {
          // handleError(Response.data.message);
        } else {
          setDetail(Response.data.message.restro[0]);
          setreviews(Response.data.message.restro[0].review);
          const restroData = Response.data.message.restro || [];
          const venueData = restroData[0] || {};
          const catagoryData = restroData[0].category[0] || {};

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
  const [addCustomChild, setAddCustomChild] = useState(false);
  const [addCustomPet, setAddCustomPet] = useState(false);
  const [addCustomGuest, setAddCustomGuest] = useState(false);
  const SelectedChangeChild = (child_name, click_type) => {
    if (click_type === "1") {
      setselectedChild(child_name);
      setAddCustomChild(false);
    } else {
      child_name.target.value = child_name.target.value.replace(/[^0-9]/g, "");
      if (child_name.target.value === "") {
        child_name.target.value = 1;
      } else if (Number(child_name.target.value) < 1) {
        child_name.target.value = 1;
      }
      setselectedChild(child_name.target.value);
    }
  };
  const addCustomChildInput = () => {
    setAddCustomChild(true);
    setselectedChild("");
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
      setSelectedGuest(pet_name);
      setAddCustomGuest(false);
    } else {
      pet_name.target.value = pet_name.target.value.replace(/[^0-9]/g, "");
      if (pet_name.target.value === "") {
        pet_name.target.value = 1;
      } else if (Number(pet_name.target.value) < 1) {
        pet_name.target.value = 1;
      }
      setSelectedGuest(pet_name.target.value);
    }
  };
  const addCustomGuestInput = () => {
    setAddCustomGuest(true);
    setSelectedGuest("");
  };

  const function_save = () => {
    if ($("#checkSurfaceEnvironment-1").prop("checked") === true) {
      //do something
      sava_booking_data();
    } else {
      alert(
        "Please read and agree to the terms and conditions before proceeding."
      );
    }
  };
  const sava_booking_data = async () => {
    setShowLoader(true);

    var fd_from = new FormData();

    fd_from.append("reservation_id", "0");
    fd_from.append("guest_mobile_no", customer_mobile_no);
    fd_from.append("book_date", selectedDate);
    fd_from.append("operational_time_detail_id", selectedrtsd_idd);
    fd_from.append("operational_booking_time", selectedTime);
    fd_from.append("booking_type", "2");
    fd_from.append("realtime", "0");
    if (selectedChild === "") {
      fd_from.append("no_of_child", 0);
    } else {
      fd_from.append("no_of_child", selectedChild);
    }
    if (selectedpet === "") {
      fd_from.append("no_of_pets", 0);
    } else {
      fd_from.append("no_of_pets", selectedpet);
    }
    fd_from.append("no_of_guest", selectedGuest);

    fd_from.append("total_tablebooking", "0");
    fd_from.append("dining_area_id", "0");
    fd_from.append("reservation_comment", $("#order_comment").val());
    fd_from.append("guest_name", customer_name);
    fd_from.append("guest_email", customer_email);
    fd_from.append("default_restaurant_id", detail.primary_id);

    await server_post_data(create_table_reservation_website, fd_from)
      .then((Response) => {
        setShowLoader(false);
        if (Response.data.error) {
          handleError(Response.data.message);
        } else {
          handleclickbackstep(0, "");
          setshowmsgforbook(Response.data.message);
          setCurrentStep(5);
        }
      })
      .catch((error) => {
        console.log(error);
        setShowLoader(false);
      });
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const greyBackgroundClass = currentStep === 4 ? "greyBackground" : "";

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const footerRef = useRef(null);
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
        <section>
          <div className="container-lg">
            <div className="row m-0">
              <div className="col-lg-8 m-0 p-0">
                <section className="image_gallery_section">
                  <div className="row">
                    <div className="wrapper_carousel">
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
                        {detail.images &&
                          detail.images.length > 0 &&
                          detail.images.map((image, index) => (
                            <div key={index}>
                              <img
                                src={imageApi + image.image_name}
                                alt={`img${index}`}
                              />
                            </div>
                          ))}
                        <div></div>
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
                            <h6>
                              {detail.cuisie && detail.cuisie[0].cuisine_name}
                            </h6>
                          </div>
                          <div className="first_row_black_section_carousel align-items-center">
                            <span className="d-flex reviews_black_section">
                              <img src={redStar} alt="redStar" />
                              <p className="m-0">
                                {detail.total_service_rating_sum}
                              </p>
                            </span>
                            <span>
                              <p className="m-0">
                                {detail.review && detail.total_reviews} reviews
                              </p>
                            </span>
                          </div>
                        </span>
                        <hr />
                        <span className="last_line_black_section mb-4">
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
                            <p style={{ marginBottom: "0" }}>
                              Average price €27
                            </p>
                            <img src={quesMark} alt="quesMark" />
                          </div>
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="venue_about_section">
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
                    <div className="tab-content">
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
                              <div className="row">
                                <div className="menu_image_wrapper col-xs-3">
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
                </section>
              </div>
              <div
                id="enquiryButtonMobile"
                className="EquiryButtonMobile"
                style={{ display: isFooterVisible ? "none" : " " }}
              >
                <button onClick={toggleModal}>Enquiry</button>
              </div>
              <div className="col-lg-4">
                <div className="sticky-container">
                  <div
                    className={
                      isMobile
                        ? `calenday_modelContainermobile ${
                            isModalVisible ? "show" : ""
                          }`
                        : `calenday_modelContainer ${
                            isModalVisible ? "show" : ""
                          }`
                    }
                  >
                    <div className="MobileCrossButton">
                      {" "}
                      <button onClick={closeModal} style={{ border: "none " }}>
                        <img src={crossIcon} alt="crossicon"></img>{" "}
                      </button>
                    </div>

                    <div className="calenday_modelContainer ">
                      <div className="calenday_model-section">
                        <div className="calendy_modelHead">
                          <h4>Find a table</h4>
                          <p>Book for free</p>
                        </div>
                        {currentStep !== 5 && totalbookingtoday > 0 ? (
                          <span className="todays_booking">
                            🔥 Already {totalbookingtoday} bookings today
                          </span>
                        ) : (
                          <span>&nbsp;</span>
                        )}
                      </div>
                      <div className="calenday_modelSubHead">
                        {currentStep === 1 && (
                          <div className="d-flex backgrwh">
                            <span className="steps firstStep">
                              <span className="d-flex">
                                <img src={calendarfrom} alt="calendarfrom" />
                                <p>Date</p>
                              </span>
                            </span>
                            <div class="rhombus"></div>
                          </div>
                        )}
                        {currentStep === 2 && (
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
                        {currentStep === 3 && (
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
                        {currentStep === 5 && (
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
                        {currentStep === 1 && (
                          <div className="calenderDiv">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DateCalendar
                                value={value_date}
                                onChange={(newValue) => {
                                  handleclickstep(1, newValue);
                                }}
                                minDate={dayjs()} // Optional: Set minimum selectable date
                              />
                            </LocalizationProvider>
                          </div>
                        )}
                        {currentStep === 2 && (
                          <div>
                            <h6 className="calendar_modal_heading">
                              Booking Time
                            </h6>
                            <div className="">
                              <span className="venuePage_venue_capacity_wrapper">
                                <div className="time_discount_container_detailedVenue">
                                  {data !== null &&
                                    data.map((item, index) => {
                                      if (item.start_stop_time_status === 0) {
                                        if (
                                          item.online_booking_time_status === 0
                                        ) {
                                          return (
                                            <div
                                              key={index}
                                              className="time_discount_section"
                                              onClick={() =>
                                                handleclickstep(
                                                  2,
                                                  item.primary_id +
                                                    "~@~" +
                                                    item.start_time +
                                                    "~@~" +
                                                    item.per_discount
                                                )
                                              }
                                            >
                                              <div className="time_section">
                                                <p>
                                                  {formatTimeintotwodigit(
                                                    item.start_time
                                                  )}
                                                </p>
                                              </div>
                                              {item.per_discount > 0 ? (
                                                <div className="discount_section">
                                                  <p>-{item.per_discount}%</p>
                                                </div>
                                              ) : (
                                                <div className="discount_section">
                                                  <p>N/A</p>
                                                </div>
                                              )}
                                            </div>
                                          );
                                        } else {
                                          return (
                                            <div
                                              key={index}
                                              className="time_discount_section block_table"
                                            >
                                              <div className="time_section">
                                                <p>
                                                  {formatTimeintotwodigit(
                                                    item.start_time
                                                  )}
                                                </p>
                                              </div>
                                              {item.per_discount > 0 ? (
                                                <div className="discount_section">
                                                  <p>-{item.per_discount}%</p>
                                                </div>
                                              ) : (
                                                <div className="discount_section">
                                                  <p>N/A</p>
                                                </div>
                                              )}
                                            </div>
                                          );
                                        }
                                      }
                                    })}
                                </div>
                              </span>
                            </div>
                          </div>
                        )}
                        {currentStep === 3 && (
                          <div className="wrapper_calendar_modal">
                            <h6 className="calendar_modal_heading">
                              Number of Guests
                            </h6>
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
                                      onChange={(e) =>
                                        SelectedChangeGuest(e, "2")
                                      }
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
                                        selectedChild === index
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
                                      defaultValue={selectedChild}
                                      name="custom_child_count"
                                      onBlur={(e) =>
                                        SelectedChangeChild(e, "2")
                                      }
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
                                      onClick={() =>
                                        SelectedChangePet(index, "1")
                                      }
                                    >
                                      <p>{index}</p>
                                    </div>
                                  </li>
                                ))}
                                <li
                                  className={`${
                                    addCustomPet ? " " : "hideInput"
                                  }`}
                                >
                                  <div className="customRsrvInput">
                                    <input
                                      type="text"
                                      maxLength={3}
                                      defaultValue={selectedpet}
                                      name="custom_pet_count"
                                      onChange={(e) =>
                                        SelectedChangePet(e, "2")
                                      }
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
                              <Link
                                onClick={() =>
                                  handleclickstep(3, selectedGuest)
                                }
                              >
                                Next
                              </Link>
                            </span>
                          </div>
                        )}
                        {currentStep === 4 && (
                          <div className="wrapper_calendar_modal">
                            <h6 className="calendar_modal_heading">
                              Review Details
                            </h6>
                            <div className="details_step_calendar_modal">
                              <span className="row">
                                <h6 className="col-4">Date: </h6>
                                <p className="col-8">
                                  {formatDateStringdot(selectedDate)} |{" "}
                                  {selectedTime}
                                </p>
                              </span>
                              <span className="row">
                                <h6 className="col-4">Person: </h6>
                                <p className="col-8">{selectedGuest}</p>
                              </span>
                              <span className="row">
                                <h6 className="col-4">Children: </h6>
                                <p className="col-8">{selectedChild}</p>
                              </span>
                              <span className="row">
                                <h6 className="col-4">Pets: </h6>
                                <p className="col-8">{selectedpet}</p>
                              </span>
                              <span className="row">
                                <h6 className="col-4">Discount: </h6>
                                <p className="col-8">{selectedDiscount}%</p>
                              </span>

                              <input
                                type="text"
                                placeholder="Add Instruction/Comment"
                                name="order_comment"
                                maxLength={300}
                                id="order_comment"
                                onInput={handleIaphabetnumberChange}
                              />

                              <span>
                                {" "}
                                <input
                                  type="checkbox"
                                  className="checkBoxUnique"
                                  name="checkSurfaceEnvironment-1"
                                  id="checkSurfaceEnvironment-1"
                                />
                                <label>
                                  I agree to the Terms & Conditions & Privacy
                                  Policy
                                </label>
                              </span>
                              <Link onClick={function_save}>Book Now</Link>
                            </div>
                          </div>
                        )}
                        {currentStep === 5 && (
                          <div className="final_step_wrapper">
                            <h6>Reservation </h6>
                            <span>
                              <p>
                                {formatDateStringdot(selectedDate)} •{" "}
                                {selectedGuest} Person • {selectedTime}
                              </p>
                            </span>

                            <div className="confirmed_booking_span">
                              <h6>Booking Confirmed! </h6>
                              <desc>{showmsgforbook}</desc>
                            </div>
                          </div>
                        )}
                      </div>
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
          </div>
        </section>

        <section className="mt-5"></section>
        <Footer />
      </div>
    </>
  );
};

export default DetailedVenue;
