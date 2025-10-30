import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import querystring from "querystring";

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Default route
app.get("/", (req, res) => {
  res.send("🌱 ESP32 Proxy API running on Render!");
});

// Main POST route for ESP32
app.post("/insert", async (req, res) => {
  try {
    // ✅ Your InfinityFree insert.php URL
    const phpURL = "http://agritantra.infinityfreeapp.com/insert.php";

    // Convert ESP32 JSON to URL-encoded form data
    const bodyData = querystring.stringify(req.body);
    console.log("📥 Received from ESP32:", req.body);

    // Forward the request to InfinityFree
    const response = await fetch(phpURL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: bodyData,
    });

    const text = await response.text();
    console.log("📤 Response from InfinityFree:", text);

    res.status(200).send(`✅ Data forwarded to InfinityFree: ${text}`);
  } catch (err) {
    console.error("❌ Proxy Error:", err);
    res.status(500).send("Proxy failed: " + err.message);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 ESP32 Proxy running on port ${PORT}`);
});
