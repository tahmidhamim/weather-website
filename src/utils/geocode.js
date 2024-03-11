const request = require('request');
require('dotenv').config();

const geocode = (address, callback) => {
    const BASE_URL = process.env.OPEN_WEATHER_MAP_API_URL;
    const API_KEY = process.env.OPEN_WEATHER_MAP_APP_ID;
    const url = `${BASE_URL}/geo/1.0/direct?q=${encodeURIComponent(address)}&limit=5&appid=${API_KEY}`;

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