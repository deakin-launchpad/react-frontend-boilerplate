class Developer {
  constructor() {
    this.visible = true;
    this.label = "Developer";
    this.verticlePosition = "bottom";
    this.horizontalPosition = "right";
    this.devDetails = {
      "user": "sanchit",
      "password": "password"
    };

  }
}


const instance = new Developer();
export default instance;