import React, { useState } from "react";
import "./Css/Header.css";
import "react-international-phone/style.css";
import { Link } from "react-router-dom";
import mainLogo from "../Assets/mainLogo.png";
import { Modal, Button } from "react-bootstrap";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
function Header() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showEmailLoginModal, setShowEmailLoginModal] = useState(false);
  const [isPhoneLogin, setIsPhoneLogin] = useState(true); // State to toggle between phone and email
  const [userNumber, setUserNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false); // State to manage OTP view
  const [otp, setOtp] = useState(""); // State to manage the entered OTP

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
  return (
    <>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container">
          <a class="navbar-brand" href="#">
            <img src={mainLogo} alt="mainLogo" width={150} />
          </a>
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
                <a class="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Link
                </a>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Link
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <Link
                  class="nav-link"
                  aria-disabled="true"
                  onClick={handleOpenLoginModal}
                >
                  Login
                </Link>
              </li>
            </ul>
            <form class="d-flex" role="search">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-success" type="submit">
                Search
              </button>
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
            isPhoneLogin ? (
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
                <h6>Enter your Email Address</h6>
                <p>You will receive an email to verify your account.</p>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  className="mt-2 form-control"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </>
            )
          ) : (
            <>
              <h6>Enter the OTP</h6>
              <p>
                Please enter the OTP sent to your{" "}
                {isPhoneLogin ? "phone" : "email"}.
              </p>
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
          {!otpSent && (
            <div className="footer_phoneLoginModal">
              <Button
                variant="link"
                onClick={() => setIsPhoneLogin(!isPhoneLogin)}
              >
                {isPhoneLogin ? "Use Email Instead" : "Use Phone Instead"}
              </Button>
            </div>
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
          <h6>Welcome to Book My Venue </h6>
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
            <button className="userResgistrationContinuebtn">Continue</button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Header;
