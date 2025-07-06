import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useWeather } from '../context/WeatherContext.js';
import DailyForecastCard from './DailyForecastCard.jsx';

const WeatherContainer = () => {
  const { loading, error, getDayForecast } = useWeather();

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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Shabbos Weather Forecast</h2>
      </div>
      <Row>
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