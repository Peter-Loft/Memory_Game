"use strict";


/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
  "black", "royalblue", "chartreuse", "pink", "darkorchid",
  "black", "royalblue", "chartreuse", "pink", "darkorchid",
];

const colors = shuffle(COLORS);
createCards(colors);

/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - an click listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById("game");

  for (let color of colors) {
    const card = document.createElement('div');
    card.dataset.cardpos = "down";
    card.dataset.color = `${color}`;
    
    card.addEventListener('click', handleCardClick);

    gameBoard.appendChild(card);
  }
}

/** Flip a card face-up. */

function flipCard(card) {
  const color = card.dataset.color;
  // card.classList.toggle(`${color}`);
  card.style.backgroundColor = color;
  card.dataset.cardpos = "up";
}

/** Flip a card face-down. */

function unFlipCard(card) {
  const color = card.dataset.color;
  card.style.backgroundColor = "";
  card.dataset.cardpos = "down";
}

/** Handle clicking on a card: this could be first-card or second-card. */
var clickCounter = 0;
var colorCheck;
var fCard;
async function handleCardClick(evt) {

  if (evt.target.dataset.cardpos == "down" && clickCounter < 2) {
    flipCard(evt.target);
  } else {return}

  clickCounter++;
  console.log(clickCounter, "card flipped");
  const color = evt.target.dataset.color;
  const card = evt.target;

  if (clickCounter == 1) {
    colorCheck = color;
    fCard = card;
    console.log(clickCounter, "first card");
    return;
  }
  
  if (clickCounter == 2) {
      setTimeout(function() {checkForMatch(colorCheck, color, fCard, card)}, 1000);
  }
}

function checkForMatch (colorCheck, color, fCard, card){
  
  if (colorCheck == color) {
    fCard.removeEventListener("click", handleCardClick);
    card.removeEventListener("click", handleCardClick);
    console.log("matched, reset");

  } else {
    unFlipCard(fCard);
    unFlipCard(card);
    console.log(clickCounter, "no match");
  }
  clickCounter = 0;
}