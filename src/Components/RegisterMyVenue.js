import { useState, useEffect } from "react";
import "./Css/RegisterMyVenue.css";
import Footer from "./Footer";
import Header from "./Header";
import picture1 from "../Assets/deck.svg";
import picture2 from "../Assets/add_shopping_cart.svg";
import picture3 from "../Assets/eye_tracking.svg";
import { Link } from "react-router-dom";
import Successs from "../Assets/check.png";
import { Modal, Button } from "react-bootstrap";

import {
  check_vaild_save,
  combiled_form_data,
  empty_form,
  handleAphabetsChange,
  handleEmailChange,
  handleError,
  handleIaphabetnumberChange,
  handleNumbersChange,
  handleURLChange,
  ////handleSuccess,
} from "../CommonJquery/CommonJquery.js";
import {
  server_post_data,
  save_restaurantOwnerdetails,
} from "../ServiceConnection/serviceconnection.js";
import $ from "jquery";
const RegisterMyVenue = () => {
  //success modal
  const [showModal, setShowModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const handleSaveChangesdynamic = async (form_data, url_link) => {
    let vaild_data = check_vaild_save(form_data);
    // seterror_show("");
    if (!$("#availability").prop("checked")) {
      vaild_data = false;
    }
    if (vaild_data) {
      let fd_from = combiled_form_data(form_data, null);
      setShowLoader(true);
      await server_post_data(url_link, fd_from)
        .then((Response) => {
          if (Response.data.error) {
            handleError(Response.data.message);
          } else {
            setShowModal(true);
            setTimeout(() => {
              setShowModal(false);
            }, 5000); // 3000ms = 3 seconds
            empty_form(form_data);
          }
          setShowLoader(false);
        })
        .catch((error) => {
          setShowLoader(false);
        });
    }
  };

  return (
    <>
      <Header />

      <div className="register-venue-background" style={{ overflow: "hidden" }}>
        <div className="container">
          <div className="register-venue-overlay">
            <div className="container">
              <div className="row">
                <div className="col-lg-7 register-venue-content">
                  <h1>Hipster ipsum tattooed brunch I'm baby.</h1>
                  <p>
                    Looking to boost your restaurant's revenue and streamline
                    operations?
                  </p>
                  <p
                    className="heroBottmHed"
                    style={{
                      color: "var(--Secondary-Light-Orange-Color)",
                      fontSize: "14px",
                    }}
                  >
                    Begin attracting more reservations from local diners and
                    international visitors alike.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section>
        <div className="register_my_venue_wrapper">
          <div className="col-lg-8">
            <div className="container">
              {" "}
              <div className="register-venue-form-container ">
                <form
                  className="venue-registration-form"
                  id="vanueregistration"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="venueName">First Name</label>
                      <input
                        type="text"
                        id="Owner_fname"
                        name="Owner_fname"
                        minLength={3}
                        maxLength={70}
                        onInput={handleAphabetsChange}
                        className="form-control trio_mandatory"
                        placeholder="first name "
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="venueLocation d-flex flex-row">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="Owner_lname"
                        name="Owner_lname"
                        minLength={3}
                        maxLength={70}
                        onInput={handleAphabetsChange}
                        className="form-control"
                        placeholder="last name"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="contactPerson">Your Email</label>
                      <input
                        type="text"
                        id="Email"
                        name="Email"
                        minLength={3}
                        maxLength={70}
                        onInput={handleEmailChange}
                        className="form-control trio_mandatory"
                        placeholder="Enter your Email"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="contactEmail">Restaurant Name</label>
                      <input
                        type="text"
                        id="restaurant_name"
                        name="restaurant_name"
                        minLength={3}
                        maxLength={70}
                        onInput={handleIaphabetnumberChange}
                        className="form-control trio_mandatory"
                        placeholder="Enter restaurant name"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="phone">Restaurant Website</label>
                      <input
                        type="text"
                        id="restaurant_website"
                        name="restaurant_website"
                        minLength={3}
                        maxLength={70}
                        onInput={handleURLChange}
                        className="form-control trio_mandatory"
                        placeholder="Enter business Email Website"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="phone">Phone no.</label>
                      <input
                        type="text"
                        id="Contact"
                        name="Contact"
                        minLength={10}
                        maxLength={10}
                        onInput={handleNumbersChange}
                        className="form-control trio_mandatory"
                        placeholder="Enter phone no."
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <label htmlFor="additionalInfo">Restaurant Address</label>
                      <input
                        id="restaurant_address"
                        name="restaurant_address"
                        minLength={3}
                        maxLength={300}
                        onInput={handleIaphabetnumberChange}
                        className="form-control trio_mandatory"
                        placeholder="Restaurant Address"
                        rows="4"
                      ></input>
                    </div>
                  </div>
                  <div className="containerOfcheckBox">
                    <div className="checkBox_registerMyVenue">
                      {" "}
                      <input
                        type="checkbox"
                        id="availability"
                        name="availability"
                      />
                      <span className="check_box_text">
                        <p>
                          I do not wish to receive communications via email/SMS
                          from DFOODO
                        </p>
                      </span>
                    </div>
                    <div className="checkBox_registerMyVenue">
                      <Link
                        onClick={() =>
                          handleSaveChangesdynamic(
                            "vanueregistration",
                            save_restaurantOwnerdetails
                          )
                        }
                      >
                        Next{" "}
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container-lg">
          <div className="row">
            <div className="col-md-8 m-auto register_my_venue_middle_heading">
              <h1>
                Introducing DFOODO, the premier online restaurant reservation
                platform.
              </h1>
            </div>
          </div>
          <div className="pink_section_row row mt-4">
            <div className="col-md-4">
              <div className="pink_bg">
                <img src={picture1} alt="picture1" />
                <h3>Enhance your online presence.</h3>
                <p>As the leading restaurant discovery and booking platform.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="pink_bg">
                <img src={picture2} alt="picture1" />
                <h3>Increase your dining area occupancy.</h3>
                <p>
                  A mutually beneficial business model with no risk for your
                  restaurant.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className=" pink_bg">
                <img src={picture3} alt="picture1" />
                <h3>Manage and reduce no-shows.</h3>
                <p>
                  Reduce your no-shows with DFOODO tools, including automatic
                  confirmation emails and SMS.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="row">
        <div className="pre_footer_text_regMyVenue col-md-6 m-auto">
          <h1>Ready to enthrall more diners at your restaurant?</h1>
          <h6>
            Start your partnership with DFOODO today, cancel whenever you need!
          </h6>
        </div>
      </section>
      <section className="footer_section_regmyvenue">
        <Footer />
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
            <h3>Your request have been submitted successfully !</h3>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RegisterMyVenue;
