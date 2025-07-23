import React from "react";
import { Row, Col } from "react-bootstrap";
import { useShabbos } from "../context/shabbosContext.js";
import DailyForecastCard from "./DailyForecastCard.jsx";

const WeatherContainer = () => {
  const {
    weatherLoading: loading,
    weatherError: error,
    getShabbosForecasts,
    getShabbosDailySummaries,
    candleData,
  } = useShabbos();
  if (error) {
    return (
      <div className="weather-content">
        <h2>Weather Report</h2>
        <p>Error loading weather data: {error}</p>
      </div>
    );
  }

  const { friday: fridayPeriods, saturday: saturdayPeriods } =
    getShabbosForecasts(candleData);
  const { friday: fridaySummary, saturday: saturdaySummary } =
    getShabbosDailySummaries(candleData);

  return (
    <div className="weather-content">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Shabbos Weather Forecast</h2>
      </div>
      <Row>
        <Col md={12}>
          {fridayPeriods && fridayPeriods.length > 0 && (
            <DailyForecastCard
              dayString="Friday"
              periods={fridayPeriods}
              summary={fridaySummary}
              loading={loading}
            />
          )}
        </Col>
        <Col md={12}>
          {saturdayPeriods && saturdayPeriods.length > 0 && (
            <DailyForecastCard
              dayString="Saturday"
              periods={saturdayPeriods}
              summary={saturdaySummary}
              loading={loading}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default WeatherContainer;
