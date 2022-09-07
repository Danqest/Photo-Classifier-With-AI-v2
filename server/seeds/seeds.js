const db = require("../config/connection");
const { User, Collection, Subfolder } = require("../models");

const userData = require("./userData.json");
const collectionData = require("./collectionData.json");
const subfolderData = require("./subfolderData.json");

db.once("open", async () => {
  try {
    // clean database
    await User.deleteMany({});
    await Collection.deleteMany({});
    await Subfolder.deleteMany({});

    // bulk create each model
    // const users = await User.insertMany(userData);
    // const collections = await Collection.insertMany(collectionData);
    // const subfolders = await Subfolder.insertMany(subfolderData);

    for (const user of userData) {
      await User.create(user);
    }

    for (let i = 0; i < collectionData.length; i++) {
      const { _id, collectionOwner } = await Collection.create(
        collectionData[i]
      );
      const user = await User.findOneAndUpdate(
        { username: collectionOwner },
        {
          $addToSet: {
            collections: _id,
          },
        }
      );
    }

    for (let i = 0; i < subfolderData.length; i++) {
      const { _id, parentCollection } = await Subfolder.create(
        subfolderData[i]
      );
      const collection = await Collection.findOneAndUpdate(
        { collectionTitle: parentCollection },
        {
          $addToSet: {
            subfolders: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
