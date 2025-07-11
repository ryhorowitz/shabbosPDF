import React from "react";
import { Button } from "react-bootstrap";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useShabbos } from "../../context/shabbosContext.js";
import WeatherPDF from "./WeatherPDF.jsx";
import { PDFStylesProvider } from "../../context/PDFStylesContext";

const PDFDownloadButton = () => {
  const { getDayForecast, weatherLoading, candleData, geoData, candleLoading } =
    useShabbos();

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
    <div className="text-center mt-4">
      <PDFDownloadLink
        document={
          <PDFStylesProvider>
            <WeatherPDF
              fridayForecast={fridayForecast}
              saturdayForecast={saturdayForecast}
              candleData={candleData}
              geoData={geoData}
            />
          </PDFStylesProvider>
        }
        fileName="shabbos-weather-and-candle-times.pdf"
      >
        {({ blob, url, loading: pdfLoading, error: pdfError }) => (
          <Button variant="primary" disabled={pdfLoading}>
            {pdfLoading
              ? "Generating PDF..."
              : "Download Weather & Candle Times PDF"}
          </Button>
        )}
      </PDFDownloadLink>
    </div>
  );
};

export default PDFDownloadButton;
