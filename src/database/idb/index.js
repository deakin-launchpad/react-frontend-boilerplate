import IDBService from './service';
var CONFIG = require('./config.json')
const DBDropStatus = process.env.REACT_APP_DROP_IDB_DATABASE;

const init = () => {
  if (!('indexedDB' in window)) {
    console.log('This browser doesn\'t support IndexedDB');
    return;
  }
  else {
    if (DBDropStatus) {
      IDBService.reset();
    }
    CONFIG.genericStores.forEach((value, i) => {
      IDBService.createGenericObject(value, i + 1, true);
    })
  }
}

init();
