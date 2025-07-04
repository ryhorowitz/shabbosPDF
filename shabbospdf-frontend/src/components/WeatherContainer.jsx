import React, { useEffect, useState } from 'react';

const WeatherContainer = () => {
  const [weatherData, setWeatherData] = useState(null);
  const lat = 39.9526;
  const lon = -75.1652;
  useWeather(lat, lon, setWeatherData);
  
  return (
    <div className="weather-content">
      <h2>Weather Report</h2>
      <p>Weather information will be displayed here.</p>
      <p>Temperature: {Math.floor(weatherData?.current?.temp)}ºF</p>
    </div>
  );
};

function useWeather(lat, lon, setWeatherData) {
  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
  console.log('apikey', apiKey);
  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&APPID=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setWeatherData(data);
    })
    .catch(error => console.error('Error fetching weather:', error));
  }, [apiKey, lat, lon, setWeatherData]);
}

export default WeatherContainer; 