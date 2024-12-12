const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    images: [{ type: String, required: true }],
    shortDesc: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    startTime: { type: String},
    endTime: { type: String},
    venue: { type: String, required: true },
    description: { type: String, required: true },
    mode: {
        type: String,
        required: true,
        enum: ['Online', 'Offline'],
        default: 'Offline',
    },
});

module.exports = mongoose.model('Event', eventSchema);