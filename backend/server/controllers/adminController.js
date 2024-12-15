const Event = require('../models/Event');
const Opportunity = require('../models/Opportunity');
const User = require('../models/User');

// Event Management Controllers
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .sort({ date: 1 })
      .populate('organizer', 'username');
    res.json(events);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching events', 
      error: error.message 
    });
  }
};

exports.createEvent = async (req, res) => {
    try {
        const { 
            title, 
            description, 
            date, 
            time, 
            location, 
            category
        } = req.body;

        const newEvent = new Event({
            title,
            description,
            date: new Date(date),
            time,
            location,
            category,
            organizer: req.admin.id
        });

        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        res.status(400).json({ 
        message: 'Error creating event', 
        error: error.message 
        });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedEvent = await Event.findByIdAndUpdate(
        id, 
        updateData, 
        { new: true }
        );

        if (!updatedEvent) {
        return res.status(404).json({ message: 'Event not found' });
        }

        res.json(updatedEvent);
    } catch (error) {
        res.status(400).json({ 
        message: 'Error updating event', 
        error: error.message 
        });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEvent = await Event.findByIdAndDelete(id);

        if (!deletedEvent) {
        return res.status(404).json({ message: 'Event not found' });
        }

        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ 
        message: 'Error deleting event', 
        error: error.message 
        });
    }
};

// Opportunity Management Controllers
exports.getAllOpportunities = async (req, res) => {
    try {
      const opportunities = await Opportunity.find()
      res.status(200).json(opportunities);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error fetching opportunities', 
        error: error.message 
      });
    }
};
  
exports.createOpportunity = async (req, res) => {
    try {
      const { 
        title, 
        company, 
        description, 
        type, 
        skills, 
        applicationDeadline 
      } = req.body;
  
      const newOpportunity = new Opportunity({
        title,
        company,
        description,
        type,
        skills,
        applicationDeadline: applicationDeadline 
          ? new Date(applicationDeadline) 
          : null,
        postedBy: req.admin.id
      });
  
      const savedOpportunity = await newOpportunity.save();
      res.status(201).json(savedOpportunity);
    } catch (error) {
      res.status(400).json({ 
        message: 'Error creating opportunity', 
        error: error.message 
      });
    }
};
  
exports.updateOpportunity = async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
  
      const updatedOpportunity = await Opportunity.findByIdAndUpdate(
        id, 
        updateData, 
        { new: true }
      );
  
      if (!updatedOpportunity) {
        return res.status(404).json({ message: 'Opportunity not found' });
      }
  
      res.json(updatedOpportunity);
    } catch (error) {
      res.status(400).json({ 
        message: 'Error updating opportunity', 
        error: error.message 
      });
    }
};
  
exports.deleteOpportunity = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedOpportunity = await Opportunity.findByIdAndDelete(id);
  
      if (!deletedOpportunity) {
        return res.status(404).json({ message: 'Opportunity not found' });
      }
  
      res.json({ message: 'Opportunity deleted successfully' });
    } catch (error) {
      res.status(500).json({ 
        message: 'Error deleting opportunity', 
        error: error.message 
      });
    }
};
  
exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find()
        .select('-password')
        .sort({ createdAt: -1 });
      res.json(users);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error fetching users', 
        error: error.message 
      });
    }
};

exports.deleteUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.remove();
    res.json({ message: 'User removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};