const { User, Collection, Subfolder } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({}).populate('collections').populate({
        path: 'collections',
        populate: 'subfolders'
      });
    },
    collections: async () => {
      return await Collection.find({}).populate('subfolders');
    },
    collections: async (parent, args) => {
      return await Collection.findById(args.id);
    },
    subfolders: async () => {
      return await Subfolder.find({});
    }
  },
  Mutation: {
    addCollection: async (parent, { collectionTitle }) => {
      return await Collection.create({ collectionTitle });
    },
    addSubfolder: async (parent, { subfolderName }) => {
      return await Subfolder.create({ subfolderName });
    },
    updateCollection: async (parent, { id, collectionTitle }) => {
      // Find and update the matching collection using the destructured args
      return await Collection.findOneAndUpdate(
        { _id: id }, 
        { collectionTitle },
        // Return the newly updated object instead of the original
        { new: true }
      );
    },
    updateSubfolder: async (parent, { id, subfolderName }) => {
      // Find and update the matching subfolder using the destructured args
      return await Subfolder.findOneAndUpdate(
        { _id: id }, 
        { subfolderName },
        // Return the newly updated object instead of the original
        { new: true }
      );
    }
  }
};

module.exports = resolvers;
