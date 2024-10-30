const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    eventImage: { type: String, required: true },
    eventShortDesc: { type: String, required: true },
    eventDate: { type: Date, required: true },
    eventVenue: { type: String, required: true },
    description: { type: String, required: true },
});  

module.exports = mongoose.model('Event', eventSchema);
