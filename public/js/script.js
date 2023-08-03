const form = document.getElementById("form1");
const address =  document.getElementById("address");
const btn =  document.getElementById("btn");
const tr = document.querySelectorAll("#info tr");
const td =document.querySelectorAll("#info td");


const countryD = document.getElementById("country");
const cityD = document.getElementById("city");
const conditionD = document.getElementById("condition");
const tempD = document.getElementById("temp");
const latD = document.getElementById("lat");
const longD = document.getElementById("long");


form.addEventListener("submit",(e)=>{
    e.preventDefault()
    weatherFunction();
    setTimeout(()=>{
        form.reset()
    },1000);
});
const country = document.getElementById("country");
const forecast =  document.getElementById("forecast");
const error =  document.getElementById("error");
address.onkeydown = ()=>{
    td.forEach((t)=>{
        t.innerText = ""
    })
    tr.forEach((t)=>{
        t.style.display = "none"
    })
    error.innerText = ""

}

let weatherFunction = async ()=>{
    try {
        const addressV = address.value;
        const res = await fetch("http://localhost:5000/weather?address="+addressV)
        const data = await res.json();
        if(data.error){
            error.innerText = data.error;
            country.innerText = "";
            forecast.innerText="";
        }
        else  {
            error.innerText="";
            setTimeout(()=>{
                console.log(`country: ${data.data.country}  , city: ${data.data.city}`);
                countryD.innerText = data.data.country;
                cityD.innerText = data.data.city;
                tr[0].style.display="block"
            } , 1000);
            setTimeout(()=>{
                console.log(`condition: ${data.data.condition}  , Temperature: ${data.data.temp}`);
                conditionD.innerText = data.data.condition;
                tempD.innerText = data.data.temp;
                tr[1].style.display="block"
            } , 2000);
            setTimeout(()=>{
                console.log(`latitude: ${data.data.latitude}  , Longitude: ${data.data.longitude}`);
                latD.innerText = data.data.latitude;
                longD.innerText = data.data.longitude;
                tr[2].style.display="block"
            } , 3000);    
    }}
    catch(e) {
        console.log(e)
    }
}
