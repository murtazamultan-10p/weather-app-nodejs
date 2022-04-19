const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express()
const port = process.env.PORT || 3000

// Define paths of express config
const publicDirPath = path.join(__dirname, '../public');
const viewsDirPath = path.join(__dirname, '../templates/views');
const partialsDirPath = path.join(__dirname, '../templates/partials');

// Setup handlebars and views locations
app.set('view engine', 'hbs');
app.set('views', viewsDirPath);
hbs.registerPartials(partialsDirPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

const getWeatherDetails = require('./utils/weather.js');

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: "Murtaza Multan",
        text: "Use this site to get your weather!"
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: "Murtaza Multan"
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: "Murtaza Multan",
        text: "This is some help text"
    });
});

app.get('/weather', (req, res) => {
    location = req.query.location
    if (!location){
        return res.send({
            error: "No location query found! Please provide the location."
        });
    }

    getWeatherDetails(location, (err, { location, current } = {}) => {
        if (err) {
            console.log(err);
            return res.send({
                error: err
            });
        }
    
        console.log({ location, current});
        res.send(
            { location, current}
        );
    });
    
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: "Murtaza Multan",
        error: "Help Article Not Found"
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: "Murtaza Multan",
        error: "Page Not Found"
    });
});

app.listen(port, () =>{
    console.log('Express Server started on port ' + port);
});