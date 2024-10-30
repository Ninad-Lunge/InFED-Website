const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
    name: { type: String, required: true},
    image: { type: String, required: true },
    desc: { type: String, required: true},
    link: { type: String, required: true },
    eligibilityCriteria: { type: [String] },
    schemeBenefits: { type: [String] }
});

const Scheme = mongoose.model('Scheme', schemeSchema);
module.exports = Scheme;