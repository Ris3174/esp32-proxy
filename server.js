import express from "express";
import cors from "cors";
import querystring from "querystring";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("🌱 ESP32 Proxy API running on Render!");
});

app.post("/insert", async (req, res) => {
  try {
    const phpURL = "http://agritantra.infinityfreeapp.com/insert.php";
    const formBody = querystring.stringify(req.body);

    // ✅ Using built-in fetch from Node 18+
    const response = await fetch(phpURL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formBody,
    });

    const text = await response.text();
    res.send(`✅ Forwarded to PHP: ${text}`);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).send("❌ Proxy error: " + err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🌱 ESP32 Proxy running on port ${PORT}`));
