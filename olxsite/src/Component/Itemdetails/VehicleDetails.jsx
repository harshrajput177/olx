// src/Component/SubForms/VehicleDetails.jsx
import React from "react";

export default function VehicleDetails({ data, setData }) {
  return (
    <div className="vehicle-details">
      <input
        type="text"
        placeholder="Brand"
        value={data.brand}
        onChange={(e) => setData({ ...data, brand: e.target.value })}
      />
      <input
        type="text"
        placeholder="Model"
        value={data.model}
        onChange={(e) => setData({ ...data, model: e.target.value })}
      />
      <input
        type="number"
        placeholder="Year"
        value={data.year}
        onChange={(e) => setData({ ...data, year: e.target.value })}
      />
      <input
        type="number"
        placeholder="KM Driven"
        value={data.kmDriven}
        onChange={(e) => setData({ ...data, kmDriven: e.target.value })}
      />
    </div>
  );
}
