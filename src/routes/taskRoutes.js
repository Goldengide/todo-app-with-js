const { MongoClient, ObjectID } = require('mongodb');
const taskRouter = require('express').Router();


let tasks = [
    {
        task: "Home Chores",
        taskshort: "home-chores",
        content: ["Wash Plates", "Shoe Care", "Dance Around", "Sweep Floor"]
    },
    {
        task: "Work To-do",
        taskshort: "work-to-do",
        content: ["Clean Office", "Start Coding", "Push to Github", "Coffee Time"]
    },
    {
        task: "Work To-finish",
        taskshort: "work-to-finish",
        content: ["Clean Office", "Start Coding", "Push to Github", "Coffee Time"]
    }
];
        
taskRouter.route('/')
    .get((req, res) => {
        res.send("hello");
    });

taskRouter.route('/storage')
    .get((req, res) => {
        res.render("storage-test");
    });

taskRouter.route('/addMongo')
    .get((req, res) =>{
        const url = "mongodb://localhost:27017";
        const dbName = "todoApp";
        
        (async function mongo(){
            let client;
            try {
                client = await MongoClient.connect(url);
                console.log("connected to the server");
                const db = client.db(dbName);
                const col = await db.collection('tasks');
                // const tasks = await col.find().toArray();
                const tasks = await col.findOne({"_id": new ObjectID("5f17582a584f341c188b13b8")});
                console.log(tasks);
                res.json(tasks);
                // databasesList = await client.db().admin().listDatabases();
                // console.log(databasesList);

                // const response = await db.collection('tasks').insertMany(tasks);
                // console.log(response)
                // res.json(response);
                
            } catch(err) {
                console.log(err.stack);
            }

            client.close();
        }())
        // const tables = "";
        
    });

taskRouter.route('/add')
    .get((req, res) =>{
    // LocalStorage way of doing CRUD
});

module.exports = taskRouter;