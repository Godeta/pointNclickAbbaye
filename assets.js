// Game states
const INTRO = 'INTRO';
const EXPLORATION = 'EXPLORATION';
const INFO = 'INFO';

// Game variables
let gameState = INTRO;
let currentScene = 0;
let hotspots = [];

// Assets
let scenes = [];
let infoTexts = [];

function preloadAssets() {
  // Load scene images
//   scenes[0] = loadImage('assets/scene1.jpg');
//   scenes[1] = loadImage('assets/scene2.jpg');
  // Add more scenes as needed

  // Load info texts
  infoTexts[0] = "The Abbaye de Déols was founded in 917...";
  infoTexts[1] = "In the 12th century, the abbey became...";
  // Add more info texts as needed
}

function setupHotspots() {
  // Define clickable areas for each scene
  hotspots[0] = [
    { x: 100, y: 200, w: 50, h: 50, nextScene: 1, info: 0 },
    { x: 300, y: 150, w: 60, h: 60, nextScene: -1, info: 1 },
  ];
  hotspots[1] = [
    { x: 200, y: 300, w: 70, h: 70, nextScene: 0, info: 2 },
  ];
  // Add more hotspots for other scenes
}
