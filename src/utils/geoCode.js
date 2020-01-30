const request = require('request');
const geo_API_URI = 'https://api.mapbox.com/geocoding/v5/mapbox.places/${locationName}.json?access_token=pk.eyJ1IjoibmF2ZWVucmF5dWR1IiwiYSI6ImNrNWtoeTdlcjBlYmMzZHA0ZnR4dDI4YWIifQ.KyU7t4ULRk18xuS2ShzVNQ&limit=1'

const geoCode = (locationName) => {
    return new Promise((resolve, reject) => {
        request.get({
            url: geo_API_URI.replace('${locationName}', encodeURIComponent(locationName)),
            json: true
        }, (err, {body: {features}}) => {

            if (err) {
                return reject('Error occured while fetching data');
            }

            if (!features || features.length === 0) {
               return reject('Unable to find location');
            }

            const {center, place_name} = features[0];
            resolve({ lat: center[1], long: center[0], placeName: place_name});
        })
    })
}

module.exports = geoCode;