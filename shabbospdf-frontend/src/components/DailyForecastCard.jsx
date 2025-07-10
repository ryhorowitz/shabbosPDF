import React from "react";
import { Container, Row, Col, Table } from "react-bootstrap";

const DailyForecastCard = ({ day, forecast, loading }) => {
  /**
   * Generate list groups
   * if friday
   * list day, evening and night temp
   */

  if (loading) {
    return (
      <Container className="mb-3 p-0 border rounded">
        <div className="bg-secondary text-white p-2 rounded-top">
          <h5 className="mb-0">{day}</h5>
        </div>
        <div className="p-3">
          <span>Loading forecast...</span>
        </div>
      </Container>
    );
  }

  if (!forecast) {
    return (
      <Container className="mb-3 p-0 border rounded">
        <div className="bg-secondary text-white p-2 rounded-top">
          <h5 className="mb-0">{day}</h5>
        </div>
        <div className="p-3">
          <span>No forecast available</span>
        </div>
      </Container>
    );
  }

  const getWeatherIcon = (weatherCode) => {
    // Map weather codes to emoji icons
    const weatherIcons = {
      200: "⛈️", // thunderstorm
      300: "🌧️", // drizzle
      500: "🌧️", // rain
      600: "❄️", // snow
      700: "🌫️", // atmosphere (fog, mist)
      800: "☀️", // clear
      801: "⛅", // few clouds
      802: "☁️", // scattered clouds
      803: "☁️", // broken clouds
      804: "☁️", // overcast clouds
    };

    const code = Math.floor(weatherCode / 100) * 100;
    return weatherIcons[code] || "🌤️";
  };

  return (
    <Container className="mb-3 p-0 border rounded">
      <div className="bg-primary text-white p-2 rounded-top">
        <h5 className="mb-0">{day}</h5>
      </div>
      <div className="p-3">
        <div className="mb-2 d-flex flex-column align-items-center justify-content-center">
          <span className="display-1 mb-1">
            {getWeatherIcon(forecast.weather[0].id)}
          </span>
          <div className="d-flex flex-row align-items-center justify-content-center mb-2">
            <span className="fw-bold fs-4 me-2">
              {Math.floor(forecast.temp.max)}ºF
            </span>
            <span className="text-muted">/</span>
            <span className="fw-bold fs-5 ms-2">
              {Math.floor(forecast.temp.min)}ºF
            </span>
          </div>
        </div>
        <div className="text-start fs-6">
          <Row>
            <Col md={4}>
              <Table size="sm" className="mb-0 daily-forecast-card-table">
                <tbody>
                  <tr>
                    <td>
                      <strong>Weather</strong>
                    </td>
                    <td>{forecast.weather[0].description}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Precipitation</strong>
                    </td>
                    <td>{forecast.pop * 100}%</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Humidity</strong>
                    </td>
                    <td>{forecast.humidity}%</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col md={8}>
              <Table size="sm" className="mb-0 daily-forecast-card-table">
                <tbody>
                  <tr>
                    <td>
                      <strong>Wind</strong>
                    </td>
                    <td>{Math.round(forecast.wind_speed)} mph</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>UV Index</strong>
                    </td>
                    <td>{Math.round(forecast.uvi)}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Summary</strong>
                    </td>
                    <td>{forecast.summary}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </div>
        {/* Period temps row */}
        <div className="d-flex justify-content-between align-items-end mt-3 mb-2">
          <div className="d-flex flex-column align-items-center flex-fill">
            <span className="small text-muted">Morning</span>
            <span className="display-6 fw-bold">
              {Math.floor(forecast.temp.morn)}ºF
            </span>
            <span className="text-secondary small">
              feels like {Math.floor(forecast.feels_like.morn)}ºF
            </span>
          </div>
          <div className="d-flex flex-column align-items-center flex-fill">
            <span className="small text-muted">Afternoon</span>
            <span className="display-6 fw-bold">
              {Math.floor(forecast.temp.day)}ºF
            </span>
            <span className="text-secondary small">
              feels like {Math.floor(forecast.feels_like.day)}ºF
            </span>
          </div>
          <div className="d-flex flex-column align-items-center flex-fill">
            <span className="small text-muted">Evening</span>
            <span className="display-6 fw-bold">
              {Math.floor(forecast.temp.eve)}ºF
            </span>
            <span className="text-secondary small">
              feels like {Math.floor(forecast.feels_like.eve)}ºF
            </span>
          </div>
          <div className="d-flex flex-column align-items-center flex-fill">
            <span className="small text-muted">Night</span>
            <span className="display-6 fw-bold">
              {Math.floor(forecast.temp.night)}ºF
            </span>
            <span className="text-secondary small">
              feels like {Math.floor(forecast.feels_like.night)}ºF
            </span>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DailyForecastCard;
