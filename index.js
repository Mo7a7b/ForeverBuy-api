const express = require("express");
const cors = require("cors");
const hpp = require("hpp");
const xss = require("xss-clean");
const mongoose = require("mongoose");
const helmet = require("helmet");
const ClothesRouter = require("./routes/Clothes");
const UserRouter = require("./routes/Users");
const OrderRouter = require("./routes/Orders");
const path = require("path")
const { swaggerUi, swaggerSpec } = require("./swagger")
const app = express();
const port = parseInt(process.env.PORT,10)||3000;
require("dotenv").config()
mongoose.connect(
  "mongodb+srv://mohab:Abc*24681@cluster0.nulgu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);
app.use(express.json());
app.use(express.static(path.join(__dirname,'images')))
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(xss());
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec))
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/", ClothesRouter);
app.use("/", UserRouter);
app.use("/", OrderRouter)
// mohab Abc*24681
app.listen(port, () => {
  console.log(`ForeverBuy app listening on port ${port}`);
});
