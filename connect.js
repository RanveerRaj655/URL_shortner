const mongoose = require('mongoose');
mongoose.set("strictQuery", true);

async function connectDB(uri = 'mongodb://localhost:27017/url_shortner') {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

module.exports = connectDB;