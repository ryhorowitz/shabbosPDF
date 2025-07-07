import React, { useEffect } from 'react';
import { useCandle } from '../context/CandleContext.js';

const CandleTimes = () => {
  const { candleData, loading, error } = useCandle();

  useEffect(() => {
    if (candleData && !loading) {
      const hebcalElement = document.getElementById('hebcal-shabbat');
      if (hebcalElement) {
        // Parse the JSON data and format it for display
        try {
          const data = typeof candleData === 'string' ? JSON.parse(candleData) : candleData;
          
          // Format the candle times data for display
          let displayHTML = '<div class="shabbos-times-display">';
          
          // data.items[0] candle
          // data.items[1] Parashas
          // data.items[2] havdalah
          
          if (data.items && Array.isArray(data.items)) {
            data.items.forEach(item => {
              if (item.category === 'candles') {
            
                displayHTML += `<div class="candle-time-item">`;
                displayHTML += `<strong>${item.title}</strong></div>`;
              }
              if (item.category === 'havdalah') {
                displayHTML += `<div class="havdalah-time-item">`;
                displayHTML += `<strong>${item.title}</strong></div>`;
              }
              if (item.category === 'parashat') {
                displayHTML = `<div class="parashas-item">` + displayHTML;
                displayHTML += `<strong>${item.title} ${item.hebrew}</strong></div>`;
              }
            });
          }
          // add a line break
          displayHTML += '<br>';
          displayHTML += '</div>';
          hebcalElement.innerHTML = displayHTML;
        } catch (err) {
          console.error('Error parsing candle data:', err);
          hebcalElement.innerHTML = '<p>Error loading candle times</p>';
        }
      }
    }
  }, [candleData, loading]);

  if (loading) {
    return (
      <div className="candle-times">
        <div id="hebcal-shabbat">
          <p>Loading candle times...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="candle-times">
        <div id="hebcal-shabbat">
          <p>Error loading candle times: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="candle-times">
      <div id="hebcal-shabbat"></div>
    </div>
  );
};

export default CandleTimes; 