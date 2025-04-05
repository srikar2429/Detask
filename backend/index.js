import express from "express";
import cookieParser from "cookie-parser";
import createHttpError from "http-errors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import spotifyRoutes from "./routes/spotifyRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import morgan from "morgan";
import env from "./utils/validateEnv.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if(env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
if(process.env.NODE_ENV === "production") {
  app.use(morgan("tiny"));
}

connectDB();

app.get("/", (req, res) => {
  res.send("Music Streaming API is running...");
});

app.use("/api/users", userRoutes);
app.use("/api/spotify", spotifyRoutes);

app.all("*", (req, res, next) => {
  next(createHttpError(404, `Cannot find ${req.originalUrl} on this server!`));
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
