const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const AuthMo = require("./routes/authM");

const PORT = process.env.PORT || 5500;
require("dotenv").config();

mongoose
  .connect(
    "mongodb+srv://mynodejs:Aloy1705@mynodeproject.hwo6h.mongodb.net/client"
  )
  .then(() => console.log("Connected to MongoDb"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRoutes);
app.use("/api", AuthMo);

app.get("/", (req, res) => {
  res.send("<h2>Hello Welcome!</h2>");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
