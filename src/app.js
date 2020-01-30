const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const geoCode = require('./utils/geoCode');
const weatherInfo = require('./utils/weatherInfo');
const PORT = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '..', '/public');
const templatePath = path.join(__dirname, '..', 'templates', 'views');
const partialsPath = path.join(__dirname, '..', 'templates', 'partials');

app.set('views', templatePath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);


app.use(express.static(publicPath));

app.get('/weather', async (req, res) => {
    if (!req.query.address || !req.query.address.trim()) {
        return res.send({
            error: 'Address is needed'
        })
    }

    try {
        const { lat, long, placeName } = await geoCode(req.query.address);
        const { summary, temperature, precipProbability } = await weatherInfo(lat, long);

        return res.send({
            address: req.query.address,
            placeName,
            description: `${summary} It is currently ${temperature} degree outside. There is a ${precipProbability}% chance of rain.`
        });

    } catch (error) {
        return res.send({
            error
        })
    }
})

app.get(['/', '', 'index', 'index.html'], (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Itachi Uchiha'
    });
})


app.get(['/about', '/about.html'], (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Itachi Uchiha'
    });
})

app.get(['/help', '/help.html'], (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Itachi Uchiha'
    });
})

app.get('/help/*', (req, res) => {
    res.render('not-found', {
        title: 'Not-found',
        message: 'Help page not found',
        name: 'Itachi Uchiha'
    })
})

app.get('*', (req, res) => {
    res.render('not-found', {
        title: 'Not-found',
        message: 'Page not found',
        name: 'Itachi Uchiha'
    })
})

app.listen(PORT, () => {
    console.log('server started');
})

