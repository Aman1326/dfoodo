import React, { useState, useEffect } from "react";
import mainLogo from "../Assets/mainLogo.png";
import "./Css/Footer.css";
import logo1 from "../Assets/fb_logo.svg";
import logo2 from "../Assets/twitter_logo.svg";
import logo3 from "../Assets/yt_link.svg";
import logo4 from "../Assets/igIcon.svg";
import logo5 from "../Assets/linkedInIcon.svg";
import earth from "../Assets/earth.svg";
import { Link } from "react-router-dom";
import { handleLinkClick } from "../CommonJquery/CommonJquery";

import {
  server_post_data,
  get_all_faq_website,
} from "../ServiceConnection/serviceconnection.js";
import { handleError } from "../CommonJquery/CommonJquery.js";
const Footer = () => {
  const [getSocialLinks, SetSocialLinks] = useState([]);
  const master_data_get = async () => {
    await server_post_data(get_all_faq_website, null)
      .then((Response) => {
        if (Response.data.error) {
          handleError(Response.data.message);
        } else {
          if (Response.data.message.data_faq_webite.length > 0) {
            SetSocialLinks(Response.data.message.data_faq_webite[0]);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    master_data_get();
  }, []);
  return (
    <div className="footer_section">
      <div className="container-lg">
        <div className="brandingFooter">
          <Link onClick={() => handleLinkClick("/")}>
            {" "}
            <img src={mainLogo} alt="mainlogo" />
          </Link>
        </div>
        <div className="row row_footer">
          <div className="col-md-4 col-sm-6 mb-3">
            <div className="left_section_footer">
              <div className="footer_about_my_venue">
                <strong>
                  <Link
                    onClick={() => handleLinkClick("/aboutUs")}
                    style={{
                      textDecoration: "none",
                      color: "var(--grey)",
                    }}
                  >
                    {" "}
                    <p className="heading_text_footerlinks">About Dfoodo</p>
                  </Link>
                </strong>

                <ul>
                  <li>
                    <Link
                      onClick={() => handleLinkClick("/getHelp")}
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
                      onClick={() => handleLinkClick("/blogs")}
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
                      onClick={() => handleLinkClick("/registerMyVenue")}
                      style={{
                        color: "var(--text-grey)",
                        textDecoration: "none",
                      }}
                    >
                      Are you a restaurant Owner?
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => handleLinkClick("/getHelp")}
                      style={{
                        color: "var(--text-grey)",
                        textDecoration: "none",
                      }}
                    >
                      Frequently asked Question
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => handleLinkClick("/")}
                      style={{
                        color: "var(--text-grey)",
                        textDecoration: "none",
                      }}
                    >
                      Restaurant near me
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-sm-6">
            <div className="footer_learn_more">
              <strong>
                <p className="heading_text_footerlinks"> Learn More</p>
              </strong>
              <ul>
                <li>
                  <Link onClick={() => handleLinkClick("/termsOfUse")}>
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link onClick={() => handleLinkClick("/privacyPolicy")}>
                    Privacy and Cookies statement
                  </Link>
                </li>
                <li>
                  <Link>Cookie consent</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-4">
            <div className="footer_learn_more">
              <div className="third_row_selectLanguage_footer">
                <img src={earth} alt="earth" />
                <select>
                  <option>English</option>
                </select>
              </div>
              <strong>
                <p>Social links</p>
              </strong>
              <ul className="social_links">
                <li>
                  <Link
                    onClick={() =>
                      handleLinkClick(getSocialLinks.website_facebook_link)
                    }
                  >
                    <img src={logo1} alt="logo1" />
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() =>
                      handleLinkClick(getSocialLinks.website_twiter_link)
                    }
                  >
                    {" "}
                    <img src={logo2} alt="logo1" />
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() =>
                      handleLinkClick(getSocialLinks.website_youtube_link)
                    }
                  >
                    <img src={logo3} alt="logo1" />
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() =>
                      handleLinkClick(getSocialLinks.website_instagram_link)
                    }
                  >
                    {" "}
                    <img src={logo4} alt="logo1" />
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() =>
                      handleLinkClick(getSocialLinks.website_ins_link)
                    }
                  >
                    <img src={logo5} alt="logo1" />
                  </Link>
                </li>
              </ul>
              <div className="social_links_app_text">
                <p>Apps For You</p>
              </div>
            </div>
          </div>
          {/* <hr /> */}
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
