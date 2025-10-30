const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

// === Root route just to test Render deployment ===
app.get("/", (req, res) => {
  res.send("🌱 ESP32 Proxy API running on Render!");
});

// === Proxy endpoint ===
// ESP32 will POST here, and this will forward to your InfinityFree PHP endpoint
app.post("/insert", async (req, res) => {
  try {
    const { temperature, humidity, soilMoisture, rainfall } = req.body;

    // Replace with your InfinityFree PHP API URL
    const phpURL = "https://your-infinityfree-site.com/insert.php";

    const response = await axios.post(phpURL, {
      temperature,
      humidity,
      soilMoisture,
      rainfall,
    });

    res.json({
      status: "ok",
      message: "Data forwarded successfully!",
      response: response.data,
    });
  } catch (err) {
    console.error("Proxy Error:", err.message);
    res.status(500).json({ status: "error", error: err.message });
  }
});

// === Start server ===
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
