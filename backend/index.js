require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./src/routes/auth');
const cvRoutes = require('./src/routes/cv');
const path = require('path');

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

// MongoDB connection URI (replace with your MongoDB Atlas URI)
const mongoPW = process.env.MONGO_DB_PASSWORD;
const mongoURI = `mongodb+srv://slaven2910:${mongoPW}@cvmakercluster.ivmello.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 30000  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, '../frontend/public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.use(bodyParser.json());

// Import the route and controller
const healthRoute = require('./src/routes/health');
const healthController = require('./src/controllers/healthController');

// Set up the route
app.use('/api/health', healthRoute);
app.use('/auth', authRouter);
app.use('/cv', cvRoutes);


app.get('/', (req, res) => {
  res.send('CV Maker API is running.');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
