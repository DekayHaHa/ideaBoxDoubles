document.querySelector(".save-button").addEventListener("click", ideaClass);
window.addEventListener("load", cardPersist);
var ideaArray = []; 



function cardPersist() {
  Object.keys(localStorage).forEach(function(card){
    var item = JSON.parse(localStorage.getItem(card)); 
    var newIdea = new Idea(item.id, item.title, item.body, item.quality);  
    ideaArray.push(newIdea);
    newCard(newIdea);
  });
}

function ideaClass() {
  var titleInput = document.getElementById("title-input");
  var bodyInput = document.getElementById("body-input");
  var newIdea = new Idea(Date.now(), titleInput.value, bodyInput.value);
  ideaArray.push(newIdea); 
  newIdea.saveToStorage();
  newCard(newIdea);
  clearFields();
}

function newCard(idea) {
  var cardSection = document.querySelector(".card-section");
  cardSection.insertAdjacentHTML('afterbegin',
    `<article class="card"  id="${idea.id}">
    <h2 class="title" data-id="${idea.id}" contenteditable="true" onfocusout="cardChange('title')" onkeydown="enterKey('title')">${idea.title}</h2>
    <p class="body" data-id="${idea.id}" contenteditable="true" onfocusout="cardChange('body')" onkeydown="enterKey('body')">${idea.body}</p>
    <section class="button-corral">
    <div class="vote">
    <img class="downvote" onclick="qualityChangeDown(${idea.id})" src="images/downvote.svg">
    <img class="upvote" onclick="qualityChangeUp(${idea.id})" src="images/upvote.svg">
    <p>Quality: <span id="quality">${idea.quality}</span></p>
    </div>
    <img class="delete" data-id="${idea.id}" onclick="deleteCard(${idea.id})" src="images/delete.svg">
    </section>
    </article>`);
}

function clearFields() {
  var titleInput = document.getElementById("title-input");
  var bodyInput = document.getElementById("body-input");
  titleInput.value = "";
  bodyInput.value = "";
}

function enterKey (category) {
  var key = event.keyCode;
  if (key === 13) { 
    cardChange(category);
  }
}

function deleteCard(thisId) {
  console.log(thisId)
  let cardDelete = ideaArray.find(idea => idea.id === thisId);
  let index = ideaArray.findIndex(idea => idea.id === thisId);
  ideaArray.splice(index,1);
  let wholeCard = document.getElementById(thisId.toString());
  wholeCard.remove();
  cardDelete.deleteFromStorage();
}

function qualityChangeDown(cardId) {
  let card = ideaArray.find(idea => idea.id === cardId);
  let quality = card.quality;
  if (quality === "plausible") {
    card.updateQuality(0);
    event.target.parentElement.childNodes[5].childNodes[1].innerText = "swill";
  }
  if (quality === "genius") {
    card.updateQuality(1);
    event.target.parentElement.childNodes[5].childNodes[1].innerText = "plausible";
  }
}

function qualityChangeUp(cardId) {
  let card = ideaArray.find(idea => idea.id === cardId);
  let quality = card.quality;
  if (quality === "swill") {
    card.updateQuality(1);
    event.target.parentElement.childNodes[5].childNodes[1].innerText = "plausible";
  }
  if (quality === "plausible") {
    card.updateQuality();
    event.target.parentElement.childNodes[5].childNodes[1].innerText = "genius";
  }
}


function cardChange(category) {
  if (category === 'title') {
    let cardId = JSON.parse(event.target.dataset.id);
    let card = ideaArray.find(idea => idea.id === cardId);
    let newText = event.target.innerText;
    card.updateContent(newText, category);
  }
  if (category === 'body') {
    let cardId = JSON.parse(event.target.dataset.id);
    let card = ideaArray.find(idea => idea.id === cardId);
    let newText = event.target.innerText;
    card.updateContent(newText, category);
  }
}

function searchFilter (text) {
  let filteredArray = ideaArray.filter(function(idea) {
    let inputText = text.toLowerCase();
    if (idea.title.toLowerCase().includes(inputText) || idea.body.toLowerCase().includes(inputText)) {
      return idea;
    }
  })
  clearCards();
  filteredIdeas(filteredArray);
}

function clearCards () {
  var cardSection = document.querySelector(".card-section");
  cardSection.innerHTML = "";
}

function filteredIdeas (array) {
  array.forEach(function (idea) {
    newCard(idea);
  })
}

function showButton () {
  event.preventDefault();
  var cardHolder = document.getElementById("max-height");
  if (event.target.innerText === "Show More") {
    cardHolder.classList.remove("max-height");
    event.target.innerText = "Show Less";
  } else {
    cardHolder.classList.add("max-height")
    event.target.innerText = "Show More"
  }
}

function characterCount (value) {
  let bodyCount = document.querySelector(".body-count");
  let titleCount = document.querySelector(".title-count")
  if (event.target.id === "body-input") {
    value.length === 0 ? bodyCount.innerText = "" : bodyCount.innerText = ` | Character Count ${value.length}`;
  } 
  if (event.target.id === "title-input") {
    value.length === 0 ? titleCount.innerText = "" : titleCount.innerText = ` | Character Count ${value.length}`;
  }
}
