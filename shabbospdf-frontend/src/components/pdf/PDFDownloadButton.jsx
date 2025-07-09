import React from "react";
import { Button } from "react-bootstrap";
import { PDFViewer } from "@react-pdf/renderer";
import { useWeather } from "../../context/WeatherContext.js";
import { useCandle } from "../../context/CandleContext.js";
import WeatherPDF from "./WeatherPDF.jsx";
import { PDFStylesProvider } from "../../context/PDFStylesContext";

const PDFDownloadButton = () => {
  const { getDayForecast, loading: weatherLoading } = useWeather();
  const { candleData, geoData, loading: candleLoading } = useCandle();

  const fridayForecast = getDayForecast("Friday");
  const saturdayForecast = getDayForecast("Saturday");

  const isLoading = weatherLoading || candleLoading;
  const hasData = fridayForecast && saturdayForecast && candleData && geoData;

  if (isLoading) {
    return (
      <div className="text-center mt-4">
        <Button variant="primary" disabled>
          Loading data for PDF...
        </Button>
      </div>
    );
  }

  if (!hasData) {
    return (
      <div className="text-center mt-4">
        <Button variant="secondary" disabled>
          No data available for PDF
        </Button>
      </div>
    );
  }

  return (
    <div
      style={{ width: "100vw", height: "90vh" }}
      className="text-center mt-4"
    >
      <PDFViewer width="100%" height="100%">
        <PDFStylesProvider>
          <WeatherPDF
            fridayForecast={fridayForecast}
            saturdayForecast={saturdayForecast}
            candleData={candleData}
            geoData={geoData}
          />
        </PDFStylesProvider>
      </PDFViewer>
    </div>
  );
};

export default PDFDownloadButton;
