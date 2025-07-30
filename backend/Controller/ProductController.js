const Product = require("../Model/ProductSchema");


const createProduct = async (req, res) => {
  try {
    const {
      productName,
      mainCategory,
      subCategory,
      price,
      description,
      location,
      type,
    } = req.body;

    const images = req.files ? req.files.map(file => file.filename) : [];

    const newProduct = new Product({
      seller: req.user.id,            // ✅ Connected to logged-in user
      sellerName: req.user.name,      // Optional: useful for display
      productName,
      mainCategory,
      subCategory,
      price,
      description,
      location,
      type,
      images,
    });

    await newProduct.save();

    res.status(201).json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    console.error("Product creation error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const getProducts = async (req, res) => {
  try {
    const { mainCategory, subCategory, location } = req.query;

    // Initialize dynamic filter object
    const filter = {};
  if (req.query.mainCategory) {
      filter.mainCategory = req.query.mainCategory;
    }

    if (req.query.subCategory) {
      filter.subCategory = req.query.subCategory;
    }

    if (req.query.type) {
      filter.type = req.query.type;
    }

    // Fetch products, sort by latest, and populate seller (user) details
    const products = await   Product.find(filter)
      .populate("seller", "name email") // Only select name and email from user
      .sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    console.error("Fetching products error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).populate("seller", "name email");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Fetching single product error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getSingleProduct 
};
