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

  updateQuality(check) {
    if (check === 0) {
      this.quality = "swill"
    } else if (check === 1) {
      this.quality = "plausible"
    } else {
    this.quality = "genius"
    }
    this.saveToStorage();
  }

}