// import express from "express";
// import multer from "multer";
// import { createProduct } from "../Controller/";

// const router = express.Router();

// // Set up multer for image upload
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

// router.post("/create", upload.single("image"), createProduct);

// export default router;


const express = require("express");
const multer = require("multer");
const path = require("path");
const { createProduct, getProducts, getSingleProduct, getUserProducts } = require("../Controller/ProductController");
const authMiddleware = require("../Middleware/Middleware");

const router = express.Router();

// Multer Storage Setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// POST route with multi-image support (max 3 images)
router.post("/create",   authMiddleware, upload.array("images", 3), createProduct);

router.get("/get",  getProducts);

router.get("/getone/:id", getSingleProduct);

router.get("/mylistings", authMiddleware, getUserProducts);

module.exports = router;
