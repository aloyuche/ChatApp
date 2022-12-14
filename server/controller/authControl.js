const { connect } = require("getstream");
const bcrypt = require("bcrypt");
const StreamChat = require("stream-chat").StreamChat;
const crypto = require("crypto");

require("dotenv").config();
const api_key = "sk98w2xrqkjz";
const api_secret = process.env.STREAM_API_SECRET;
const api_id = process.env.STREAM_API_ID;

const signup = async (req, res) => {
  try {
    const { fullname, username, password, phoneNumber } = req.body;
    const userID = crypto.randomBytes(16).toString("hex");

    const serverClient = connect(api_key, api_secret, api_id);

    const hashedPassword = await bcrypt.hash(password, 10);

    const token = serverClient.createUserToken(userID);

    res
      .status(200)
      .json({ token, fullname, userID, username, hashedPassword, phoneNumber });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const serverClient = connect(api_key, api_id, api_secret);
    const client = StreamChat.getInstance(api_key, api_secret);

    const { user } = await client.queryUsers({ name: username });

    if (!user.length)
      return res.status(400).json({ message: "User not found" });

    const success = await bcrypt.compare(password, user[0].hashedPassword);

    const token = serverClient.createUserToken(user[0].id);

    if (success) {
      res.status(200).json({
        token,
        fullname: user[0].fullname,
        username,
        userID: user[0].id,
      });
    } else {
      res.status(500).json({ message: "Incorrect Credential" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { login, signup };
