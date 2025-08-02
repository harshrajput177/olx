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
      seller: req.user.id,            
      sellerName: req.user.name,      
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
  const { location, mainCategory, subCategory, keyword } = req.query;

  const filter = {};

  if (location) filter.location = { $regex: location, $options: "i" };
  if (mainCategory) filter.mainCategory = mainCategory;
  if (subCategory) filter.subCategory = subCategory;

  if (keyword) {
    filter.$or = [
      { productName: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
      { brand: { $regex: keyword, $options: "i" } },
    ];
  }

  try {
    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
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
