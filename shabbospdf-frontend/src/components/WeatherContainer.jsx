import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useWeather } from '../context/WeatherContext.js';
import DailyForecastCard from './DailyForecastCard.jsx';

const WeatherContainer = () => {
  const { weatherData, loading, error } = useWeather();

  const getDayForecast = (dayName) => {
    if (!weatherData?.daily) return null;
    
    const dayIndex = dayName === 'Friday' ? 5 : 6; // Friday = 5, Saturday = 6
    return weatherData.daily.find((day, index) => {
      const date = new Date(day.dt * 1000);
      return date.getDay() === dayIndex;
    });
  };

  if (error) {
    return (
      <div className="weather-content">
        <h2>Weather Report</h2>
        <p>Error loading weather data: {error}</p>
      </div>
    );
  }

  const fridayForecast = getDayForecast('Friday');
  const saturdayForecast = getDayForecast('Saturday');

  return (
    <div className="weather-content">
      <h2 className="mb-4">Shabbos Weather Forecast</h2>
      <Row >
        <Col md={6}>
          <DailyForecastCard 
            day="Friday" 
            forecast={fridayForecast} 
            loading={loading} 
          />
        </Col>
        <Col md={6}>
          <DailyForecastCard 
            day="Saturday" 
            forecast={saturdayForecast} 
            loading={loading} 
            />
        </Col>
      </Row>
    </div>
  );
};

export default WeatherContainer; 