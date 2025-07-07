import React from 'react';
import { Card } from 'react-bootstrap';

const DailyForecastCard = ({ day, forecast, loading }) => {
  if (loading) {
    return (
      <Card className="mb-3">
        <Card.Header as="h5" className="bg-secondary text-white">
          {day}
        </Card.Header>
        <Card.Body>
          <Card.Text>Loading forecast...</Card.Text>
        </Card.Body>
      </Card>
    );
  }

  if (!forecast) {
    return (
      <Card className="mb-3">
        <Card.Header as="h5" className="bg-secondary text-white">
          {day}
        </Card.Header>
        <Card.Body>
          <Card.Text>No forecast available</Card.Text>
        </Card.Body>
      </Card>
    );
  }

  const getWeatherIcon = (weatherCode) => {
    // Map weather codes to emoji icons
    const weatherIcons = {
      200: '⛈️', // thunderstorm
      300: '🌧️', // drizzle
      500: '🌧️', // rain
      600: '❄️', // snow
      700: '🌫️', // atmosphere (fog, mist)
      800: '☀️', // clear
      801: '⛅', // few clouds
      802: '☁️', // scattered clouds
      803: '☁️', // broken clouds
      804: '☁️', // overcast clouds
    };
    
    const code = Math.floor(weatherCode / 100) * 100;
    return weatherIcons[code] || '🌤️';
  };

  return (
    <Card className="mb-3">
      <Card.Header as="h5" className="bg-primary text-white">
        {day}
      </Card.Header>
      <Card.Body>
        <div className="mb-2">
          <span className="display-1 me-3">{getWeatherIcon(forecast.weather[0].id)}</span>
          <div>
           
            <small className="text-muted">
              {Math.floor(forecast.temp.min)}ºF / {Math.floor(forecast.temp.max)}ºF
            </small>
          </div>
        </div>
        <Card.Text className="text-start fs-6">
          <strong>Weather:</strong> {forecast.weather[0].description}<br/>
          <strong>Precipitation:</strong> {forecast.pop * 100}%<br/>
          <strong>Humidity:</strong> {forecast.humidity}%<br/>
          <strong>Wind:</strong> {Math.round(forecast.wind_speed)} mph<br/>
          <strong>UV Index:</strong> {Math.round(forecast.uvi)} <br/>
          <strong>Summary:</strong> {forecast.summary}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default DailyForecastCard;