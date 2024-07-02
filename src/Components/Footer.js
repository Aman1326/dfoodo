import React from "react";
import mainLogo from "../Assets/mainLogo.png";
import "./Css/Footer.css";
import logo1 from "../Assets/fb_logo.svg";
import logo2 from "../Assets/twitter_logo.svg";
import logo3 from "../Assets/yt_link.svg";
// import logo4 from "../Assets/ig_logo.svg";
// import logo5 from "../Assets/linkedIn_logo.svg";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer_section">
      <div className="container">
        <div className="row row_footer">
          <div className="col-lg-3 mb-3">
            <div className="left_section_footer">
              <img src={mainLogo} alt="mainlogo" />
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-sm-6">
            <div className="footer_about_my_venue">
              <strong>
                <Link
                  to="aboutUs"
                  style={{
                    textDecoration: "none",
                    color: "var(--grey)",
                  }}
                >
                  {" "}
                  <p className="heading_text_footerlinks">
                    About Book My Venue
                  </p>
                </Link>
              </strong>

              <ul>
                <li>
                  <Link
                    to="/getHelp"
                    style={{
                      color: "var(--text-grey)",
                      textDecoration: "none",
                    }}
                  >
                    Contact
                  </Link>{" "}
                </li>
                <li>
                  <Link
                    to="/blogs"
                    style={{
                      color: "var(--text-grey)",
                      textDecoration: "none",
                    }}
                  >
                    Blog
                  </Link>{" "}
                </li>
                <li>
                  <Link
                    to="/registerMyVenue"
                    style={{
                      color: "var(--text-grey)",
                      textDecoration: "none",
                    }}
                  >
                    Are you a Venue Owner?
                  </Link>
                </li>
                <li>
                  <Link
                    to="/getHelp"
                    style={{
                      color: "var(--text-grey)",
                      textDecoration: "none",
                    }}
                  >
                    Frequently asked Question
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-4 col-sm-6">
            <div className="footer_learn_more">
              <strong>
                <p className="heading_text_footerlinks"> Learn More</p>
              </strong>
              <ul>
                <li>
                  <Link to="/termsOfUse">Terms of Use</Link>
                </li>
                <li>
                  <Link to="/privacyPolicy">Privacy and Cookies statement</Link>
                </li>
                <li>
                  <Link>Cookie consent</Link>
                </li>
              </ul>
              <strong>
                <p>Social links</p>
              </strong>
              <ul className="social_links">
                <li>
                  <Link>
                    <img src={logo1} alt="logo1" />
                  </Link>
                </li>
                <li>
                  <Link>
                    {" "}
                    <img src={logo2} alt="logo1" />
                  </Link>
                </li>
                <li>
                  <Link>
                    <img src={logo3} alt="logo1" />
                  </Link>
                </li>
                <li>
                  <Link>
                    {" "}
                    <img src={logo3} alt="logo1" />
                  </Link>
                </li>
                <li>
                  <Link>
                    <img src={logo3} alt="logo1" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <hr />
          <div className="col-lg-10 post_footer_text mx-0">
            <p>
              Promotional offers are subject to conditions displayed on the
              restaurant’s page. Offers on alcoholic beverages are strictly
              reserved for adults. Alcohol abuse is dangerous for your health.
              Drink with moderation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
