import React, { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useShabbos } from "../../context/shabbosContext.js";
import WeatherPDF from "./WeatherPDF.jsx";
import { PDFStylesProvider } from "../../context/PDFStylesContext";

const PDFDownloadButton = ({ forecastType }) => {
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);

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
        forecastType={forecastType}
      />
    </PDFStylesProvider>
  );

  const handlePreviewClick = () => {
    if (pdfBlobUrl) {
      window.open(pdfBlobUrl, "_blank");
    }
  };

  const handlePrintClick = () => {
    if (pdfBlobUrl) {
      const printWindow = window.open(pdfBlobUrl, "_blank");
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  return (
    <div className="text-center mt-4">
      <ButtonGroup size="lg" className="shadow-sm">
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
              <Button
                variant="success"
                disabled={pdfLoading}
                className="px-4 py-2 fw-semibold"
                style={{
                  borderWidth: "2px",
                  borderRadius: "8px 0 0 8px",
                  transition: "all 0.2s ease-in-out",
                }}
              >
                {pdfLoading ? "Generating PDF..." : "📄 Download PDF"}
              </Button>
            );
          }}
        </PDFDownloadLink>

        <Button
          variant="outline-primary"
          onClick={handlePreviewClick}
          disabled={!pdfBlobUrl}
          className="px-4 py-2 fw-semibold"
          style={{
            borderWidth: "2px",
            transition: "all 0.2s ease-in-out",
          }}
        >
          👁️ Preview PDF
        </Button>

        <Button
          variant="outline-secondary"
          onClick={handlePrintClick}
          disabled={!pdfBlobUrl}
          className="px-4 py-2 fw-semibold"
          style={{
            borderWidth: "2px",
            borderRadius: "0 8px 8px 0",
            transition: "all 0.2s ease-in-out",
          }}
        >
          🖨️ Print PDF
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default PDFDownloadButton;
