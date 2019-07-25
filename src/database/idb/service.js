import { openDB, deleteDB, wrap, unwrap } from 'idb/with-async-ittr.js';
var CONFIG = require('./config.json')
const DBTitle = (process.env.REACT_APP_IDB_DATABASE_NAME === undefined ?
  (CONFIG.dbName ? CONFIG.dbName : 'defaultDB') : process.env.REACT_APP_IDB_DATABASE_NAME);

class IDBService {

  async reset() {
    return deleteDB(DBTitle);
  }


  async createGenericObject(objectStoreName, version, autoIncrementValue) {
    var database = await openDB(DBTitle, version, {
      upgrade(db) {
        if (typeof objectStoreName === "string") {
          if (!db.objectStoreNames.contains(objectStoreName))
            db.createObjectStore(objectStoreName, { keyPath: "title", autoIncrement: autoIncrementValue });
        } else {
          objectStoreName.forEach((value, i) => {
            if (!db.objectStoreNames.contains(value))
              db.createObjectStore(value, { keyPath: "title", autoIncrement: autoIncrementValue });
          })
        }
      }
    })
    return database
  }


  async getAllFromStore(objectStoreName, cb) {
    const db = await openDB(DBTitle)
    const objects = await db.getAll(objectStoreName)
    return cb(objects)
  }

  async checkIfDbStoreExists(objectStoreName) {
    const db = await openDB(DBTitle)
    if (!db.objectStoreNames.contains(objectStoreName))
      return true
    else
      return false
  }

  async updateItemInStore(objectStoreName, keyname, data) {
    const db = await openDB(DBTitle)
    const tx = await db.transaction(objectStoreName, 'readwrite')
    const store = await tx.objectStore(objectStoreName)
    await store.put({ title: keyname, data })
  }

  async deleteItemFromStore(objectStoreName, keyname) {
    const db = await openDB(DBTitle)
    const tx = await db.transaction(objectStoreName, 'readwrite')
    const store = await tx.objectStore(objectStoreName)
    return await store.delete(keyname)
  }

  async IDBUnwrap(object) {
    let newObject = unwrap(object)
    return newObject
  }

  async IDBWrap(object) {
    let newObject = wrap(object)
    return newObject
  }

}

const instance = new IDBService();
export default instance;

