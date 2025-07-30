import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; 
import {
  FaCar,
  FaMobileAlt,
  FaHome,
  FaCouch,
  FaMotorcycle,
  FaDog,
} from "react-icons/fa";
import "../../Style/Landing-css/LandingCom1.css";

const iconMap = {
  cars: FaCar,
  mobiles: FaMobileAlt,
  homes: FaHome,
  sofa: FaCouch,
  bikes: FaMotorcycle,
  pets: FaDog,
};

const CategoryNav = ({ categories }) => {
  const [active, setActive] = useState(null);
  const navigate = useNavigate(); // ✅ Hook

  const handleClick = (cat) => {
    setActive(cat.id);
    navigate(`/category/${cat.label}`); // ✅ Navigate on click
  };

  return (
    <nav className="hero-cat-nav" aria-label="Browse categories">
      <ul className="hero-cat-list">
        {categories.map((cat) => {
          const IconCmp = iconMap[cat.id];
          return (
            <li key={cat.id} className="hero-cat-item">
              <button
                type="button"
                className={"hero-cat-btn" + (active === cat.id ? " is-active" : "")}
                onClick={() => handleClick(cat)}
                aria-pressed={active === cat.id}
              >
                {IconCmp ? <IconCmp aria-hidden="true" focusable="false" /> : cat.icon || "?"}
                <span className="sr-only">{cat.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

CategoryNav.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.node,
    })
  ).isRequired,
};

export default CategoryNav;
