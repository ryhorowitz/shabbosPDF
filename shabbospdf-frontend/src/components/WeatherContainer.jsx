import React from 'react';
import { useWeather } from '../context/WeatherContext.js';

const WeatherContainer = () => {
  const { weatherData, loading, error } = useWeather();

  if (loading) {
    return (
      <div className="weather-content">
        <h2>Weather Report</h2>
        <p>Loading weather data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-content">
        <h2>Weather Report</h2>
        <p>Error loading weather data: {error}</p>
      </div>
    );
  }

  return (
    <div className="weather-content">
      <h2>Weather Report</h2>
      <p>Weather information will be displayed here.</p>
      {weatherData?.current && (
        <p>Temperature: {Math.floor(weatherData.current.temp)}ºF</p>
      )}
    </div>
  );
};

export default WeatherContainer; 