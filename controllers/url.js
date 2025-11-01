const shortId = require('shortid');
const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res) {
    const shortID = shortId.generate(); // use generate()
    const body = req.body;
    if (!body || !body.uri) {
        return res.status(400).json({ error: "URL is required" });
    }
    await URL.create({
        redirectURL: body.uri,
        shortId: shortID,
        visitHistory: []
    });
    return res.json({ Id: shortID });
}
async function handleGetAnalytics(req, res) {
    const shortID = req.params.shortId;
    const result = await URL.findOne({ shortId: shortID });
    if (!result) {
        return res.status(404).json({ error: "Short URL not found" });
    }
    return res.json({totalClicks:result.visitHistory.length, 
        analytics: result.visitHistory});
    }

module.exports = { handleGenerateNewShortURL, handleGetAnalytics };