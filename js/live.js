// Fetch and display live matches
async function loadLiveMatches() {
    const matchesGrid = document.getElementById('live-matches');
    matchesGrid.innerHTML = '<div class="loading-spinner"></div>';

    try {
        const response = await fetch('/api/live-matches');
        if (!response.ok) {
            throw new Error('Failed to fetch live matches');
        }

        const matches = await response.json();
        matchesGrid.innerHTML = '';

        matches.forEach(match => {
            const matchCard = document.createElement('div');
            matchCard.className = 'match-card';
            matchCard.innerHTML = `
                <div class="match-header">
                    <span>${match.league}</span>
                    <span>${match.time}'</span>
                </div>
                <div class="match-teams">
                    <div class="team">
                        <img src="${match.homeLogo}" alt="${match.homeTeam}" class="team-logo">
                        <span>${match.homeTeam}</span>
                    </div>
                    <div class="vs">vs</div>
                    <div class="team">
                        <img src="${match.awayLogo}" alt="${match.awayTeam}" class="team-logo">
                        <span>${match.awayTeam}</span>
                    </div>
                </div>
                <div class="match-odds">
                    <div class="odd" onclick="addToBetSlip(${match.id}, '${match.homeTeam} vs ${match.awayTeam}', 'Home', ${match.odds.home})">1 (${match.odds.home})</div>
                    <div class="odd" onclick="addToBetSlip(${match.id}, '${match.homeTeam} vs ${match.awayTeam}', 'Draw', ${match.odds.draw})">X (${match.odds.draw})</div>
                    <div class="odd" onclick="addToBetSlip(${match.id}, '${match.homeTeam} vs ${match.awayTeam}', 'Away', ${match.odds.away})">2 (${match.odds.away})</div>
                </div>
            `;
            matchesGrid.appendChild(matchCard);
        });
    } catch (error) {
        console.error('Error loading live matches:', error);
        matchesGrid.innerHTML = '<p>Error loading live matches</p>';
    }
}

// Load live matches on page load
document.addEventListener('DOMContentLoaded', loadLiveMatches);