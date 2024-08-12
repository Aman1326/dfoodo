import React, { useState, useEffect } from "react";
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
import {
  server_post_data,
  get_search_bar,
  APL_LINK,
} from "../ServiceConnection/serviceconnection.js";
const SearchBar = () => {
  const generateTimeSlots = (startTime, endTime, interval) => {
    const times = [];
    let current = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);

    while (current <= end) {
      const hours = current.getHours();
      const minutes = current.getMinutes();
      const period = hours >= 12 ? "PM" : "AM";
      const formattedTime = `${hours % 12 === 0 ? 12 : hours % 12}:${
        minutes < 10 ? "0" + minutes : minutes
      } ${period}`;
      times.push({ value: formattedTime, label: formattedTime });
      current.setMinutes(current.getMinutes() + interval);
    }

    return times;
  };
  const locations = generateTimeSlots("10:30", "23:00", 30);

  const [rupees_icon_left, setrupees_icon_left] = useState("");
  const [rupees_icon_right, setrupees_icon_right] = useState([]);
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
    { value: 15, label: "15 People " },
    { value: 20, label: "20 People " },
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

  const [SEOloop, setSEOloop] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const match_and_return_seo_link = (v_id) => {
    let data_seo_link_final = "/restro/restro_detail/" + v_id;
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
  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    const newTimeout = setTimeout(() => {
      if (searchText.trim().length > 2) {
        get_all_search_data(1);
      } else {
        setisSearchActive(false);
      }
    }, 500);
    setSearchTimeout(newTimeout);
    return () => {
      if (newTimeout) {
        clearTimeout(newTimeout);
      }
    };
  }, [searchText]);

  const get_all_search_data = async (flag) => {
    let Data = new FormData();
    Data.append("search_data", searchText);
    Data.append("city_name", selectedLocation);
    Data.append("flag", flag);
    await server_post_data(get_search_bar, Data)
      .then(async (Response) => {
        console.log(Response.data.message);
        if (Response.data.error) {
          handleError(Response.data.message);
        } else {
          setSEOloop(Response.data.message.seo_loop);
          setnewproducts(Response.data.message.search_fields);
          setproductpath(APL_LINK + Response.data.message.data_admin_image);
          setrupees_icon_left(Response.data.message.rupees_icon_left);
          setrupees_icon_right(Response.data.message.rupees_icon_right);
          setisSearchActive(true);
        }
      })
      .catch((error) => {
        console.log(error);
        handleError("Something Went Wrong");
      });
  };

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
        <div className="padding04 row">
          <div className="seachVenue_section_searchbar ">
            <img src={searchIcon} alt="search icon" />
            <input
              className="form-control"
              placeholder="Location, Restaurant, or Cuisine"
              type="text"
              maxLength={30}
              onInput={handleIaphabetnumberChange}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className="drop_down_searchBar">
            {isSearchActive && (
              <div className="searchItems">
                {newproducts.map((item, index) => {
                  return (
                    <Link
                      key={index}
                      onClick={() =>
                        handleLinkClick(
                          match_and_return_seo_link(item.restaurant_id)
                        )
                      }
                    >
                      <div className="itemSearch">
                        <img
                          src={`${productpath}${item.restaurant_image}`}
                          alt={item.restaurant_name}
                        />
                        <div className="search_result_text">
                          <h6>{item.restaurant_name}</h6>
                          <p>{item.restaurant_full_adrress}</p>
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

        <div className="letsgo_button">
          <button>Let's go</button>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
