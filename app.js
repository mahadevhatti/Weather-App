// esversion: 6

const express =  require("express");
const https = require("https"); //Native
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){

res.sendFile(__dirname + "/index.html");

});




app.post("/",function(req,res){

  const query = req.body.cityName;
  const apiKey = "19041c1cc14e62267374fc797559cd23";
  const unit = "Metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+unit;

  https.get(url,function(response){

  response.on("data",function(data){
    const weatherData = JSON.parse(data);

    res.write("<h1> The temperature in "+ query + " is "+ weatherData.main.temp + " Degree Celsius.</h1>");
    res.write("<h3> The weather is currently " +weatherData.weather[0].description + "</h3>");

    const imageURL = "http://openweathermap.org/img/wn/" +  weatherData.weather[0].icon + "@2x.png" ;
    res.write("<img src=" + imageURL + ">");

    res.send();
  });


  });

});










app.listen(3000,function(){
  console.log("Server Started Running on port 3000");
});
