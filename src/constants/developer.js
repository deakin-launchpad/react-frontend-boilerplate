class Developer {
  constructor() {
    this.visible = true;
    this.label = "switch theme";
    this.verticalPosition = "bottom";
    this.horizontalPosition = "right";
    this.devDetails = {
      "user": "launchpad@user.com",
      "password": "password"
    };

  }
}


const instance = new Developer();
export default instance;