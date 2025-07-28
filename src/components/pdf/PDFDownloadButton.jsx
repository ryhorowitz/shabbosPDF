import React, { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useShabbos } from "../../context/shabbosContext.js";
import WeatherPDF from "./WeatherPDF.jsx";
import { PDFStylesProvider } from "../../context/PDFStylesContext";

const PDFDownloadButton = () => {
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
  const [pdfForecastType, setPdfForecastType] = useState("daily"); // "daily" or "hourly"

  const {
    getShabbosForecasts,
    getShabbosDailySummaries,
    getShabbosHourlyForecasts,
    weatherLoading,
    candleData,
    geoData,
    candleLoading,
  } = useShabbos();

  const { friday: fridayPeriods, saturday: saturdayPeriods } =
    getShabbosForecasts(candleData);
  const { friday: fridaySummary, saturday: saturdaySummary } =
    getShabbosDailySummaries(candleData);
  const { friday: fridayHourly, saturday: saturdayHourly } =
    getShabbosHourlyForecasts(candleData);

  const isLoading = weatherLoading || candleLoading;
  const hasData =
    fridayPeriods &&
    saturdayPeriods &&
    fridayPeriods.length > 0 &&
    saturdayPeriods.length > 0 &&
    candleData &&
    geoData;

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

  const pdfDocument = (
    <PDFStylesProvider>
      <WeatherPDF
        fridayPeriods={fridayPeriods}
        saturdayPeriods={saturdayPeriods}
        fridaySummary={fridaySummary}
        saturdaySummary={saturdaySummary}
        fridayHourly={fridayHourly}
        saturdayHourly={saturdayHourly}
        candleData={candleData}
        geoData={geoData}
        forecastType={pdfForecastType}
      />
    </PDFStylesProvider>
  );

  const handlePreviewClick = () => {
    if (pdfBlobUrl) {
      window.open(pdfBlobUrl, "_blank");
    }
  };

  const handleForecastTypeChange = (newType) => {
    setPdfForecastType(newType);
    // Reset the blob URL when forecast type changes
    setPdfBlobUrl(null);
  };

  return (
    <div className="text-center mt-4">
      {/* PDF Forecast Type Toggle */}
      <div className="mb-3">
        <ButtonGroup size="sm">
          <Button
            variant={
              pdfForecastType === "daily" ? "primary" : "outline-primary"
            }
            onClick={() => handleForecastTypeChange("daily")}
          >
            General Forecast
          </Button>
          <Button
            variant={
              pdfForecastType === "hourly" ? "primary" : "outline-primary"
            }
            onClick={() => handleForecastTypeChange("hourly")}
          >
            Hourly Forecast
          </Button>
        </ButtonGroup>
      </div>

      <ButtonGroup className="mb-3">
        <PDFDownloadLink
          document={pdfDocument}
          fileName="shabbos-weather-and-candle-times.pdf"
        >
          {({ blob, url, loading: pdfLoading, error: pdfError }) => {
            // Store the blob URL for preview
            if (blob && url) {
              setPdfBlobUrl(url);
            }

            return (
              <Button variant="primary" disabled={pdfLoading}>
                {pdfLoading ? "Generating PDF..." : "Download PDF"}
              </Button>
            );
          }}
        </PDFDownloadLink>

        <Button
          variant="outline-primary"
          onClick={handlePreviewClick}
          disabled={!pdfBlobUrl}
        >
          Preview PDF
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default PDFDownloadButton;
