const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// POST endpoint for ESP32
app.post("/insert", async (req, res) => {
  try {
    const { temperature, humidity, rain, ldr } = req.body;

    if (!temperature || !humidity) {
      return res.status(400).send("Missing parameters");
    }

    // URL of your InfinityFree insert.php
    const targetURL = "https://your-infinityfree-site.infinityfreeapp.com/insert.php";

    // Forward data to InfinityFree
    const response = await axios.post(
      targetURL,
      new URLSearchParams({
        temperature,
        humidity,
        rain,
        ldr,
      })
    );

    return res.status(200).send("✅ Forwarded to InfinityFree: " + response.data);
  } catch (err) {
    console.error("❌ Error forwarding:", err.message);
    return res.status(500).send("❌ Failed to forward data: " + err.message);
  }
});

app.get("/", (req, res) => {
  res.send("🌱 ESP32 Proxy API running on Render!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
