const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  // whenever use async/await use try/catch to handler err
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log('MongoDB connected...');
  } catch (err) {
    // exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
