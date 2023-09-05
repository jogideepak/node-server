const mongoose = require('mongoose');
const slugify = require('slugify');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, `Must include a title`],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  slug: String,
  isPublished: {
    type: Boolean,
    default: false,
  },
  body: String,
});

// Create slug from post's title before full save
PostSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
});

module.exports = mongoose.model('Post', PostSchema);
