const express = require("express");
const cors = require("cors");
const app = express();

const authRoutes = require("./routes/auth");

const PORT = process.env.PORT || 5500;
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("<h2>Hello Welcome!</h2>");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
