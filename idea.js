class Idea {
  constructor(id, title, body){
    this.title = title;
    this.body = body;
    // this.quality = quality || swill;
    this.id = id;
  }
  saveToStorage(ideaArray) {
    // create array - push array - then save array 
    localStorage.setItem("ideaArray", JSON.stringify(ideaArray));
  }
  deleteFromStorage() {
    localStorage.removeItem(this.id);
  }
}