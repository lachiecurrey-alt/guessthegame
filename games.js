const platformsList = ["xbox", "playstation", "pc", "switch", "ios"];
const games = [];

// Generate 100 random games
for (let i = 1; i <= 100; i++) {
  const name = "Game " + i;
  const platforms = {};
  platformsList.forEach(p => { platforms[p] = Math.random() < 0.6; });
  const multiplayer = Math.random() < 0.5;
  const releaseYear = 2000 + Math.floor(Math.random() * 26);

  games.push({ name, platforms, multiplayer, releaseYear });
}
