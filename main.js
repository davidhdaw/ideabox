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
var showAllIdeasButton = document.querySelector('.show-all-ideas');

//event listeners
titleInput.addEventListener('input', checkInput);
bodyInput.addEventListener('input', checkInput);
saveButton.addEventListener('click', triggerSave);
fakeButton.addEventListener('click', preventFakeButtonReload);
cardGrid.addEventListener('click', deleteCardEvent);
cardGrid.addEventListener('click', favoriteCardEvent);
showStarredIdeasButton.addEventListener('click', showStarredIdeas);
showAllIdeasButton.addEventListener('click', showAllIdeas);


function showAllIdeas() {
  cardGrid.innerHTML = "";
  for (var i = 0; i < ideaList.length; i++) {
    displayNewCard(ideaList[i]);
  }
  cardGrid.classList.remove('favorite-mode');
  showAllIdeasButton.classList.add('hidden');
  showStarredIdeasButton.classList.remove('hidden');
}


function showStarredIdeas() {
  cardGrid.innerHTML = "";
  for (var i = 0; i < ideaList.length; i++) {
    if (ideaList[i].star) {
      displayNewCard(ideaList[i]);
    }
  }
  cardGrid.classList.add('favorite-mode');
  showAllIdeasButton.classList.remove('hidden');
  showStarredIdeasButton.classList.add('hidden');
}

function triggerSave(event) {
  event.preventDefault();
  addToIdeaList();
  updateCardGrid();
  clearInputs();
};

function updateCardGrid() {
  cardGrid.innerHTML = "";
  for (var i = 0; i < ideaList.length; i++) {
    displayNewCard(ideaList[i]);
  }
}

function addToIdeaList() {
  var userTitle = titleInput.value;
  var userBody = bodyInput.value;
  var newIdea = new Idea(userTitle, userBody);
  ideaList.push(newIdea);
};



function deleteCardEvent(event) {
  if (event.target.classList.contains('delete-card') && cardGrid.classList.contains('favorite-mode')) {
    var idNum = parseInt(event.target.id);
    deleteFromArray(idNum);
    showStarredIdeas();
    return;
  } else if (event.target.classList.contains('delete-card')) {
      var idNum = parseInt(event.target.id);
      deleteFromArray(idNum);
      updateCardGrid();
      return;
  }
}

function deleteFromArray(cardId) {
  for (var i = 0; i < ideaList.length; i++) {
    if (cardId === ideaList[i].id) {
    ideaList.splice(i, 1);
    }
  }
}

function favoriteCardEvent(event) {
  var idNum = parseInt(event.target.id);
  favoriteIdea(idNum);
  if (event.target.classList.contains('star-empty')) {
    event.target.outerHTML = `<img class='star-active' id=${event.target.id} src="assets/star-active.svg" alt="favoriting idea" height="25px" width="25px">`;
  } else if (event.target.classList.contains('star-active')) {
    event.target.outerHTML = `<img class='star-empty' id=${event.target.id} src="assets/star.svg" alt="favoriting idea" height="25px" width ="25px">`;
  }
}

function favoriteIdea(cardId) {
  for (var i = 0; i < ideaList.length; i++) {
    if (cardId === ideaList[i].id) {
    ideaList[i].updateIdea();
    }
  }
}

function checkStarImage(idea) {
  if (idea.star) {
    return `<img class='star-active' id=${idea.id} src="assets/star-active.svg" alt="favoriting idea" height="25px" width="25px">`;
  } else {
    return `<img class='star-empty' id=${idea.id} src="assets/star.svg" alt="favoriting idea" height="25px" width="25px">`;
  }
}

function displayNewCard(idea) {
  var starCheck = checkStarImage(idea);
  cardGrid.innerHTML += `<article class='cards'>
    <header>` +
    starCheck +
    `<img class='delete-card' id=${idea.id} src="assets/delete.svg" alt="delete favorite idea" height="25px" width="25px">
    </header>
    <section class = 'card-content'>
      <h3>${idea.title}</h3>
      <p>${idea.body}</p>
    </section>
    <footer>
      <img src = "assets/comment.svg" alt ="add comment" height="25px" width="25px">
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
