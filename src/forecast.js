const request = require("request");
const fs = require("fs");
const path = require("path");
const dataPath = path.join(__dirname , "../data/data.json")
const forecast = ( country , callback)=>{
    const url2 = `https://api.weatherapi.com/v1/current.json?key=7f97e74ef23b418c97a155211230503&q=${country}`;
    request({url:url2 , json:true},(error , response)=>{
        if(error){
            callback("unable to connect weather service" , undefined)
        }
        else if(response.body.error){
            
            callback(response.body.error.message  , undefined)
        }
        
        else{
            const data = {}
            data.country = response.body.location.country;
            data.city = response.body.location.name;
            data.latitude = response.body.location.lat;
            data.longitude = response.body.location.lon;
            data.condition=response.body.current.condition.text;
            data.temp=response.body.current.temp_c ;
            callback(undefined , data);
            //console.log(response.body.location.name , response.body.current.condition.text)
        }
});

};
module.exports = forecast