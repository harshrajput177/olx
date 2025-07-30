import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import ProductCard from "../ProductPlateform/Productcard";
import Filter from "../ProductPlateform/ProductFillter"; // 🧩 Make sure this path is correct
import "../../Style/MarketPLace.css";

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const query = new URLSearchParams(useLocation().search);

  const location = query.get("location");
  const mainCategory = query.get("mainCategory");
  const subCategory = query.get("subCategory");

  // 🟡 Fetch search results
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/products/get`,
          {
            params: { location, mainCategory, subCategory },
          }
        );
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching search results", error);
      }
    };

    fetchSearchResults();
  }, [location, mainCategory, subCategory]);



  return (
    <div className="search-results-container">
      <div className="serach-filter-section">
        <Filter />
      </div>

      <div className="results-section">
        <h2>Search Results</h2>
        <div className="Search-products-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <Link to={`/product/${product._id}`} key={product._id}>
                <ProductCard
                  product={product}
                />
              </Link>
            ))
          ) : (
            <p>No products found for your search.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;

