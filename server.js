import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

// Allow Roblox HttpService
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/random-game", async (req, res) => {
  try {
    const response = await fetch(
      "https://games.roblox.com/v1/games/list?sortOrder=Desc&limit=100&sortBy=PlayerCount"
    );
    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      return res.status(500).json({ error: "No games found" });
    }

    const randomGame = data.data[Math.floor(Math.random() * data.data.length)];
    res.json({ placeId: randomGame.id, name: randomGame.name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch games" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
