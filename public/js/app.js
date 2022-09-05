console.log("Client side java script file is loaded")

const weatherForm = document.querySelector("form");
const search = document.querySelector("input")
weatherForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    const location = search.value;
    document.querySelector(".error").innerHTML = "Loading...";
    document.querySelector(".forecast").innerHTML = "";
    fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            document.querySelector(".error").innerHTML = data.error;
        } else {
            document.querySelector(".forecast").innerHTML = data.location;
            document.querySelector(".error").innerHTML = "Weather Description: "+data.forecast.weather_description;
            document.querySelector(".temp").innerHTML = "Temperature: "+data.forecast.temperature;
            document.querySelector(".ftemp").innerHTML = "Feels-Like Temperature: "+data.forecast.feelslike_temperature;
            document.querySelector(".precip").innerHTML = "Chance of precipitation: "+data.forecast.precip;
        }
    })
})

})