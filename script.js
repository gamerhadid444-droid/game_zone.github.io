// Game Database - Add your games here
const games = [
    {
        id: 1,
        title: "MineFun",
        description: "A fun block-building survival game inspired by Minecraft. Build, explore, and survive!",
        category: "survival",
        players: "1-4",
        rating: 4.8,
        color: "#00ff00",
        icon: "fas fa-cube",
        // IMPORTANT: You need permission and correct embed URL from Poki/Vectaria
        embedUrl: "https://poki.com/embed/minefun" // Example - may not work without permissions
    },
    {
        id: 2,
        title: "Mad Gunz",
        description: "Intense multiplayer shooter with crazy weapons and fast-paced action.",
        category: "shooter",
        players: "Multiplayer",
        rating: 4.9,
        color: "#9900ff",
        icon: "fas fa-gun",
        embedUrl: "https://playhop.com/app/419813?utm_source=app_page" 
    },
    {
        id: 3,
        title: "Survival Craft",
        description: "Build shelter, gather resources, and survive in a dangerous wilderness.",
        category: "survival",
        players: "Single Player",
        rating: 4.5,
        color: "#8B4513",
        icon: "fas fa-tree",
        embedUrl: "https://html5.gamedistribution.com/2a7a74f769ea40babd7d55ed7704af44/?gd_sdk_referrer_url=https://gamedistribution.com/games/survive-the-night-1/"
    },
    {
        id: 4,
        title: "Epic Battles",
        description: "Massive multiplayer strategy game with epic castle sieges.",
        category: "strategy",
        players: "2-50",
        rating: 4.7,
        color: "#ffaa00",
        icon: "fas fa-chess-king"
    },
    {
        id: 5,
        title: "Zombie Apocalypse",
        description: "Fight hordes of zombies in this intense survival shooter.",
        category: ["shooter", "survival"],
        players: "1-4",
        rating: 4.6,
        color: "#00aa00",
        icon: "fas fa-skull-crossbones"
    },
    {
        id: 6,
        title: "Space Invaders Pro",
        description: "Classic arcade action with modern graphics and power-ups.",
        category: "arcade",
        players: "Single Player",
        rating: 4.4,
        color: "#0000ff",
        icon: "fas fa-rocket"
    },
    // In your script.js file, add this to the games array:
{
    id: 7, // Change to the next number (7, 8, 9, etc.)
    title: "Gear Wars", // Give it a name
    description: "Exciting action game with great gameplay!", // Add description
    category: "action", // Choose: shooter, survival, strategy, action, arcade
    players: "Single Player", // or "Multiplayer" or "2-4"
    rating: 4.5, // Rating out of 5
    color: "#FF5733", // Choose a hex color
    icon: "fas fa-crosshairs", // FontAwesome icon
    // PASTE YOUR EMBED URL HERE (with modifications):
    embedUrl: "https://html5.gamedistribution.com/a6523a16099543ec804ed4057be06c0e/"
},
{
    id: 8,
    itle: "steal a brainrot",
    description: "Buy or steal brainrots and grow your money.",
     category: "multiplayer",
    players: "Multiplayer",
    rating: 4.4,
    color: "#0000ff",
    icon: "fas fa-skulls",
    embedUrl: "https://html5.gamedistribution.com/4592e84523ad49a8b80986c3aa503429/?gd_sdk_referrer_url=https://www.example.com/games/{game-path}"
},
{
    id: 9,
        title: "Wave Dash",
        description: " Ride the wave in Wave Dash, a rhythm platformer where each tap steers your arrow through tight corridors. Read patterns in waves, time jumps to music, and beat brutal stages. Build routes with the level editor, share creations, unlock icons, chase ranks, and perfect speed runs. Simple controls, fast restarts—pure focus and flow. Inspired by classic geometry platformers, tuned for dash mastery.",
        category: "multiplayer",
        players: "Multiplayer",
        rating: 4.4,
        color: "#00ffff",
        icon: "fas fa-Wolf-Pack-Battalion",
        embedUrl: "https://html5.gamedistribution.com/50d154abb6c5483b847cbeea848e73ff/?gd_sdk_referrer_url=https://www.example.com/games/{game-path} width=960 height=\"600\" scrolling=\"no\" frameborder=\"0\" allowfullscreen></iframe"
}
];

// DOM Elements
const gamesContainer = document.getElementById('gamesContainer');
const gameFrame = document.getElementById('gameFrame');
const embedPlaceholder = document.getElementById('embedPlaceholder');
const currentGameTitle = document.getElementById('currentGameTitle');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const reloadBtn = document.getElementById('reloadBtn');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    renderGames();
    setupEventListeners();
    
    // Show welcome message
    console.log("GameZone Website Loaded!");
    console.log("IMPORTANT: You need permission from game developers to feature their games.");
    console.log("Contact: MineFun - Vectaria/Poki | Mad Gunz - Go Dreams (mad.gunz@fullhpltd.com)");
});

// Render all games to the page
function renderGames(filteredGames = games) {
    gamesContainer.innerHTML = '';
    
    filteredGames.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.dataset.id = game.id;
        
        // Handle multiple categories
        const categories = Array.isArray(game.category) 
            ? game.category.join(', ') 
            : game.category;
        
        gameCard.innerHTML = `
            <div class="game-image" style="background: linear-gradient(45deg, ${game.color}, #000);">
                <i class="${game.icon}"></i>
            </div>
            <div class="game-info">
                <h3 class="game-title">${game.title}</h3>
                <p class="game-description">${game.description}</p>
                <div class="game-meta">
                    <span><i class="fas fa-users"></i> ${game.players}</span>
                    <span><i class="fas fa-star"></i> ${game.rating}/5</span>
                    <span><i class="fas fa-tag"></i> ${categories}</span>
                </div>
                <button class="play-btn" onclick="loadGame(${game.id})">
                    <i class="fas fa-play"></i> PLAY NOW
                </button>
            </div>
        `;
        
        gamesContainer.appendChild(gameCard);
    });
}

// Load a game into the iframe
function loadGame(gameId) {
    const game = games.find(g => g.id === gameId);
    
    if (!game) {
        alert("Game not found!");
        return;
    }
    
    // Check if game has an embed URL
    if (!game.embedUrl) {
        alert(`Cannot load ${game.title}. Embed URL not available.\n\nYou need to:` +
              `\n1. Get permission from the developer` +
              `\n2. Obtain the correct embed code/URL` +
              `\n3. Update the games array in script.js`);
        return;
    }
    
    // Update UI
    currentGameTitle.textContent = `Now Playing: ${game.title}`;
    embedPlaceholder.style.display = 'none';
    gameFrame.style.display = 'block';
    gameFrame.src = game.embedUrl;
    
    // Scroll to game embed section
    document.querySelector('.game-embed-section').scrollIntoView({
        behavior: 'smooth'
    });
    
    // Log for debugging
    console.log(`Loading game: ${game.title}`);
    console.log(`Embed URL: ${game.embedUrl}`);
}

// Search functionality
function setupEventListeners() {
    // Search button click
    searchBtn.addEventListener('click', performSearch);
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Fullscreen button
    fullscreenBtn.addEventListener('click', function() {
        if (gameFrame.style.display === 'block') {
            if (gameFrame.requestFullscreen) {
                gameFrame.requestFullscreen();
            } else if (gameFrame.webkitRequestFullscreen) {
                gameFrame.webkitRequestFullscreen();
            }
        } else {
            alert("Please select a game first!");
        }
    });
    
    // Reload button
    reloadBtn.addEventListener('click', function() {
        if (gameFrame.src) {
            gameFrame.src = gameFrame.src;
        }
    });
    
    // Category filters
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            filterByCategory(category);
        });
    });
}

// Perform search
function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (!searchTerm) {
        renderGames();
        return;
    }
    
    const filteredGames = games.filter(game => 
        game.title.toLowerCase().includes(searchTerm) ||
        game.description.toLowerCase().includes(searchTerm) ||
        (Array.isArray(game.category) 
            ? game.category.some(cat => cat.toLowerCase().includes(searchTerm))
            : game.category.toLowerCase().includes(searchTerm))
    );
    
    renderGames(filteredGames);
    
    // Show message if no results
    if (filteredGames.length === 0) {
        gamesContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No games found for "${searchTerm}"</h3>
                <p>Try a different search term</p>
            </div>
        `;
    }
}

// Filter games by category
function filterByCategory(category) {
    const filteredGames = games.filter(game => 
        Array.isArray(game.category) 
            ? game.category.includes(category)
            : game.category === category
    );
    
    renderGames(filteredGames);
    
    // Update active state
    document.querySelectorAll('.category-card').forEach(card => {
        card.style.borderColor = card.dataset.category === category 
            ? '#ff00ff' 
            : 'transparent';
    });
}

// Helper function to scroll to games
function scrollToGames() {
    document.getElementById('games').scrollIntoView({
        behavior: 'smooth'
    });
}

// Add CSS for no results
const noResultsCSS = `
    .no-results {
        grid-column: 1 / -1;
        text-align: center;
        padding: 4rem;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 15px;
    }
    
    .no-results i {
        font-size: 4rem;
        color: rgba(255, 255, 255, 0.2);
        margin-bottom: 1rem;
    }
`;

// Inject the CSS
const style = document.createElement('style');
style.textContent = noResultsCSS;
document.head.appendChild(style);