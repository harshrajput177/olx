import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Component/Navbar";
import Home from "./Pages/LandingPages/LandingPages";
import CategoryProducts from "./Component/ProductPlateform/MarketPlace";
import ScrollToTop from "./Component/Scrolltop/Scrolltop";
import SearchResults from "./Component/Landing/SearchProuctResult";
import ProductDetails from "./Component/ViewProduct/Viewproduct";
import WishlistPage from "./Component/Show_wishlist/Showlist";
import YourListings from "./Component/Show_wishlist/UserListing";
import PricingCards from "./Component/Premiumplane/PriceCards";
import Footer from "./Component/Footer";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-wrapper">
        <NavBar />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:mainCategory" element={<CategoryProducts />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/Wishlist" element={<WishlistPage />} />
            <Route path="/ourlisting" element={<YourListings />} />
            <Route path="/Premium" element={<PricingCards />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};


export default App;

