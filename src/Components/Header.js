import React, { useState } from "react";
import "./Css/Header.css";
import { Link } from "react-router-dom";
import "react-international-phone/style.css";
import phone from "../Assets/mobilePhone.svg";
import location from "../Assets/locationIcon.svg";
import mainLogo from "../Assets/mainLogo.png";
import { Modal, Button } from "react-bootstrap";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import qr from "../Assets/QR.png";
import { useLocation } from "react-router-dom";
function Header() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showEmailLoginModal, setShowEmailLoginModal] = useState(false);
  const [isPhoneLogin, setIsPhoneLogin] = useState(true); // State to toggle between phone and email
  const [userNumber, setUserNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false); // State to manage OTP view
  const [otp, setOtp] = useState(""); // State to manage the entered OTP

  const handleCloseLoginModal = () => setShowLoginModal(false);
  const handleOpenLoginModal = () => {
    setShowLoginModal(true);
  };
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
    // Handle the OTP confirmation logic here
    // For example, verify the OTP
    handleCloseLoginModal();
  };
  const isPhoneNumberValid = userNumber.length >= 10;
  const isEmailValid = userEmail.includes("@");

  // user registration modal after logging in after phone otp
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const handleCloseRegistrationModal = () => setShowRegistrationModal(false);
  const handleShowRegistrationModal = () => setShowRegistrationModal(true);

  const [selectedOption, setSelectedOption] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  //download app qr modal
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  //fetch location of the app:
  const locationn = useLocation();
  const [profileBtn, setProfileBTn] = useState(false);
  const loginProfileClick = () => {
    setProfileBTn(true);
  };
  return (
    <>
      <div className="upper_header_wrapper">
        <div className="container-lg">
          {locationn.pathname !== "/onBoarding" && (
            <div className="upper_header_container">
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
                {locationn.pathname !== "/onBoarding" && (
                  <span className="dropdown1">
                    <label>
                      <img src={location} alt="location" /> Bhopal
                    </label>
                  </span>
                )}
              </li>
              <li class="nav-item"></li>
            </ul>
            <form class="d-flex mobile_wrapper_header" role="search">
              <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                <li class="nav-item dropdown">
                  <div className="mobile_phone_container">
                    {locationn.pathname !== "/onBoarding" && (
                      <a
                        class="nav-link dropdown-toggle"
                        onClick={handleOpenModal}
                      >
                        <img src={phone} alt=" phone" /> MOBILE
                      </a>
                    )}
                  </div>
                </li>
                <li class="nav-item"></li>
              </ul>
              {profileBtn ? (
                false && (
                  <Link
                    className="loginButton"
                    style={{
                      textDecoration: "none",
                      alignItems: "center",
                      width: "fitContent",
                    }}
                    onClick={handleOpenLoginModal}
                  >
                    Log in
                  </Link>
                )
              ) : (
                <Link
                  className="loginButton"
                  style={{
                    textDecoration: "none",
                    alignItems: "center",
                    width: "fitContent",
                    borderRadius: "50%",
                    aspectRatio: "1",
                    padding: "0.5rem 0.7rem",
                  }}
                  to="/profile"
                >
                  RS
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
          {!otpSent ? (
            <>
              <h6>Enter your Phone Number</h6>
              <p>You will receive a text message to verify your account.</p>
              <PhoneInput
                id="phone"
                name="phone"
                placeholder="Phone Number"
                className="mt-2"
                defaultCountry="in"
                value={userNumber}
                onChange={(phone) => setUserNumber(phone)}
              />
            </>
          ) : (
            <>
              <h6>Enter the OTP</h6>
              <p>Please enter the OTP sent to your phone.</p>
              <input
                type="text"
                id="otp"
                name="otp"
                placeholder="OTP"
                className="mt-2 form-control"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </>
          )}
          {!otpSent ? (
            <Button
              className="PhoneloginButton"
              onClick={handleLoginSubmit}
              style={{
                backgroundColor: !isPhoneNumberValid ? "grey" : "",
                borderColor: !isPhoneNumberValid ? "grey" : "",
                cursor: !isPhoneNumberValid ? "not-allowed" : "pointer",
              }}
              disabled={!isPhoneNumberValid}
            >
              Continue
            </Button>
          ) : (
            <Button
              className="PhoneloginButton"
              onClick={() => {
                handleOtpSubmit();
                handleShowRegistrationModal();
              }}
              style={{
                backgroundColor: otp.length < 4 ? "grey" : "",
                borderColor: otp.length < 4 ? "grey" : "",
                cursor: otp.length < 4 ? "not-allowed" : "pointer",
              }}
              disabled={otp.length < 4}
            >
              Confirm OTP
            </Button>
          )}
        </Modal.Body>
      </Modal>

      <Modal
        className="modal-md"
        centered
        show={showRegistrationModal}
        onHide={handleCloseRegistrationModal}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="useRegistration_body">
          <h6>Welcome to Dfoodo </h6>
          <p>Create your account and quickly make a reservation </p>
          <form className="userRegistration_form">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder=" First Name"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                placeholder="  Last Name"
                className="form-control"
              />
            </div>
            <div className="mb-3 userRegistration_phoneNumber">
              <PhoneInput
                id="phoneNumberUserRegistration"
                placeholder="Phone Number"
                className="form-control"
                defaultCountry="in"
                value={userNumber}
                onChange={(phone) => setUserNumber(phone)}
                //

                name="phone"
              />
            </div>
            <div className="mb-3 dfoodoterms_agreement">
              <input type="checkbox" />
              <p>
                I agree to Dfoodo Terms of Service Privacy Policy and Content
                Policy
              </p>
            </div>
            <button
              className="userResgistrationContinuebtn"
              onClick={loginProfileClick}
            >
              Continue
            </button>
          </form>
        </Modal.Body>
      </Modal>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        className="success_modal_reg modal-md"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="phoneApp_modal_register_my_venue ">
            <h3>Find the best restaurants around you using Dfoodo App!</h3>
            <p>Download Dfoodo app by scanning the QR code</p>
            <img src={qr} alt="altqr" />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Header;
