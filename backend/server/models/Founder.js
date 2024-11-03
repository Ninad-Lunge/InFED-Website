const mongoose = require('mongoose');

const founderSchema = new mongoose.Schema({
    name: { type: String, required: true},
    photo: { type: String, required: true},
    socialLinks: {
        instagram: { type: String },
        linkedin: { type: String },
        twitter: { type: String }
    },
    testimonial: { type: String, required: true},
    role: { type: String, enum: ['Founder', 'Co-Founder'], required: true },
    startup: { type: String, required: true }
});

const Founder = mongoose.model('Founder', founderSchema);
module.exports = Founder;