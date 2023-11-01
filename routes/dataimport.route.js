const express = require("express");
const mongoose = require("mongoose");

const Hotel = require("../models/hotel.model");

const hotelsData = require("../Data/hotels");

const router = express.Router();

router.route("/hotelData").post(async (req, res) => {
  try {
    await Hotel.remove();
    const hotelsInDb = await Hotel.insertMany(hotelsData.data);
    res.status(200).json({ success: true, data: hotelsInDb });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
