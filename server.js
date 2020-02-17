const express = require('express');
var mongoose = require('./mongooseSchemas');
var app = express();
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.post('/adminuser/add',(req,res) => {
    mongoose.adminusermanager.Add(req,res);
});

app.get('/adminuser/list',(req,res) => {
    mongoose.adminusermanager.GetAll(req,res);
});

app.post('/category/add',(req,res) => {
    mongoose.categorymanager.Add(req,res);
});

app.get('/category/add',(req,res) => {
    res.sendfile('AddCategory.html');
})

app.get('/category/list',(req,res) => {
    mongoose.categorymanager.GetAll(req,res);
});

app.get('/category/categorydetail/:id',(req,res) => {
    mongoose.categorymanager.GetByID(req,res);
})

app.post('/category/update',(req,res) => {
    mongoose.categorymanager.Update(req,res);
})


app.listen(3000);






