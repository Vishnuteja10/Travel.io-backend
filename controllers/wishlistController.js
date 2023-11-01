const Wishlist = require("../models/wishlist.model");

const addWishlist = async (req, res) => {
  const wishlist = new Wishlist(req.body);

  try {
    const savedWishlist = await wishlist.save();
    res.status(200).json({ success: true, data: savedWishlist });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteWishlist = async (req, res) => {
  try {
    console.log("id is", req.params.id);

    const id = req.params.id;
    const query = await Wishlist.findByIdAndDelete(id);

    console.log("query is", query);
    if (query) {
      res
        .status(200)
        .json({ success: true, message: "Hotel deleted from wishlist", query });
    } else {
      res
        .status(404)
        .json({ success: false, message: "No hotel found with the id", id });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getWishlists = async (req, res) => {
  try {
    const wishlists = await Wishlist.find({});
    wishlists
      ? res.status(200).json({ success: true, data: wishlists })
      : res.status(500).json({ success: false, message: "no such data found" });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "no such data found",
    });
  }
};

module.exports = { addWishlist, deleteWishlist, getWishlists };
