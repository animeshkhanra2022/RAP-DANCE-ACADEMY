const express = require("express");
const path = require('path');
// const fs = require('fs');
// const bodyparser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
}
const port = 8000;


const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    age: String,
    sex: String,
    adress: String
});

const Contact = mongoose.model('Contact', contactSchema);


// EXPRESS SERVING STUFF
app.use('/static', express.static('static')); //for serving static file ...
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug'); // Set the templet engine as pug....
app.set('views', path.join(__dirname, 'views')); //Set the view directory....


//ENDPOINT
app.get('/', (req, res) => {
    const param = {};
    res.status(200).render('home.pug', param);
});

app.get('/about', (req, res) => {
    const param = {};
    res.status(200).render('about.pug', param);
});

app.get('/service', (req, res) => {
    const param = {};
    res.status(200).render('service.pug', param);
});
app.get('/class_info', (req, res) => {
    const param = {};
    res.status(200).render('class_info.pug', param);
});

app.get('/contact', (req, res) => {
    const param = {};
    res.status(200).render('contact_us.pug', param);
});

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved in database")
    }).catch(()=>{
        res.status(400).sent("Item was not save in Database");
    });
    // res.status(200).render('contact.pug');
});


// START THE SERVER
app.listen(port, () => {
    console.log(`This application is started successfully on port ${port}`);
}); 
