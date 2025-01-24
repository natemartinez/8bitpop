const mongoose = require('mongoose');
const uri = process.env.MONGO_URI;

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(uri)
      console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  };
  
  module.exports = connectDB;