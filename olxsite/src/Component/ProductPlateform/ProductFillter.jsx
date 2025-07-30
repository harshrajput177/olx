import React, { useState } from "react";
import "../../Style/MarketPLace.css";

export default function Filters({ onFilter }) {
  const [location, setLocation] = useState("Gurugram, Haryana");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const applyFilters = () => {
    onFilter({ location, min, max });
  };

  const reset = () => {
    setLocation("");
    setMin("");
    setMax("");
    onFilter({ location: "", min: "", max: "" });
  };

  return (
    <div className="filters-container">
      <h2>Filters</h2>
      <label>Location</label>
      <input value={location} onChange={(e) => setLocation(e.target.value)} />
      <label>Price</label>
      <div className="price-inputs">
        <input placeholder="Min" value={min} onChange={(e) => setMin(e.target.value)} />
        <span>to</span>
        <input placeholder="Max" value={max} onChange={(e) => setMax(e.target.value)} />
      </div>
      <button onClick={applyFilters} className="apply">Apply Filters</button>
      <button onClick={reset} className="reset">Reset</button>
    </div>
  );
}
