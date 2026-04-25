const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (
      !mongoUri ||
      mongoUri === "your_mongodb_connection" ||
      (!mongoUri.startsWith("mongodb://") &&
        !mongoUri.startsWith("mongodb+srv://"))
    ) {
      throw new Error(
        "Invalid MONGO_URI. Set a real MongoDB URI in server/.env (mongodb://... or mongodb+srv://...)."
      );
    }

    await mongoose.connect(mongoUri);
    console.log("Mongo DB connected");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
