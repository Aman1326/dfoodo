import React, { useState, useEffect } from "react";
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
import {
  handleAphabetsChange,
  handleEmailChange,
  handleError,
  handleNumbersChange,
  make_image_from_letter,
  validateEmail,
  validateMobile,
} from "../CommonJquery/CommonJquery.js";
import {
  server_post_data,
  customer_login,
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
  customer_id = retrieveData("customer_id");
  customer_name = retrieveData("customer_name");
  const profileShow = customer_id !== "0";
  const location = useLocation();
  const navigate = useNavigate();
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
          window.location.reload();
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
                window.location.reload();
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

  const confirmVIP = () => {
    removeData();
    navigate("/");
  };

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
  return (
    <>
      <div className="upper_header_wrapper">
        <div className="container-lg">
          {location.pathname !== "/onBoarding" && !isMobile && (
            <div className="upper_header_container ">
              {" "}
              <Link to="/registerMyVenue">List My Restaurant</Link>
              <Link to="/getHelp">Get help</Link>
              {/* <p>EN</p> */}
            </div>
          )}
        </div>
      </div>
      <nav class="navbar stickyHeader navbar-expand-lg bg-body-tertiary">
        <div class="container-lg">
          <Link class="navbar-brand" to="/">
            <img src={mainLogo} alt="mainLogo" width={150} />
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarScroll">
            <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
              <li class="nav-item">
                {location.pathname !== "/onBoarding" && (
                  <span className="dropdown1" onClick={handleShowLocationModal}>
                    <label>
                      <img src={locationsssss} alt="location" /> Bhopal
                    </label>
                  </span>
                )}
              </li>
              <li class="nav-item"></li>
            </ul>
            {searchShow && (
              <div className="row m-auto">
                <div className="col-md-12">
                  <SearchBar />
                </div>
              </div>
            )}
            <form class="d-flex mobile_wrapper_header" role="search">
              <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                <li class="nav-item dropdown">
                  <div className="mobile_phone_container">
                    {location.pathname !== "/onBoarding" && (
                      <a
                        class="nav-link dropdown-toggle"
                        onClick={handleOpenModal}
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
                      <Link to="/registerMyVenue">List My Restaurant</Link>
                      <Link to="/getHelp">Get help</Link>
                      {/* <p>EN</p> */}
                    </div>
                  )}
                </li>
                <li class="nav-item"></li>
              </ul>
              {!profileShow && (
                <Link
                  className="loginButton"
                  style={{
                    textDecoration: "none",
                    alignItems: "center",
                    width: "fitContent",
                  }}
                  onClick={handleOpenLoginModal}
                >
                  <p>Login</p>
                </Link>
              )}
              {profileShow && (
                <Link to="/profile" id="image_from_letter">
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
                <input placeholder="Search for your city" />
              </div>
              <div className="d-flex col-lg-12 location_wrapper_headerModal">
                <img src={locationIcon} alt="locationIcon" />
                <h6>Detect my Location</h6>
              </div>
              <div className="popular_cities_header">
                <h6>Popular Cities</h6>
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
      </Modal>
    </>
  );
}

export default Header;
