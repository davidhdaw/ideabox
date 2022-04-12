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

//event listeners
// titleInput.addEventListener('input', checkInput);
// bodyInput.addEventListener('input', checkInput);
saveButton.addEventListener('click', addToIdeaList);

// function checkInput {
//
// }

function addToIdeaList(event) {
  event.preventDefault();
  var userTitle = titleInput.value;
  var userBody = bodyInput.value;
  var newIdea = new Idea(userTitle, userBody);
  ideaList.push(newIdea);
}















//Display on DOM
//Clear fields
//Disable if nothing in fields
//Create new card and display to cards grid
