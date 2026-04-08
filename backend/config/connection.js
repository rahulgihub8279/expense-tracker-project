import mongoose from "mongoose";

const db_connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to db");
  } catch (err) {
    console.log(err.message);
  }
};
export default db_connect;
