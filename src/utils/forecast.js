const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=7a9c44c66cb7672e90d095e3406f03e7&units=metric`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!!!", undefined);
    } else if (response.body.message) {
      callback("Unable to find the Location!!!", undefined);
    } else {
      callback(undefined, {
        temp: response.body.main.temp,
        minTemp: response.body.main.temp_min,
        maxTemp: response.body.main.temp_max,
        main: response.body.weather[0].main,
        humidity: response.body.main.humidity,
      });
    }
  });
};

module.exports = forecast;
