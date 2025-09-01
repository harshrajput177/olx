import React from "react";
import "../../Style/Landing-css/AllboxCategory.css";
import {
  FaMobileAlt, FaLaptop, FaCar, FaMotorcycle, FaCouch, FaTshirt, FaDog,
  FaBuilding, FaFlag, FaWrench, FaChalkboardTeacher, FaPaintBrush, FaCode,
} from "react-icons/fa";

import {
  FaBolt, FaBroom, FaBug, FaLanguage, FaTools, FaCameraRetro,
  FaVideo, FaPenFancy, FaDatabase, FaDraftingCompass, FaSpa,
  FaAirFreshener, FaUserMd, FaUserTie, FaPenNib, FaBullhorn,
  FaHandshake, FaUniversity, FaTrain, FaFileAlt, FaComments,
  FaStickyNote, FaQuestionCircle, FaUserFriends,
  FaUserCheck
} from "react-icons/fa";


import { FaPlaneDeparture, FaFilm, FaUserGraduate, FaDumbbell } from "react-icons/fa";

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
    ],
  },
    {
    title: "Partners Planning",
    items: [
      { icon: <FaPlaneDeparture />, name: "Travel Buddy" },
      { icon: <FaFilm />, name: "Movie Companion" },
      { icon: <FaUserGraduate />, name: "Study Partner" },
      { icon: <FaDumbbell />, name: "Gym/Sport Partner" },
    ],
  },
    {
    title: "Tech Skills",
    items: [
      { icon: <FaCode />, name: "Web Development" },
      { icon: <FaMobileAlt />, name: "App Development" },
      { icon: <FaDatabase />, name: "Data Science" }, // Requires import { FaDatabase }
      { icon: <FaDraftingCompass />, name: "UI/UX Design" }, // Requires import { FaDraftingCompass }
    ],
  },

  {
    title: "Home Services",
    items: [
      { icon: <FaWrench />, name: "Plumbing" },
      { icon: <FaBolt />, name: "Electrician" }, // Requires import { FaBolt }
      { icon: <FaBroom />, name: "Cleaning" }, // Requires import { FaBroom }
      { icon: <FaBug />, name: "Pest Control" }, // Requires import { FaBug }
    ],
  },


  {
    title: "Education",
    items: [
      { icon: <FaChalkboardTeacher />, name: "Home Tutors" },
      { icon: <FaLaptop />, name: "Online Coaching" },
      { icon: <FaLanguage />, name: "Language Classes" }, // Requires import { FaLanguage }
      { icon: <FaTools />, name: "Skill Development" }, // Requires import { FaTools }
    ],
  },

    {
    title: "Vehicles",
    items: [
      { icon: <FaCar />, name: "Cars" },
      { icon: <FaMotorcycle />, name: "Bikes" },
      { icon: <FaTruck />, name: "Commercial" },
      { icon: <FaMotorcycle />, name: "ByeCycle" },
    ],
  },
  {
    title: "Real Estate",
    items: [
      { icon: <FaBuilding />, name: "House For Sale" },
      { icon: <FaFlag />, name: "House For Rent" },
        { icon: <FaBuilding />, name: "Falt For Sale" },
      { icon: <FaFlag />, name: "Falt For Rent" },
    ],
  },

  {
    title: "Personal",
    items: [
      { icon: <FaDumbbell />, name: "Fitness Trainer" },
      { icon: <FaSpa />, name: "Yoga Instructor" }, // Requires import { FaSpa }
      { icon: <FaAirFreshener />, name: "Makeup Artist" }, // Requires import { FaAirFreshener }
      { icon: <FaUserMd />, name: "Counseling" }, // Requires import { FaUserMd }
    ],
  },
  {
    title: "Freelance",
    items: [
      { icon: <FaUserTie />, name: "Virtual Assistant" }, // Requires import { FaUserTie }
      { icon: <FaPenNib />, name: "Freelance Writer" }, // Requires import { FaPenNib }
      { icon: <FaBullhorn />, name: "Marketing Expert" }, // Requires import { FaBullhorn }
      { icon: <FaHandshake />, name: "Sales Consultant" }, // Requires import { FaHandshake }
    ],
  },

  {
    title: "Student to Student",
    items: [
      { icon: <FaStickyNote />, name: "Notes Sharing" }, // Requires import { FaStickyNote }
      { icon: <FaQuestionCircle />, name: "Q&A Support" }, // Requires import { FaQuestionCircle }
      { icon: <FaUserFriends />, name: "Study Groups" }, // Requires import { FaUserFriends }
      { icon: <FaUserCheck />, name: "Peer Mentoring" }, // Requires import { FaUserCheck }
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

