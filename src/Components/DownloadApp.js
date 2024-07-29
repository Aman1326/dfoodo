import React from "react";
import "../Components/Css/DownloadApp.css";
import appStore from "../Assets/appStore.png";
import playStore from "../Assets/googlepPlay.png";
import phoneimg from "../Assets/phoenImage.png";
const DownloadApp = () => {
  return (
    <section className="download_now_section">
      <div className="container">
        <div className="phoneContainer row">
          <div className="col-lg-5 p-0 leftSection">
            <img src={phoneimg} alt="phone" />
          </div>
          <div
            className="col-lg-7 pl-0 rightSection"
            style={{ backgroundColor: "var(--orange-Color)" }}
          >
            <h3>Get the Dfoodo Dinner App</h3>
            <h3>Download now</h3>
            <span className="playStore_section">
              <img src={appStore} alt="appstore" />
              <img src={playStore} alt="appstore" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
