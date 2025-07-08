import React from 'react';
import { Button } from 'react-bootstrap';
import { PDFViewer } from '@react-pdf/renderer';
import { useWeather, WeatherProvider } from '../../context/WeatherContext.js';
import { CandleProvider, useCandle } from '../../context/CandleContext.js';
import WeatherPDF from './WeatherPDF.jsx';
import { PDFStyleProvider } from '../../context/PDFStylesContext.js';

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
    <div style={{width:"100vw", height:"90vh"}} className="text-center mt-4">
      <CandleProvider><WeatherProvider>
      <PDFViewer width="100%" height="100%">
        <PDFStyleProvider>
          <WeatherPDF/>
        </PDFStyleProvider>
      </PDFViewer>
        </WeatherProvider></CandleProvider>
    </div>
  );
};

export default PDFDownloadButton; 