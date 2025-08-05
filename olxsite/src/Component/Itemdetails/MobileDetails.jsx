import React from "react";
import '../../Style/itemsDetails.css'

export default function MobileDetails({ data, setData }) {
  return (
    <div className="mobile-details-form">
      <label>Brand:</label>
      <input
        type="text"
        placeholder="e.g., Samsung, Apple"
        value={data.brand || ""}
        onChange={(e) => setData({ ...data, brand: e.target.value })}
      />

      <label>Model:</label>
      <input
        type="text"
        placeholder="e.g., Galaxy S21, iPhone 14"
        value={data.model || ""}
        onChange={(e) => setData({ ...data, model: e.target.value })}
      />

      <label>Condition:</label>
      <select
      className="select-option"
        value={data.condition || ""}
        onChange={(e) => setData({ ...data, condition: e.target.value })}
      >
        <option value="">Select Condition</option>
        <option value="New">New</option>
        <option value="Like New">Like New</option>
        <option value="Used">Used</option>
        <option value="For Parts">For Parts</option>
      </select>

      <label>Storage Capacity:</label>
      <input
        type="text"
        placeholder="e.g., 64GB, 128GB"
        value={data.storage || ""}
        onChange={(e) => setData({ ...data, storage: e.target.value })}
      />
    </div>
  );
}
