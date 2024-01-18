
class MenuItem {
  /**
   * @param {Object} data 
   * @param {String} data.name
   * @param {String} data.type
   * @param {String} data.icon
   * @param {String} data.helpingAttribute
   * @param {String} data.customTitle
   * @param {boolean} data.isFavorite
   */
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.icon = data.icon;
    this.helpingAttribute = data.helpingAttribute;
    this.customTitle = data.customTitle;
    this.isFavorite = data.isFavorite;
  }
}

class Layout {
  constructor() {
    this.landingPage = "/home";
    this.menuItems = {
      DEFAULT: [
        new MenuItem({
          "name": "Home",
          "type": "button",
          "icon": "home",
          "helpingAttribute": "/home",
          "customTitle": "Welcome to Boiler Plate",
          "isFavorite": true
        }),
        new MenuItem({
          "name": "Example",
          "type": "button",
          "icon": "description",
          "helpingAttribute": "/examples",
          "customTitle": "Example Code File",
          "isFavorite": true
        }),
        new MenuItem({
          "name": "Users Manager",
          "type": "button",
          "icon": "people",
          "helpingAttribute": "/users",
          "customTitle": "Users Manager",
          "isFavorite": true
        }),
        new MenuItem({
          "name": "Logout",
          "type": "logout",
          "icon": "logout",
          "helpingAttribute": "",
          "customTitle": "Welcome to Boiler Plate",
          "isFavorite": false
        })
      ],
    };
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
      minHeight: 'calc(100% - 64px)'
    };
  }

  /**
   * 
   * @param {String} userType 
   * @returns {Array<MenuItem>}
   */
  getMenuItems(userType) {
    switch (userType.toLowerCase()) {
      default: return this.menuItems.DEFAULT;
    }
  }
}

const instance = new Layout();
export default instance;