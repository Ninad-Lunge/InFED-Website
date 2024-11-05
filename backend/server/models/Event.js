const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    shortDesc: { type: String, required: true },
    date: { type: Date, required: true },
    venue: { type: String, required: true },
    description: { type: String, required: true },
    mode: {type: String, required: true}
});  

module.exports = mongoose.model('Event', eventSchema);
