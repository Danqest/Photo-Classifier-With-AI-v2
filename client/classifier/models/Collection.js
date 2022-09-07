const { Schema, model } = require('mongoose');

// Schema for what makes up a Collection
const collectionSchema = new Schema(
    {
    collectionTitle: { type: String, required: true, minLength: 1, maxLength: 280, },
    subfolders: [
            { 
            type: Schema.Types.ObjectId, 
            ref: 'Subfolder' 
            }
        ]
    }
);

// Initialize the Collection model
const Collection = model('collection', collectionSchema);

module.exports = Collection;