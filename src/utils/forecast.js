const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=e71eb38d9fcabdd747e85ba680b2ca52&units=metric`;

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