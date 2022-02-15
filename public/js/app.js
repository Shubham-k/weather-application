const weatherForm = document.querySelector("form");
const input = document.querySelector("input");
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");
const message3 = document.querySelector("#message-3");
const message4 = document.querySelector("#message-4");
const message5 = document.querySelector("#message-5");
const message6 = document.querySelector("#message-6");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = input.value;
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        message1.textContent = data.error;
      } else {
        message1.textContent = data.address;
        message2.textContent = `Temperature :- ${data.temperatureToday}`;
        message3.textContent = `Minimum Temperature :- ${data.minimumTempToday}`;
        message4.textContent = `Maximum Temperature :- ${data.maximumTempToday}`;
        message5.textContent = `Humidity Level :- ${data.humidityLevel}`;
        message6.textContent = `Overhaul :- ${data.main}`;
      }
    });
  });
});
