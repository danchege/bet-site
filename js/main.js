// DOM Elements
const betSlipContainer = document.querySelector('.bet-slip-container');
const betSlipContent = document.getElementById('bet-slip-content');
const toggleSlipBtn = document.getElementById('toggle-slip');
const loginBtn = document.getElementById('login-btn');
const loginModal = document.getElementById('login-modal');
const closeModal = document.querySelector('.close-modal');
const showRegister = document.getElementById('show-register');
const loginForm = document.getElementById('login-form');

// Current bets
let currentBets = [];

// Toggle bet slip visibility
toggleSlipBtn.addEventListener('click', () => {
    betSlipContent.classList.toggle('open');
    toggleSlipBtn.innerHTML = betSlipContent.classList.contains('open') ? 
        '<i class="fas fa-chevron-down"></i>' : '<i class="fas fa-chevron-up"></i>';
});

// Modal functionality
loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

showRegister.addEventListener('click', (e) => {
    e.preventDefault();
    // In a real app, this would show registration form
    alert('Registration would appear here');
    loginModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
});

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const result = await AuthService.login(email, password);
        if (result.success) {
            alert(`Welcome, ${result.user.name}!`);
            // Update UI with user info
        } else {
            alert(result.message);
        }
    });
}

// Function to add bet to slip
function addToBetSlip(matchId, matchName, selection, odds) {
    const existingBetIndex = currentBets.findIndex(bet => bet.matchId === matchId && bet.selection === selection);
    
    if (existingBetIndex !== -1) {
        currentBets[existingBetIndex] = { matchId, matchName, selection, odds };
    } else {
        currentBets.push({ matchId, matchName, selection, odds });
    }
    
    updateBetSlip();
    betSlipContent.classList.add('open');
    toggleSlipBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
}

// Update bet slip UI
function updateBetSlip() {
    const betCount = document.getElementById('bet-count');
    const emptySlip = document.querySelector('.empty-slip');
    const potentialWin = document.getElementById('potential-win');
    
    betCount.textContent = currentBets.length;
    
    if (currentBets.length === 0) {
        betSlipContent.innerHTML = '<p class="empty-slip">Your bet slip is empty</p>';
        potentialWin.textContent = '$0.00';
        return;
    }
    
    let slipHTML = '';
    currentBets.forEach((bet, index) => {
        slipHTML += `
            <div class="bet-item">
                <div>
                    <h4>${bet.matchName}</h4>
                    <p>${bet.selection} @ ${bet.odds}</p>
                </div>
                <button class="remove-bet" onclick="removeBet(${index})"><i class="fas fa-times"></i></button>
            </div>
        `;
    });
    
    betSlipContent.innerHTML = slipHTML;
    calculatePotentialWin();
}

// Remove bet from slip
function removeBet(index) {
    currentBets.splice(index, 1);
    updateBetSlip();
}

// Calculate potential winnings
function calculatePotentialWin() {
    const stakeInput = document.getElementById('stake-amount');
    const potentialWin = document.getElementById('potential-win');
    
    stakeInput.addEventListener('input', function() {
        const stake = parseFloat(this.value) || 0;
        
        if (currentBets.length === 0) {
            potentialWin.textContent = '$0.00';
            return;
        }
        
        // For simplicity, calculating based on first bet
        // In a real app, you might have accumulators
        const winAmount = stake * currentBets[0].odds;
        potentialWin.textContent = '$' + winAmount.toFixed(2);
    });
}

// Place bet function
function placeBet() {
    const stakeInput = document.getElementById('stake-amount');
    const stake = parseFloat(stakeInput.value);
    
    if (currentBets.length === 0) {
        alert('Please add selections to your bet slip');
        return;
    }
    
    if (!stake || stake <= 0) {
        alert('Please enter a valid stake amount');
        return;
    }
    
    // In a real app, this would send to backend
    alert(`Demo bet placed!\n\nStake: $${stake.toFixed(2)}\nPotential win: ${document.getElementById('potential-win').textContent}\n\n(No real money was used)`);
    
    // Reset for demo
    currentBets = [];
    stakeInput.value = '';
    updateBetSlip();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Load featured matches
    loadFeaturedMatches();
    
    // Set up bet slip
    updateBetSlip();
    
    // Add event listener to place bet button
    document.querySelector('.btn-place-bet').addEventListener('click', placeBet);
});

// Load featured matches (mock data)
async function loadFeaturedMatches() {
    const matchesGrid = document.getElementById('featured-matches');
    matchesGrid.innerHTML = '<div class="loading-spinner"></div>';

    try {
        const response = await fetch('/api/live-matches');
        const matches = await response.json();

        matchesGrid.innerHTML = '';
        matches.forEach(match => {
            if (!match.homeTeam || !match.awayTeam) {
                console.error('Invalid match data:', match);
                return;
            }

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
                    <div class="odd">1 (${match.odds.home})</div>
                    <div class="odd">X (${match.odds.draw})</div>
                    <div class="odd">2 (${match.odds.away})</div>
                </div>
            `;
            matchesGrid.appendChild(matchCard);
        });
    } catch (error) {
        console.error('Error loading matches:', error);
        matchesGrid.innerHTML = '<p>Error loading matches</p>';
    }
}

// Load sport category
function loadSport(sport) {
    // In a real app, this would load matches for the selected sport
    alert(`Loading ${sport} matches...`);
    // You would typically redirect to a sport-specific page or filter the current page
}