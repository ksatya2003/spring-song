import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import cors from "cors";

const cache = new Map();

const app = express();
const PORT = 3030;

// Set up CORS with specific origin
const allowedOrigins = ['http://localhost:5173'];
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/search", async (req, res) => {
    const song = req.query.song;
    const language = req.query.language;
    console.log("Name is", song);
    console.log("Language is", language);
    try {
        if (cache.has(song)) {
            console.log("Fetching from cache...");
            const music = cache.get(song);
            const filteredMusic = language === "all" ? music : music.filter(m => m.language === language);
            res.json(filteredMusic);
        } else {
            const response = await axios.get(
                `https://jio-savaan-private.vercel.app/api/search/songs?query=${song}`
            );
            if (response.data.data.results && response.data.data.results.length > 0) {
                const musicArray = response.data.data.results.map((result) => ({
                    url: result.downloadUrl[4]?.url || "",
                    name: result.name || "",
                    year: result.year || "",
                    artist: result.artists.primary[0]?.name.replace(/&amp;/g, "&") || "",
                    img: result.image[2]?.url || "",
                    language: result.language || ""
                }));
                cache.set(song, musicArray);
                const filteredMusic = language === "all" ? musicArray : musicArray.filter(m => m.language === language);
                res.json(filteredMusic);
            } else {
                res.json([{ url: "", name: "No results found", year: "", artist: "", img: "", language: "" }]);
            }
        }
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.status(500).json({
            error: "Error fetching song. Please try again later.",
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

