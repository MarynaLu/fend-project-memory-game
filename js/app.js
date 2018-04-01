//Declaring variables: array holding all cards
let card = document.querySelectorAll('.card');
let cards = [...card];

//array holding all matched cards
let matchedCards = document.getElementsByClassName("match");

//deck variable
const theDeck = document.querySelector(".deck");

//counting the number of moves
let moves = 0;
let counter = document.querySelector(".moves");

//stars
const stars = document.querySelectorAll(".fa-star");

//restart button
const restart = document.querySelector(".restart");

//timer variables
let second = 0;
let minute = 0;
let hour = 0
let timer = document.querySelector(".timer");
let interval;

//array holding all open cards
var openCards = [];

//congratulations on winning game modal
const modal = document.getElementById('winnerPopup');
const closeButton = document.getElementsByClassName("close")[0];

//function from https://stackoverflow.com/questions/16053357/what-does-foreach-call-do-in-javascript
function gameStart(){
	let shuffledCards = shuffle(cards);
	console.log(shuffledCards);
	const fragment = document.createDocumentFragment();
		for (let i=0; i < shuffledCards.length; i++){
		Array.prototype.forEach.call(shuffledCards, function(el){
			fragment.appendChild(el);
		});

		theDeck.appendChild(fragment);

		cards[i].classList.remove("show", "match", "open", "disabled");
	}

	//reset # of moves
	moves = 0;
	counter.innerHTML = moves;

	//reset # of stars 
	stars[0].style.display = "block";
	stars[1].style.display = "block";

	//resets timer
	clearInterval(interval);
}

//start a game on window load
window.onload = gameStart();

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//attach event listeners to the card
card.forEach(function(elem) {
	elem.addEventListener('click', displaySymbol);
	elem.addEventListener('click', openListAdd);
	elem.addEventListener("click", gameWon);
});

//display the card symbol on click
function displaySymbol() {
	this.classList.toggle("open");
	this.classList.toggle("show");
	this.classList.toggle("disabled");
};

//add the card to the list of all open cards, check if there's a match
function openListAdd() {
	openCards.push(this);
	let cardsLength = openCards.length;
	if(cardsLength === 2){
		counterMove();
		if (openCards[0].innerHTML === openCards[1].innerHTML) {
			match();
		} else {
			unmatch();
		}
	}	
};

//change the styling of matched cards
function match(){
	openCards[0].classList.add("match");
	openCards[1].classList.add("match");
	openCards[0].classList.remove("show", "open");
	openCards[1].classList.remove("show", "open");
	openCards = [];
};

//change the styling of unmatched cards
function unmatch(){
	openCards[0].classList.add("unmatched");
	openCards[1].classList.add("unmatched");
	disable();
	setTimeout(function(){
		openCards[0].classList.remove("show", "open", "unmatched");
		openCards[1].classList.remove("show", "open", "unmatched");
		enable();
		openCards = [];
	}, 1200);
}

//temporary disable cards
function disable(){
	Array.prototype.filter.call(cards, function(card){
		card.classList.add('disabled');
	});
}

//enable all cards and disable the matched ones
function enable(){
	Array.prototype.filter.call(cards, function(card){
	card.classList.remove('disabled');
	for (const matchedCard of matchedCards){
		matchedCard.classList.add("disabled");
	}
});
}

//moves counter
function counterMove() {
	moves++;
	counter.innerHTML = moves;

	if (moves === 1){
		second = 0;
		minute = 0;
		hour = 0;
		timerStart();
	}

	if (moves > 8 && moves < 16){
		stars[1].style.display = "none";
	} else if (moves > 17){
		stars[0].style.display = "none";
		}
	}

//timer function
function timerStart(){
	interval = setInterval(function(){
		timer.innerHTML = `${minute} mins ${second} secs`;
		second++;
		if(second === 60){
			minute++;
			second = 0;
		}
		if(minute === 60){
			hour++;
			minute = 0;
		}
	}, 1000);
}

//adding an event listener to restart the game on the click of restart button
restart.addEventListener('click', gameStart);

//function showing the modal with congratulations
function gameWon(){
	if(matchedCards.length == 16){
		clearInterval(interval);
		let finalTime = timer.innerHTML;

		//show congratulations popup
		modal.classList.add("show");

		//variable to save star rating
		let starRating = document.querySelector(".stars").innerHTML;

		//showing the current # of moves, rating, and final time
		document.getElementById("finalMove").innerHTML = moves;
		document.getElementById("starRating").innerHTML = starRating;
		document.getElementById("totalTime").innerHTML = finalTime;

		//close icon
		closeModal();
	};
}

//closing congratulations modal
function closeModal(){
	closeButton.addEventListener("click", function(){
		modal.classList.remove("show");
		gameStart();
	});
}

//closing congratulations modal if the user clicks outside of the modal
window.onclick = function (e) {
		if (e.target == modal) {
			modal.classList.remove("show");
		}
	}
/*min
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
