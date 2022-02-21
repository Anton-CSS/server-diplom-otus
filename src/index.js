const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./auth/AuthRouter");
const eventRouter = require("./event/eventRouter");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);
app.use("/event", eventRouter);
const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://Anton-CSS:rokunets2903@cluster0.wuhay.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    );
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};
start();
