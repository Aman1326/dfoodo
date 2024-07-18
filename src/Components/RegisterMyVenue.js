import { useState } from "react";
import "./Css/RegisterMyVenue.css";
import Footer from "./Footer";
import Header from "./Header";
import picture1 from "../Assets/deck.svg";
import picture2 from "../Assets/add_shopping_cart.svg";
import picture3 from "../Assets/eye_tracking.svg";

import bg from "../Assets/getHelpBg.png";
const RegisterMyVenue = () => {
  return (
    <>
      <Header />

      <div className="register-venue-background" style={{ overflow: "hidden" }}>
        <div className="container">
          <div className="register-venue-overlay">
            <div className="container">
              <div className="row">
                {/* <div className="image_overlay_getHelp">
                  <img src={bg} alt="bg" />
                </div> */}
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
                        id="First Name"
                        name="First Name"
                        className="form-control"
                        placeholder="Enter the name of your Business"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="venueLocation d-flex flex-row">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="last Name"
                        name="last Name"
                        className="form-control"
                        placeholder="Mumbai"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="contactPerson">Your Email</label>
                      <input
                        type="text"
                        id="Your Email"
                        name="Your Email"
                        className="form-control"
                        placeholder="Enter your Full Name"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="contactEmail">Restaurant Name</label>
                      <input
                        type="number"
                        id="Restaurant Name"
                        name="Restaurant Name"
                        className="form-control"
                        placeholder="Enter your Mobile No."
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="phone">Restaurant Email</label>
                      <input
                        type="text"
                        id="Restaurant Name"
                        name="Restaurant Name"
                        className="form-control"
                        placeholder="Enter business Email Address"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <label htmlFor="additionalInfo">Restaurant Address</label>
                      <input
                        id="comment"
                        name="comment"
                        className="form-control"
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
                      <button type="submit">Next </button>
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
    </>
  );
};

export default RegisterMyVenue;
