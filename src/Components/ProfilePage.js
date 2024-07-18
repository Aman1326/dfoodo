import React from "react";
import "./Css/ProfilePage.css";
import Header from "./Header";
import camera from "../Assets/camera.svg";
import message from "../Assets/messageSvg.svg";
import phone from "../Assets/phoneSvg.svg";
const ProfilePage = () => {
  return (
    <>
      <Header />
      <div className="profile_section">
        <div className="container-lg">
          <section className="header_Section_profile_page row">
            <div className="profile_picture_section">
              <div className="person_name">
                <h3>RS</h3>
                <div className="camera_icon_background">
                  {" "}
                  <img src={camera} alt="camera" />
                </div>
              </div>{" "}
              <div className="profile_name_text_section">
                <h3>Hi, person name</h3>
                <span className="d-flex g-2">
                  <img src={phone} alt="phone" />
                  <p>+91-7453786769</p>
                </span>
                <span className="d-flex g-2">
                  <img src={message} alt="phone" />
                  <p>xyz@gmail.com</p>
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
