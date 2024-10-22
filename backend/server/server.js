const express = require('express');
const mongoose = require('mongoose');
const peopleRoutes = require('./routes/people');
const personRoutes = require('./routes/person');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Atlas connected'))
    .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api', peopleRoutes);
app.use('/api', personRoutes);

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to the Person Info API');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Server listening on a defined port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});