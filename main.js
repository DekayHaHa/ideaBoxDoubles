var titleInput = document.getElementById("title-input");
var bodyInput = document.getElementById("body-input");
var saveButton = document.querySelector(".save-button");
var ideaArray = JSON.parse(localStorage.getItem("ideaArray")) || []; 
// var deleteButton = document.querySelector(".delete");

saveButton.addEventListener("click", ideaClass);
window.addEventListener("load", cardPersist);
// deleteButton.addEventListener("click", deleteCard);

function cardPersist() {
  ideaArray.forEach(function(e) {
  newCard(e.id,e.title,e.body);
  })
}

function newCard(id, title, body) {
  var cardIdea = document.createElement("article")
  var newCard = document.querySelector(".card-section")
  cardIdea.className = 'new-card';
  cardIdea.innerHTML = 
  `<article class="card">
      <h2>${title}</h2>
      <p>${body}</p>
      <section class="button-corral">
        <div class="vote">
          <button class="downvote"></button>
          <button class="upvote"></button>
          <p class="quality">Quality</p>
        </div>
        <button class="delete" data-id="${id}"></button>
      </section>
    </article>`;
    newCard.insertBefore(cardIdea, newCard.firstChild);
    var deleteButton = document.querySelector(".delete");
    deleteButton.addEventListener("click", deleteCard);
  }
    
function ideaClass() {
    var newIdea = new Idea(Date.now(), titleInput.value, bodyInput.value);
    ideaArray.push(newIdea); 
    newIdea.saveToStorage(ideaArray);
    newCard(Date.now(), titleInput.value, bodyInput.value);
    clearFields();
}

function clearFields() {
  titleInput.value = "";
  bodyInput.value = "";
}

function deleteCard(e) {
  // let cardDelete = e.target.closest('.card').dataset.index;
  if (e.target.className === 'delete') {
    e.target.parentElement.parentElement.parentElement.remove();
    let cardId = this.getAttribute('data-id');
    console.log(cardId);
    let cardDelete = ideaArray.find(x => x.id == cardId);
    console.log(cardDelete);
    cardDelete.deleteFromStorage();
    // let id = e.target.closest('.card').dataset.index;


    // 
    // let index = ideaArray.findIndex(x => x.id == cardId);
    // ideaArray.splice(index,1);

    // ideaArray.forEach(function(e) {
    //   if(this.id === id){

    //   }
    // })
    // cardId.deleteFromStorage();
  }
}

//     document.querySelector(".delete").addEventListener("click", function(){
//     );
// });