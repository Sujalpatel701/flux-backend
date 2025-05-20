const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const userImageRoutes = require("./routes/userImageRoutes"); // ✅ new line
const cors = require("cors");
const path = require("path");
const wallpaperRoutes = require("./routes/wallpaperRoutes");

dotenv.config();

const app = express();

connectDB();

app.use(cors({
  origin: ['http://localhost:5173', 'https://sujalpatel701.github.io'],
  credentials: true
}));


app.use(express.json());

// Serve uploads statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/profile", userImageRoutes); // ✅ new line
app.use("/api/wallpapers", wallpaperRoutes);

app.get("/", (req, res) => {
  res.send("FrameFlux API by Sujal Patel");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
