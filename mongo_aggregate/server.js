require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`DB Connetion Successfully: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
connectDB();

app.use(express.json());

const sampleaggregate = require("./routes/userdata");
app.use("/getdata", sampleaggregate);

app.listen(3000, () => console.log("Server Started"));
