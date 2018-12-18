var titleInput = document.getElementById("title-input");
var bodyInput = document.getElementById("body-input");
var saveButton = document.querySelector(".save-button");

saveButton.addEventListener("click", newIdea)

function newIdea (e) {
  e.preventDefault();
  var cardIdea = document.createElement("article")
  var newCard = document.querySelector(".card-section")
  cardIdea.className = 'new-card';
  cardIdea.innerHTML = 
  `<article class="card">
      <h2>${titleInput.value}</h2>
      <p>Body</p>
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
  }
    
