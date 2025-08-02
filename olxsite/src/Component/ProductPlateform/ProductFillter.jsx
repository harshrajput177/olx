import React, { useState } from "react";
import "../../Style/MarketPLace.css";

export default function Filters({ onFilter, dynamicFields = [] }) {
  const [location, setLocation] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [extras, setExtras] = useState({});

  const handleChange = (key, val) => {
    setExtras({ ...extras, [key]: val });
  };

  const applyFilters = () => {
    onFilter({ location, min, max, ...extras });
  };

  const reset = () => {
    setLocation("");
    setMin("");
    setMax("");
    setExtras({});
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

      {/* Dynamic Filter Fields */}
      {dynamicFields.map((field) => (
        <div key={field}>
          <label>{field}</label>
          <input
            placeholder={field}
            value={extras[field] || ""}
            onChange={(e) => handleChange(field, e.target.value)}
          />
        </div>
      ))}

      <button onClick={applyFilters} className="apply">Apply Filters</button>
      <button onClick={reset} className="reset">Reset</button>
    </div>
  );
}
