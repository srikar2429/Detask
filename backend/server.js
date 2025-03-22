const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./env/.env" });

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Music Streaming API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
