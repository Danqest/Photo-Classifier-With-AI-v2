const { Schema, model } = require('mongoose');

// Schema for what makes up a user
const imageSchema = new Schema(
  {
  name: { type: String, required: true, trimmed: true },
  desc: String, 
  img: { data: Buffer, contentType: String }
  }
);

// Initialize the Image model
const Image = model('image', imageSchema);

module.exports = Image;
