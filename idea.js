class Idea {
  constructor(id, title, body){
    this.title = title;
    this.body = body;
    // this.quality = quality || swill;
    this.id = id;
  }
  saveToStorage () {
    localStorage.setItem(JSON.stringify(Date.now()), JSON.stringify(this));
  }
}