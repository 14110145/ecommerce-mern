require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Connect to mongodb
const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to mongodb");
  }
);

// Routes
app.use("/user", require("./routes/userRouter"));
app.use("/api", require("./routes/categoryRouter"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Sever running on port ${PORT}`);
});
