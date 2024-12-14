const User = require('../models/User');
const Event = require('../models/Event');
const Opportunity = require('../models/Opportunity');

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id; // From authentication middleware

    // Fetch user details
    const user = await User.findById(userId)
      .populate('connections', 'username profileImage');

    // Count active connections
    const activeConnections = user.connections.length;

    // Fetch upcoming events (next 30 days)
    const upcomingEvents = await Event.find({
      date: { 
        $gte: new Date(), 
        $lte: new Date(new Date().setDate(new Date().getDate() + 30)) 
      }
    }).sort('date').limit(3);

    // Fetch latest opportunities
    const latestOpportunities = await Opportunity.find()
      .sort({ postDate: -1 })
      .limit(3);

    // Count unread messages (assuming a separate Message model)
    const unreadMessages = await Message.countDocuments({
      recipient: userId, 
      read: false 
    });

    res.json({
      user: {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        profileImage: user.profileImage
      },
      stats: {
        activeConnections,
        unreadMessages,
        upcomingEventsCount: upcomingEvents.length
      },
      upcomingEvents: upcomingEvents.map(event => ({
        id: event._id,
        title: event.title,
        date: event.date,
        time: event.time
      })),
      latestOpportunities: latestOpportunities.map(opp => ({
        id: opp._id,
        title: opp.title,
        company: opp.company
      }))
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching dashboard data', 
      error: error.message 
    });
  }
};