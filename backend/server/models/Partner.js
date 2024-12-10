const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    logoUrl: { type: String, required: true },
});

module.exports = mongoose.model('Partners', partnerSchema);