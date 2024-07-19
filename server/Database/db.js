const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

mongoose.set("strictQuery", true, "useNewUrlParser", true);
const db = `${process.env.MONGODB_URL}`

const connectDb = async() => {
    try {
        await mongoose.connect(db);
        console.log("connected to mongodb..");
    } catch (error) {
        console.error("error while connecting to db")
        process.exit(1);
    }
}

module.exports = connectDb;