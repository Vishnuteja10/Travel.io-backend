const User = require("../models/user.model");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    console.log("req body is", req.body);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, mobile, password: hashedPassword });

    const savedUser = await user.save();

    res.status(201).json({ success: true, data: savedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { mobile, userPassword } = req.body;

    const user = await User.findOne({ mobile });

    !user &&
      res
        .status(401)
        .json({ success: false, message: "Invalid mobile number!" });

    const passwordMatch = await bcrypt.compare(userPassword, user.password);
    !passwordMatch &&
      res.status(401).json({ success: false, message: "Invalid password!" });

    const { password, ...rest } = user._doc;

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

    res.status(200).json({ success: true, data: rest, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { register, login };
