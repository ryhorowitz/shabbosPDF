import React, { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useShabbos } from "../../context/shabbosContext.js";
import WeatherPDF from "./WeatherPDF.jsx";
import { PDFStylesProvider } from "../../context/PDFStylesContext";

const PDFDownloadButton = () => {
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);

  const {
    getShabbosForecasts,
    getShabbosDailySummaries,
    weatherLoading,
    candleData,
    geoData,
    candleLoading,
  } = useShabbos();

  const { friday: fridayPeriods, saturday: saturdayPeriods } =
    getShabbosForecasts(candleData);
  const { friday: fridaySummary, saturday: saturdaySummary } =
    getShabbosDailySummaries(candleData);

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
        candleData={candleData}
        geoData={geoData}
      />
    </PDFStylesProvider>
  );

  const handlePreviewClick = () => {
    if (pdfBlobUrl) {
      window.open(pdfBlobUrl, "_blank");
    }
  };

  return (
    <div className="text-center mt-4">
      <ButtonGroup className="mb-3">
        <PDFDownloadLink
          document={pdfDocument}
          fileName="shabbos-weather-and-candle-times.pdf"
        >
          {({ blob, url, loading: pdfLoading, error: pdfError }) => {
            // Store the blob URL for preview
            if (blob && !pdfBlobUrl) {
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
