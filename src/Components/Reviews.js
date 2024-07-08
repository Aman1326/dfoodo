import React, { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Css/Reviews.css";
import profile from "../Assets/userReviewProfilImg.svg";
import like from "../Assets/like.svg";
import flag from "../Assets/flag.svg";
import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
const Reviews = () => {
  const value = 6.6;
  const normalizedValue = value / 10;

  //linear progressbar
  const [progress1, setProgress1] = useState(4);
  const [progress2, setProgress2] = useState(5);
  const [progress3, setProgress3] = useState(6);
  const [progress4, setProgress4] = useState(3);
  const [progress5, setProgress5] = useState(9);

  const incrementProgress = (setProgress) => {
    setProgress((prevProgress) => (prevProgress >= 10 ? 0 : prevProgress + 1));
  };

  const getProgressPercentage = (progress) => {
    return (progress / 10) * 100;
  };

  const userReviews = [
    {
      user_image: profile,
      user_name: "NARI",
      no_of_reviews: "1 review",
      entry_date: "May 9, 2024",
      review_score: "10/10",
      user_review_description:
        "Figma ipsum component variant main layer. Distribute variant pencil share strikethrough.",
    },
    {
      user_image: profile,
      user_name: "Alex",
      no_of_reviews: "3 reviews",
      entry_date: "April 15, 2024",
      review_score: "9/10",
      user_review_description:
        "Great experience with the venue. The staff was friendly and helpful. Highly recommend!",
    },
    {
      user_image: profile,
      user_name: "Sam",
      no_of_reviews: "5 reviews",
      entry_date: "March 20, 2024",
      review_score: "8/10",
      user_review_description:
        "The venue was beautiful and well-maintained. Would love to visit again.",
    },
    {
      user_image: profile,
      user_name: "Emma",
      no_of_reviews: "2 reviews",
      entry_date: "February 5, 2024",
      review_score: "7/10",
      user_review_description:
        "Nice ambiance and friendly staff. Enjoyed my time at the venue.",
    },
    {
      user_image: profile,
      user_name: "John",
      no_of_reviews: "4 reviews",
      entry_date: "January 12, 2024",
      review_score: "9/10",
      user_review_description:
        "Excellent service and facilities. Would recommend for any event.",
    },
    {
      user_image: profile,
      user_name: "Sophie",
      no_of_reviews: "6 reviews",
      entry_date: "December 25, 2023",
      review_score: "8/10",
      user_review_description:
        "Had a great time celebrating here. The venue was perfect for our needs.",
    },
    {
      user_image: profile,
      user_name: "Michael",
      no_of_reviews: "1 review",
      entry_date: "November 8, 2023",
      review_score: "7/10",
      user_review_description:
        "Decent venue with good amenities. Could improve on some aspects.",
    },
    {
      user_image: profile,
      user_name: "Olivia",
      no_of_reviews: "3 reviews",
      entry_date: "October 16, 2023",
      review_score: "8/10",
      user_review_description:
        "Lovely experience overall. The location and setup were perfect.",
    },
    {
      user_image: profile,
      user_name: "William",
      no_of_reviews: "2 reviews",
      entry_date: "September 30, 2023",
      review_score: "9/10",
      user_review_description:
        "Impressed with the service and attention to detail. Will come back again.",
    },
    {
      user_image: profile,
      user_name: "Emily",
      no_of_reviews: "5 reviews",
      entry_date: "August 7, 2023",
      review_score: "7/10",
      user_review_description:
        "Had a pleasant experience. The venue staff was accommodating.",
    },
    {
      user_image: profile,
      user_name: "Daniel",
      no_of_reviews: "2 reviews",
      entry_date: "July 14, 2023",
      review_score: "9/10",
      user_review_description:
        "Great venue for events. Enjoyed the atmosphere and facilities.",
    },
    {
      user_image: profile,
      user_name: "Ava",
      no_of_reviews: "4 reviews",
      entry_date: "June 19, 2023",
      review_score: "8/10",
      user_review_description:
        "Enjoyed celebrating here. The venue setup was perfect for our event.",
    },
    {
      user_image: profile,
      user_name: "James",
      no_of_reviews: "3 reviews",
      entry_date: "May 25, 2023",
      review_score: "7/10",
      user_review_description:
        "Decent experience. The venue was clean and well-managed.",
    },
    {
      user_image: profile,
      user_name: "Isabella",
      no_of_reviews: "1 review",
      entry_date: "April 3, 2023",
      review_score: "6/10",
      user_review_description:
        "Average venue. Could use improvement in service and amenities.",
    },
    {
      user_image: profile,
      user_name: "Jacob",
      no_of_reviews: "6 reviews",
      entry_date: "March 8, 2023",
      review_score: "8/10",
      user_review_description:
        "Excellent venue choice. Had a memorable experience.",
    },
  ];

  // load more reviews:
  const initialReviewsToShow = 3;
  const incrementAmount = 5;
  const [reviewsToShow, setReviewsToShow] = useState(initialReviewsToShow);

  const handleLoadMore = () => {
    setReviewsToShow(reviewsToShow + incrementAmount);
  };

  // reviews modal
  // rating system
  const [showModal, setShowModal] = useState(false);
  const [ratings, setRatings] = useState([0, 0, 0, 0]);
  const [reviewText, setReviewText] = useState("");
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [reviewPosted, setReviewPosted] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleRating = (rate, index) => {
    const newRatings = [...ratings];
    newRatings[index] = rate;
    setRatings(newRatings);
  };

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleSubmit = () => {
    setReviewPosted(true);
    handleClose();
  };
  useEffect(() => {
    const allRatingsFilled = ratings.every((rating) => rating > 0);
    const textFilled = reviewText.trim() !== "";
    setIsFormComplete(allRatingsFilled && textFilled);
  }, [ratings, reviewText]);
  return (
    <>
      <section className="reviews_section">
        <div className="container">
          <div className="review_wrapper row">
            <h3>Reviews</h3>
            <div className="col-4 mt-5 left_section_circularProgressBar">
              <div className="circular_review_wrapper">
                <div className="Circualr_progressBar_section">
                  <CircularProgressbar
                    value={normalizedValue}
                    maxValue={1}
                    text={`${value}/10`}
                    width={"120px"}
                  />
                  <span className="no_reviews">
                    <h6>Fabulous</h6>
                    <p>6166 reviews</p>
                  </span>
                </div>
                <div className="text_rating_sectin">
                  <span>
                    <p>9/10</p>
                    <p>Location</p>
                  </span>
                  <div
                    className="vr"
                    style={{
                      width: "1px",
                      background: "transparent",
                      border: "1px solid black",
                      padding: "0rem",
                      marginRight: "0.2rem",
                    }}
                  ></div>
                  <span>
                    <p>9/10</p>
                    <p>Service</p>
                  </span>
                  <div
                    className="vr"
                    style={{
                      width: "1px",
                      background: "transparent",
                      border: "1px solid black",
                      padding: "0rem",
                      marginRight: "0.2rem",
                    }}
                  ></div>
                  <span>
                    <p>9/10</p>
                    <p>Ambience</p>
                  </span>
                </div>
              </div>
            </div>
            <div
              className="vr"
              style={{
                width: "1px",
                background: "transparent",
                border: "1px solid black",
                padding: "0rem",
                marginRight: "0.2rem",
              }}
            ></div>
            <div className=" col-4 d-flex" style={{ width: "50%" }}>
              <div className="linear_progressBar_section">
                <div className=" progressbar_text_wrapper">
                  <div className="progress_container">
                    <div
                      className="progress_bar"
                      style={{ width: `${getProgressPercentage(progress1)}%` }}
                    ></div>
                  </div>
                  <div className="progress_text">9-10</div>
                </div>
                <div className="progressbar_text_wrapper">
                  <div className="progress_container">
                    <div
                      className="progress_bar"
                      style={{ width: `${getProgressPercentage(progress2)}%` }}
                    ></div>
                  </div>
                  <div className="progress_text">7-8</div>
                </div>

                <div className="progressbar_text_wrapper">
                  <div className="progress_container">
                    <div
                      className="progress_bar"
                      style={{ width: `${getProgressPercentage(progress3)}%` }}
                    ></div>
                  </div>
                  <div className="progress_text">5-6</div>
                </div>

                <div className="progressbar_text_wrapper">
                  <div className="progress_container">
                    <div
                      className="progress_bar"
                      style={{ width: `${getProgressPercentage(progress4)}%` }}
                    ></div>
                  </div>
                  <div className="progress_text">3-4</div>
                </div>

                <div className="progressbar_text_wrapper">
                  <div className="progress_container">
                    <div
                      className="progress_bar"
                      style={{ width: `${getProgressPercentage(progress5)}%` }}
                    ></div>
                  </div>
                  <div className="progress_text">1-2</div>
                </div>
              </div>
            </div>
          </div>
          {userReviews.slice(0, reviewsToShow).map((review, index) => (
            <div key={index} className="user_review_container">
              <div className="user_review_wrapper">
                <div>
                  <img src={review.user_image} alt="profile" />
                </div>
                <div className="user_review_rowcontainer">
                  <div className="">
                    <div className="user_review_rowcontainer_name">
                      <h6>{review.user_name}</h6>
                      <desc>{review.no_of_reviews}</desc>
                    </div>
                    <div className="user_review_rowcontainer_date">
                      {review.entry_date}
                    </div>
                  </div>
                  <div>{review.review_score}</div>
                </div>
              </div>
              <div className="user_review_description">
                <p>{review.user_review_description}</p>
              </div>
              <div className="user_review_like_report_section">
                <span className="user_review_like">
                  <img src={like} alt="like" />
                  <p>Like</p>
                </span>
                <span className="user_review_like">
                  <img src={flag} alt="flag" />
                  <p>Report</p>
                </span>
              </div>
              <hr />
            </div>
          ))}
          {userReviews.length > reviewsToShow && (
            <div className="write_review_button">
              <button id="load_more_button" onClick={handleLoadMore}>
                Load More
              </button>
            </div>
          )}
          <div className="write_review_button" onClick={handleShow}>
            <button>{reviewPosted ? "Edit Review" : "Write a Review"}</button>
          </div>
        </div>
      </section>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              color: "var(--primary-color)",
              fontWeight: "600",
              fontFamily: "Roboto",
            }}
          >
            XYZ venue
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="user_detail_section">
            <div className="user_image">
              <img src={profile} alt="profile" />
            </div>
            <div className="user_details">
              <h6>Username </h6>
              <p>Posting Publicly </p>
            </div>
          </div>
          <div className="stars_rating_section">
            {["Overall", "Location ", "Service", "Ambience"].map(
              (label, index) => (
                <div key={index} className="mb-3 stars_text_wrapper">
                  <label>{label}</label>
                  <Rating
                    onClick={(rate) => handleRating(rate, index)}
                    ratingValue={ratings[index]}
                    size={30}
                    label
                    transition
                    fillColor="var(--primary-color)"
                    emptyColor="gray"
                  />
                </div>
              )
            )}
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              rows={3}
              value={reviewText}
              placeholder="Share details of your own experience at this place"
              onChange={handleReviewTextChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            style={{ backgroundColor: "grey" }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            style={{
              backgroundColor: isFormComplete ? "var(--primary-color)" : "grey",
              outline: "none",
              border: "none",
              color: "var(--white)",
              padding: "0.43rem 1rem",
            }}
            disabled={!isFormComplete}
          >
            Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Reviews;
