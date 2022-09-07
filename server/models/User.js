const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

// Schema for what makes up a user
const userSchema = new Schema({
  username: { type: String, unique: true, required: true, trimmed: true },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: { type: String, required: true, minlength: 5, maxlength: 60 },
  collections: [
    {
      type: Schema.Types.ObjectId,
      ref: "Collection",
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  console.log(password + ' 1')
  console.log(this.password + ' 2')
  return bcrypt.compare(password, this.password);
};

// Initialize the User model
const User = model("User", userSchema);

module.exports = User;
