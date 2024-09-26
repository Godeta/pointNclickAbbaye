let oldAbbayeImg, currentAbbayeImg, overviewImg, planEgliseImg;
let textBox1Visible = false;
let textBox2Visible = false;

let clickableAreas = [];

// Mode management
let currentMode = {
  main: 'exploration',
  view: 'frontView',
  abbaye: 'old'
};
let showOldAbbaye = true;
let languageData;
let currentLanguage = 'en';

function preload() {
  preloadAssets();
  oldAbbayeImg = loadImage('images/old_abbaye.png');
  currentAbbayeImg = loadImage('images/current_abbaye.png');
  overviewImg = loadImage('images/vue3-4.png');
  planEgliseImg = loadImage('images/plan_eglise.png');
  loadLanguageData();
}

function loadLanguageData() {
  loadJSON(currentLanguage + '.json', (data) => {
    languageData = data;
    updateButtonLabels();
    createInfoContainer();
  });
}

function createLanguageButton() {
  let buttonContainer = select('#button-container');
  let langButton = createButton('');
  langButton.parent(buttonContainer);
  langButton.id('langButton');
  langButton.class('lang-button');
  langButton.style('margin-left', 'auto');
  langButton.html('<i class="fa-solid fa-globe"></i>');
  langButton.mousePressed(toggleLanguage);
}

function toggleLanguage() {
  currentLanguage = currentLanguage === 'en' ? 'fr' : 'en';
  let langButton = select('#langButton');
  langButton.html(currentLanguage === 'en' ? '<i class="fa-solid fa-globe"></i>' : '<i class="fa-solid fa-flag"></i>');
  loadLanguageData();
}

function updateButtonLabels() {
  if (select('#frontViewBtn')) {
    select('#frontViewBtn').html(languageData.frontView);
    select('#view34Btn').html(languageData['3-4View']);
    select('#churchPlanBtn').html(languageData.churchPlan);
    select('#switchButton').html(languageData.switchAbbaye);
  }
}

function setup() {
    let canvasSize = calculateCanvasSize();
    let canvas = createCanvas(canvasSize.width, canvasSize.height);
    canvas.parent('canvas-container');
    
    preload();
    setupHotspots();
    textAlign(CENTER, CENTER);
    textSize(16);
    
    createModeButtons();

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
      drawExploration();
      break;
  }
  
  drawHeader();
    // Update and draw each clickable area
    for (let area of clickableAreas) {
      area.checkHover();
      area.draw();
    }
}

function drawIntro() {
  drawCurrentImage();
  
  if (textBox1Visible) {
    drawTextBox(languageData.introText1, 100, height - 220, width - 200, 140);
  }
  
  if (textBox2Visible) {
    drawTextBox(languageData.introText2, 100, height - 380, width - 200, 140);
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
  print(showOldAbbaye);
  let img;
  cursor('default');
  // Clear existing clickable areas before adding new ones
  clearClickableAreas();

  switch (currentMode.view) {
    case 'frontView':
      img = showOldAbbaye ? oldAbbayeImg : currentAbbayeImg;

      // Add clickable areas for the front view
      clickableAreas.push(new ClickableArea(520, 100, 150, 100, () => {
        console.log("Area 1 clicked!");
        window.location = "QuizHistory/index.html";
      },img ));
      
      clickableAreas.push(new ClickableArea(400, 630, 150, 100, () => {
        console.log("Area 2 clicked!");
        window.location = "Puzzle/index.html";
      }));

      clickableAreas.push(new ClickableArea(540, 500, 150, 100, () => {
        console.log("Area 3 clicked!");
        window.location = "Launus_treasure/index.html";
      },img , 0, 150));

      clickableAreas.push(new ClickableArea(220, 200, 150, 100, () => {
        console.log("Area 3 clicked!");
        window.location = "Launus_adventure_game/index.html";
      }));

      clickableAreas.push(new ClickableArea(820, 200, 150, 100, () => {
        console.log("Area 3 clicked!");
        window.location = "Launus_adventure_game/index.html";
      }));
      break;

    case '3-4View':
      img = overviewImg;

      // Add clickable areas for the 3-4 view
      clickableAreas.push(new ClickableArea(680, 300, 130, 200, () => {
        console.log("3-4 View Area clicked!");
        window.location = "parchment_clean.html";
      }));

      clickableAreas.push(new ClickableArea(740, 130, 90, 200, () => {
        console.log("3-4 View Area clicked!");
        window.location = "info_church/index.html";
      }));
      break;

    case 'churchPlan':
      img = planEgliseImg;

      // Add clickable areas for the church plan
      clickableAreas.push(new ClickableArea(850, 350, 150, 100, () => {
        console.log("Church Plan Area clicked!");
        window.location = "church_get_out.html";
      } ));
      break;
  }

  if (img && img.width > 0) {
    image(img, 0, 50, width, height - 50);
  } else {
    fill(200);
    rect(0, 50, width, height - 50);
    fill(0);
    textAlign(CENTER, CENTER);
    text('Loading image...', width / 2, height / 2);
  }
}

/**
 * Clears the existing clickable areas from the clickableAreas array.
 */
function clearClickableAreas() {
  clickableAreas = []; // Reset the clickableAreas array
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
    // gameState = EXPLORATION;
  }
  for (let area of clickableAreas) {
    area.handleClick();
  }
}

function createModeButtons() {
  let buttonContainer = select('#button-container');
  
  let frontViewBtn = createButton('frontView');
  frontViewBtn.parent(buttonContainer);
  frontViewBtn.id('frontViewBtn');
  frontViewBtn.mousePressed(() => currentMode.view = 'frontView');
  
  let view34Btn = createButton('3-4View');
  view34Btn.parent(buttonContainer);
  view34Btn.id('view34Btn');
  view34Btn.mousePressed(() => currentMode.view = '3-4View');
  
  let churchPlanBtn = createButton('churchPlanBtn');
  churchPlanBtn.parent(buttonContainer);
  churchPlanBtn.id('churchPlanBtn');
  churchPlanBtn.mousePressed(() => currentMode.view = 'churchPlan');

  createInfoButton();
  createLanguageButton();
  
  createSwitchButton();
  // updateUI()
}

function createSwitchButton() {
  let buttonContainer = select('#button-container');
  let switchButton = createButton('Switch Abbaye View');
  switchButton.parent(buttonContainer);
  switchButton.id('switchButton');
  switchButton.mousePressed(() => showOldAbbaye = !showOldAbbaye);
}
function createInfoButton() {
  let infoButton = createButton('');
  infoButton.parent('#button-container');
  infoButton.id('infoButton');
  infoButton.class('info-button');
  infoButton.html('<i class="fa-solid fa-book"></i>');
  infoButton.mousePressed(toggleInfoMode);
}

function toggleInfoMode() {
  gameState = gameState === EXPLORATION ? INFO : EXPLORATION;
  updateUI();
}
function updateUI() {
  let canvasContainer = select('#canvas-container');
  let infoContainer = select('#info-container');
  
  if (gameState === EXPLORATION || gameState === INTRO) {
    canvasContainer.style('display', 'block');
    infoContainer.style('display', 'none');
  } else {
    canvasContainer.style('display', 'none');
    infoContainer.style('display', 'block');
  }
  
  updateButtonStates();
}

function updateButtonStates() {
  selectAll('#button-container button').forEach(btn => btn.removeClass('active'));
  select('#' + currentMode.view.replace('-', '') + 'Btn').addClass('active');
}

function createInfoContainer() {
  let infoContainer = select('#info-container');
  infoContainer.html(''); // Clear existing content
  
  let homeButton = createButton(languageData.homeButton);
  homeButton.parent(infoContainer);
  homeButton.class('home-button');
  homeButton.mousePressed(toggleInfoMode);
  
  let infoTitle = createElement('h1', languageData.infoMode);
  infoTitle.parent(infoContainer);
  
  let infoText = createP(languageData.abbayeInfo);
  infoText.parent(infoContainer);
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
  text(languageData.headerTitle, width / 2, 30);
  pop();
}