const mongoose = require("mongoose");
const dns = require("dns");

// Force Node to use public DNS resolvers that support SRV lookups.
// Fixes "querySrv ECONNREFUSED" errors on networks/routers whose default
// DNS doesn't resolve mongodb+srv:// records properly.
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;