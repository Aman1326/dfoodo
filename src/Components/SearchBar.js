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
const SearchBar = () => {
  const locations = [
    { value: "6:30 PM", label: "6:30 PM" },
    { value: "6:30 PM", label: "6:30 PM" },
    { value: "6:30 PM", label: "6:30 PM" },
    { value: "6:30 PM", label: "6:30 PM" },
    { value: "6:30 PM", label: "6:30 PM" },
    { value: "6:30 PM", label: "6:30 PM" },
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
  return (
    <>
      <div className="searchBar_wrapper">
        <div className="searchBar_container">
          <div className="CalendarSection_searchbar">
            <img src={calendar} alt="calendar" />
            <DatePicker onChange={setDate} value={date} />
            <img src={dropdown} alt="dropdown" />
            <img src={line} alt="line" />
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
            <img src={line} alt="line" />
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
            <img src={line} alt="line" />
          </div>
          <div className="seachVenue_section_searchbar">
            <img src={searchIcon} alt="search icon" />
            <input placeholder="Location, Restaurant, or Cuisine" />
          </div>
        </div>
        <div className="letsgo_button">
          <button>Let's go</button>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
