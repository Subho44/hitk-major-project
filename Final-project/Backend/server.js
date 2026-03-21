const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectdb = require("./config/db");
const authroutes = require("./routes/authRoutes");
const productroutes = require("./routes/productroutes");
const orderroutes = require("./routes/orderRoutes");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectdb();

app.use("/api/auth", authroutes);
app.use("/api/pro",productroutes);
app.use("/api/orders",orderroutes)

app.get("/", (req, res) => {
  res.send("api is working");
});

const port = process.env.PORT || 5600;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});