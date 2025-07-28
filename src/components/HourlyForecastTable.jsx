import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import humidityIcon from "../humidity-droplet-icon.svg";

const HourlyForecastTable = ({ dayString, hourlyData, loading }) => {
  if (loading) {
    return (
      <Container className="mb-3 p-0 border rounded">
        <div className="bg-secondary text-white p-2 rounded-top">
          <h5 className="mb-0" style={{ fontSize: "1.1rem" }}>
            {dayString} Hourly Forecast
          </h5>
        </div>
        <div className="p-3">
          <span style={{ fontSize: "0.95rem" }}>
            Loading hourly forecast...
          </span>
        </div>
      </Container>
    );
  }

  if (!hourlyData || hourlyData.length === 0) {
    return (
      <Container className="mb-3 p-0 border rounded">
        <div className="bg-secondary text-white p-2 rounded-top">
          <h5 className="mb-0" style={{ fontSize: "1.1rem" }}>
            {dayString} Hourly Forecast
          </h5>
        </div>
        <div className="p-3">
          <span style={{ fontSize: "0.95rem" }}>
            No hourly forecast available
          </span>
        </div>
      </Container>
    );
  }

  const formatTime = (startTime) => {
    const date = new Date(startTime);
    return date
      .toLocaleTimeString("en-US", {
        hour: "numeric",
        hour12: true,
      })
      .replace(":00", "")
      .toLowerCase();
  };

  const getWindDisplay = (windSpeed, windDirection) => {
    if (!windSpeed || !windDirection) return "N/A";
    return `${windDirection} ${windSpeed}`;
  };

  return (
    <Container className="mb-3 p-0 border rounded hourly-forecast-table Regular shadow">
      <div className="bg-primary text-white p-2 rounded-top">
        <h5
          className="mb-0 justify-content-center d-flex"
          style={{ fontSize: "1.5rem" }}
        >
          {dayString} Hourly Forecast
        </h5>
      </div>
      <div className="p-3 bg-gradient-info">
        {/* Table Header */}
        <Row
          className="mb-2 fw-bold text-center"
          style={{ fontSize: "0.9rem" }}
        >
          <Col xs={2}>Time</Col>
          <Col xs={1}>Temp</Col>
          <Col xs={4}>Weather</Col>
          <Col xs={2}>Precip</Col>
          <Col xs={2}>Wind</Col>
        </Row>

        {/* Hourly Rows */}
        {hourlyData.map((hour, idx) => (
          <Row
            key={hour?.startTime || idx}
            className="mb-2 align-items-center text-center border-bottom pb-2"
            style={{ fontSize: "0.95rem" }}
          >
            <Col xs={2}>{hour ? formatTime(hour.startTime) : "N/A"}</Col>
            <Col xs={1} className="fw-bold">
              {hour ? `${hour.temperature}°${hour.temperatureUnit}` : "N/A"}
            </Col>
            <Col xs={4}>
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: 8 }}
              >
                {hour?.icon && (
                  <img
                    src={hour.icon}
                    alt={hour.shortForecast}
                    style={{ width: 32, height: 32 }}
                  />
                )}
                <span style={{ fontSize: "0.7rem" }}>
                  {hour?.shortForecast || "N/A"}
                </span>
              </div>
            </Col>
            <Col xs={2}>
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: 4 }}
              >
                <img
                  src={humidityIcon}
                  alt="Precipitation"
                  style={{ width: 16, height: 16, opacity: 0.7 }}
                />
                <span>
                  {hour?.probabilityOfPrecipitation?.value !== null
                    ? `${hour.probabilityOfPrecipitation.value}%`
                    : "0%"}
                </span>
              </div>
            </Col>
            <Col xs={2} style={{ fontSize: "0.7rem" }}>
              {hour
                ? getWindDisplay(hour.windSpeed, hour.windDirection)
                : "N/A"}
            </Col>
          </Row>
        ))}
      </div>
    </Container>
  );
};

export default HourlyForecastTable;
