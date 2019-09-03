import IDBService from './service';
var CONFIG = require('./config.json');

const init = () => {
  if (!('indexedDB' in window)) {
    console.log('This browser doesn\'t support IndexedDB');
    return;
  }
  else {
    if (CONFIG.drop) {
      IDBService.reset();
      IDBService.createGenericObject(CONFIG.genericStores, 1, true);
    } else {
      IDBService.createStores(CONFIG.genericStores);
    }
  }
};

init();

export {
  IDBService
};
