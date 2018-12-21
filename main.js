var titleInput = document.getElementById("title-input");
var bodyInput = document.getElementById("body-input");
var saveButton = document.querySelector(".save-button");
// var ideaArray = JSON.parse(localStorage.getItem("ideaArray")) || []; 
var ideaArray = []; 
// var deleteButton = document.querySelector(".delete");

saveButton.addEventListener("click", ideaClass);
window.addEventListener("load", cardPersist);
// deleteButton.addEventListener("click", deleteCard);

function cardPersist() {
  // forEach(function(e, idx) {
    for(var i = 0; i < localStorage.length; i++){
    console.log("initial for each entered")
    var key = localStorage.key(i);
    var item = JSON.parse(localStorage.getItem(key));
    var newIdea = new Idea(item.id, item.title, item.body);
    ideaArray.push(newIdea);
    newCard(ideaArray[i]);
   }
  }
  // })
// }

function ideaClass() {
    var newIdea = new Idea(Date.now(), titleInput.value, bodyInput.value);
    ideaArray.push(newIdea); 
    newIdea.saveToStorage();
    newCard(newIdea);
    clearFields();
}

function newCard(idea) {

  var cardIdea = document.createElement("article")
  var newCard = document.querySelector(".card-section")
  cardIdea.className = 'new-card';
  cardIdea.innerHTML = 
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
    </article>`;
    newCard.insertBefore(cardIdea, newCard.firstChild);
    // var deleteButton = document.querySelector(".delete");
    // deleteButton.addEventListener("click", deleteCard);
  }

function clearFields() {
  titleInput.value = "";
  bodyInput.value = "";
}

function deleteCard(thisId) {
  console.log(thisId)
  // let cardDelete = e.target.closest('.card').dataset.index;
  // if (e.target.className === 'delete') {
    // e.target.parentElement.parentElement.parentElement.remove();

    // let cardId = this.getAttribute('data-id');



    let cardDelete = ideaArray.find(x => x.id == thisId);
    

    let index = ideaArray.findIndex(x => x.id == thisId);
    
    ideaArray.splice(index,1);
    // var cardId = (thisId).toString();
    // console.log(cardId);
    var wholeCard = document.getElementById(thisId.toString());
    wholeCard.remove();

    cardDelete.deleteFromStorage();

    // console.log(cardId);
    // console.log(index);
    // console.log(ideaArray);
    // console.log(oldIdea);

    // ideaArray.forEach(function(e){
    //   if (e.id == cardId) {
    //     console.log(e)
    //     e.deleteFromStorage()
    //   }
    // })
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

//     document.querySelector(".delete").addEventListener("click", function(){
//     );
// });