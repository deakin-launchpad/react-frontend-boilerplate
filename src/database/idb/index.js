import IDBService from './service';
var CONFIG = require('./config.json')
const DBDropStatus = (process.env.REACT_APP_DROP_IDB_DATABASE === undefined ?
  (CONFIG.drop ? CONFIG.drop : true) : process.env.REACT_APP_DROP_IDB_DATABASE);

const init = () => {
  if (!('indexedDB' in window)) {
    console.log('This browser doesn\'t support IndexedDB');
    return;
  }
  else {
    if (DBDropStatus) {
      IDBService.reset();
      IDBService.createGenericObject(CONFIG.genericStores, 1, true);
    } else {
      IDBService.createStores(CONFIG.genericStores)
    }
  }
}

init();

export {
  IDBService
}
