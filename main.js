var titleInput = document.getElementById("title-input");
var bodyInput = document.getElementById("body-input");
var saveButton = document.querySelector(".save-button");
var ideaArray = []; 

saveButton.addEventListener("click", ideaClass);
window.addEventListener("load", cardPersist);

function cardPersist() {
  Object.keys(localStorage).forEach(function(card){
  var item = JSON.parse(localStorage.getItem(card)); 
  var newIdea = new Idea(item.id, item.title, item.body);  
  ideaArray.push(newIdea);
  newCard(newIdea);
  });
  }

function ideaClass() {
    var newIdea = new Idea(Date.now(), titleInput.value, bodyInput.value);
    ideaArray.push(newIdea); 
    newIdea.saveToStorage();
    newCard(newIdea);
    clearFields();
}

function newCard(idea) {
  var newCard = document.querySelector(".card-section")
  newCard.insertAdjacentHTML('afterbegin',
  `<article class="card" id="${idea.id}">
      <h2>${idea.title}</h2>
      <p>${idea.body}</p>
      <section class="button-corral">
        <div class="vote">
          <button class="downvote"></button>
          <button class="upvote"></button>
          <p class="quality">Quality</p>
        </div>
        <button class="delete" data-id="${idea.id}" onclick="deleteCard(${idea.id})"></button>
      </section>
    </article>`);
  }

function clearFields() {
  titleInput.value = "";
  bodyInput.value = "";
}

function deleteCard(thisId) {
  console.log(thisId)
    let cardDelete = ideaArray.find(idea => idea.id === thisId);
    let index = ideaArray.findIndex(idea => idea.id === thisId);
    ideaArray.splice(index,1);
    var wholeCard = document.getElementById(thisId.toString());
    wholeCard.remove();
    cardDelete.deleteFromStorage();

}

