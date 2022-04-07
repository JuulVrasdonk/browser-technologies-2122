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
    const data = fs.readFileSync('data.json', 'utf8');
    const newData = JSON.parse(data)
    console.log(newData);
    res.render('index-admin', {
        pageTitle: "Score! - admin",
        newData
    })
})


app.post('/admin', function (req, res) {
    console.log(req.body);
    let newMatch = req.body.newMatch
    let newScore = req.body.newScore
    let match;

    let matches = [];
    const game = ({
        match: newMatch,
        score: newScore,
        id: uuidv4()
    })
    const matchesStr = fs.readFileSync('data.json', 'utf8');
    matches = JSON.parse(matchesStr)

    const duplicateMatches = matches.filter((game) => game.match === match);

    if (duplicateMatches.length === 0) {
        matches.push(game);
        fs.writeFileSync('data.json', JSON.stringify(matches, null, 4))
    }
    res.redirect('/admin')
})

app.get('/admin', function (req, res) {
    const data = fs.readFileSync('data.json', 'utf8');
    const newData = JSON.parse(data)
    console.log(newData);
    res.render('creatematch-admin', {
        newData,
        pageTitle: 'Create match',
    });
})

app.get('/match/:id', (req, res) => {
    let {
        id
    } = req.params;
    let newItem = []


    const data = fs.readFileSync('data.json', 'utf8');
    const newData = JSON.parse(data);

    for (let index = 0; index < newData.length; index++) {
        newItem = newData.find(item => item.id === id);
    }

    res.render('updatescore-admin', {
        pageTitle: 'Testing',
        newItem: newItem
    })
})


app.put('/match/:id', (req, res) => {
    let {
        id
    } = req.params;
    let updateData = []

    const data = fs.readFileSync('data.json', 'utf8');
    const newData = JSON.parse(data);

    updateData = newData;
    const foundIndex = updateData.findIndex(x => x.id == id);
    updateData[foundIndex].match = req.body.newMatch;
    updateData[foundIndex].score = req.body.newScore;

    fs.writeFileSync('data.json', JSON.stringify(updateData, null, 4))
    console.log(id);

    res.redirect(`/match/${id}`)
})



// ************* USER ************* //

app.get('/user/index', function (req, res) {
    const data = fs.readFileSync('data.json', 'utf8');
    const newData = JSON.parse(data)
    res.render('index-user', {
        pageTitle: "User!",
        newData
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
