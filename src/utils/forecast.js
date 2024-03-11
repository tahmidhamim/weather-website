const request = require('request');
require('dotenv').config();

const forecast = (latitude, longitude, callback) => {
    const BASE_URL = process.env.OPEN_WEATHER_MAP_API_URL;
    const API_KEY = process.env.OPEN_WEATHER_MAP_APP_ID;
    const url = `${BASE_URL}/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`;

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!');
        } else if (body.cod !== 200) {
            callback('Unable to find location!');
        } else {
            const description = body.weather[0].main + ' - ' + body.weather[0].description;
            const { temp, feels_like } = body.main;
            callback(undefined, `${description}. It is currently ${temp} degres out. It feels like ${feels_like} degrees out.`);
        }
    });
};

module.exports = forecast;