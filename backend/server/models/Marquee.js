const mongoose = require('mongoose');

const marqueeSchema = new mongoose.Schema({
    text: { type: String, required: true},
    link: { type: String, required: true},
});

const Marquee = mongoose.model('Marquee', marqueeSchema);
module.exports = Marquee;