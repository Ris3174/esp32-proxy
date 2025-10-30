import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import querystring from "querystring"; // ✅ To convert JSON → form data

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🌱 ESP32 Proxy API running on Render!");
});

app.post("/insert", async (req, res) => {
  try {
    const phpURL = "http://agritantra.infinityfreeapp.com/insert.php"; // ✅ your PHP endpoint

    // Convert JSON body → form data
    const formBody = querystring.stringify(req.body);

    const response = await fetch(phpURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
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
