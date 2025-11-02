const mongoose = require('mongoose');
mongoose.set("strictQuery", true);

async function connectDB(uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/url_shortner') {
    try {
        await mongoose.connect(uri, {
            family: 4, // force IPv4 to avoid ::1 issues on Windows
            serverSelectionTimeoutMS: 5000
        });
        console.log('Connected to MongoDB:', uri);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

module.exports = connectDB;