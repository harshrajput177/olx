import React from "react";
import CategoryNav from "./Category";
import SearchBox from "./Searchbox";
import "../../Style/Landing-css/LandingCom1.css";
import heroImg from "../../Images/hank-shake-continue-today-main-200403.webp"; // adjust path

const categoriesDefault = [
  { id: "cars", label: "Cars", icon: "🚗" },
  { id: "mobiles", label: "Mobiles", icon: "📱" },
  { id: "homes", label: "Homes", icon: "🏠" },
  { id: "sofa", label: "Furniture", icon: "🛋️" },
  { id: "bikes", label: "Bikes", icon: "🏍️" },
  { id: "pets", label: "Pets", icon: "🐶" },
];

function HeroSection({
  categories = categoriesDefault,
  onSearch = (payload) => console.log("Search:", payload),
  backgroundImage = heroImg,
  heading = "India's Marketplace",
  subheading = "Find the best deals near you",
}) {
  return (
    <header
      className="hero-section"
      style={{ backgroundImage: `url(${backgroundImage})` }}
      role="banner"
    >
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-inner">
        <CategoryNav categories={categories} />
        <h1 className="hero-heading">{heading}</h1>
        <p className="hero-subheading">{subheading}</p>
        <SearchBox onSearch={onSearch} />
      </div>
    </header>
  );
}

export default HeroSection;