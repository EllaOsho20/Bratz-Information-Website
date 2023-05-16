const mongoose = require('mongoose');

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

// List of Bratz dolls
const dolls = [
  {
    name: 'Bratz Doll 1',
    imageUrl: 'https://example.com/bratz_doll_1.jpg',
    websites: ['https://example-store-1.com', 'https://example-store-2.com'],
    manufacturingInfo: 'Manufacturing info for Bratz Doll 1',
    instructions: 'Instructions for Bratz Doll 1',
    additionalItems: [
      {
        name: 'Bratz Doll 1 Accessory',
        whereToBuy: 'https://example-store-3.com',
      },
    ],
    popularity: 3,
  },
  // Add more dolls here
];

// Seed the database with Bratz dolls
async function seedDatabase() {
  try {
    await Doll.deleteMany({});
    await Doll.insertMany(dolls);
    console.log('Database seeded with Bratz dolls.');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seedDatabase();
