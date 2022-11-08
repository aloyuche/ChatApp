// const { connect } = require("getstream");
const bcrypt = require("bcrypt");
const User = require("../models/authModel");
const crypto = require("crypto");

const signupM = async (req, res) => {
  try {
    const { fullname, username, password, phoneNumber } = req.body;
    // const userID = crypto.randomBytes(16).toString("hex");
    password = await bcrypt.hash(password, 10);

    const userB = new User({ fullname, username, password, phoneNumber });
    await userB.save();
    console.log(userB);
    res.status(200).json({ fullname, username, password, phoneNumber });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { signupM };
