
const questionInput = document.getElementById('questionInput');
const answerInput = document.getElementById('answerInput');
const addButton = document.getElementById('addButton');
const cardFront = document.getElementById('questionText');
const cardBack = document.getElementById('answerText');
const dontKnowButton = document.querySelector('.dontKnowButton');
const knowButton = document.querySelector('.knowButton');
const counter = document.getElementById('counter');
const startButton = document.getElementById('startButton');

let flashcards = []; 
const dontKnowFlashcards = []; 
let currentFlashcardIndex = 0; 
let isLearningCompleted = false; 


// local storage
window.addEventListener('load', function() {
  const storedFlashcards = localStorage.getItem('flashcards');
  if (storedFlashcards) {
    flashcards = JSON.parse(storedFlashcards);
    updateCounter();
  }
});

function saveFlashcardsToLocalStorage() {
  localStorage.setItem('flashcards', JSON.stringify(flashcards));
}
  
// delete данные при обновлении страницы
window.addEventListener('beforeunload', function() {
  localStorage.removeItem('flashcards');
});  

// add button
addButton.addEventListener('click', function() {
    addFlashcard();
});
  
// enter
questionInput.addEventListener('keypress', function(event) {
    if (event.keyCode === 13) {
      addFlashcard();
      event.preventDefault();
    }
});

answerInput.addEventListener('keypress', function(event) {
    if (event.keyCode === 13) {
      addFlashcard();
      event.preventDefault();
    }
});

// add card
function addFlashcard() {
    const question = questionInput.value;
    const answer = answerInput.value;
  
    flashcards.push({ question, answer });
  
    questionInput.value = '';
    answerInput.value = '';
  
    updateCounter();
    saveFlashcardsToLocalStorage();
}

// update
function updateCurrentFlashcard() {
    currentFlashcardIndex++;
    if (currentFlashcardIndex >= flashcards.length) {
      currentFlashcardIndex = 0;
    }
    displayFlashcard();
}
  
// display in container
function displayFlashcard() {
    const currentFlashcard = flashcards[currentFlashcardIndex];
    cardFront.textContent = currentFlashcard.question;
    cardBack.textContent = currentFlashcard.answer;
}

// counter
function updateCounter() {
    const count = flashcards.length;
    counter.textContent = `${count} cards added`;
}

// start
startButton.addEventListener('click', function() {
  if (!isLearningStarted) {
    isLearningStarted = true;
    startLearning();
    startButton.textContent = 'start';
  } else {
    updateCurrentFlashcard();
  }
});

let isLearningStarted = false; 

// start learning
function startLearning() {
  if (flashcards.length > 0) {
      isLearningCompleted = false;
      displayFlashcard();
  } else {
      cardFront.textContent = '';
      cardBack.textContent = '';
  }
}
  
// update current card
function updateCurrentFlashcard() {
    currentFlashcardIndex++;
  if (currentFlashcardIndex >= flashcards.length) {
    currentFlashcardIndex = 0;
  }
  displayFlashcard();
}
  


const startOverButton = document.querySelector('.startOver');

// start over
startOverButton.addEventListener('click', function() {
  isLearningCompleted = false;
  currentFlashcardIndex = 0;
  flashcards = [...dontKnowFlashcards];
  dontKnowFlashcards.length = 0;
  startLearning();
});


// i know button
knowButton.addEventListener('click', function() {
  if (!isLearningCompleted) {
    const currentFlashcard = flashcards[currentFlashcardIndex];
    dontKnowFlashcards.push(currentFlashcard);
    flashcards.splice(currentFlashcardIndex, 1);
      
    if (flashcards.length === 0) {
      isLearningCompleted = true;
      cardFront.textContent = 'Learning completed';
      cardBack.textContent = 'Learning completed';
    } else {
      updateCurrentFlashcard();
      cardFront.textContent = flashcards[currentFlashcardIndex].question;
      flipCard();
      setTimeout(function() {
      card.classList.remove('is-flipped');
      }, 0); 
      }
    }
});
  
// dont know
dontKnowButton.addEventListener('click', function() {
  if (!isLearningCompleted) {
    updateCurrentFlashcard();
    cardFront.textContent = flashcards[currentFlashcardIndex].question;
    flipCard();
    setTimeout(function() {
    card.classList.remove('is-flipped');
    }, 0); 
    }
});
  
// flip
  function flipCard() {
  card.classList.toggle('is-flipped');
} 

//flipped card
const card = document.querySelector(".card__inner");
card.addEventListener("click", function (e) {
card.classList.toggle('is-flipped');
});