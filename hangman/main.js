const word = document.getElementById('word');
const popup = document.getElementById('popup-container');
const message = document.getElementById('success-message');
const wrongletters_el = document.getElementById('wrong-letters');
const message_el = document.getElementById('message');
const items = document.querySelectorAll('.item');
const playAgain = document.getElementById('play-again');
const categoryName = document.getElementById('categoryName')

const correctLetters = [];
const wrongLetters = [];
let selectedWord = getRandomWord();

var categories;         
var chosenCategory;
var words;

function selectedCategory(){
    if (chosenCategory === categories[0]){
        categoryName.innerHTML = 'The chosen Category is Musics in English';
    }else if(chosenCategory === categories[1]){
        categoryName.innerHTML = 'The chosen Category is Films';
    }else if(chosenCategory === categories[2]){
        categoryName.innerHTML = 'The chosen Category is Cities';

    }
}


function getRandomWord() {
    categories = [
        ["human", "wannabe", "polly", "lucky", "lovefool",],
        ["coda", "up", "avengers", "leon", "avatar"],
        ["ankara", "erzurum", "konya", "karaman", "yalova"]
    ];

    chosenCategory = categories[Math.floor(Math.random() * categories.length)];
    words = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    
    selectedCategory();
    return words;

}

displayWord();


function displayWord(){

    word.innerHTML = `
        ${selectedWord.split('').map(letter => `
            <div class = "letter">
                ${correctLetters.includes(letter) ? letter : ''}
            </div>

    
        `).join('')}

    `;

    const w = word.innerText.replace(/\n/g, '');

    if(w === selectedWord){
        popup.style.display = 'flex';
        message.innerText = "congratulations, You Win!"
    }

}

function updateWrongLetters(){
    wrongletters_el.innerHTML = `
        ${wrongLetters.length > 0 ? '<h3>Wrong Letter</h3>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}<span>`)}
    `;

    items.forEach((item, index) => {
        const errorCount = wrongLetters.length;

        if(index<errorCount){
            item.style.display = 'block';
        }else{
            item.style.display= 'none'
        }
    })

    if(wrongLetters.length === items.length){
        popup.style.display = 'flex';
        popup.style.color = '#820000';
        message.innerText = "!! GAME OVER !!"
    }
}

function displayMessage(){

    message_el.classList.add('show');

    setTimeout(function(){
        message_el.classList.remove('show')

    },1000);
}

playAgain.addEventListener('click', () =>{
    correctLetters.splice(0);//diziyi sıfırlarız.
    wrongLetters.splice(0);

    selectedWord = getRandomWord();

    displayWord();
    updateWrongLetters();
    popup.style.display = 'none';

})

window.addEventListener('keydown', (e)=>{
    if(e.keyCode >= 65 && e.keyCode<=90 ){
        const letter = e.key;

        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displayWord();
            }else{
                displayMessage();
            }
        }else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                updateWrongLetters();
            }else{
                displayMessage();
            }
        }
    }

})
displayWord();