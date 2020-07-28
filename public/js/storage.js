// const { query } = require("express");

    const DB_NAME = 'todoApp';
    const DB_VERSION = 3;
    const DB_STORE_NAME = 'todo';
    const DB_MAIN_MODE = 'readwrite';
    var db;

    openDatabase = function openDB(query = null, data=null) {
        if (!window.indexedDB) {
            console.log("Your browser does not support Index DB")
        }
        else {
            console.log("opening....");
            let req = indexedDB.open(DB_NAME, DB_VERSION);
            req.onsuccess = function (event) {
                db = event.target.result;
                if (query !== null) { 
                    if(data) {
                        query(data);
                    }
                    else {query();}
                }


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
        };

    }

    let getData = function getObjectStore() {
        request = db.transaction(DB_STORE_NAME, DB_MAIN_MODE).objectStore(DB_STORE_NAME);
        query = request.getAll();
        query.onsuccess = function () {
            // console.log(query.result)
            return query.result;
        };

    }
    todoAppData = [
        { title: "Eat Lunch", description: "Get soda, spongue, water and wash plates" },
        { title: "Eat Dinner", description: "Get soda, spongue, water and wash clothes" },
    ]
    // sample content format
    // todoAppDataContent = { title: "Eat Lunch", description: "Get soda, spongue, water and wash plates" };

    addData = function addData(todoAppDataContentParam) {

        request = db.transaction(DB_STORE_NAME, DB_MAIN_MODE).objectStore(DB_STORE_NAME);
            var query = request.add(todoAppDataContentParam);
            query.onsuccess = function (event) {
                console.log("added..");
                // event.target.result === customer.ssn;
            }


    }


    
// console.log(getObjectStore());

