const express = require("express");
const app = express()
const hbs = require("hbs")
const forecast = require("./forecast");
const path = require("path")
app.set("view engine" , "hbs");
const x = path.join(__dirname , "../public");
app.use(express.static(x))
const partialPath = path.join(__dirname ,"../views/partials");
hbs.registerPartials(partialPath);
const year = new Date().getFullYear();

app.get("/",(req,res)=>{
    res.render("index" , {title:"Home",desc:"Welcome to My home page",year:year})
})
app.get("/service" ,(req , res)=>{
    res.render("service",{title:"My Service" , desc:"welcome to My Service" })
})
app.get("/weather",(req,res)=>{
    const address = req.query.address ;
    if(!address){
        return res.send({error : "you must provide address"})

    }
    else{
               //return res.send({data1})
               forecast(address ,(error , data)=>{
                if(error){
                    return res.send({error:error})
                }
                if(data){
                   return res.send({data})
                }
               })
            }
        
        
})
app.listen("5000",()=>{
    console.log("app is listening")
})