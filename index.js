require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8001;
const urlRoutes = require('./routes/url');
const connectDB = require('./connect');
const URL=require('./models/url');

app.use(express.json()); // <-- added so req.body is populated
app.use("/url", urlRoutes);
app.get("/:shortId", async(req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({shortId,}, {
        $push: { visitHistory: { timestamp: Date.now() } }
    });
    if (entry) {
        return res.redirect(entry.redirectURL);
    }   

    res.send("Welcome to URL Shortener Service");
});

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/url_shortner';
connectDB(MONGO_URI)
  .then(() => console.log("Mongodb connected"))
  .catch(err => {
    console.error('Failed to connect to MongoDB, exiting.');
    process.exit(1);
  });

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});