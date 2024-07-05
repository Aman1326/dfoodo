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
                      <label htmlFor="venueName">Business Name*</label>
                      <input
                        type="text"
                        id="Business_Name"
                        name="Business_Name"
                        className="form-control"
                        placeholder="Enter the name of your Business"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="venueLocation d-flex flex-row">
                        City*
                      </label>
                      <input
                        type="text"
                        id="City"
                        name="City"
                        className="form-control"
                        placeholder="Mumbai"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="contactPerson">Your Name*</label>
                      <input
                        type="text"
                        id="Owner_Name"
                        name="Owner_Name"
                        className="form-control"
                        placeholder="Enter your Full Name"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="contactEmail">Contact*</label>
                      <input
                        type="number"
                        id="Contact"
                        name="Contact"
                        className="form-control"
                        placeholder="Enter your Mobile No."
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="phone">Email*</label>
                      <input
                        type="text"
                        id="Email"
                        name="Email"
                        className="form-control"
                        placeholder="Enter your Email Address"
                      />
                    </div>
                    <div className="col-md-6 mt-3">
                      <label>Key Objective</label>
                      <br />
                      <span className="radio_buttons_reg_form2">
                        <input type="radio" id="1" name="objective" value="1" />
                        <label htmlFor="1">Get More Business</label>
                        <br />
                        <input type="radio" id="2" name="objective" value="2" />
                        <label htmlFor="2">Get More Visibility</label>
                        <br />
                        <input type="radio" id="3" name="objective" value="3" />
                        <label htmlFor="3">Both</label>
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="additionalInfo">Comments*</label>
                      <textarea
                        id="comment"
                        name="comment"
                        className="form-control"
                        placeholder="Notes"
                        rows="4"
                      ></textarea>
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
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto register_my_venue_middle_heading">
              <h1>
                Introducing DFOODO, the premier online restaurant reservation
                platform.
              </h1>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="first_container"></div>
            </div>
            <div className="col-md-4"></div>
            <div className="col-md-4"></div>
          </div>
        </div>
      </section>
      <section className="footer_section_regmyvenue">
        <Footer />
      </section>
    </>
  );
};

export default RegisterMyVenue;
