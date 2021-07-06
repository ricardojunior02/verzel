const { connect } = require('mongoose');

const connectDB = connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = connectDB;