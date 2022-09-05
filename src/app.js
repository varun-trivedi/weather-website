const path = require("path");
const express = require('express');
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const hbs = require("hbs");
const app = express();
//defining paths for express config
const viewsPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");
app.use(express.static(path.join(__dirname,"../public")));//setting up static directory to serve

app.set("view engine","hbs");//setting up handlebars
app.set("views",viewsPath)
hbs.registerPartials(partialsPath);



app.get("",(req,res) =>{
    res.render("index",{
        title:"weather",
        name:"Varun"
    })
})
app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About Me",
        name:"Varun"
    });
})
app.get("/help",(req,res)=>{
    res.render("help",{
        helpMessage:"This is the Help Section",
        title:"Help",
        name: "Varun"
    })
})
app.get("/help/*",(req,res)=>{
    res.render("404",{
        errorMessage: "Help Article Not Found",
        name:"Varun"
    })
})
app.get("/weather",(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:"You must provide a location"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={}) =>{
        if(error)
        {
            return res.send({
                error
            })
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error)
            {
                return res.send({
                    error
                })
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.location
            });
        })
    })
    
})
// app.get("/products",(req,res) =>{
//     if(!req.query.search)
//     {
//         return res.send({
//             error:"You must provide a search term"
//         })
//     }
//     console.log(req.query.search)
//     res.send({
//         products:[]
//     })
// })
app.get("*",(req,res)=>{
    res.render("404",{
        errorMessage: "Page Not Found",
        name: "Varun"
    });
})

app.listen(3000,()=>{
    console.log("Server is up on port 3000");
})