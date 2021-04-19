import IDBService from './service';
import { DeveloperConfig } from 'constants/index';
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
  if (DeveloperConfig.visible && CONFIG.easter) {
    try {
      require('easter-egg-collection');
    } catch (easter) {
      console.log('%c the green hulk got mad!', ' line-height: 40px; background: white; border-radius:10px; display: block; color: green; box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset font - weight: bold; ');
    }
  }
};

init();

export {
  IDBService
};
