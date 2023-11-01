const express = require("express");
const mongoose = require("mongoose");

const Category = require("../models/category.model");

const categoriesData = require("../Data/categories");

const router = express.Router();

router.route("/addCategories").post(async (req, res) => {
  try {
    await Category.deleteMany();
    const categories = await Category.insertMany(categoriesData.data);
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
