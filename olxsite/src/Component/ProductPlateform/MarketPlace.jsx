import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // 👈 to get mainCategory from URL
import Filters from "../ProductPlateform/ProductFillter";
import ProductCard from "../ProductPlateform/Productcard";
import "../../Style/MarketPLace.css";
import { Link } from "react-router-dom";

const CategoryProducts = () => {
  const { mainCategory } = useParams(); // 👈 /category/:mainCategory
  const [allProducts, setAllProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const fetchProducts = async () => {
    try {
    const res = await axios.get(
  `${import.meta.env.VITE_API_BASE_URL}/api/products/get?subCategory=${mainCategory}`
);

      setAllProducts(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [mainCategory]); // 👈 re-fetch if mainCategory changes

  const handleFilter = ({ location, min, max }) => {
    let result = [...allProducts];
    if (location) {
      result = result.filter((p) =>
        p.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    if (min) result = result.filter((p) => p.price >= parseInt(min));
    if (max) result = result.filter((p) => p.price <= parseInt(max));
    setFiltered(result);
  };


  return (
    <div className="app-container">
      <Filters onFilter={handleFilter} />
      <div className="products-section">
        <h2>Fresh Recommendations in {mainCategory}</h2>
        
        <div className="products-grid">
          {filtered.length > 0 ? (
            filtered.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id}>
              <ProductCard product={product} />
           </Link>
            ))
          ) : (
            <p>No products found in this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;

