const express = require("express");

const router = express.Router();

const { Categories } = require("../controllers/categoryController");

router.route("/categories").get(Categories);

module.exports = router;
