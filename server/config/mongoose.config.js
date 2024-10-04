import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;
async function dbConnect() {
  try {
    await connect(MONGODB_URI, {
      dbName: "skin_toneDB",
    });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    console.log("Server is successfully launched and operational!");
    console.log("Port: 8000 / Dev Mode Activated");
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export default dbConnect;
