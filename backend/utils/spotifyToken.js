import Token from "../models/Token.js";
import createHttpError from "http-errors";
import axios from "axios";
import env from "./validateEnv.js";

const clientId = env.SPOTIFY_CLIENT_ID;
const clientSecret = env.SPOTIFY_CLIENT_SECRET;
const tokenEndpoint = env.SPOTIFY_TOKEN_ENDPOINT;

// Function to fetch a new token if the current one is expired
const getSpotifyToken = async () => {
  try {
    const response = await axios.post(
      tokenEndpoint,
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (response.status === 200) {
      const tokenExpiresAt = Date.now() + response.data.expires_in * 1000;
      let token = await Token.findOne({ name: "Spotify" }).exec();

      if (!token) {
        token = new Token({
          name: "Spotify",
          access_token: response.data.access_token,
          expires_at: tokenExpiresAt,
        });
      } else {
        token.access_token = response.data.access_token;
        token.expires_at = tokenExpiresAt;
      }

      await token.save();
      console.log("Spotify token refreshed successfully");
    } else {
      throw createHttpError(500, "Error while fetching Spotify token");
    }
  } catch (error) {
    console.error(error);
    throw createHttpError(500, "Failed to refresh Spotify token");
  }
};

// Function to get a valid access token
const getValidToken = async () => {
  let token = await Token.findOne({ name: "Spotify" }).exec();

  if (
    !token ||
    !token.access_token ||
    (token.expires_at && Date.now() >= token.expires_at)
  ) {
    await getSpotifyToken();
    token = await Token.findOne({ name: "Spotify" }).exec();
  }

  return token?.access_token;
};

export default getValidToken;
