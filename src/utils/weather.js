const request = require('request');

const getWeatherDetails = (location, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=5e0a346c33c3176298e6cf3304200076&query=" + location;

    request({url, json: true}, (err, { body }) => {
        if(err) {
            callback('Unable to connect with weather stack service!', undefined);
        } else if(body.error) {
            callback('Invalid Location query!', undefined);
        } else {
            // Object Destructuring
            const { weather_descriptions, temperature, precip } = body.current;
            const { name, country } = body.location;
            callback(undefined, {
                current: `${weather_descriptions}. The temperature is ${temperature} degrees, and the chances of rain is ${precip} %`,
                location: `${name}, ${country}`
            });
        }
    })
};

module.exports = getWeatherDetails