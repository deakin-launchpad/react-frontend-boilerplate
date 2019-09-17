import { openDB, deleteDB, wrap, unwrap } from 'idb/with-async-ittr.js';
var CONFIG = require('./config.json');
const DBTitle = (process.env.REACT_APP_IDB_DATABASE_NAME === undefined ?
  (CONFIG.dbName ? CONFIG.dbName : 'defaultDB') : process.env.REACT_APP_IDB_DATABASE_NAME);
var currentDBVersion = 0;
var currentDBinstance;
class IDBService {

  async reset() {
    return deleteDB(DBTitle);
  }

  currentDbVersion() {
    return currentDBVersion;
  }


  async createGenericObject(objectStoreName, autoIncrementValue, keypathvalue) {
    currentDBVersion++;
    var database = await openDB(DBTitle, currentDBVersion, {
      upgrade(db) {
        if (typeof objectStoreName === 'string') {
          if (!db.objectStoreNames.contains(objectStoreName))
            db.createObjectStore(objectStoreName, { keyPath: (keypathvalue === undefined ? 'title' : keypathvalue), autoIncrement: autoIncrementValue ? true : autoIncrementValue });
        } else {
          objectStoreName.forEach(value => {
            if (!db.objectStoreNames.contains(value))
              db.createObjectStore(value, { keyPath: (keypathvalue === undefined ? 'title' : keypathvalue), autoIncrement: autoIncrementValue ? true : autoIncrementValue });
          });
        }
      }
    });
    return database;
  }


  async getAllFromStore(objectStoreName, cb) {
    if (currentDBinstance === undefined)
      currentDBinstance = await openDB(DBTitle);
    const objects = await currentDBinstance.getAll(objectStoreName);
    return cb(objects);
  }

  async checkIfDbStoreExists(objectStoreName) {
    if (currentDBinstance === undefined)
      currentDBinstance = await openDB(DBTitle);
    if (currentDBinstance.objectStoreNames.contains(objectStoreName))
      return true;
    else
      return false;
  }
  async clearStore(objectStoreName) {
    if (currentDBinstance === undefined)
      currentDBinstance = await openDB(DBTitle);
    return currentDBinstance.clear(objectStoreName);
  }

  async createStores(objectStores) {
    if (currentDBinstance === undefined)
      currentDBinstance = await openDB(DBTitle);
    objectStores.forEach(async value => {
      if (!currentDBinstance.objectStoreNames.contains(value)) {
        await currentDBVersion++;
        await IDBService.createGenericObject(value, currentDBVersion, true);
      }
    });
  }

  async updateItemInStore(objectStoreName, keyname, data, customPrimaryKey) {
    if (currentDBinstance === undefined)
      currentDBinstance = await openDB(DBTitle);
    const tx = await currentDBinstance.transaction(objectStoreName, 'readwrite');
    const store = await tx.objectStore(objectStoreName);
    return await store.put(customPrimaryKey ? data : { title: keyname, data });
  }

  async getItemFromStore(objectStoreName, keyname) {
    if (currentDBinstance === undefined)
      currentDBinstance = await openDB(DBTitle);
    const tx = await currentDBinstance.transaction(objectStoreName, 'readwrite');
    const store = await tx.objectStore(objectStoreName);
    return await store.get(keyname);
  }

  async deleteItemFromStore(objectStoreName, keyname) {
    if (currentDBinstance === undefined)
      currentDBinstance = await openDB(DBTitle);
    const tx = await currentDBinstance.transaction(objectStoreName, 'readwrite');
    const store = await tx.objectStore(objectStoreName);
    return await store.delete(keyname);
  }

  async IDBunwrap(object) {
    let newObject = await unwrap(object);
    return newObject;
  }

  async IDBwrap(object) {
    let newObject = await wrap(object);
    return newObject;
  }
}

const instance = new IDBService();
export default instance;
