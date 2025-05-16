const express = require('express');
const app = express();
const path = require('path');

// Middleware to serve static files
app.use(express.static(path.join(__dirname)));

// Endpoint for live matches
app.get('/api/live-matches', (req, res) => {
    res.json([
        {
            id: 1,
            league: "Premier League",
            time: 45,
            homeTeam: "Team A",
            awayTeam: "Team B",
            homeLogo: "images/team-a.png",
            awayLogo: "images/team-b.png",
            odds: { home: 1.5, draw: 3.2, away: 2.8 }
        },
        {
            id: 2,
            league: "La Liga",
            time: 30,
            homeTeam: "Team C",
            awayTeam: "Team D",
            homeLogo: "images/team-c.png",
            awayLogo: "images/team-d.png",
            odds: { home: 1.8, draw: 3.0, away: 2.5 }
        }
    ]);
});

// Endpoint for upcoming matches
app.get('/api/upcoming-matches', (req, res) => {
    res.json([
        {
            id: 1,
            league: "Serie A",
            date: "2025-05-05",
            kickoffTime: "18:00",
            homeTeam: "Team E",
            awayTeam: "Team F",
            homeLogo: "images/team-e.png",
            awayLogo: "images/team-f.png"
        },
        {
            id: 2,
            league: "Bundesliga",
            date: "2025-05-06",
            kickoffTime: "20:00",
            homeTeam: "Team G",
            awayTeam: "Team H",
            homeLogo: "images/team-g.png",
            awayLogo: "images/team-h.png"
        }
    ]);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});