const { Schema, model } = require('mongoose');

// Schema for what makes up a user
const userSchema = new Schema(
  {
  username: { type: String, unique: true, required: true, trimmed: true },
  email: { type: String, unique: true, required: true, },
  collections: [
    { 
      type: Schema.Types.ObjectId, 
      ref: 'Collection' }
    ]
  }
);

// Initialize the User model
const User = model('user', userSchema);

module.exports = User;
