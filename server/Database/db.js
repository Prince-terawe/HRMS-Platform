const mongoose = require('mongoose');
// 4hFcLkVnAAEhh8CA

mongoose.set("strictQuery", true, "useNewUrlParser", true);
const db = "mongodb+srv://ankitkumar842:4hFcLkVnAAEhh8CA@cluster1.rb8didw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"

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