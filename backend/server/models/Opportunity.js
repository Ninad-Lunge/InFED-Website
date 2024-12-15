// For Community

const mongoose = require('mongoose');

const OpportunitySchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  company: { 
    // type: mongoose.Schema.Types.ObjectId, 
    // ref: 'Startup',
    type: String,
    required: true 
  },
  description: String,
  type: String, // internship, job, mentorship
  skills: [String],
  postDate: { 
    type: Date, 
    default: Date.now 
  },
  applicationDeadline: Date,
  postedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Admin' 
  },
  applicationLink: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Opportunity', OpportunitySchema);