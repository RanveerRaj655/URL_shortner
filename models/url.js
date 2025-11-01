const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    redirectURL: {
        type: String,
        required: true
    },
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    visitHistory:[ {timestamp:{type:Number}}],
}, { timestamps: true });

const URL=mongoose.model('Url', urlSchema);
module.exports =URL;
    
