import React, { useEffect, useState } from 'react';

const WeatherContainer = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [shabbosData, setShabbosData] = useState(null);
  const lat = 39.9526;
  const lon = -75.1652;
  useWeather(lat, lon, setShabbosData);
  // const shabbosForecast = (getShabbosForecast(weatherData));
  // console.log('shabbos forecast', shabbosForecast);
  return (
    <div className="weather-content">
      <h2>Weather Report</h2>
      <p>Weather information will be displayed here.</p>
      {/* <p>Temperature: {Math.floor(shabbosData?.current?.temp)}ºF</p> */}
    </div>
  );
};

function useWeather(lat, lon, setShabbosData) {
  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
  //I need to have it only return every 3 hours 12am 3 am 6 am 9 am 12pm 3pm 6pm 9pm not 1am 4am 7am etc
  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&cnt=56&APPID=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // setWeatherData(data);
      return getShabbosForecast(data);
    })
    .then(shabbosForecast => {
      setShabbosData(shabbosForecast);
    })
    .catch(error => console.error('Error fetching weather:', error));
  }, [apiKey, lat, lon, setShabbosData]);
}


function getShabbosForecast(weatherData) {
  console.log('weatherData', weatherData);
  const targetHours = [
    {
      day: 5, hours: [15,18,21] // Friday evening
    },
    {
      day: 6, hours: [0, 6,9,12,15,18,21] // Saturday
    }
  ]

  const shabbosForecast = [];

  for (const forecast of weatherData.list) {
    const dt = new Date(forecast.dt * 1000);
    const weekday = dt.getDay(); // 0=Sun, 6=Sat
    const hour = dt.getHours();

    const match = targetHours.find(target => target.day === weekday && target.hours.includes(hour));

    if (match) {shabbosForecast.push(forecast);}
  }
  return shabbosForecast;
}

export default WeatherContainer;