import React, { createContext, useContext, useState, useEffect } from 'react';

const WeatherContext = createContext();

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const lat = 39.9526;
  const lon = -75.1652;
  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&cnt=8&APPID=${apiKey}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        
        const data = await response.json();
        console.log('Weather data:', data);
        setWeatherData(data);
      } catch (err) {
        console.error('Error fetching weather:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (apiKey) {
      fetchWeather();
    }
  }, [apiKey, lat, lon]);

  const value = {
    weatherData,
    loading,
    error,
    setWeatherData
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
}; 