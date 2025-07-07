import React, { createContext, useContext, useState, useEffect } from 'react';

const CandleContext = createContext();

export const useCandle = () => {
  const context = useContext(CandleContext);
  if (!context) {
    throw new Error('useCandle must be used within a CandleProvider');
  }
  return context;
};

export const CandleProvider = ({ children }) => {
  const [candleData, setCandleData] = useState(null);
  const [geoData, setGeoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // First useEffect to get geo data
  useEffect(() => {
    const getGeoData = async () => {
      try {
        const response = await fetch('https://ipinfo.io/json');
        const data = await response.json();
        setGeoData(data);
      } catch (err) {
        console.error('Error fetching geo data:', err);
        setError('Failed to get location data');
        setLoading(false);
      }
    };
    getGeoData();
  }, []);

  // Second useEffect to fetch candle times when geoData is available
  useEffect(() => {
    if (!geoData) return; // Don't run if geoData is not set yet

    const fetchCandleTimes = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Extract location data from geoData
        const lat = geoData.loc.split(',')[0];
        const lon = geoData.loc.split(',')[1];
        const timezone = geoData.timezone;
        
        const response = await fetch(`https://www.hebcal.com/shabbat?cfg=json&latitude=${lat}&longitude=${lon}&tzid=${timezone}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch candle times');
        }
        
        const data = await response.json();
        setCandleData(data);
      } catch (err) {
        console.error('Error fetching candle times:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCandleTimes();
  }, [geoData]);

  const value = {
    candleData,
    loading,
    error
  };

  return (
    <CandleContext.Provider value={value}>
      {children}
    </CandleContext.Provider>
  );
}; 