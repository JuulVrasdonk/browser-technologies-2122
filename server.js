require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Stel ejs in als template engine
app.set('view engine', 'ejs')
app.set('views', './views')

// Stel een static map in
app.use(express.static('public'))

let matchData;


// Maak een route voor de index
app.get('/admin', function (req, res) {
  res.render('index-admin', {
      pageTitle: "Score! - admin"
  })
})

app.post('/admin/creatematch', function (req, res) {
    matchData = req.body
    res.render('creatematch-admin', {
        pageTitle: "Create match"
    })
})

app.get('/admin/creatematch', function (req, res) {
    res.render('creatematch-admin', {
        pageTitle: "Create match"
    })
})


app.get('/index', function (req, res) {
    res.render('index-user', {
        pageTitle: "User!",
        speelDag : matchData.speeldag,
        speelTijd : matchData.speeltijd,
        thuisScore : matchData.thuisscore,
        uitScore : matchData.uitscore,
        thuisNaam : matchData.thuisnaam,
        uitNaam : matchData.uitnaam
    })
})

app.get('/user/detail', function (req, res) {
    res.render('detail-user', {
        pageTitle: "User!",
        speelDag : matchData.speeldag,
        speelTijd : matchData.speeltijd,
        thuisScore : matchData.thuisscore,
        uitScore : matchData.uitscore,
        thuisNaam : matchData.thuisnaam,
        uitNaam : matchData.uitnaam
    })
})


app.set('port', port || 8000)

const server = app.listen(app.get('port'), function () {
  console.log(`Application started on port: ${app.get('port')}`)
})
