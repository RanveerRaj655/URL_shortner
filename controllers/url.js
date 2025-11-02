const shortId = require('shortid');
const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res) {
  try {
    const body = req.body;
    if (!body || !body.url) {
      return res.status(400).json({ error: 'URL is required' });
    }
    const shortID = shortId.generate();
    const doc = await URL.create({
      redirectURL: body.url,
      shortId: shortID,
      visitHistory: []
    });
    return res.status(201).json({ shortId: shortID, redirectURL: doc.redirectURL });
  } catch (err) {
    console.error('Error creating short URL:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function handleGetAnalytics(req, res) {
  try {
    const shortID = req.params.shortId;
    const result = await URL.findOne({ shortId: shortID });
    if (!result) {
      return res.status(404).json({ error: "Short URL not found" });
    }
    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory
    });
  } catch (err) {
    console.error('Error fetching analytics:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { handleGenerateNewShortURL, handleGetAnalytics };