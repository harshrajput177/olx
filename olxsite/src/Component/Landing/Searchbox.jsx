import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearchLocation, FaSearch } from "react-icons/fa";
import "../../Style/Landing-css/LandingCom1.css";

const SearchBox = () => {
  const [location, setLocation] = useState("");
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Build query string
    const queryParams = new URLSearchParams();
    if (location) queryParams.append("location", location);
    if (keyword) queryParams.append("keyword", keyword);

    // Redirect to search results page
    navigate(`/search?${queryParams.toString()}`);
  };

  return (
    <form className="hero-search" onSubmit={handleSubmit} role="search">
      <label className="hero-search-loc-wrapper">
        <FaSearchLocation className="hero-search-icon hero-search-icon-loc" aria-hidden="true" />
        <span className="sr-only">Enter Pin Code or City</span>
        <input
          type="text"
          placeholder="Enter Pin Code or City"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="hero-search-loc-input"
          aria-label="Enter Pin Code or City"
        />
      </label>

      <span className="hero-search-divider" aria-hidden="true" />

      <label className="hero-search-keyword-wrapper">
        <FaSearch className="hero-search-icon hero-search-icon-keyword" aria-hidden="true" />
        <span className="sr-only">Search for cars, mobiles, and more</span>
        <input
          type="text"
          placeholder="Search for cars, mobiles, and more..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="hero-search-keyword-input"
          aria-label="Search for cars, mobiles, and more"
        />
      </label>

      <button type="submit" className="hero-search-btn">Search</button>
    </form>
  );
};

export default SearchBox;
