import React, { useState, useEffect } from "react";
import "./Css/GetHelp.css";
import location from "../Assets/locationIcon_faq1.svg";
import phone from "../Assets/phoneCall.svg";
import message from "../Assets/msgIcon.svg";
import headphone from "../Assets/headphoneSvg.svg";
import upArrow from "../Assets/downArrowBlack.svg";
import Footer from "./Footer";
import Header from "./Header";
import DOMPurify from "dompurify";
import DownloadApp from "./DownloadApp";
import { Link } from "react-router-dom";

import {
  server_post_data,
  get_all_faq_website,
  handleError,
} from "../ServiceConnection/serviceconnection.js";

const GetHelp = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [getFaq, SetFaq] = useState([]);
  const [getSocialLinks, SetSocialLinks] = useState([]);

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const master_data_get = async () => {
    const fd = new FormData();

    await server_post_data(get_all_faq_website, fd)
      .then((Response) => {
        if (Response.data.error) {
          console.log(Response.data.message);
        } else {
          SetFaq(Response.data.message.data);
          if (Response.data.message.data_faq_webite.length > 0) {
            SetSocialLinks(Response.data.message.data_faq_webite[0]);
          }
        }
      })
      .catch((error) => {});
  };
  useEffect(() => {
    master_data_get();
  }, []);
  return (
    <>
      <Header />
      <div className="background-image-container">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div
                className="col-lg-6 col-md-6 col-12 mb-3"
                style={{ color: "var(--white)" }}
              >
                <h1 className="mb-4">We're here to assist you!</h1>
                <div className="contact_section_left">
                  <span className="row_text">
                    <img src={message} alt="phone" />
                    <h6>{getSocialLinks.website_email}</h6>
                  </span>
                  <span className="row_text">
                    <img src={phone} alt="phone" />
                    <h6>
                      +{getSocialLinks.website_contact_no_first}
                      {getSocialLinks.website_contact_no_second != "" &&
                        getSocialLinks.website_contact_no_second != undefined &&
                        ",+" + getSocialLinks.website_contact_no_second}
                    </h6>
                  </span>
                  <span className="row_text">
                    <img src={location} alt="phone" />
                    <h6>{getSocialLinks.website_address}</h6>
                  </span>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-12 d-flex align-items-center">
                <div className="gethelp_right_section">
                  <div>
                    <img src={headphone} alt="headphone" />
                    <p>Connect with us via chat</p>
                    <Link
                      aria-label="Chat on WhatsApp"
                      to={`https://wa.me/+${getSocialLinks.website_contact_no_first}`}
                      target="blank"
                    >
                      Chat with us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="faq_section">
        <div className="container">
          <div className="faq_section_container">
            <div className="accordion_container w-100">
              <div className="faq_section_container_heading">
                <h2>FAQS</h2>
              </div>
              <div className="accordion">
                {getFaq.map((item, index) => (
                  <div key={index} className="accordion-item bgColorr">
                    <div
                      className={`accordion-title ${
                        index === activeIndex ? "active" : ""
                      }`}
                      onClick={() => handleClick(index)}
                    >
                      {item.question_name}
                      <span className="dropdown-icon">
                        <img
                          src={upArrow}
                          alt="toggle arrow"
                          className={`arrow ${
                            index === activeIndex ? "up" : ""
                          }`}
                        />
                      </span>
                    </div>
                    {index === activeIndex && (
                      <div className="accordion-content">
                        <p
                          className="accordion-content-text"
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(item.answer_name),
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="list_your_venueSection_faqPage">
        <DownloadApp />
      </section>
      <Footer />
    </>
  );
};

export default GetHelp;
