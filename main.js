var ideaList = []

//query selectors
var showStarredIdeasButton = document.querySelector('.show-starred-ideas');
var titleInput = document.querySelector('.title-input');
var bodyInput = document.querySelector('.body-input');
var saveButton = document.querySelector('.real-save');
var fakeButton = document.querySelector('.fake-save');
var searchIdeas = document.querySelector('.search-ideas');
var starEmpty = document.querySelector('.star-empty');
var deleteCard = document.querySelector('.delete-card');
var commentButton = document.querySelector('footer');
var cardGrid = document.querySelector('.cards-grid');

//event listeners
titleInput.addEventListener('input', checkInput);
bodyInput.addEventListener('input', checkInput);
saveButton.addEventListener('click', triggerSave);
fakeButton.addEventListener('click', preventFakeButtonReload);

function triggerSave(event) {
  event.preventDefault();
  addToIdeaList();
  cardGrid.innerHTML = "";
  for (var i = 0; i < ideaList.length; i++) {
    displayNewCard(ideaList[i]);
  }
  clearInputs();
};

//Data model functions
function addToIdeaList() {
  var userTitle = titleInput.value;
  var userBody = bodyInput.value;
  var newIdea = new Idea(userTitle, userBody);
  ideaList.push(newIdea);
};

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
};

function clearInputs() {
  titleInput.value = "";
  bodyInput.value = "";
  saveButton.classList.add('hidden');
  fakeButton.classList.remove('hidden');
};

function checkInput(event) {
  event.preventDefault();
  if (titleInput.value && bodyInput.value) {
    saveButton.classList.remove('hidden');
    fakeButton.classList.add('hidden');
  } else {
    saveButton.classList.add('hidden');
    fakeButton.classList.remove('hidden');
  }
}

function preventFakeButtonReload(event) {
  event.preventDefault();
}
