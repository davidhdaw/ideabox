class Idea {
  constructor(title, body, star, id) {
    this.title = title
    this.body = body
    this.star = star || false
    this.id = id || Date.now()
  }
  updateIdea() {
    if (!this.star) {
      this.star = true
    } else {
      this.star = false
    }
    this.saveToStorage()
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
