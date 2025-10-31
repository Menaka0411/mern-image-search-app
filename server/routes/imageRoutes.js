const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/random", async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://api.unsplash.com/photos/random?count=18&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    );

    const results = data.map((img) => ({
      id: img.id,
      thumb: img.urls.thumb,
      small: img.urls.small,
      regular: img.urls.regular,
      alt: img.alt_description || "Image",
      user: img.user?.name || "Unknown",
    }));

    res.json(results);
  } catch (error) {
    console.error("Unsplash Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

module.exports = router;
