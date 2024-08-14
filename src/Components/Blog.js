import React, { useState, useEffect } from "react";
import "./Css/Blog.css";
import Footer from "./Footer";
import Header from "./Header";
import { Link } from "react-router-dom";
import {
  server_post_data,
  get_blog_data_website,
} from "../ServiceConnection/serviceconnection";
import {
  handleLinkClick,
  inputdateformateChange,
} from "../CommonJquery/CommonJquery";
const Blog = () => {
  const [showLoaderAdmin, setshowLoaderAdmin] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Adjust as needed
  const [blogs, setBlogs] = useState([]);
  const [SEOloop, setSEOloop] = useState([]);

  const match_and_return_seo_link = (v_id) => {
    let data_seo_link_final = "/blog/blog_detail/" + v_id;
    let data_seo_link = data_seo_link_final;
    if (SEOloop) {
      const matchedItem = SEOloop.find((data) => {
        return data_seo_link === data.call_function_name;
      });

      if (matchedItem) {
        data_seo_link_final = matchedItem.pretty_function_name;
      }
    }
    return data_seo_link_final;
  };

  const master_data_get = async () => {
    setshowLoaderAdmin(true);
    const fd = new FormData();
    await server_post_data(get_blog_data_website, fd)
      .then((Response) => {
        if (Response.data.error) {
          alert(Response.data.message);
        } else {
          setBlogs(Response.data.message.blog_list);
          setSEOloop(Response.data.message.seo_loop);
        }
        setshowLoaderAdmin(false);
      })
      .catch((error) => {
        setshowLoaderAdmin(false);
      });
  };

  useEffect(() => {
    master_data_get();
  }, []);

  // Logic to calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = blogs && blogs.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <Header />

      <section className="section_wrapper_blog">
        <div className="blog-background">
          <div className="blog-overlay">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8 blog_content">
                  <h1>Read blogs</h1>
                  <p>
                    Component variant main layer. Ipsum distribute layout invite
                    background auto underline selection text. Stroke slice flows
                    edit underline. Blur auto style plugin select arrow layout
                    create subtract. Scale content align duplicate font flows
                    team. Arrow image underline arrow pen background arrow.
                    Component line pen slice bold style shadow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container-lg">
          <div className="blogHeading">
            {" "}
            <h3>Read more logo posts on our blog</h3>
          </div>
        </div>
        <div className="container-lg">
          <div className="blog_wrapper">
            <div className="col-lg-10 m-auto">
              <div className="row m-0">
                {currentItems &&
                  currentItems.map((card, index) => (
                    <div className="col-md-4 col-sm-6 mb-3" key={index}>
                      <Link
                        onClick={() =>
                          handleLinkClick(
                            match_and_return_seo_link(card.primary_id)
                          )
                        }
                        style={{
                          textDecoration: "none",
                        }}
                      >
                        <div className="card blog_content_section h-100">
                          <img src={card.image_name} alt="Blog" />
                          <div className="card-body ">
                            <h5>{card.title_name}</h5>
                            <p className="mb-4">{card.tag_line}</p>
                            <div className="blog_text_author">
                              <small className="text-muted">
                                By {card.author}
                              </small>
                              <small>|</small>
                              <small className="text-muted">
                                {inputdateformateChange(card.entry_date)}
                              </small>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
            {/* Pagination controls */}
            <div className="d-flex justify-content-center  paginationBlogs">
              <nav>
                <ul className="pagination">
                  {Array.from({
                    length: Math.ceil(blogs.length / itemsPerPage),
                  }).map((_, index) => (
                    <li
                      key={index}
                      className={`page-item ${
                        currentPage === index + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        onClick={() => paginate(index + 1)}
                        className={`page-link pagination-btn ${
                          currentPage === index + 1
                            ? "pagination-btn-orange"
                            : ""
                        }`}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Blog;
