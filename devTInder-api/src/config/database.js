const mongoose = require("mongoose");

// async function connectDB() {
//   try {
//     await mongoose.connect("mongodb+srv://sapnaadsul:dlE2IR9Ot1FfMZxn@nodetodosample.vj5uj.mongodb.net/devTinder?retryWrites=true&w=majority");
//     console.log("Connected!");
//   } catch (err) {
//     console.error(err);
//   }
// }

const connectToMongoDB = async () => {
  await mongoose.connect(
    "mongodb://sapnaadsul:dlE2IR9Ot1FfMZxn@nodetodosample-shard-00-00.vj5uj.mongodb.net:27017,nodetodosample-shard-00-01.vj5uj.mongodb.net:27017,nodetodosample-shard-00-02.vj5uj.mongodb.net:27017/?ssl=true&replicaSet=atlas-hm34no-shard-0&authSource=admin&appName=nodetodosample",
    { dbName: "devTinder1" },
  );
};

module.exports = connectToMongoDB;
