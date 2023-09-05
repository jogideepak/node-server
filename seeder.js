/**
 * Run to populate and clear database
 */

const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const Post = require('./models/Post');

mongoose.connect(process.env.MONGO_URI, {
  newUrlParser: true,
  useUnifiedTopology: true,
});

// Read JSON files
const posts = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/posts_data.json`, 'utf-8')
);

// Import Data Methods
const importData = async () => {
  try {
    await Post.create(posts);
    console.log(`Data imported...`.green.inverse);
    process.exit();
  } catch (err) {
    console.log(`Could not import data to db`, err);
  }
};

// Delete data Methods
const deleteData = async () => {
  try {
    await Post.deleteMany();
    console.log(`All data destroyed...`.red.inverse);
    process.exit();
  } catch (err) {}
};

// Trigger seeder from terminal
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
