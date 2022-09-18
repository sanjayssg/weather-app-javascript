'use strict'

//Select Elements

const notificationElement = document.querySelector(".notification");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");


//App Data

const weather = {};

    weather.temperature = {
        unit : "celsius"
    }

//APP Consts and Vars

const KELVIN = 273;
//API KEY
const key = "82005d27a116c2880c8f0fcb866998a0"
https://api.openweathermap.org/data/2.5/weather?lat=19.4289265&long72.8150865&appid=82005d27a116c2880c8f0fcb866998a0
http://api.openweathermap.org/data/2.5/weather?lat=18.5514&lon=73.8219&appid=82005d27a116c2880c8f0fcb866998a0

//Check if browser supports Geolocation

if ('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML ="Browser doesn't support geolocation";
}

function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude =  position.coords.longitude;
    getWeather(latitude,longitude)
}

//Show Error when there is an issue with geolocation

function showError(error){
    notificationElement.style.display ="block";
    notificationElement.innerHTML=`<p>${error.message}</p>`;
}

//Get Weather from API provider

function getWeather(lat,long){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;
    
    fetch(api)
    .then(function(response){
        let data = response.json();
        return data;
    })
    .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    })
    .then(function(){
        displayWeather();
    });
}

//Display Weather Function
function displayWeather(){
    iconElement.innerHTML = `<img src='icons/${weather.iconId}.png'/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`
}

//Celsius to Fahrenheit

function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

//When the User clicks on the temperature element.

tempElement.addEventListener('click',function (){

    if(weather.temperature.value === "undefined") return ;
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius";
    }

})