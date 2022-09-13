const mongoose = require("mongoose");
const schema = mongoose.Schema;

const urlSchema = new mongoose.Schema({

    originalURL: { type: String, require: true },
    shortURL: { type: String, require: true, unique: true },
    fullURL: { type: String, require: true }

}, {
    timestamps: true
})

module.exports = mongoose.model("tinyUrls", urlSchema);