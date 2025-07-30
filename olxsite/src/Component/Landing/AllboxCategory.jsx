import React from "react";
import "../../Style/Landing-css/AllboxCategory.css";
import { FaMobileAlt, FaLaptop, FaCar, FaMotorcycle, FaCouch, FaTshirt, FaDog, FaBuilding, FaFlag } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = [
    {
      title: "Marketplace",
      items: [
        { icon: <FaMobileAlt />, name: "Mobiles" },
        { icon: <FaLaptop />, name: "Laptops" },
        { icon: <FaCouch />, name: "Furniture" },
        { icon: <FaTshirt />, name: "Fashion" },
        { icon: <FaDog />, name: "Pets" },
      ],
    },
    {
      title: "Vehicles",
      items: [
        { icon: <FaCar />, name: "Cars" },
        { icon: <FaMotorcycle />, name: "Bikes" },
        { icon: <FaTruck />, name: "Commercial" },
      ],
    },
    {
      title: "Real Estate",
      items: [
        { icon: <FaBuilding />, name: "For Sale" },
        { icon: <FaFlag />, name: "For Rent" },
      ],
    },
  ];

  return (
    <div className="Allcategories-container">
      <h2 className="main-heading">Browse by Category</h2>
      <div className="Allcategories-wrapper">
        {categories.map((category, index) => (
          <div key={index} className="Allcategory-section">
            <h3 className="Allcategory-title">{category.title}</h3>
            <div className="Allcategory-grid">
              {category.items.map((item, i) => (
     <Link to={`/category/${item.name}`} className="Allcategory-card" key={i}>
  <div className="icon">{item.icon}</div>
  <p>{item.name}</p>
</Link>

              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
