import asyncHandler from "express-async-handler";
import createHttpError from "http-errors";
import axios from "axios";
import env from "../utils/validateEnv.js";
import getValidToken from "../utils/spotifyToken.js";

const baseURL = env.SPOTIFY_BASE_ADDRESS;

// @desc   Get Spotify Genres
// @route  GET /api/spotify/genres
// @access Public
export const getSpotifyGenres = asyncHandler(async (req, res, next) => {
  const accessToken = await getValidToken();
  try {
    const response = await axios.get(
      `${baseURL}/browse/categories?locale=sv_US`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    res.json(response.data.categories.items);
  } catch (error) {
    next(error);
  }
});

// @desc   Get Playlists by Genre
// @route  GET /api/spotify/genres/:genreId/playlists
// @access Public
export const getPlaylistsByGenre = asyncHandler(async (req, res, next) => {
  const { genreId } = req.params;
  const accessToken = await getValidToken();
  try {
    const response = await axios.get(
      `${baseURL}/browse/categories/${genreId}/playlists?limit=15`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    res.status(200).json(response.data.playlists.items);
  } catch (error) {
    next(error);
  }
});

// @desc   Get Playlist by ID
// @route  GET /api/spotify/playlists/:playlistId
// @access Public
export const getPlaylistById = asyncHandler(async (req, res, next) => {
  const { playlistId } = req.params;
  const accessToken = await getValidToken();
  try {
    const response = await axios.get(`${baseURL}/playlists/${playlistId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    res.status(200).json(response.data);
  } catch (error) {
    next(error);
  }
});

// @desc   Get Tracks of a Playlist
// @route  GET /api/spotify/playlists/:playlistId/tracks
// @access Public
export const getTracksOfPlaylist = asyncHandler(async (req, res, next) => {
  const { playlistId } = req.params;
  const accessToken = await getValidToken();
  try {
    const response = await axios.get(
      `${baseURL}/playlists/${playlistId}/tracks?limit=15`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    res.status(200).json(response.data.items);
  } catch (error) {
    next(error);
  }
});

// @desc   Get Track by ID
// @route  GET /api/spotify/tracks/:trackId
// @access Public
export const getTrack = asyncHandler(async (req, res, next) => {
  const { trackId } = req.params;
  const accessToken = await getValidToken();
  try {
    const response = await axios.get(`${baseURL}/tracks/${trackId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    res.status(200).json(response.data);
  } catch (error) {
    next(error);
  }
});

// @desc   Search Spotify for tracks
// @route  GET /api/spotify/search?q=<query>
// @access Public
export const searchSpotify = asyncHandler(async (req, res, next) => {
  const query = req.query.q;
  if (!query) throw createHttpError(400, "Query is not provided");

  const accessToken = await getValidToken();
  try {
    const response = await axios.get(`${baseURL}/search`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: { q: query, type: "track" },
    });
    res.status(200).json(response.data.tracks.items);
  } catch (error) {
    next(error);
  }
});
