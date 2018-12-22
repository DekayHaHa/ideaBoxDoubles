class Idea {
  constructor(id, title, body, quality){
    this.id = id;
    this.title = title;
    this.body = body;
    this.quality = quality || "swill";
  }

  saveToStorage() {
    // create array - push array - then save array 
    localStorage.setItem(this.id, JSON.stringify(this));
  }

  deleteFromStorage() {
    localStorage.removeItem(this.id);
  }

  updateQuality() {
    
  }

}