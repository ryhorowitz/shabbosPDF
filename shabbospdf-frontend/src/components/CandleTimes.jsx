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
          let displayHTML = '<div class="candle-times-display">';
          
          if (data.items && Array.isArray(data.items)) {
            data.items.forEach(item => {
              if (item.category === 'candles') {
                const date = new Date(item.date);
                const timeString = date.toLocaleTimeString('en-US', { 
                  hour: 'numeric', 
                  minute: '2-digit',
                  hour12: true 
                });
                displayHTML += `<div class="candle-time-item">`;
                displayHTML += `<strong>${item.title}</strong>: ${timeString}</div>`;
              }
            });
          }
          
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