import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import {
  server_post_data,
  blog_details_website,
} from "../ServiceConnection/serviceconnection";
import { inputdateformateChange } from "../CommonJquery/CommonJquery";
import { useLocation } from "react-router-dom";
import DOMPurify from "dompurify";
import DownloadApp from "./DownloadApp";
import "./Css/Blog2.css";

const Blog2 = () => {
  const location = useLocation();
  const currentUrl = location.pathname.substring(1);
  const [showLoaderAdmin, setshowLoaderAdmin] = useState(false);
  const [blogs, setBlogs] = useState(false);
  const master_data_get = async () => {
    setshowLoaderAdmin(true);
    const fd = new FormData();
    fd.append("current_url", "/" + currentUrl);

    await server_post_data(blog_details_website, fd)
      .then((Response) => {
        console.log(Response.data.message);
        if (Response.data.error) {
          alert(Response.data.message);
        } else {
          setBlogs(Response.data.message.data_blog[0]);
        }
        setshowLoaderAdmin(false);
      })
      .catch((error) => {
        // setshowLoaderAdmin(false);
        console.log(error);
      });
  };

  useEffect(() => {
    master_data_get();
  }, []);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    // Initial check
    setIsMobile(mediaQuery.matches);

    // Event listener for changes in media query
    const handleChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add listener
    mediaQuery.addListener(handleChange);

    // Clean up
    return () => {
      mediaQuery.removeListener(handleChange);
    };
  }, []);

  return (
    <>
      <Header />
      <div className="blog2_section">
        <div className="container">
          <div className="row blog2_section_heading headingMargin">
            <h1>{blogs.title_name}</h1>
          </div>
          <div className="blog_heading_name_date">
            <p>{blogs.author}</p>
            <p>|</p>
            <p>{inputdateformateChange(blogs.entry_date)}</p>
          </div>
          <div className="main_picture_blog2 m-auto">
            {isMobile ? (
              <img src={blogs.image_mobile} alt="img1" />
            ) : (
              <img src={blogs.image_name} alt="img1" />
            )}
          </div>

          <div className="col-md-10 m-auto">
            <div className="mt-5" style={{ textAlign: "justify" }}>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(blogs.description),
                }}
              />
            </div>
            <div className="col-lg-3 mt-5">
              <p className="writterBy">Written By:</p>
              <h5>{blogs.author}</h5>
              <p style={{ fontSize: "14px", color: "var(--text-grey)" }}>
                {blogs.designation}
              </p>
            </div>
          </div>
          <div className="list_your_venue_blog2Page">
            <DownloadApp />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Blog2;
