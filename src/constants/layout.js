
class Layout {
  constructor() {
    this.landingPage = "/home";
    this.menuItems = [
      {
        "name": "Home",
        "type": "button",
        "icon": "ant-design:home-filled",
        "controller": "/home",
        "customTitle": "Welcome to Boiler Plate",
        "isFavourite": true,
        "subMenuItems": []
      },
      {
        "name": "Example",
        "type": "button",
        "icon": "bytesize:code",
        "controller": "/examples",
        "customTitle": "Example Code File",
        "isFavourite": true,
        "subMenuItems": []
      },
      {
        "name": "Logout",
        "type": "logout",
        "icon": "fe:logout",
        "controller": "",
        "customTitle": "Welcome to Boiler Plate",
        "isFavourite": false,
        "subMenuItems": []
      }
    ];
    this.header = {
      "visibleOnDesktop": true,
      "visibleOnMobile": true,
      "useCustomColor": false,
      "color": "primary",
      "customColorCode": ""
    };
    this.bottomMobileNavigation = true;
    this.displayMobileMenuHam = true;
    this.menuButtonLabel = "Menu";
    this.sideMenu = {
      "permanent": true,
      "default": "open"
    };

    this.defaultContainerSX = {
      backgroundColor: 'background.default',
      display: 'flex', flexDirection: 'column',
      minHeight: '100vh'
    };
  }
}

const instance = new Layout();
export default instance;