const db = require('../config/connection');
const { User, Collection, Subfolder } = require('../models');

const userData = require('./userData.json');
const collectionData = require('./collectionData.json');
const subfolderData = require('./subfolderData.json');

db.once('open', async () => {
  // clean database
  await User.deleteMany({});
  await Collection.deleteMany({});
  await Subfolder.deleteMany({});

  // bulk create each model
  const users = await User.insertMany(userData);
  const collections = await Collection.insertMany(collectionData);
  const subfolders = await Subfolder.insertMany(subfolderData);

  // for (newClass of classes) {
  //   // randomly add each class to a school
  //   const tempSchool = schools[Math.floor(Math.random() * schools.length)];
  //   tempSchool.classes.push(newClass._id);
  //   await tempSchool.save();

  //   // randomly add a professor to each class
  //   const tempProfessor = professors[Math.floor(Math.random() * professors.length)];
  //   newClass.professor = tempProfessor._id;
  //   await newClass.save();

  //   // reference class on professor model, too
  //   tempProfessor.classes.push(newClass._id);
  //   await tempProfessor.save();
  // }

  console.log('all done!');
  process.exit(0);
});