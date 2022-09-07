const { Schema, model } = require("mongoose");

// Schema for what makes up a Folder
const subfolderSchema = new Schema({
  subfolderName: { type: String, required: true, minLength: 1, maxLength: 280 },
  parentCollection: { type: String, required: true, minLength: 1, maxLength: 280 },
  images: [
    {
      type: Schema.Types.ObjectId,
      ref: "Image",
    },
  ],
});

// Initialize the Folder model
const Subfolder = model("Subfolder", subfolderSchema);

module.exports = Subfolder;
