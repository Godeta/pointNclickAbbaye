// Load the appropriate language file
let currentLanguage = 'en';
let languageData ;

function loadLanguageData() {
  loadJSON('../'+currentLanguage + '.json', (data) => {
    languageData = data;
    console.log(languageData)
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
  insertContent();
}

function insertContent() {
  // Populate the HTML with content from the JSON file
document.getElementById('header-title').innerText = languageData.headerTitle;
document.getElementById('intro-text1').innerText = languageData.introText1;
document.getElementById('intro-text2').innerText = languageData.introText2;
document.getElementById('abbaye-info').innerText = languageData.abbayeInfo;
document.getElementById('home-button').innerText = languageData.homeButton;

 // Add hover effect to paragraphs
 const infoTexts = document.querySelectorAll('.info-text');
 infoTexts.forEach(text => {
     text.addEventListener('mouseover', () => {
         text.style.color = '#a0522d'; // Change color on hover
     });
     text.addEventListener('mouseout', () => {
         text.style.color = ''; // Reset color
     });
 });
}

function preload() {
  createLanguageButton()
  loadLanguageData()
}

function setup() {


console.log(languageData)
insertContent();


}
