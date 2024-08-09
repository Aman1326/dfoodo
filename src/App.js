import "./App.css";
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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="getHelp" element={<GetHelp />} />
          <Route path="aboutUs" element={<AboutUs />} />
          <Route path="registerMyVenue" element={<RegisterMyVenue />} />
          <Route path="blogs" element={<Blog />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="onBoarding" element={<OnBoarding />} />
          <Route path="termsOfUse" element={<TermsOfuse />} />
          <Route path="privacyPolicy" element={<PrivacyPolicy />} />

          <Route path="restro/catagory_detail/:id" element={<Venue />} />
          <Route path="restro/restro_detail/:id" element={<DetailedVenue />} />
          <Route path="blog/blog_detail/:id" element={<Blog2 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
/**
 * OnBoarding.js
 * ProfilePage.js
 * SearchBar.js
 * Venue.js
 */
export default App;
