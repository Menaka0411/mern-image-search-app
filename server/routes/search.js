const express = require('express');
const router = express.Router();
const Search = require('../models/Search');
const { searchUnsplash } = require('../utils/unsplash');

function ensureAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({ message: 'Not authenticated' });
}

router.post('/search', ensureAuth, async (req, res) => {
  const { term } = req.body;
  if (!term) return res.status(400).json({ message: "term required" });

  try {
    const existing = await Search.findOne({ userId: req.user._id, term });

    if (existing) {
      existing.timestamp = new Date();
      await existing.save();
    } else {
      await Search.create({ userId: req.user._id, term, timestamp: new Date() });
    }

    const unsplashRes = await searchUnsplash(term, 24);
    const results = (unsplashRes.results || []).map(img => ({
      id: img.id,
      thumb: img.urls.thumb,
      small: img.urls.small,
      regular: img.urls.regular,
      alt: img.alt_description,
      user: img.user?.name
    }));

    res.json({ term, results });
  } catch (err) {
    console.error("Search save error:", err);
    res.status(500).json({ message: "Unsplash error" });
  }
});


router.get('/history', ensureAuth, async (req, res) => {
  const entries = await Search.find({ userId: req.user._id })
    .sort({ timestamp: -1 })
    .limit(5);

  res.json({ history: entries });
});

router.delete("/history/:id", ensureAuth, async (req, res) => {
  try {
    await Search.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id, 
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Delete History Error:", err);
    res.status(500).json({ message: "Failed to delete history" });
  }
});

router.get('/top-searches', async (req, res) => {
  try {
    const agg = await Search.aggregate([
      { $group: { _id: "$term", count: { $sum: 1 } } },
      { $match: { count: { $gte: 5 } } },
      { $sort: { count: -1 } },
      { $limit: 3 }
    ]);
    res.json({ top: agg.map(a => ({ term: a._id, count: a.count })) });
  } catch (err) {
    console.error("Top Searches Error:", err);
    res.status(500).json({ message: "Failed to load top searches" });
  }
});

module.exports = router;
