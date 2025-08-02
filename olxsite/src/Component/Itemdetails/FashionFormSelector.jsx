import React from "react";
import '../../Style/itemsDetails.css'

export default function FashionFormSelector({ fashionType, setFashionType, data = {}, setData }) {
  const handleFashionChange = (e) => {
    setFashionType(e.target.value);
    setData({}); // reset data when switching type
  };

  return (
    <div className="fashion-form-selector">
      <label>Fashion Type:</label>
      <select value={fashionType} onChange={handleFashionChange}>
        <option value="">Select Type</option>
        <option value="Men">Men</option>
        <option value="Women">Women</option>
        <option value="Kids">Kids</option>
      </select>

      {fashionType === "Men" && (
        <div className="fashion-men-form">
          <input
            type="text"
            placeholder="Product Type (e.g., Shirt, Jeans)"
            value={data.productType || ""}
            onChange={(e) => setData({ ...data, productType: e.target.value })}
          />
          <input
            type="text"
            placeholder="Size"
            value={data.size || ""}
            onChange={(e) => setData({ ...data, size: e.target.value })}
          />
        </div>
      )}

      {fashionType === "Women" && (
        <div className="fashion-women-form">
          <input
            type="text"
            placeholder="Product Type (e.g., Saree, Dress)"
            value={data.productType || ""}
            onChange={(e) => setData({ ...data, productType: e.target.value })}
          />
          <input
            type="text"
            placeholder="Size"
            value={data.size || ""}
            onChange={(e) => setData({ ...data, size: e.target.value })}
          />
          <input
            type="text"
            placeholder="Material (e.g., Cotton, Silk)"
            value={data.material || ""}
            onChange={(e) => setData({ ...data, material: e.target.value })}
          />
        </div>
      )}

      {fashionType === "Kids" && (
        <div className="fashion-kids-form">
          <input
            type="text"
            placeholder="Product Type (e.g., T-Shirt, Shorts)"
            value={data.productType || ""}
            onChange={(e) => setData({ ...data, productType: e.target.value })}
          />
          <input
            type="text"
            placeholder="Age Group (e.g., 2-4 years)"
            value={data.ageGroup || ""}
            onChange={(e) => setData({ ...data, ageGroup: e.target.value })}
          />
          <input
            type="text"
            placeholder="Size"
            value={data.size || ""}
            onChange={(e) => setData({ ...data, size: e.target.value })}
          />
        </div>
      )}
    </div>
  );
}
