const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/registrationDB")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  sex: String,
  day: String,
  month: String,
  year: String,
  address: String
});

const User = mongoose.model("User", userSchema);

// REGISTER
app.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ message: "Registration successful" });
  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ message: "User not found" });
  }

  if (user.password !== password) {
    return res.json({ message: "Wrong password" });
  }

  res.json({ message: "Login successful 🎉" });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
