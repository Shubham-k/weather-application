const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//define path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

const PORT = process.env.PORT || 3000;

//setup handlebars engine and view location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "HOME PAGE",
    age: 19,
    person1: "Shubham Kumar",
    person2: "Hemang Mehta",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "ABOUT PAGE",
    person1: "Shubham Kumar",
    person2: "Hemang Mehta",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "HELP PAGE",
    person1: "Shubham Kumar",
    person2: "Hemang Mehta",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a search item",
    });
  }

  const address = req.query.address;

  geocode(address, (error, data = {}) => {
    if (error) {
      return res.send({ error: error });
    }
    forecast(data.latitude, data.longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error: error });
      }
      res.send({
        address: data.location,
        temperatureToday: forecastData.temp,
        minimumTempToday: forecastData.minTemp,
        maximumTempToday: forecastData.maxTemp,
        humidityLevel: forecastData.humidity,
        main: forecastData.main,
      });
    });
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 ERROR!",
    error: "page not found!",
    person1: "Shubham Kumar",
    person2: "Hemang Mehta",
  });
});

app.listen(PORT, () => {
  console.log(`server is up on port 3000`);
});
