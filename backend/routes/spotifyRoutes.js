import express from "express";
import {
  getSpotifyGenres,
  getPlaylistsByGenre,
  getPlaylistById,
  getTracksOfPlaylist,
  getTrack,
  searchSpotify,
} from "../controllers/spotifyController.js";

const router = express.Router();

// Public Routes (No Authentication Required)
router.get("/genres", getSpotifyGenres); // Get spotify genre
router.get("/genres/:genreId/playlists", getPlaylistsByGenre); // Get playlists by genre
router.get("/playlists/:playlistId", getPlaylistById); // Get playlist by id
router.get("/playlists/:playlistId/tracks", getTracksOfPlaylist); // Get tracks of a playlist
router.get("/tracks/:trackId", getTrack); // Get track
router.get("/search", searchSpotify); // Search in spotify

export default router;
