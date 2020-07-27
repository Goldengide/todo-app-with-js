// import express from 
const express = require('express');
const chalk = require('chalk');
const debug = require('debug');
const morgan = require('morgan');
const path = require('path');
// let sql = require('mssql');
const { MongoClient } = require('mongodb');
const sql = require('mysql');
const { connect } = require('http2');
const taskRoutes = require("./src/routes/taskRoutes");



let app = express();
app.use('/public', express.static(path.join(__dirname, '/public/')));
app.use('/material', express.static(path.join(__dirname, '/node_modules/material-design-lite')))
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');


let data = {
    title: "Todo App",
    list: [
        {
            id: 1,
            task: "Home Chores",
            taskshort: "home-chores",
            content: ["Wash Plates", "Shoe Care", "Dance Around", "Sweep Floor"]
        },
        {
            id: 2,
            task: "Work To-do",
            taskshort: "work-to-do",
            content: ["Clean Office", "Start Coding", "Push to Github", "Coffee Time"]
        },
        {
            id: 3,
            task: "Work To-finish",
            taskshort: "work-to-finish",
            content: ["Clean Office", "Start Coding", "Push to Github", "Coffee Time"]
        }
    ]
        
}


app.use('/tasks', taskRoutes);

app.get('/', function(req, res){
    res.render('index', {data: data});
});



app.listen(3001, function(){
    debug(chalk.green("Listening"));
});