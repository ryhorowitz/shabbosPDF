import React from 'react';
import { Button } from 'react-bootstrap';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useWeather } from '../context/WeatherContext.js';
import { useCandle } from '../context/CandleContext.js';
import WeatherPDF from './WeatherPDF.jsx';

const PDFDownloadButton = () => {
  const { getDayForecast, loading: weatherLoading } = useWeather();
  const { candleData, loading: candleLoading } = useCandle();

  const fridayForecast = getDayForecast('Friday');
  const saturdayForecast = getDayForecast('Saturday');

  const isLoading = weatherLoading || candleLoading;
  const hasData = fridayForecast && saturdayForecast && candleData;

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
          <WeatherPDF 
            fridayForecast={fridayForecast} 
            saturdayForecast={saturdayForecast}
            candleData={candleData}
          />
        }
        fileName="shabbos-weather-and-candle-times.pdf"
      >
        {({ blob, url, loading: pdfLoading, error: pdfError }) => (
          <Button variant="primary" disabled={pdfLoading}>
            {pdfLoading ? 'Generating PDF...' : 'Download Weather & Candle Times PDF'}
          </Button>
        )}
      </PDFDownloadLink>
    </div>
  );
};

export default PDFDownloadButton; 