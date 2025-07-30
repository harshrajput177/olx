import "../Style/Navbar.css";
import React, { useState } from "react";
import VehicleDetails from "./Itemdetails/VehicleDetails";
import RealEstateDetails from "./Itemdetails/RealEstateDetails";
import MobileDetails from "./Itemdetails/MobileDetails";
import FashionFormSelector from "./Itemdetails/FashionFormSelector";

export default function SellModal({ onClose, onSubmit }) {
const [sellerName, setSellerName] = useState("");
const [productName, setProductName] = useState("");
const [mainCategory, setMainCategory] = useState("Marketplace");
const [subCategory, setSubCategory] = useState("Cooler");
const [price, setPrice] = useState("");
const [description, setDescription] = useState("");
const [type, setType] = useState("For Sell");
const [imageFile, setImageFile] = useState(null);
const [imagePreview, setImagePreview] = useState(null);
const [location, setLocation] = useState("");

const [vehicleData, setVehicleData] = useState({ brand: "", model: "", year: "", kmDriven: "" });
const [realEstateData, setRealEstateData] = useState({ bedrooms: "", bathrooms: "", furnishing: "", area: "" });
const [mobileData, setMobileData] = useState({ brand: "", model: "", ram: "", storage: "", warranty: "" });

const [fashionType, setFashionType] = useState("Men");
const [fashionData, setFashionData] = useState({}); // ✅ Add this line


  const categoryMap = {
    Marketplace: ["Cooler", "Mobiles", "Fan", "Laptops", "Furniture", "Fashion"],
    Vehicle: ["Cars", "Bikes", "Bicycle", "Truck"],
    "Real Estate": ["For Sell", "For Rent"],
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setImageFile(files);
    setImagePreview(URL.createObjectURL(files[0]));
  };

  const handleMainCategoryChange = (e) => {
    const selected = e.target.value;
    setMainCategory(selected);
    setSubCategory(categoryMap[selected][0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productName || !price) return alert("Please fill Product Name and Price.");

    const formData = new FormData();
    formData.append("sellerName", sellerName);
    formData.append("productName", productName);
    formData.append("mainCategory", mainCategory);
    formData.append("subCategory", subCategory);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("location", location);
    if (mainCategory === "Vehicle" || mainCategory === "Real Estate") formData.append("type", type);
    if (imageFile?.length > 0) imageFile.forEach((img) => formData.append("images", img));

    if (["Cars", "Bikes", "Truck", "Bicycle"].includes(subCategory)) {
      Object.entries(vehicleData).forEach(([key, val]) => formData.append(key, val));
    }
    if (["For Sell", "For Rent"].includes(subCategory)) {
      Object.entries(realEstateData).forEach(([key, val]) => formData.append(key, val));
    }
    if (mainCategory === "Marketplace" && subCategory === "Mobiles") {
      Object.entries(mobileData).forEach(([key, val]) => formData.append(key, val));
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/products/create", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert("Product listed successfully!");
        onSubmit?.(formData);
        onClose();
      } else alert(`Error: ${result.message || "Something went wrong!"}`);
    } catch (err) {
      alert("Failed to post data. Server error!");
      console.error(err);
    }
  };

  return (
    <div className="mp-modal-backdrop" onClick={onClose}>
      <div className="mp-modal" role="dialog" onClick={(e) => e.stopPropagation()}>
        <header className="mp-modal-header">
          <h2>List a Product</h2>
          <button className="mp-modal-close" onClick={onClose}>×</button>
        </header>

        <form className="mp-sell-form" onSubmit={handleSubmit}>
          <div className="mp-form-row">
            <label>Seller Name</label>
            <input type="text" value={sellerName} onChange={(e) => setSellerName(e.target.value)} required />
          </div>

          <div className="mp-form-row">
            <label>Product Name</label>
            <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required />
          </div>

          <div className="mp-form-row">
            <label>Main Category</label>
            <select value={mainCategory} onChange={handleMainCategoryChange} required>
              {Object.keys(categoryMap).map((key) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </div>

          <div className="mp-form-row">
            <label>Subcategory</label>
            <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} required>
              {categoryMap[mainCategory].map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="mp-form-row">
            <label>Location</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
          </div>

          <div className="mp-form-row">
            <label>Price (₹)</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>

          <div className="mp-form-row">
            <label>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>

          {["Cars", "Bikes", "Truck", "Bicycle"].includes(subCategory) && (
            <VehicleDetails data={vehicleData} setData={setVehicleData} />
          )}

          {["For Sell", "For Rent"].includes(subCategory) && (
            <RealEstateDetails data={realEstateData} setData={setRealEstateData} />
          )}

          {mainCategory === "Marketplace" && subCategory === "Mobiles" && (
            <MobileDetails data={mobileData} setData={setMobileData} />
          )}

          {mainCategory === "Marketplace" && subCategory === "Fashion" && (
                  <FashionFormSelector
               fashionType={fashionType}
               setFashionType={setFashionType}
               data={fashionData}
               setData={setFashionData}
             />

          )}

          <div className="mp-form-row">
            <label>Upload Images</label>
            <input type="file" multiple accept="image/*" onChange={handleImageChange} />
          </div>

          <div className="mp-form-row">
            <button type="submit" className="mp-submit-btn">Post Ad</button>
          </div>
        </form>
      </div>
    </div>
  );
}
