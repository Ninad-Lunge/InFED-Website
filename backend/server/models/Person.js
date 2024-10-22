const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    designation: { type: String, required: true },
    socialLinks: {
        instagram: { type: String },
        linkedin: { type: String },
        twitter: { type: String }
    },
    heading: { type: String, required: true }
});

const Person = mongoose.model('Person', personSchema);
module.exports = Person;