import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ capital }) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const [weather, setWeather] = useState([]);
    const [toogle, setToggle] = useState(false);
    
    useEffect(() => {
        axios
            .get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`)
            .then(response => {
                setWeather(response.data);
                setToggle(true);
            })
    }, [])

    console.log(weather);

    if (toogle) {
        return (
            <div>
                <h2>Weather in {capital}</h2>
                <div><b>temperature: </b> {Math.trunc(weather.main.temp)} Celsius </div>
                <img src={"http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png"}/>
                <div><b>wind: </b> {Math.trunc(weather.wind.speed)} kph direction {weather.wind.deg} degrees </div>
            </div>
        )
    } else {
        return (
            <div> Loading weather information for {capital}... </div>
        )
    }
}

export default Weather;
