import React, { useState } from "react";
import { Row, Col, ButtonGroup, Button } from "react-bootstrap";
import { useShabbos } from "../context/shabbosContext.js";
import DailyForecastCard from "./DailyForecastCard.jsx";
import HourlyForecastTable from "./HourlyForecastTable.jsx";
import PDFDownloadButton from "./pdf/PDFDownloadButton.jsx";

const WeatherContainer = ({ forecastType, setForecastType }) => {
  const {
    weatherLoading: loading,
    weatherError: error,
    getShabbosForecasts,
    getShabbosDailySummaries,
    getShabbosHourlyForecasts,
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
  const { friday: fridayHourly, saturday: saturdayHourly } =
    getShabbosHourlyForecasts(candleData);

  return (
    <div className="weather-content">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="me-4 mb-0">Shabbos Weather Forecast</h2>
        <ButtonGroup size="lg" className="shadow-sm">
          <Button
            variant={forecastType === "daily" ? "primary" : "outline-primary"}
            onClick={() => setForecastType("daily")}
            className="px-4 py-2 fw-semibold"
            style={{
              borderWidth: "2px",
              borderRadius:
                forecastType === "daily" ? "8px 0 0 8px" : "8px 0 0 8px",
              transition: "all 0.2s ease-in-out",
            }}
          >
            General Forecast
          </Button>
          <Button
            variant={forecastType === "hourly" ? "primary" : "outline-primary"}
            onClick={() => setForecastType("hourly")}
            className="px-4 py-2 fw-semibold"
            style={{
              borderWidth: "2px",
              borderRadius:
                forecastType === "hourly" ? "0 8px 8px 0" : "0 8px 8px 0",
              transition: "all 0.2s ease-in-out",
            }}
          >
            Hourly Forecast
          </Button>
        </ButtonGroup>
      </div>

      {/* PDF Download Button */}
      <div className="mb-4">
        <PDFDownloadButton forecastType={forecastType} />
      </div>

      {forecastType === "daily" ? (
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
      ) : (
        <Row>
          <Col md={12}>
            {fridayHourly && fridayHourly.length > 0 && (
              <HourlyForecastTable
                dayString="Friday"
                hourlyData={fridayHourly}
                summary={fridaySummary}
                loading={loading}
              />
            )}
          </Col>
          <Col md={12}>
            {saturdayHourly && saturdayHourly.length > 0 && (
              <HourlyForecastTable
                dayString="Saturday"
                hourlyData={saturdayHourly}
                summary={saturdaySummary}
                loading={loading}
              />
            )}
          </Col>
        </Row>
      )}
    </div>
  );
};

export default WeatherContainer;
