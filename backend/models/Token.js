import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, 
  access_token: { type: String, required: true },
  expires_at: { type: Number, required: true },
});

export default mongoose.model("Token", TokenSchema);
