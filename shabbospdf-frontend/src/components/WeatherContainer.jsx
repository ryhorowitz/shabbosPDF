import React, { useEffect } from 'react';

const WeatherContainer = () => {

  useWeather();
  return (
    <div className="weather-content">
      <h2>Weather Report</h2>
      <p>Weather information will be displayed here.</p>
    </div>
  );
};

function useWeather() {
  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
  console.log('apikey', apiKey);
  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=Philadelphia,PA&APPID=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => console.error('Error fetching weather:', error));
  }, [apiKey]);
}

export default WeatherContainer; 