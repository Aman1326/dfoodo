// import React, { useState } from "react";
// import downArrow from "../Assets/downArrow.svg";
// import searchIcon from "../Assets/searchIcon.svg";
// import locationIcon from "../Assets/locationIcon.svg";
// import Select from "react-select";
// import "./Css/SearchBar.css";
// import line from "../Assets/line.svg";
// const SearchBar = () => {
//   const locations = [
//     { value: "Use my location", label: "Use my Location" },
//     { value: "Chennai", label: "Chennai" },
//     { value: "Pune", label: "Pune" },
//     { value: "Mumbai", label: "Mumbai" },
//     { value: "Kolkata", label: "Kolkata" },
//     { value: "Jaipur", label: "Jaipur" },
//     { value: "Bhopal", label: "Bhopal" },
//     // Add more locations as needed
//   ];
//   const [selectedLocation, setSelectedLocation] = useState(null);

//   const customStyles = {
//     control: (provided) => ({
//       ...provided,
//       color: "var(--text-grey)",
//       fontSize: "14px",
//       border: "none",
//       boxShadow: "none",
//       minHeight: "initial",
//       width: "max-content",
//       height: "38px",
//     }),
//     dropdownIndicator: (provided) => ({
//       ...provided,
//       padding: "1",
//       cursor: "pointer",
//     }),
//     indicatorSeparator: () => ({
//       display: "none",
//     }),
//     menu: (provided) => ({
//       ...provided,
//       zIndex: 9999,
//       borderRadius: "8px",
//       width: "max-content",
//     }),
//     option: (provided, state) => ({
//       ...provided,
//       backgroundColor: state.isSelected
//         ? "var(--primary-color)"
//         : state.isFocused
//         ? "#f2f2f2"
//         : "white",
//       color: state.isSelected ? "white" : "black",
//       padding: "8px 30px",
//       cursor: "pointer",
//     }),
//     menuList: (provided) => ({
//       ...provided,
//       padding: "0",
//       width: "fit-content",
//       border: "none",
//       borderRadius: "8px",
//       color: "var(--text-grey)",
//       fontSize: "15px",
//     }),
//   };

//   const handleLocationChange = (selectedOption) => {
//     setSelectedLocation(selectedOption);
//     console.log(`Selected location: ${selectedOption.label}`);
//   };
//   return (
//     <>
//       <div className="searchBar_wrapper">
//         <div className="searchBar_container">
//           <div className="locationSection_searchbar">
//             <img src={locationIcon} alt="loaction" />
//             <Select
//               id="selectLocation"
//               options={locations}
//               onChange={handleLocationChange}
//               placeholder="Location"
//               styles={customStyles}
//             />
//             <img src={line} alt="line" />
//           </div>
//           <div className="seachVenue_section_searchbar">
//             <img src={searchIcon} alt="search icon" />
//             <input placeholder="Search for Venue, events" />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SearchBar;
