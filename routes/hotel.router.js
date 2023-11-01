const express = require("express");
const router = express.Router();

const { singleHotel, hotels } = require("../controllers/hotelController");

router.route("/hotels/:id").get(singleHotel);

router.route("/hotels").get(hotels);

module.exports = router;
