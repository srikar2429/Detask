import { cleanEnv } from "envalid";
import { port, str } from "envalid";
import dotenv from "dotenv";
dotenv.config({ path: "./env/.env" });

export default cleanEnv(process.env, {
  NODE_ENV: str({
    choices: ["development", "production", "test"],
    default: "development",
  }),
  MONGO_URI: str(),
  PORT: port(),
  JWT_SECRET: str(),
  //FRONT_END_URL: str(),
  SPOTIFY_CLIENT_ID: str(),
  SPOTIFY_CLIENT_SECRET: str(),
  SPOTIFY_BASE_ADDRESS: str(),
  SPOTIFY_TOKEN_ENDPOINT: str(),
  //CLOUDINARY_KEY: str(),
  //CLOUDINARY_SECRET: str(),
  //CLOUD_NAME: str(),
  //GENIUS_ACCESS_TOKEN: str(),
  //DATUTH_CLIENT_ID: str(),
  //DAUTH_CLIENT_SECRET: str(),
});
