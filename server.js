import express from 'express';
import fs from 'fs';
import methodOverride from 'method-override';
import 'dotenv/config';
import bodyParser from "body-parser";
import {
    v4 as uuidv4
} from 'uuid';

const app = express()
const port = process.env.PORT
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Stel ejs in als template engine
app.set('view engine', 'ejs')
app.set('views', './views')

// Stel een static map in
app.use(express.static('public'));

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}))

let matchData

// Maak een route voor de index
app.get('/admin', function (req, res) {
    res.render('index-admin', {
        pageTitle: "Score! - admin"
    })
})


app.post('/admin/creatematch', function (req, res) {
    matchData = req.body
    res.render('creatematch-admin', {
        pageTitle: "Create match",
        matchData : matchData
    })
})

app.get('/admin/creatematch', function (req, res) {
    res.render('creatematch-admin', {
        pageTitle: "Create match", 
        matchData: () => {if(matchData) {matchData}},
    })
})

app.get('/user/index', function (req, res) {
    res.render('index-user', {
        pageTitle: "User!",
        matchData : matchData
    })
})

app.get('/user/detail', function (req, res) {
    // updateScore()
    res.render('detail-user', {
        pageTitle: "User!",
        matchData : matchData
    })
})


app.set('port', port || 8000)

const server = app.listen(app.get('port'), function () {
  console.log(`Application started on port: ${app.get('port')}`)
})
