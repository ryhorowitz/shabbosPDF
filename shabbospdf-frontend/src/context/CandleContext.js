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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandleTimes = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('https://www.hebcal.com/shabbat?cfg=i2&zip=19147&ue=off&M=on&lg=s&tgt=_top');
        
        if (!response.ok) {
          throw new Error('Failed to fetch candle times');
        }
        
        const data = await response.text();
        setCandleData(data);
      } catch (err) {
        console.error('Error fetching candle times:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCandleTimes();
  }, []);

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