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
  //saveToStorage()
  //deleteFromStorage()
}
