const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { analyze } = require("./analyse");

dotenv.config();

const app = express();
const PORT = 5020;

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("dist"));

const API_KEY = process.env.API_KEY;

// Route for serving the home page
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/dist/index.html");
});

// Route for handling sentiment analysis
app.post("/analyze", async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ msg: "URL is required", code: 400 });
        }

        const analysisResult = await analyze(url, API_KEY);
        const { code, msg, sample } = analysisResult;

        if (code === 212 || code === 100) {
            return res.status(422).json({ msg, code });
        }

        return res.json({ sample, code });
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ msg: "Internal Server Error", code: 500 });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
