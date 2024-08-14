import React from "react";
import "./Css/AboutUs.css";
import Header from "./Header";
import image from "../Assets/aboutus.png";
import Footer from "./Footer";
import DownloadApp from "./DownloadApp";
const AboutUs = () => {
  return (
    <>
      <Header />
      
      <section className="section_wrapper_aboutus">
        <div className="about-us-background">
          <div className="about-us-overlay">
            <div className="container">
              <div className="row ">
                <div className="col-lg-8 about-us-content">
                  <h1>
                    Figma ipsum component variant main layer. Strikethrough
                    thumbnail scale.
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="heading_aboutus">
          <div className="container-lg">
            <div className="row text-section-aboutus">
              <div className="col-md-7">
                <h3>About Us</h3>
                <p>
                  Welcome to Book My Venue, your ultimate destination for
                  finding and booking the perfect venue for your events. Whether
                  you are planning a wedding, corporate event, birthday party,
                  or any special occasion, we are here to make the process
                  seamless and hassle-free. At Book My Venue, our mission is to
                  simplify the venue booking process and help you find the
                  perfect setting for your events. We believe that every event
                  deserves a unique and memorable space, and we strive to
                  connect you with venues that match your vision and
                  requirements.
                </p>
              </div>
              <div className="col-md-5 right_section_image_aboutus">
                <img src={image} alt="image" />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-lg-12">
                <p className="aboutContetn">
                  Figma ipsum component variant main layer. Flows pencil
                  overflow editor object effect distribute comment. Figma text
                  layer library arrow horizontal figjam bullet asset. Main group
                  opacity distribute object layout outline overflow layout
                  device. Group group community frame community editor follower
                  pencil team. Undo thumbnail select background component share
                  figma image invite ipsum. Reesizing ipsum strikethrough undo
                  hand comment opacity reesizing undo. Bold hand flatten move
                  follower.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="list_your_venue_aboutus">
        <DownloadApp />
      </section>
      <Footer />
    </>
  );
};

export default AboutUs;
