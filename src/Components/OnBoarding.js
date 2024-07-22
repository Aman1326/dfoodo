import React, { useState } from "react";
import "./Css/OnBoarding.css";
import Header from "./Header";
import tick from "../Assets/OnBoardingTick.svg";
import clock from "../Assets/onBoardingClock.svg";
import img from "../Assets/onBoardingImg.svg";
import note from "../Assets/onBoardingNote.svg";
import bg from "../Assets/bgOnBoarding.png";
import pana from "../Assets/pana.png";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Card } from "react-bootstrap";
import Select from "react-select";
import back from "../Assets/leftArrow_black.svg";

import img1 from "../Assets/filterImg1.svg";
import img2 from "../Assets/filterImg2.svg";
import img3 from "../Assets/filterImg3.svg";
import img4 from "../Assets/filterImg4.svg";
import img5 from "../Assets/filterImg5.svg";
import { Link } from "react-router-dom";
const OnBoarding = () => {
  const [view, setView] = useState("home"); // Initial state is 'home'

  const switchView = () => {
    // Toggle between 'home' and 'form'
    setView((prevView) => (prevView === "home" ? "form" : "home"));
  };

  //progress bar form :
  const [progress, setProgress] = useState(0);
  const [currentState, setCurrentState] = useState(0);
  const totalSteps = 11;
  const step = 100 / totalSteps;

  const increaseProgress = () => {
    if (currentState < totalSteps - 1) {
      setProgress((prev) => Math.min(prev + step, 100));
      setCurrentState((prev) => prev + 1);
    }
  };

  const decreaseProgress = () => {
    if (currentState > 0) {
      setProgress((prev) => Math.max(prev - step, 0));
      setCurrentState((prev) => prev - 1);
    }
  };

  // states:
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  // check box steps array

  const initialLabelCount = 8; // Initial number of labels to display
  const [labelCount, setLabelCount] = useState(initialLabelCount);

  const items = [
    { imgSrc: img1, label: "Label 1" },
    { imgSrc: img2, label: "Label 2" },
    { imgSrc: img3, label: "Label 3" },
    { imgSrc: img4, label: "Label 4" },
    { imgSrc: img5, label: "Label 5" },
    { imgSrc: img3, label: "Label 3" },
    { imgSrc: img4, label: "Label 4" },
    { imgSrc: img5, label: "Label 5" },
    { imgSrc: img1, label: "Label 1" },
    { imgSrc: img2, label: "Label 2" },
    { imgSrc: img3, label: "Label 3" },
    { imgSrc: img4, label: "Label 4" },
    { imgSrc: img2, label: "Label 2" },
    { imgSrc: img3, label: "Label 3" },
    { imgSrc: img4, label: "Label 4" },
    { imgSrc: img5, label: "Label 5" },
    { imgSrc: img3, label: "Label 3" },
    // Add more items as needed
  ];

  // Function to load more labels
  const loadMoreLabels = () => {
    // Increase labelCount by 8 when "Load More" is clicked
    setLabelCount(labelCount + 8);
  };

  return (
    <>
      <Header />
      {view == "home" && (
        <div className="onBoarding_page_wrapper">
          <div className="container-lg">
            <div className="row complete_scetion_wrapper_onBoarding">
              <div className="left_section_onboardingHome col-lg-4 col-12">
                <div className="">
                  <div>
                    <h3> Partner with</h3>
                    <h1>DFOODO</h1>
                  </div>
                  <span>
                    <img src={note} alt="note" />
                    <h6>Register your restaurant</h6>
                  </span>
                  <span>
                    <img src={clock} alt="note" />
                    <h6>Restaurant Open time</h6>
                  </span>
                  <span>
                    <img src={img} alt="note" />
                    <h6>Upload Menu & Images</h6>
                  </span>
                </div>
              </div>
              <div className="col-lg-6 col-12">
                <div className="right_section_onboardingHome">
                  <h3>Get started our Journey</h3>
                  <p id="description_right_section_onboardingHome">
                    Please keep the documents ready for a smooth signup
                  </p>
                  <div className="d-flex">
                    <span>
                      <img src={tick} alt="note" />
                      <h6>FSSAI license copy </h6>
                      <p>{"(apply now)"}</p>
                    </span>
                    <span>
                      <img src={tick} alt="note" />
                      <h6>PAN card copy</h6>
                    </span>
                  </div>
                  <div className="d-flex">
                    <span>
                      <img src={tick} alt="note" />
                      <h6>Regular GSTIN </h6>
                      <p>{"(apply now)"}</p>
                    </span>
                    <span>
                      <img src={tick} alt="note" />
                      <h6>Images for your restaurant</h6>
                    </span>
                  </div>
                  <span>
                    <img src={tick} alt="note" />
                    <h6>Your restaurant menu </h6>
                  </span>

                  <button
                    className="register_my_venue_btn_onBoarding"
                    onClick={switchView}
                  >
                    Register My Restaurant
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {view === "form" && (
        <>
          <div className="container-lg">
            <div className="onboarding_form_wrapper">
              <div className="row m-auto ">
                <div className="col-md-6 ">
                  <div className="left_onboarding_form_wrapper ">
                    <h2>Become</h2>
                    <h1>A Partner</h1>
                    <img src={pana} alt="pana" />
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="back_btn_progressbar_wrapper">
                    <Link onClick={decreaseProgress}>
                      <img src={back} alt="back" />
                    </Link>
                    <span className="progressBar_span_right_onboarding_form_wrapper">
                      <ProgressBar now={progress} />
                    </span>
                  </div>
                  <div>
                    <div className="card_container_onboarding">
                      <Card>
                        <Card.Body>
                          {currentState === 0 && (
                            <>
                              <h2>Restaurant Details</h2>
                              <Card.Text>
                                <form className="form_step1">
                                  <div className="step_zero">
                                    <input
                                      type="text"
                                      placeholder="Restaurant name"
                                    />
                                    <input
                                      type="text"
                                      placeholder="Restaurant Address"
                                    />
                                    <span>
                                      {" "}
                                      <input
                                        type="number"
                                        placeholder="Restaurant Contact Phone no."
                                      />
                                      <Link id="green_verifyButton">
                                        Verify
                                      </Link>
                                    </span>
                                    <Select options={options} />
                                    <div>
                                      <span>
                                        {" "}
                                        <input
                                          type="number"
                                          placeholder="Pincode"
                                        />
                                        <input type="text" placeholder="City" />
                                      </span>
                                    </div>
                                    <div>
                                      <span>
                                        {" "}
                                        <Link>Enter restaurant name</Link>
                                        <Link>Search</Link>
                                      </span>
                                    </div>
                                  </div>
                                </form>
                              </Card.Text>
                            </>
                          )}
                          {currentState === 1 && (
                            <Card.Text>
                              <form className="form_step2">
                                <h2>Restaurant Type</h2>
                                <div className="checkBoxes">
                                  <div>
                                    <h6>Dinein</h6>
                                    <span>
                                      <label>
                                        DineIn refers to the act of eating a
                                        meal at <br /> a restaurant rather than
                                        taking it to go
                                      </label>
                                      <input type="checkbox" />
                                    </span>
                                  </div>
                                  <div>
                                    <h6>Take a way</h6>
                                    <span>
                                      <label>
                                        Take away means purchasing food from a{" "}
                                        <br />
                                        restaurant to consume elsewhere, often
                                        packaged <br /> for convenience
                                      </label>
                                      <input type="checkbox" />
                                    </span>
                                  </div>
                                  <div>
                                    <h6>Delivery</h6>
                                    <span>
                                      <label>
                                        Delivery means bringing ordered items,
                                        typically food,
                                        <br /> from a business to a customer's
                                        specified location
                                      </label>
                                      <input type="checkbox" />
                                    </span>
                                  </div>
                                </div>
                              </form>
                            </Card.Text>
                          )}
                          {currentState === 2 && (
                            <Card.Text>
                              <div className="checkBoxes">
                                <h2>Restaurant Bank Details</h2>
                                <form className="form_step3_first">
                                  <input type="text" placeholder="Bank name" />
                                  <input
                                    type="number"
                                    placeholder="Bank IFSC code"
                                  />
                                  <span className="flexRow spanCss">
                                    {" "}
                                    <input
                                      type="number"
                                      placeholder="Bank Account number"
                                    />
                                    <Link id="green_verifyButton">Verify</Link>
                                  </span>
                                </form>
                                <form className="form_step3_first">
                                  <h2>Restaurant Documents</h2>
                                  <div>
                                    <span className="spanCss">
                                      <input
                                        type="number"
                                        placeholder="Enter FSSAI number"
                                      />
                                      <Link id="green_verifyButton">
                                        Verify
                                      </Link>
                                    </span>
                                  </div>
                                  <div>
                                    <span className="spanCss">
                                      <input
                                        type="number"
                                        placeholder="Enter GSTIN number"
                                      />
                                      <Link id="green_verifyButton">
                                        Verify
                                      </Link>
                                    </span>
                                  </div>
                                </form>
                              </div>
                            </Card.Text>
                          )}
                          {currentState === 3 && (
                            <Card.Text>
                              <div>
                                <h2>Restaurant Manager Details </h2>
                                <form className="form_step3_first">
                                  <input
                                    type="number"
                                    placeholder="Restaurant Manager name"
                                  />
                                  <input
                                    type="number"
                                    placeholder="Restaurant Manager Email id"
                                  />
                                  <span className="spanCss">
                                    <input
                                      type="number"
                                      placeholder="Restaurant Manager Contact Phone no."
                                    />
                                    <Link id="green_verifyButton">Verify</Link>
                                  </span>
                                </form>
                              </div>
                            </Card.Text>
                          )}
                          {currentState === 4 && (
                            <Card.Text>
                              <div>
                                <div>
                                  <h2>Restaurant Features</h2>
                                  <form className="row">
                                    {items
                                      .slice(0, labelCount)
                                      .map((item, index) => (
                                        <div
                                          key={index}
                                          className="col-md-6 mb-3 "
                                        >
                                          <span className="checkBox_step4_onboarding">
                                            <input
                                              type="checkbox"
                                              className="form-check-input"
                                              id={`checkbox${index}`}
                                            />
                                            <img
                                              src={item.imgSrc}
                                              alt={item.label}
                                            />

                                            <label
                                              className="form-check-label"
                                              htmlFor={`checkbox${index}`}
                                            >
                                              {item.label}
                                            </label>
                                          </span>
                                        </div>
                                      ))}
                                    {labelCount < items.length && (
                                      <Link
                                        onClick={loadMoreLabels}
                                        style={{
                                          textDecoration: "none",
                                          textAlign: "right",
                                          fontSize: "14px",
                                        }}
                                      >
                                        +Load More
                                      </Link>
                                    )}
                                  </form>
                                </div>
                                <div>
                                  <h2>Restaurant Cuisines</h2>
                                  <form className="row">
                                    {items
                                      .slice(0, labelCount)
                                      .map((item, index) => (
                                        <div
                                          key={index}
                                          className="col-md-6 mb-3"
                                        >
                                          <span className="checkBox_step4_onboarding">
                                            <input
                                              type="checkbox"
                                              className="form-check-input"
                                              id={`checkbox${index}`}
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor={`checkbox${index}`}
                                            >
                                              {item.label}
                                            </label>
                                          </span>
                                        </div>
                                      ))}
                                    {labelCount < items.length && (
                                      <Link
                                        onClick={loadMoreLabels}
                                        style={{
                                          textDecoration: "none",
                                          textAlign: "right",
                                          fontSize: "14px",
                                        }}
                                      >
                                        +Load More
                                      </Link>
                                    )}
                                  </form>
                                </div>
                              </div>
                            </Card.Text>
                          )}
                          {currentState === 5 && (
                            <Card.Text>
                              <div>
                                <h2>Restaurant operational hours</h2>
                              </div>
                            </Card.Text>
                          )}
                          {currentState === 6 && (
                            <Card.Text>
                              <div>
                                <h2>Restaurant Images</h2>
                                <form>
                                  <input
                                    type="file"
                                    id="myFile"
                                    name="filename"
                                  ></input>
                                </form>
                              </div>
                              <div>
                                <h2>Upload menu Images</h2>
                                <form>
                                  <input
                                    type="file"
                                    id="myFile"
                                    name="filename"
                                  ></input>
                                </form>
                              </div>
                            </Card.Text>
                          )}
                          {currentState === 7 && (
                            <Card.Text>
                              <div>
                                <h2>About Restaurant</h2>
                                <form>
                                  <textarea
                                    type="text"
                                    placeholder="Enter some related to our restaurant"
                                  />
                                </form>
                              </div>
                            </Card.Text>
                          )}
                          {currentState === 8 && (
                            <Card.Text>
                              <div>
                                <div>
                                  <h2>Restaurant Seat Availability</h2>
                                  <form>
                                    <input
                                      type="text"
                                      placeholder="Enter total number of seat"
                                    />
                                    <input
                                      type="text"
                                      placeholder="Per Day Maximum seat"
                                    />
                                    <input
                                      type="text"
                                      placeholder="Approval Person Limit"
                                    />
                                    <input
                                      type="text"
                                      placeholder="Booking Cutoff time"
                                    />
                                    <input
                                      type="text"
                                      placeholder="Table Turn over time"
                                    />
                                  </form>
                                </div>
                                <div>
                                  <h2>Manage Reservations with Time Slots</h2>
                                  <form>
                                    <input
                                      type="radio"
                                      placeholder="Enter total number of seat"
                                    />
                                    <label>15 Minutes</label>
                                    <input
                                      type="radio"
                                      placeholder="Per Day Maximum seat"
                                    />{" "}
                                    <label>30 Minutes</label>
                                  </form>
                                </div>
                              </div>
                            </Card.Text>
                          )}
                          {currentState === 9 && (
                            <Card.Text>
                              <div>
                                <h2>Restaurant Owner Details</h2>
                                <input
                                  type="text"
                                  placeholder="Restaurant Owner name "
                                />
                                <span>
                                  <input
                                    type="text"
                                    placeholder="Enter PAN Card number"
                                  />
                                  <Link>Verify</Link>
                                </span>
                                <span>
                                  <input
                                    type="text"
                                    placeholder="Restaurant Owner Phone no."
                                  />
                                  <Link>Verify</Link>
                                </span>
                              </div>
                            </Card.Text>
                          )}
                          {currentState === 10 && (
                            <Card.Text>
                              <div>
                                <h2>Thank You</h2>
                              </div>
                            </Card.Text>
                          )}
                        </Card.Body>
                      </Card>
                    </div>
                    <span className="continue_skip_button_wrapper">
                      <Link onClick={increaseProgress} id="skip_btn_onboarding">
                        Skip
                      </Link>
                      <Link onClick={increaseProgress}>Continue</Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OnBoarding;
