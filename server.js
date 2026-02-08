const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/registrationDB")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log(err));

// schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  sex: String,
  dob: {
    day: String,
    month: String,
    year: String
  },
  languages: [String],
  address: String
});

const User = mongoose.model("User", UserSchema);

// register route
app.post("/api/auth/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ message: "🎉 Registration successful" });
  } catch (err) {
    res.status(500).json({ message: "❌ Error saving data" });
  }
});

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
