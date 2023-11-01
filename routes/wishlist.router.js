const express = require("express");

const verifyuser = require("../middlewares/verifyuser");

const router = express.Router();

const {
  addWishlist,
  deleteWishlist,
  getWishlists,
} = require("../controllers/wishlistController");

router.route("/addWishlist").post(addWishlist);

router.route("/wishlist/:id").delete(verifyuser, deleteWishlist);

router.route("/wishlists").get(getWishlists);

module.exports = router;
