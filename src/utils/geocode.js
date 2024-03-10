const request = require('request');

const geocode = (address, callback) => {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(address)}&limit=5&appid=e71eb38d9fcabdd747e85ba680b2ca52`;

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location service!');
        } else if (body.length === 0) {
            callback('Unable to find location! Try another search.');
        } else {
            const { name, lat, lon, country, state } = body[0];
            callback(undefined, {
                latitude: lat,
                longitude: lon,
                location: `${name}, ${state}, ${country}`
            });
        }
    });
};

module.exports = geocode;