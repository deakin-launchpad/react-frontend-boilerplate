import IDBService from './service';
var CONFIG = require('./config.json');
/**
 * This IndexedDB service is using Google's Promise based wrapper of IndexedDB.
 * guide at : https://www.youtube.com/watch?v=VNFDoawcmNc
 */

const init = () => {
  if (!('indexedDB' in window)) {
    console.log('This browser doesn\'t support IndexedDB');
    return;
  }
  else {
    if (CONFIG && CONFIG.stores && CONFIG.dbName && CONFIG.drop !== undefined) {
      if (CONFIG.drop) {
        IDBService.reset();
      }
      IDBService.createGenericObject(CONFIG.stores, true);
    }

    else console.log('issue in indexDB configuration! :(');
  }
};

init();

export {
  IDBService
};
