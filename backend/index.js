const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./routes/auth');


const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection URI (replace with your MongoDB Atlas URI)
const mongoURI = 'mongodb+srv://slaven2910:wqtYcUo6hz2dCy8w@cvmakercluster.ivmello.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use(bodyParser.json());
app.use(cors());

// Import the route and controller
const healthRoute = require('./src/routes/health');
const healthController = require('./src/controllers/healthController');

// Set up the route
app.use('/api/health', healthRoute);

app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.send('CV Maker API is running.');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
