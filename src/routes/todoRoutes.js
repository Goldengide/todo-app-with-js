const todoRouter = require('express').Router();

class Database {
    SUPPORTED = true;
    DB_NAME = 'todoApp';
    DB_VERSION = 3;
    DB_STORE_NAME = 'todo';
    DB_MAIN_MODE = 'readwrite'
    constructor() {
        if (!window.indexedDB) {
            console.log("Your browser does not support Index DB")
            SUPPORTED = false;
        }
        else {
            SUPPORTED = true;
            console.log("IndexDb will now do its magic");

        }
    }

    openDB() {
        if (SUPPORTED) {
            let req = indexedDB.open(DB_NAME, DB_VERSION);
            req.onsuccess = function (event) {
                db = event.target.result;
                // console.log(addData());
                // console.log(getObjectStore());

                console.log("DB opened succesfully");
            }

            req.onerror = (event) => {
                console.error("openDb", evt.target.errorCode);
            }
            req.onupgradeneeded = function (evt) {
                console.log("openDb.onupgradeneeded");
                var store = evt.currentTarget.result.createObjectStore(
                    DB_STORE_NAME, { keyPath: 'id', autoIncrement: true });

                store.createIndex('title', 'title', { unique: false });
                store.createIndex('description', 'description', { unique: false });
            };

        }
    }
}
// databaseOperation = new Database();
// databaseOperation.openDB();
todoRouter.route('/add');