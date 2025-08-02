import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // 👈 to get mainCategory from URL
import Filters from "../ProductPlateform/ProductFillter";
import ProductCard from "../ProductPlateform/Productcard";
import "../../Style/MarketPLace.css";
import { Link } from "react-router-dom";


const filterFields = {
  Bikes: ["brand", "model", "year", "kmDriven"],
  Cars: ["brand", "model", "year", "kmDriven"],
  Mobiles: ["brand", "model", "ram", "storage"],
  "For Sell": ["bedrooms", "bathrooms", "furnishing", "area"],
  "For Rent": ["bedrooms", "bathrooms", "furnishing", "area"],
};


const CategoryProducts = () => {
  const { mainCategory } = useParams(); // 👈 /category/:mainCategory
  const [allProducts, setAllProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const dynamicFields = filterFields[mainCategory] || [];

  useEffect(() => {
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

    fetchProducts();
  }, [mainCategory]);

  const handleFilter = (filters) => {
    let result = [...allProducts];

    if (filters.location)
      result = result.filter((p) =>
        p.location.toLowerCase().includes(filters.location.toLowerCase())
      );

    if (filters.min) result = result.filter((p) => p.price >= parseInt(filters.min));
    if (filters.max) result = result.filter((p) => p.price <= parseInt(filters.max));

    // Apply dynamic filters
    for (const key of dynamicFields) {
      if (filters[key]) {
        result = result.filter((p) =>
          (p[key] || "").toString().toLowerCase().includes(filters[key].toLowerCase())
        );
      }
    }

    setFiltered(result);
  };

  return (
    <div className="app-container">
      <Filters onFilter={handleFilter} dynamicFields={dynamicFields} />
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