// API-Football Service
const API_KEY = 'b2adb23c82bf54aa3b58a45f7e7e47de'; // Replace with your actual key
const API_HOST = 'api-football-v1.p.rapidapi.com';

class FootballAPI {
    static async getLiveMatches() {
        const url = 'https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all';
        
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': API_KEY,
                    'X-RapidAPI-Host': API_HOST
                }
            });
            
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            
            const data = await response.json();
            return data.response || [];
        } catch (error) {
            console.error('Error fetching live matches:', error);
            return [];
        }
    }
    
    static async getMatchOdds(fixtureId) {
        const url = `https://api-football-v1.p.rapidapi.com/v3/odds?fixture=${fixtureId}`;
        
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': API_KEY,
                    'X-RapidAPI-Host': API_HOST
                }
            });
            
            const data = await response.json();
            return data.response[0]?.bookmakers[0]?.bets || null;
        } catch (error) {
            console.error('Error fetching match odds:', error);
            return null;
        }
    }
    
    static async getUpcomingMatches(leagueId, season) {
        const url = `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${leagueId}&season=${season}&next=10`;
        
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': API_KEY,
                    'X-RapidAPI-Host': API_HOST
                }
            });
            
            const data = await response.json();
            return data.response || [];
        } catch (error) {
            console.error('Error fetching upcoming matches:', error);
            return [];
        }
    }
}

// Example usage in live.js:
/*
async function loadLiveMatches() {
    const liveMatches = await FootballAPI.getLiveMatches();
    // Process and display matches
    console.log(liveMatches);
}
*/