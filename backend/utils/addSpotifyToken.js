import mongoose from "mongoose";
import Token from "../models/Token.js"; 
import env from "../utils/validateEnv.js";

const setupToken = async () => {
  await mongoose.connect(env.MONGO_URI);

  const existingToken = await Token.findOne({ name: "Spotify" });

  if (!existingToken) {
    await Token.create({
      name: "Spotify",
      access_token: "initial_dummy_token",
      expires_at: Date.now(),
    });
    console.log("Spotify token entry created.");
  } else {
    console.log("Spotify token already exists.");
  }

  mongoose.disconnect();
};

setupToken();
