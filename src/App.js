import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./CommonJquery/ScrollToTop";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Home from "./Components/Home";
import Venue from "./Components/Venue";
import GetHelp from "./Components/GetHelp";
import AboutUs from "./Components/Aboutus";
import RegisterMyVenue from "./Components/RegisterMyVenue";
import DetailedVenue from "./Components/DetailedVenue";
import Blog from "./Components/Blog";
import ProfilePage from "./Components/ProfilePage";
import OnBoarding from "./Components/OnBoarding";
import Blog2 from "./Components/Blog2";
import TermsOfuse from "./Components/TermsOfuse";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import PageNotFound from "./Components/404.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-image-lightbox/style.css";
import {
  server_post_data,
  get_seo_data_website,
} from "./ServiceConnection/serviceconnection.js";
function App() {
  const [SEOloop, setSEOloop] = useState([]);
  const match_and_return_seo_link_and_page = (
    call_function_name,
    pretty_function_name,
    dynamic_title_ss,
    favicon_sss
  ) => {
    let data_seo_link_final = "";

    if (call_function_name === "/") {
      data_seo_link_final = pretty_function_name + "~@~1";
    } else if (call_function_name === "/getHelp") {
      data_seo_link_final = pretty_function_name + "~@~2";
    } else if (call_function_name === "/registerMyVenue") {
      data_seo_link_final = pretty_function_name + "~@~3";
    } else if (call_function_name === "/aboutUs") {
      data_seo_link_final = pretty_function_name + "~@~4";
    } else if (call_function_name === "/termsOfUse") {
      data_seo_link_final = pretty_function_name + "~@~5";
    } else if (call_function_name === "/privacyPolicy") {
      data_seo_link_final = pretty_function_name + "~@~6";
    } else if (call_function_name === "/profile") {
      data_seo_link_final = pretty_function_name + "~@~7";
    } else if (call_function_name === "/onBoarding") {
      data_seo_link_final = pretty_function_name + "~@~8";
    } else if (call_function_name === "/blogs") {
      data_seo_link_final = pretty_function_name + "~@~9";
    } else if (call_function_name.includes("blog/blog_detail")) {
      data_seo_link_final = pretty_function_name + "~@~10";
    } else if (call_function_name.includes("restro/catagory_detail")) {
      data_seo_link_final = pretty_function_name + "~@~11";
    } else if (call_function_name.includes("restro/restro_detail")) {
      data_seo_link_final = pretty_function_name + "~@~12";
    }
    return data_seo_link_final;
  };

  const get_page_name = (page_number) => {
    let data_seo_link_final = "";

    if (page_number === "1") {
      data_seo_link_final = <Home />;
    } else if (page_number === "2") {
      data_seo_link_final = <GetHelp />;
    } else if (page_number === "3") {
      data_seo_link_final = <RegisterMyVenue />;
    } else if (page_number === "4") {
      data_seo_link_final = <AboutUs />;
    } else if (page_number === "5") {
      data_seo_link_final = <TermsOfuse />;
    } else if (page_number === "6") {
      data_seo_link_final = <PrivacyPolicy />;
    } else if (page_number === "7") {
      data_seo_link_final = <ProfilePage />;
    } else if (page_number === "8") {
      data_seo_link_final = <OnBoarding />;
    } else if (page_number === "90") {
      data_seo_link_final = <Blog />;
    } else if (page_number === "10") {
      data_seo_link_final = <Blog2 />;
    } else if (page_number === "11") {
      data_seo_link_final = <Venue />;
    } else if (page_number === "12") {
      data_seo_link_final = <DetailedVenue />;
    }

    return data_seo_link_final;
  };

  const handleFetchData = async () => {
    await server_post_data(get_seo_data_website, null)
      .then((Response) => {
        if (!Response.data.error) {
          setSEOloop(Response.data.message.seo_loop);
        }
      })
      .catch((error) => {});
  };

  useEffect(() => {
    handleFetchData();
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="getHelp" element={<GetHelp />} />
          <Route path="registerMyVenue" element={<RegisterMyVenue />} />
          <Route path="aboutUs" element={<AboutUs />} />
          <Route path="termsOfUse" element={<TermsOfuse />} />
          <Route path="privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="onBoarding" element={<OnBoarding />} />

          <Route path="blogs" element={<Blog />} />
          <Route path="restro/catagory_detail/:id" element={<Venue />} />
          <Route path="restro/restro_detail/:id" element={<DetailedVenue />} />
          <Route path="blog/blog_detail/:id" element={<Blog2 />} />

          {SEOloop.map((data, index) => {
            const for_loop_come = match_and_return_seo_link_and_page(
              data.call_function_name,
              data.pretty_function_name,
              data.title,
              data.favicon
            );
            const stringArray = for_loop_come.split("~@~");

            return (
              <Route
                key={index}
                path={stringArray[0]}
                element={get_page_name(stringArray[1])}
              />
            );
          })}

          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}
/**
 * OnBoarding.js
 * SearchBar.js
 * Venue.js
 */
export default App;
