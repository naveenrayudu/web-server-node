const request = require('request');

const weather_API_URI = 'https://api.darksky.net/forecast/d6376b989fea6b31a4e104fab6a91757/';

const forecast = (lat, long) => {
    return new Promise((resolve, reject) => {
        request.get({
            url: `${weather_API_URI}${lat},${long}?units=si`,
            json: true
        }, (err, {body: {currently, daily}}) => {
            if (err) {
                return reject('Error occured while fetching data.');
            }

            if (!currently) {
                return reject('Unable to find location');
            }

            resolve({
                summary: daily.data[0].summary,
                temperature: currently.temperature,
                precipProbability: currently.precipProbability
            });

        })
    })
}

module.exports = forecast;
