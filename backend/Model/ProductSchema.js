const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    sellerName: { type: String },
    productName: { type: String, required: true },
    mainCategory: { type: String, required: true },
    subCategory: { type: String },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    description: { type: String },

    images: [String],

    // Common for Mobile & Vehicle
    brand: { type: String },
    model: { type: String },

    // For Vehicle
    year: { type: Number },
    kmDriven: { type: Number },

    // For Mobile
    condition: { type: String }, 
    storage: { type: String },

    // For Real Estate
    bedrooms: { type: Number },
    bathrooms: { type: Number },
    furnishing: { type: String },
    area: { type: String },

    // For Fashion
    fashionType: { type: String },
    productType: { type: String },
    size: { type: String },
    material: { type: String }, 
    ageGroup: { type: String }, 
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);

