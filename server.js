const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/bratzDollInfo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the doll schema and model
const dollSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  websites: [String],
  manufacturingInfo: String,
  instructions: String,
  additionalItems: [{
    name: String,
    whereToBuy: String,
  }],
  popularity: Number,
});

const Doll = mongoose.model('Doll', dollSchema);

// Define your API routes
app.get('/api/dolls', async (req, res) => {
  try {
    const dolls = await Doll.find({});
    res.json(dolls);
  } catch (error) {
    console.error('Error fetching dolls:', error);
    res.status(500).send('Error fetching dolls');
  }
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
