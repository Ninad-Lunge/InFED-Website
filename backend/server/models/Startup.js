const mongoose = require('mongoose');

const startupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    websiteLink: { type: String },
    targetAudience: { type: String, required: true },
    goals: { type: String, required: true },
    achievements: { type: String, required: true },
    schemes: { type: [String] }
});

const Startup = mongoose.model('Startup', startupSchema);
module.exports = Startup;