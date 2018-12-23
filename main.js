document.querySelector(".save-button").addEventListener("click", ideaClass);
window.addEventListener("load", cardPersist);
var ideaArray = []; 
// document.getElementById("search-input").addEventListener("keydown", searchFilter)



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
  console.log(event.target.parentElement.childElement)
  let card = ideaArray.find(idea => idea.id === cardId);
  let quality = card.quality;
  // let qualityText = document.querySelector(".quality")
  // qualityText.innerText = `Quality: ${quality}`
  if (quality === "plausible") {
    card.updateQuality(0);
    document.getElementById("quality").innerText = "swill";
  }
  if (quality === "genius") {
    card.updateQuality(1);
    document.getElementById("quality").innerText = "plausible";
  }
}

function qualityChangeUp(cardId) {
  let card = ideaArray.find(idea => idea.id === cardId);
  let quality = card.quality;
  // let qualityText = document.querySelector(".quality")
  // qualityText.innerText = `Quality: ${quality}`
  if (quality === "swill") {
    card.updateQuality(1);
    document.getElementById("quality").innerText = "plausible";
  }
  if (quality === "plausible") {
    card.updateQuality();
    document.getElementById("quality").innerText = "genius";
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


