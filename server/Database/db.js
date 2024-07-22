const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const { MongoClient } = require('mongodb');

mongoose.set("strictQuery", true, "useNewUrlParser", true);
<<<<<<< HEAD
const db = process.env.MONGO_URL
=======
const db = `${process.env.MONGODB_URL}`
>>>>>>> 0a9a24e12eb6058b11f01840f79df4792cf996d8

const connectDb = async() => {
    try {
        await mongoose.connect(db);
        console.log("connected to mongodb..");
    } catch (error) {
        console.error("error while connecting to db")
        process.exit(1);
    }
}

const shutdownMongoDB = async () => {
    try {
      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();
      const adminDb = client.db().admin();
      await adminDb.command({ shutdown: 1 });
      console.log("MongoDB server shut down.");
    } catch (error) {
      console.error("Error shutting down MongoDB server:", error);
    }
  };

  process.on('SIGINT', async () => {
    console.log("Received SIGINT. Shutting down MongoDB server...");
    await shutdownMongoDB();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log("Received SIGTERM. Shutting down MongoDB server...");
    await shutdownMongoDB();
    process.exit(0);
});

module.exports = {connectDb, shutdownMongoDB};