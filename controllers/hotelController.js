const Hotel = require("../models/hotel.model");

const singleHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findById(id);
    if (hotel) {
      res.status(200).json({ success: true, dataL: hotel });
    } else {
      res.status(404).json({ success: false, message: "no such data found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const hotels = async (req, res) => {
  const hotelcategory = req.query.category;

  try {
    if (hotelcategory) {
      const hotels = await Hotel.find({ category: hotelcategory });
      hotels
        ? res.status(200).json({ success: true, hotels })
        : res.status(404).json({ success: false, message: "no data found" });
    } else {
      const hotels = await Hotel.find({});
      hotels
        ? res.status(200).json({ success: true, hotels })
        : res.status(404).json({ success: false, message: "no data found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { singleHotel, hotels };
