class Idea {
  constructor(title, body) {
    this.title = title
    this.body = body
    this.star = false
    this.id = Date.now()
  }
  updateIdea() {
    if (!this.star) {
      this.star = true
    } else {
      this.star = false
    }
  }
  saveToStorage() {
    var ideaAsString = JSON.stringify(this);
    localStorage.setItem(this.id, ideaAsString);
  }
  deleteFromStorage() {
    localStorage.removeItem(this.id);
  }
}


//save an object to local storage with
