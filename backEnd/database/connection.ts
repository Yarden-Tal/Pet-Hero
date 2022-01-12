require("dotenv").config();
const mongoose = require("mongoose");

const URI: string | undefined = process.env.DATABASE_URL;

const connectDb = async (): Promise<boolean> => {
  try {
    await mongoose.connect(URI);
    console.log(`DB connected...`);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export default connectDb;
