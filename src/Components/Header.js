import React, { useState, useEffect,useRef  } from "react";
import "./Css/Header.css";
import "react-international-phone/style.css";
import phone from "../Assets/mobilePhone.svg";
import locationsssss from "../Assets/locationIcon.svg";
import mainLogo from "../Assets/mainLogo.png";
import qr from "../Assets/QR.png";
import { Modal, Button } from "react-bootstrap";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import searchIcon from "../Assets/searchIcon.svg.svg";
import locationIcon from "../Assets/locationIconHeader.svg";
import $ from "jquery";
import dropDown from "../Assets/downArrowBlack.svg";
import axios from "axios";
import {
  handleAphabetsChange,
  handleEmailChange,
  handleError,
  handleLinkClick,
  handleNumbersChange,
  make_image_from_letter,
  validateEmail,
  validateMobile,
} from "../CommonJquery/CommonJquery.js";
import {
  server_post_data,
  customer_login,
  city_list,
  APL_LINK,
} from "../ServiceConnection/serviceconnection.js";
import {
  removeData,
  retrieveData,
  storeData,
} from "../LocalConnection/LocalConnection.js";
let login_flag_res = "0";
let customer_id = "0";
let customer_name = "0";
let customer_mobile_no = "0";
let customer_email = "0";
let complete_status_one = "0";
function Header() {
  const inputRef = useRef(null);
  customer_id = retrieveData("customer_id");
  customer_name = retrieveData("customer_name");
  const profileShow = customer_id !== "0";
  const location = useLocation();
  const [showLoaderAdmin, setshowLoaderAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userNumber, setUserNumber] = useState("");
  const [searchShow, setsearchShow] = useState(false);
  const [otp, setOtp] = useState(""); // State to manage the entered OTP
  const [presentotp, setpresentotp] = useState("");
  const [isPhoneNumberValid, setisPhoneNumberValid] = useState(false);
  const [isOTPValid, setisisOTPValid] = useState(false);

  const login_section_res = async () => {
    let vaild = "0";
    let login_otp = $("#opt_user").val();
    let user_email = $("#user_email").val();
    let user_name = $("#user_name").val();
    let user_last = $("#user_last").val();

    if (login_flag_res === "0") {
      if (!validateMobile(userNumber)) {
        vaild = "1";
      }
    }

    if (login_flag_res === "1") {
      if (parseInt(login_otp) === "") {
        vaild = "1";
      } else if (parseInt(login_otp) !== parseInt(presentotp)) {
        vaild = "1";
      } else {
        if (complete_status_one === "0") {
          $(".otp_section").hide();
          $(".last_section").show();
          login_flag_res = "2";
          return;
        } else {
          storeData("customer_id", customer_id);
          storeData("customer_name", customer_name);
          storeData("customer_mobile_no", customer_mobile_no);
          storeData("customer_email", customer_email);
          // window.location.reload();
        }
      }
    }
    if (login_flag_res === "2") {
      if ($.trim(user_name) === "" || $.trim(user_last) === "") {
        vaild = "1";
      }
      if (user_email != "") {
        if (!validateEmail(user_email)) {
          vaild = "1";
          handleError("Enter Vaild Email Id");
          return;
        }
      }

      if (!$("#user_checkbox").prop("checked")) {
        vaild = "1";
        handleError(
          "Please agree to the terms and conditions before proceeding."
        );
        return;
      }
    }

    if (vaild === "0") {
      setshowLoaderAdmin(true);
      const fd = new FormData();
      fd.append("owner_moblie_no_without_zip", userNumber);
      if (parseInt(login_flag_res) > 0) {
        fd.append("click_type", "1");
      } else {
        fd.append("click_type", login_flag_res);
      }
      fd.append("email_id", user_email);
      fd.append("owner_name", user_name);
      fd.append("owner_lname", user_last);
      await server_post_data(customer_login, fd)
        .then((Response) => {
          setshowLoaderAdmin(false);
          if (Response.data.error) {
            handleError(Response.data.message);
          } else {
            if (Response.data.message.data_guest.length > 0) {
              setpresentotp(Response.data.message.guest_otp);
              if (
                Response.data.message.data_guest[0].guest_fname === "" ||
                Response.data.message.data_guest[0].guest_fname === null
              ) {
                complete_status_one = "0";
              } else {
                complete_status_one = "1";
              }
              customer_id = Response.data.message.data_guest[0].primary_id;
              customer_name =
                Response.data.message.data_guest[0].guest_fname +
                " " +
                Response.data.message.data_guest[0].guest_lname;
              customer_mobile_no =
                Response.data.message.data_guest[0].guest_mobile_no;
              customer_email = Response.data.message.data_guest[0].guest_email;

              if (login_flag_res === "0") {
                $(".hide_ssection_profile").hide();
                $(".otp_section").show();
                login_flag_res = "1";
              } else {
                storeData("customer_id", customer_id);
                storeData("customer_name", customer_name);
                storeData("customer_mobile_no", customer_mobile_no);
                storeData("customer_email", customer_email);
                // window.location.reload();
              }
            }
          }
        })
        .catch((error) => {
          setshowLoaderAdmin(false);
        });
    } else {
      if (login_flag_res === "0") {
        handleError("Enter Vaild Mobile No");
      } else if (login_flag_res === "1") {
        handleError("Enter Vaild OTP");
      } else {
        handleError("Enter Vaild Full name");
      }
    }
  };

  $("#login_check_jquery").on("customEvent", function () {
    handleOpenLoginModal();
  });

  const handleCloseLoginModal = () => setShowLoginModal(false);
  const handleOpenLoginModal = () => {
    login_flag_res = "0";
    $(".hide_ssection_profile").show();
    $(".otp_section").hide();
    $(".last_section").hide();
    setShowLoginModal(true);
  };

  const handleSearchShow = () => {
    if (location.pathname.includes("restro")) {
      setsearchShow(true);
    } else {
      setsearchShow(false);
    }
  };

  useEffect(() => {
    handleSearchShow();
  }, []);

  // location modal
  const [showLocationModal, setShowLocationModal] = useState(false);

  const handleCloseLocationModal = () => setShowLocationModal(false);
  const handleShowLocationModal = () => setShowLocationModal(true);

  //download app qr modal
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  //mobile condition
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //detect my location
  const [detectLocations, setdetectLocations] = useState({
    latitude: null,
    longitude: null,
  });
  const [city, setCity] = useState(retrieveData("city_main"));
  const [error, setError] = useState(null);
  const [state, setState] = useState("");
  const [cities, setCities] = useState([]);
  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setdetectLocations({ latitude, longitude });

          // Reverse Geocoding to find city and state
          getCityAndStateFromCoordinates(latitude, longitude);
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const getCityAndStateFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );

      const city =
        response.data.address.city ||
        response.data.address.town ||
        response.data.address.village;
      const state = response.data.address.state;

      if (city) {
        setCity(city);
      } else {
        setError("City not found");
      }

      if (state) {
        setState(state);
        fetchCitiesInState(state);
      } else {
        setError("State not found");
      }
    } catch (error) {
      setError("Failed to retrieve location details");
    }
  };

  const fetchCitiesInState = async (stateName) => {
    try {
      const response = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=city+in+${stateName}&key=YOUR_GOOGLE_MAPS_API_KEY`
      );

      const cities = response.data.results.map(
        (result) => result.formatted_address.split(",")[0]
      );
      setCities(cities);
    } catch (error) {
      console.error(error);
      setError("Failed to retrieve cities");
    }
  };

  const citiesInMadhyaPradesh = [
    "Bhopal",
    "Indore",
    "Gwalior",
    "Jabalpur",
    "Ujjain",
    "Sagar",
    "Satna",
    "Ratlam",
    "Rewa",
    "Dewas",
    "Murwara (Katni)",
    "Khandwa",
    "Chhindwara",
    "Guna",
    "Vidisha",
    "Shivpuri",
    "Chhatarpur",
    "Seoni",
    "Dhar",
    "Hoshangabad",
    "Itarsi",
    "Mandsaur",
    "Damoh",
    "Khargone",
    "Neemuch",
    "Pithampur",
    "Singrauli",
    "Burhanpur",
    "Chhatarpur",
    "Sehore",
    "Bhind",
    "Datia",
    "Mandla",
    "Narsinghpur",
    "Betul",
    "Shahdol",
    "Harda",
    "Dindori",
    "Shajapur",
    "Tikamgarh",
    "Rajgarh",
    "Umaria",
    "Anuppur",
    "Sheopur",
    "Barwani",
    "Raisen",
    "Morena",
    "Sidhi",
    "Balaghat",
    "Ashok Nagar",
    "Agar Malwa",
    "Alirajpur",
    "Singrauli",
    "Bina-Etawa",
    "Nagda",
  ];

  const [buttonClick, setButtonClick] = useState(false);

  const handleButtonClicked = () => {
    if (buttonClick === false) {
      setButtonClick(true);
    } else {
      setButtonClick(false);
    }
  };

  //goole cities, states mapped
  useEffect(() => {
    try {
      if (inputRef.current) {
      const input = document.getElementById("searchInput");
      const autocomplete = new window.google.maps.places.Autocomplete(input, {
        types: ["(cities)"], // Restrict results to cities
      });

      autocomplete.addListener("place_changed", function () {
        const place = autocomplete.getPlace();
        let full_address = place.address_components;
        let length_data = place.address_components.length;
        let citys = "";
        let state = "";
        let country = "";
        let tehsil = "";

        for (let i = 0; i < length_data; i++) {
          if (full_address[i].types[0] === "administrative_area_level_1") {
            state = full_address[i].long_name;
          } else if (full_address[i].types[0] === "country") {
            country = full_address[i].long_name;
          } else if (
            full_address[i].types[0] === "administrative_area_level_2"
          ) {
            citys = full_address[i].long_name;
          } else if (full_address[i].types[0] === "locality") {
            tehsil = full_address[i].long_name;
          }
        }
        if (tehsil !== "") {
          citys = tehsil;
        }
        document.getElementById("admin_city").value = citys;
        document.getElementById("admin_state").value = state;
        document.getElementById("admin_country").value = country;
      });
    }
    } catch (error) {
      console.log(error)
    }
  }, []);

  // setting the images from backend
  const [cityImage, setCityImages] = useState([]);
  const [ImageLink, setImageLink] = useState("");
  const master_data_get = async () => {
    // console.log(city_list);
    await server_post_data(city_list, null)
      .then((Response) => {
        console.log(Response.data.message);
        if (Response.data.error) {
          handleError(Response.data.message);
        } else {
          setCityImages(Response.data.message.cities);
          setImageLink(Response.data.message.image_link);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    master_data_get();
  }, []);

  return (
    <>
      <div className="upper_header_wrapper">
        <div className="container-lg">
          {location.pathname !== "/onBoarding" && !isMobile && (
            <div className="upper_header_container ">
              {" "}
              <Link onClick={() => handleLinkClick("/registerMyVenue")}>
                List My Restaurant
              </Link>
              <Link onClick={() => handleLinkClick("/getHelp")}>Get help</Link>
              {/* <p>EN</p> */}
            </div>
          )}
        </div>
      </div>
      <nav className="navbar stickyHeader navbar-expand-lg bg-body-tertiary">
        <div className="container-lg">
          <Link className="navbar-brand" onClick={() => handleLinkClick("/")}>
            <img src={mainLogo} alt="mainLogo" width={150} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
              <li className="nav-item">
                {location.pathname !== "/onBoarding" && (
                  <span
                    className="dropdown1"
                    onClick={() => handleShowLocationModal()}
                  >
                    <label>
                      <img src={locationsssss} alt="location" />{" "}
                      {city && city !== "0" ? city : "Bhopal"}{" "}
                      <img src={dropDown} alt="dropDown" />
                    </label>
                  </span>
                )}
              </li>
              <li className="nav-item"></li>
            </ul>
            {searchShow && (
              <div className="row m-auto">
                <div className="col-md-12">
                  <SearchBar />
                </div>
              </div>
            )}
            <form className="d-flex mobile_wrapper_header" role="search">
              <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                <li className="nav-item dropdown">
                  <div className="mobile_phone_container">
                    {location.pathname !== "/onBoarding" && (
                      <a
                        className="nav-link dropdown-toggle"
                        onClick={() => handleOpenModal()}
                      >
                        <img src={phone} alt=" phone" /> MOBILE
                      </a>
                    )}
                  </div>
                </li>
                <li>
                  {location.pathname !== "/onBoarding" && isMobile && (
                    <div className="upper_header_container_mobile">
                      {" "}
                      <Link onClick={() => handleLinkClick("/registerMyVenue")}>
                        List My Restaurant
                      </Link>
                      <Link onClick={() => handleLinkClick("/getHelp")}>
                        Get help
                      </Link>
                      {/* <p>EN</p> */}
                    </div>
                  )}
                </li>
                <li className="nav-item"></li>
              </ul>
              {!profileShow && (
                <Link
                  className="loginButton"
                  style={{
                    textDecoration: "none",
                    alignItems: "center",
                    width: "fitContent",
                  }}
                  onClick={() => handleOpenLoginModal()}
                >
                  <p>Login</p>
                </Link>
              )}
              {profileShow && (
                <Link
                  onClick={() => handleLinkClick("/profile")}
                  id="image_from_letter"
                >
                  <img
                    src={make_image_from_letter(customer_name)}
                    onError={(e) => {
                      e.target.src = mainLogo; // Provide the path to your fallback image
                    }}
                    alt={customer_name}
                  />
                </Link>
              )}
            </form>
          </div>
        </div>
      </nav>
      <Modal
        className="modal-md"
        centered
        show={showLoginModal}
        onHide={handleCloseLoginModal}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="phoneLoginModal_body">
          <div className="hide_ssection_profile">
            <h6>Enter your Phone Number</h6>
            <p>You will receive a text message to verify your account.</p>
            <PhoneInput
              id="phone"
              name="phone"
              placeholder="Phone Number"
              className="mt-2"
              defaultCountry="in"
              value={userNumber}
              onChange={(phone) => {
                setUserNumber(phone);
                setisPhoneNumberValid(phone.length >= 10);
              }}
              regions={["asia"]}
              onlyCountries={["in"]}
            />
            <Button
              className="PhoneloginButton mt-5 width100per"
              onClick={() => login_section_res()}
              type="button"
              style={{
                backgroundColor: !isPhoneNumberValid ? "grey" : "",
                borderColor: !isPhoneNumberValid ? "grey" : "",
                cursor: !isPhoneNumberValid ? "not-allowed" : "pointer",
              }}
              disabled={!isPhoneNumberValid}
            >
              Continue
            </Button>
          </div>
          <div className="otp_section">
            <h6>Enter the OTP</h6>
            <p>Please enter the OTP sent to your phone.</p>
            <input
              type="text"
              id="opt_user"
              name="opt_user"
              placeholder="Enter verification code"
              className="mt-2 form-control border0"
              onInput={handleNumbersChange}
              maxLength={6}
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
                setisisOTPValid(
                  parseInt(e.target.value) === parseInt(presentotp)
                );
              }}
            />
            <Button
              className="PhoneloginButton mt-5 width100per"
              onClick={() => login_section_res()}
              type="button"
              style={{
                backgroundColor: !isOTPValid ? "grey" : "",
                borderColor: !isOTPValid ? "grey" : "",
                cursor: !isOTPValid ? "not-allowed" : "pointer",
              }}
              disabled={!isOTPValid}
            >
              Continue
            </Button>
          </div>
          <div className="last_section">
            <h6>Welcome to Dfoodo </h6>
            <p>Create your account and quickly make a reservation </p>
            <form className="userRegistration_form">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="user_name"
                  name="user_name"
                  placeholder="First Name"
                  maxLength={50}
                  onInput={handleAphabetsChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  id="user_last"
                  name="user_last"
                  className="form-control"
                  placeholder="  Last Name"
                  maxLength={50}
                  onInput={handleAphabetsChange}
                />
              </div>
              <input
                type="text"
                id="user_email"
                name="user_email"
                className="form-control"
                placeholder="Email ID"
                maxLength={100}
                onInput={handleEmailChange}
              />
              <div className="mb-3 dfoodoterms_agreement ">
                <input
                  type="checkbox"
                  id="user_checkbox"
                  name="user_checkbox"
                  value="0"
                  className="wifth_chckbox"
                />
                <p>
                  I agree to Dfoodo Terms of Service Privacy Policy and Content
                  Policy
                </p>
              </div>
              <Button
                className="PhoneloginButton mt-5 width100per"
                onClick={() => login_section_res()}
                type="button"
                style={{
                  cursor: "pointer",
                }}
              >
                Complete Profile
              </Button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      <div id="login_check_jquery"></div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        className="success_modal_reg modal-md"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="phoneApp_modal_register_my_venue ">
            <h3>
              Find the best restaurants around you using{" "}
              <span style={{ color: "var(--primary-color)" }}>Dfoodo App!</span>
            </h3>
            <p>Download Dfoodo app by scanning the QR code</p>
            <img src={qr} alt="altqr" />
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={showLocationModal}
        onHide={handleCloseLocationModal}
        className="modal-lg"
      >
        <Modal.Header>
          <Modal.Title>
            <div className="row section_modal_heading">
              <div className="seachVenue_section_searchbar seachVenue_section_searchbar_headerlocation col-md-12">
                <img src={searchIcon} alt="search icon" />
                <input
                  className="form-control trio_mandatory "
                  name="searchInput"
                  id="searchInput"
                  maxLength={30}
                  onInput={handleAphabetsChange}
                  placeholder="Search for your city"
                />
              </div>
              <div className="form-row hidden" style={{ display: "none" }}>
                <div className="col-md-12 mb-3">
                  <label htmlFor="validationCustom01"> City</label>
                  <input
                    type="text"
                    className="form-control  searchInput_google"
                    name="admin_city"
                    id="admin_city"
                    maxLength={200}
                    onInput={handleAphabetsChange}
                    placeholder="Enter City"
                    // defaultValue={editBlogData.city || ""}
                  />
                  <span className="condition_error"></span>
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="validationCustom01"> State</label>
                  <input
                    type="text"
                    className="form-control  "
                    name="admin_state"
                    id="admin_state"
                    maxLength={45}
                    onInput={handleAphabetsChange}
                    placeholder="Enter State"
                    // defaultValue={editBlogData.state || ""}
                  />
                  <span className="condition_error"></span>
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="validationCustom01">Country</label>
                  <input
                    type="text"
                    ref={inputRef} 
                    className="form-control  "
                    name="admin_country"
                    id="admin_country"
                    maxLength={45}
                    onInput={handleAphabetsChange}
                    placeholder="Enter Country"
                    // defaultValue={editBlogData.country || ""}
                  />
                  <span className="condition_error"></span>
                </div>
              </div>
              <div
                className="d-flex col-lg-12 location_wrapper_headerModal"
                onClick={detectLocation}
              >
                <img src={locationIcon} alt="locationIcon" />
                <h6>Detect my Location</h6>
              </div>
              <div className="popular_cities_header">
                {/* {error && <p>Error: {error}</p>} */}
                {/* {detectLocations.latitude && detectLocations.longitude && (
                  <p>
                    Latitude: {detectLocations.latitude}, Longitude:{" "}
                    {detectLocations.longitude}
                  </p>
                )} */}
                {city && (
                  <p className="location_modal_text">Selected City: {city}</p>
                )}
                {state && <p className="location_modal_text">State: {state}</p>}
              </div>

              <div className="cities_mapped_locationModal">
                {cityImage &&
                  cityImage.map((value, idx) => (
                    <Link
                      className="city_container"
                      key={idx}
                      onClick={() => {
                        setCity(value.city);
                        handleCloseLocationModal();
                        storeData("city_main", value.city);
                        storeData("country_main", value.country);
                      }}
                    >
                      <img
                        src={`${APL_LINK + ImageLink + value.image_name}`}
                        alt={value.city}
                      />
                      <p>{value.city}</p>
                    </Link>
                  ))}
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <button
            onClick={handleButtonClicked}
            style={{
              border: "none",
              background: "transparent",
              fontFamily: "Roboto",
              textDecoration: "underline",
              fontSize: "14px",
              color: "var(--text-grey)",
            }}
          >
            {buttonClick ? "Hide Cities " : "Show Cities"}
          </button>
          {citiesInMadhyaPradesh.length > 0 && buttonClick && (
            <div className="mapped_cities_wrapper">
              <ul className="cities_mapped">
                {citiesInMadhyaPradesh.map((cityName, index) => (
                  <li key={index}>
                    {cityName} {"|"}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Header;
