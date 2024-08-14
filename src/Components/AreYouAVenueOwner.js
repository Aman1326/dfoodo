import React from "react";
import { Link } from "react-router-dom";

const AreYouAVenueOwner = () => {
  return (
    <section className="areyoua_venue_owner_section">
      <div className="container">
        <div className="row">
          <div className="are_you_a_venue_owner col-lg-5 m-auto">
            <h2>Are you a restaurant owner?</h2>
            
            <h6>Register your Restaurant</h6>
            <p>
              Tell us more about you and we will contact you as soon as possible
            </p>
            <Link to="/registerMyVenue">See more information</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AreYouAVenueOwner;
