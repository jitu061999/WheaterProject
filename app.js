const express = require("express");
const https = require("https");
const bodyParser=require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname+"/index.html");
});



app.post("/",function(req,res){
    console.log(req.body.cityName);
    const query = req.body.cityName;
    const api = "f7625e02912ebb448ef744514b9148d9";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + api;
    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            //console.log(data);
            const weatherData = JSON.parse(data);
            //const temp=weatherData.main.feels_like;
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;

            console.log(temp);

            const icon = weatherData.weather[0].icon;
            const imageurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>The Weather is currently " + weatherDescription + "</p>")
            res.write("<h1>The Temperature in "+query+" is " + temp + " degree Calcius.</h1>");
            res.write("<img src=" + imageurl + ">")
            res.send();
        })
    })
         
  

    
});
/*


            const object={
                name:"Angela",
                favouriteFood:"Raman"
            }
            
            console.log(JSON.stringify(object));
            
    
*/ 

app.listen(3000, function () {
    console.log("Server is runing on port 3000.")
})