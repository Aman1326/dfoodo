import React, { useState } from "react";
import searchIcon from "../Assets/searchIcon.svg.svg";
import locationIcon from "../Assets/locationIcon.svg";
import calendar from "../Assets/calendarSearchBar.svg";
import clock from "../Assets/clockSearchBar.svg";
import person from "../Assets/personSearchBar.svg";
import dropdown from "../Assets/downArrowBlack.svg";
import Select from "react-select";
import "./Css/SearchBar.css";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import DatePicker from "react-date-picker";
import line from "../Assets/line.svg";
import { Link, useLocation } from "react-router-dom";
import {
  handleError,
  handleIaphabetnumberChange,
  handleLinkClick,
} from "../CommonJquery/CommonJquery";
const SearchBar = () => {
  const locations = [
    { value: "2:30 PM", label: "2:30 PM" },
    { value: "3:00 PM", label: "3:00 PM" },
    { value: "3:30 PM", label: "3:30 PM" },
    { value: "4:00 PM", label: "4:00 PM" },
    { value: "4:30 PM", label: "4:30 PM" },
    { value: "5:00 PM", label: "5:00 PM" },
    { value: "6:30 PM", label: "6:30 PM" },
    // Add more locations as needed
  ];
  const [selectedLocation, setSelectedLocation] = useState(null);
  const customStyles = {
    control: (provided) => ({
      ...provided,
      fontSize: "14px",
      border: "none",
      boxShadow: "none",
      minHeight: "initial",
      width: "max-content",
      height: "38px",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "1",
      cursor: "pointer",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
      borderRadius: "8px",
      width: "max-content",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "var(--primary-color)"
        : state.isFocused
        ? "#f2f2f2"
        : "white",
      color: state.isSelected ? "white" : "black",
      padding: "8px 30px",
      cursor: "pointer",
    }),
    menuList: (provided) => ({
      ...provided,
      padding: "0",
      width: "fit-content",
      border: "none",
      borderRadius: "8px",
      color: "var(--text-grey)",
      fontSize: "15px",
    }),
  };
  const [productpath, setproductpath] = useState("");
  const handleLocationChange = (selectedOption) => {
    setSelectedLocation(selectedOption);
  };
  // date picker:
  const [date, setDate] = useState(new Date());
  const personOptions = [
    { value: 1, label: "1 People" },
    { value: 2, label: "2 People" },
    { value: 4, label: "4 People" },
    { value: 6, label: "6 People" },
    { value: 8, label: "8 People " },
    { value: 10, label: "10 People " },
    { value: 15, label: "15People " },
    { value: 20, label: "20People " },
    { value: "larger Party", label: "larger Party " },
    // Add more options as needed
  ];
  const handlePersonChange = (selectedOption) => {
    // Handle the selection change
    console.log("Selected persons:", selectedOption);
  };
  const [isSearchActive, setisSearchActive] = useState(false);
  const [newproducts, setnewproducts] = useState([]);

  const location_for_display_none = useLocation();

  return (
    <>
      <div className="searchBar_wrapper">
        <div className="searchBar_container">
          <div className="CalendarSection_searchbar">
            <img src={calendar} alt="calendar" />
            <DatePicker
              onChange={setDate}
              value={date}
              className="datepicker"
            />
            <img src={line} alt="line" className="verticle_line" />
          </div>
          <div className="locationSection_searchbar">
            <img src={clock} alt="clock" />
            <Select
              id="selectLocation"
              options={locations}
              onChange={handleLocationChange}
              placeholder="Time"
              styles={customStyles}
            />
            <img src={line} alt="line" className="verticle_line" />
          </div>
          <div className="locationSection_searchbar">
            <img src={person} alt="clock" />
            <Select
              id="selectPersons"
              options={personOptions}
              onChange={handlePersonChange}
              placeholder="People"
              styles={customStyles}
            />
          </div>
        </div>
        <div className="padding04">
          <div className="seachVenue_section_searchbar ">
            <img src={searchIcon} alt="search icon" />
            <input placeholder="Location, Restaurant, or Cuisine" />
          </div>
        </div>

        <div className="letsgo_button">
          <button>Let's go</button>
        </div>
        <div className="drop_down_searchBar">
          {isSearchActive && (
            <div className="searchItems">
              {newproducts.map((item, index) => {
                return (
                  <Link key={index}>
                    <div className="itemSearch">
                      <img
                        src={`${productpath}${item.venue_images}`}
                        alt={item.venue_name}
                      />
                      <div className="search_result_text">
                        <h6>{item.venue_name}</h6>
                        <p>{item.map_address}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
              {newproducts && newproducts.length === 0 && (
                <div className="itemSearch center_justify">
                  <div>
                    <h6>No Data Found</h6>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchBar;
