var titleInput = document.getElementById("title-input");
var bodyInput = document.getElementById("body-input");
var saveButton = document.querySelector(".save-button");
var ideaArray = localStorage.getItem(ideaArray) || []; 

saveButton.addEventListener("click", newIdea)

function newIdea (e) {
  e.preventDefault();

  var cardIdea = document.createElement("article")
  var newCard = document.querySelector(".card-section")
  cardIdea.className = 'new-card';
  cardIdea.innerHTML = 
  `<article class="card">
      <h2>${titleInput.value}</h2>
      <p>${bodyInput.value}</p>
      <section class="button-corral">
        <div class="vote">
          <button class="downvote"></button>
          <button class="upvote"></button>
          <p class="quality">Quality</p>
        </div>
        <button class="delete"></button>
      </section>
    </article>`;
    newCard.insertBefore(cardIdea, newCard.firstChild);
    ideaClass();
    clearFields();
  }
    
function ideaClass () {
    var newIdea = new Idea(Date.now(), titleInput.value, bodyInput.value);
    newIdea.saveToStorage(ideaArray);
    ideaArray.push(newIdea); 
}

function clearFields () {
  titleInput.value = "";
  bodyInput.value = "";
}