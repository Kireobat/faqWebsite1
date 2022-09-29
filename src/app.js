//------------------Imports------------------//

const fs = require('fs');
const path = require('path');
const express = require('express');
const hbs = require('hbs');

//------------------Variables------------------//

const dataPath = path.join(__dirname, '../data');
const viewPath = path.join(__dirname, '../views/pages');
const publicDirPath = path.join(__dirname, '../public');
const port = 80;
const app = express();

//------------------Setup------------------//

app.set('views',viewPath);
app.set('view engine', hbs);
app.use(express.static(publicDirPath));

//------------------Load data------------------//

function loadData() {
    const dataBuffer = fs.readFileSync(dataPath+'/data.json');
    const dataJSON = dataBuffer.toString();
    console.log(JSON.parse(dataJSON));
    return JSON.parse(dataJSON);
}

let data = loadData();

//------------------Routes------------------//

function rootRoute(req, res) {
    res.render('index.hbs', {
        title: 'Kireobat.eu',
        type: 'Home'
    });
}

function contactRoute(req, res) {
    res.render('contact.hbs',{
        title: 'Kireobat.eu',
        type: 'Contact'
    });
}

function faqRoute(req, res) {
    res.render('faq.hbs',{
        title: 'Kireobat.eu',
        type: 'FAQ',
        info: data
    });
}

app.get('/', rootRoute);
app.get('/contact', contactRoute);
app.get('/faq', faqRoute);

app.listen(port, () => {console.log("Server started on http://localhost:"+port)});