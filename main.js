var ideaList = []

//query selectors
var showStarredIdeasButton = document.querySelector('.show-starred-ideas');
var titleInput = document.querySelector('.title-input');
var bodyInput = document.querySelector('.body-input');
var saveButton = document.querySelector('.real-save');
var fakeButton = document.querySelector('.fake-save');
var searchIdeas = document.querySelector('.search-ideas');
var searchFavoriteIdeas = document.querySelector('.search-favorite-ideas');
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
searchIdeas.addEventListener('input', searchCards);
searchFavoriteIdeas.addEventListener('input', searchFavoriteCards);

//Data model functions
function addToIdeaList() {
  var userTitle = titleInput.value;
  var userBody = bodyInput.value;
  var newIdea = new Idea(userTitle, userBody);
  ideaList.push(newIdea);
  newIdea.saveToStorage();
};

function deleteFromArray(cardId) {
  for (var i = 0; i < ideaList.length; i++) {
    if (cardId === ideaList[i].id) {
    ideaList[i].deleteFromStorage();
    ideaList.splice(i, 1);
    }
  }
}

function favoriteIdea(cardId) {
  for (var i = 0; i < ideaList.length; i++) {
    if (cardId === ideaList[i].id) {
    ideaList[i].updateIdea();
    }
  }
}

//DOM manipulation functions
function show(element) {
  element.classList.remove('hidden')
}

function hide(element) {
  element.classList.add('hidden');
}

function searchCards() {
  var searchValue = searchIdeas.value;
  cardGrid.innerHTML = "";
  for (var i = 0; i < ideaList.length; i++) {
    if (ideaList[i].body.includes(searchValue) || ideaList[i].title.includes(searchValue)) {
      displayNewCard(ideaList[i]);
    }
  }
}

function searchFavoriteCards() {
  var searchValue = searchFavoriteIdeas.value;
  cardGrid.innerHTML = "";
  for (var i = 0; i < ideaList.length; i++) {
    if ((ideaList[i].star && ideaList[i].body.includes(searchValue)) || (ideaList[i].star && ideaList[i].title.includes(searchValue))) {
      displayNewCard(ideaList[i]);
    }
  }
}

function showAllIdeas() {
  cardGrid.innerHTML = "";
  for (var i = 0; i < ideaList.length; i++) {
    displayNewCard(ideaList[i]);
  }
  cardGrid.classList.remove('favorite-mode');
  hide(showAllIdeasButton);
  show(showStarredIdeasButton);
  hide(searchFavoriteIdeas);
  show(searchIdeas);
}

function showStarredIdeas() {
  cardGrid.innerHTML = "";
  for (var i = 0; i < ideaList.length; i++) {
    if (ideaList[i].star) {
      displayNewCard(ideaList[i]);
    }
  }
  cardGrid.classList.add('favorite-mode');
  show(showAllIdeasButton);
  hide(showStarredIdeasButton);
  show(searchFavoriteIdeas);
  hide(searchIdeas);
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

function favoriteCardEvent(event) {
  var idNum = parseInt(event.target.id);
  favoriteIdea(idNum);
  if (event.target.classList.contains('star-empty')) {
    event.target.outerHTML = `<img class='star-active' id=${event.target.id} src="assets/star-active.svg" alt="favoriting idea" height="25px" width="25px">`;
  } else if (event.target.classList.contains('star-active')) {
    event.target.outerHTML = `<img class='star-empty' id=${event.target.id} src="assets/star.svg" alt="favoriting idea" height="25px" width ="25px">`;
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
  hide(saveButton);
  show(fakeButton);
};

function checkInput(event) {
  event.preventDefault();
  if (titleInput.value && bodyInput.value) {
    show(saveButton);
    hide(fakeButton);
  } else {
    hide(saveButton);
    show(fakeButton);
  }
}

function preventFakeButtonReload(event) {
  event.preventDefault();
}

function storageToArray() {
  var holdingArray = Object.values(localStorage)
  for (var i = 0; i<holdingArray.length; i++) {
    var parsedObject = JSON.parse(holdingArray[i]);
    var parsedIdea = new Idea (parsedObject.title, parsedObject.body, parsedObject.star, parsedObject.id);
    ideaList.push(parsedIdea);
  }
}
