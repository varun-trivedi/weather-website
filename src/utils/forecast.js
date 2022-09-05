const request = require("postman-request");
const forecast = (latitude,longitude,callback) =>{
    const url = "http://api.weatherstack.com/current?access_key=6b34a8a6e81152ba393f00a280d95ca6&query="+latitude+ "," +longitude;
    request({url,json: true},(error,{body})=>{
        if(error)
            callback("Unable to get weather",undefined);
        else if(body.error)
            callback("Unable to get weather, please try again",undefined);
        else
        {
            callback(undefined,{
            weather_description : body.current.weather_descriptions[0],
            temperature: body.current.temperature,
            feelslike_temperature:body.current.feelslike,
            precip:body.current.precip
        });
        }
    });
}
module.exports = forecast;