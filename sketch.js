let oldAbbayeImg, currentAbbayeImg, overviewImg, planEgliseImg;
let textBox1Visible = false;
let textBox2Visible = false;
let currentMode = 'frontView';
let showOldAbbaye = true;

function preload() {
  oldAbbayeImg = loadImage('images/old_abbaye.png');
  currentAbbayeImg = loadImage('images/current_abbaye.png');
  overviewImg = loadImage('images/vue3-4.png');
  planEgliseImg = loadImage('images/plan_eglise.png');
}

function setup() {
    let canvasSize = calculateCanvasSize();
    let canvas = createCanvas(canvasSize.width, canvasSize.height);
    canvas.parent('canvas-container');
    
    preloadAssets();
    setupHotspots();
    textAlign(CENTER, CENTER);
    textSize(16);
    
    createModeButtons();
    createSwitchButton();
  }
  
  function calculateCanvasSize() {
    let w = min(windowWidth * 0.9, 1200);
    let h = min(windowHeight * 0.7, 800);
    if (windowWidth <= 768) {
      w = windowWidth;
      h = windowHeight - 100; // Leave space for buttons
    }
    return { width: w, height: h };
  }

  function windowResized() {
    let canvasSize = calculateCanvasSize();
    resizeCanvas(canvasSize.width, canvasSize.height);
  }

function draw() {
  background(220);
  
  switch (gameState) {
    case INTRO:
      drawIntro();
      break;
    case EXPLORATION:
      drawExploration();
      break;
    case INFO:
      drawInfo();
      break;
  }
  
  drawHeader();
}

function drawIntro() {
  drawCurrentImage();
  
  if (textBox1Visible) {
    drawTextBox("This is the Abbaye de Déols", 100, height - 220, width - 200, 140);
  }
  
  if (textBox2Visible) {
    drawTextBox("We will learn a lot of things about the abbaye. It has a rich history spanning several centuries.", 100, height - 380, width - 200, 140);
  }
}

function drawExploration() {
  drawCurrentImage();
  drawHotspots();
}

function drawHotspots() {
  for (let hotspot of hotspots[currentScene]) {
    noFill();
    stroke(255, 100);
    rect(hotspot.x, hotspot.y, hotspot.w, hotspot.h);
  }
}

function drawCurrentImage() {
  let img;
  switch (currentMode) {
    case 'frontView':
      img = showOldAbbaye ? oldAbbayeImg : currentAbbayeImg;
      break;
    case '3-4View':
      img = overviewImg;
      break;
    case 'churchPlan':
      img = planEgliseImg;
      break;
  }
  image(img, 0, 50, width, height - 50);
}

function drawTextBox(message, x, y, w, h) {
  fill(0, 0, 0, 200);
  rect(x, y, w, h, 20);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(24);
  text(message, x , y , w - 40, h - 40);
}

function mousePressed() {
  if (gameState === INTRO) {
    if (!textBox1Visible) {
      textBox1Visible = true;
    } else if (!textBox2Visible) {
      textBox2Visible = true;
    } else {
      gameState = EXPLORATION;
      textBox1Visible = false;
      textBox2Visible = false;
    }
  } else if (gameState === EXPLORATION) {
    checkHotspots();
  } else if (gameState === INFO) {
    gameState = EXPLORATION;
  }
}

function createModeButtons() {
  let buttonContainer = select('#button-container');
  
  let frontViewBtn = createButton('Front View');
  frontViewBtn.parent(buttonContainer);
  frontViewBtn.mousePressed(() => currentMode = 'frontView');
  
  let view34Btn = createButton('3/4 View');
  view34Btn.parent(buttonContainer);
  view34Btn.mousePressed(() => currentMode = '3-4View');
  
  let churchPlanBtn = createButton('Church Plan');
  churchPlanBtn.parent(buttonContainer);
  churchPlanBtn.mousePressed(() => currentMode = 'churchPlan');
}

function createSwitchButton() {
  let buttonContainer = select('#button-container');
  let switchButton = createButton('Switch Abbaye View');
  switchButton.parent(buttonContainer);
  switchButton.id('switchButton');
  switchButton.mousePressed(() => {
    if (currentMode === 'frontView') {
      showOldAbbaye = !showOldAbbaye;
    }
  });
}

function preloadAssets() {
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

function checkHotspots() {
  for (let hotspot of hotspots[currentScene]) {
    if (mouseX > hotspot.x && mouseX < hotspot.x + hotspot.w &&
        mouseY > hotspot.y && mouseY < hotspot.y + hotspot.h) {
      if (hotspot.nextScene >= 0) {
        currentScene = hotspot.nextScene;
      }
      if (hotspot.info >= 0) {
        gameState = INFO;
      }
      break;
    }
  }
}

function drawHeader() {
  push();
  fill(0, 0, 0, 200);
  rect(0, 0, width, 60);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(24);
  text('Abbaye de Déols Interactive Tour', width / 2, 30);
  pop();
}