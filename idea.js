class Idea {
  constructor(id, title, body, quality){
    this.id = id;
    this.title = title;
    this.body = body;
    this.quality = quality || "swill";
  }

  saveToStorage() {
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

  updateContent(newText, category) {
    this[category] = newText;
    // category === "title" ? this.title = newText : this.body = newText;
    this.saveToStorage();
  }
}
