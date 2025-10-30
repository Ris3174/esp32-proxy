import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🌱 ESP32 Proxy API running on Render!");
});

app.post("/insert", async (req, res) => {
  try {
    const phpURL = "https://agritantra.infinityfreeapp.com/insert.php"; // ✅ change to your InfinityFree link
    const response = await fetch(phpURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();
    res.send(`✅ Forwarded: ${text}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Proxy error");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🌱 ESP32 Proxy running on port ${PORT}`));
