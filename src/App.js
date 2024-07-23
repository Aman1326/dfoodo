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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="venue" element={<Venue />} />
          <Route path="getHelp" element={<GetHelp />} />
          <Route path="aboutUs" element={<AboutUs />} />
          <Route path="registerMyVenue" element={<RegisterMyVenue />} />
          <Route path="detailedVenue" element={<DetailedVenue />} />
          <Route path="blogs" element={<Blog />} />
          <Route path="blog/blog_detail/:id" element={<Blog2 />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="onBoarding" element={<OnBoarding />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
