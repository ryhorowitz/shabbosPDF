import React, { useEffect } from 'react';

const CandleTimes = () => {
  useEffect(() => {
    fetch('https://www.hebcal.com/shabbat?cfg=i2&zip=19147&ue=off&M=on&lg=s&tgt=_top')
      .then(response => response.text())
      .then(data => {
        const hebcalElement = document.getElementById('hebcal-shabbat');
        if (hebcalElement) {
          hebcalElement.innerHTML = data;
        }
      })
      .catch(error => console.error('Error fetching candle times:', error));
  }, []);

  return (
    <div className="candle-times">
      <div id="hebcal-shabbat"></div>
    </div>
  );
};

export default CandleTimes; 