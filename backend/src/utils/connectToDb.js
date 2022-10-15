import mongoose from "mongoose";
import log from "./logger.js";

async function connectToDb() {
  const dbUri = "mongodb://127.0.0.1:27017/my_db";

  try {
    await mongoose.connect(dbUri);
    log.info("connect to databse");
  } catch (error) {
    log.info("disconnect to database");
    process.exit(1);
  }
}

export default connectToDb;
