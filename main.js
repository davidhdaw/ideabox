var ideaList = []

//query selectors
var showStarredIdeasButton = document.querySelector('.show-starred-ideas');
var titleInput = document.querySelector('.title-input');
var bodyInput = document.querySelector('.body-input');
var saveButton = document.querySelector('.save');
var searchIdeas = document.querySelector('.search-ideas');
var starEmpty = document.querySelector('.star-empty');
var deleteCard = document.querySelector('.delete-card');
var commentButton = document.querySelector('footer');
var cardGrid = document.querySelector('.cards-grid');

//event listeners
// titleInput.addEventListener('input', checkInput);
// bodyInput.addEventListener('input', checkInput);
saveButton.addEventListener('click', addToIdeaList);

// function checkInput {
//
// }

//Data model functions
function addToIdeaList(event) {
  event.preventDefault();
  var userTitle = titleInput.value;
  var userBody = bodyInput.value;
  var newIdea = new Idea(userTitle, userBody);
  ideaList.push(newIdea);
}

//DOM functions
function displayNewCard(idea) {
  cardGrid.innerHTML += `<article class='cards'>
    <header>
      <img class='star-empty' src = "assets/star.svg" alt = "favoriting idea" height = "25px" width = "25px">
      <img class='delete-card' src = "assets/delete.svg" alt = "delete favorite idea" height="25px" width="25px">
    </header>
    <section class = 'card-content'>
      <h3>${idea.title}</h3>
      <p>${idea.body}</p>
    </section>
    <footer>
      <img src = "assets/comment.svg" alt = "add comment" height="25px" width="25px">
      <span>Comment</span>
    </footer>
  </article>`
}












//Clear fields
//Disable if nothing in fields
//Create new card and display to cards grid
