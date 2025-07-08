import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { usePDFStyles } from '../../context/PDFStylesContext';

// Register a default font
Font.register({
  family: 'Helvetica',
  src: 'https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyC0IT4ttDfA.ttf'
});
Font.register({
  family: 'NotoSansHebrew',
  src: '/fonts/static/NotoSansHebrew-Regular.ttf',
  fontStyle: 'normal',
  fontWeight: 'normal'
});


const WeatherPDF = ({ fridayForecast, saturdayForecast, candleData }) => {
  const styles = usePDFStyles();
  // Extract parsha, candle, and havdalah items
  let candleItem = candleData.items[0];
  let parshaItem = candleData.items[1];
  let havdalahItem = candleData.items[2];

  return (
    <Document title='Shabbos Weather & Times'>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 4 }}>{parshaItem.title} 
            <Text style={{ fontFamily: 'NotoSansHebrew', fontSize: 32 }}>  {parshaItem.hebrew}</Text>
          </Text>
          {parshaItem && (
              <View>
                {parshaItem.hdate && <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{parshaItem.hdate}</Text>}
              </View>
            )}
        </View>
        <View style={styles.section}>
          {/* Candle Times Section */}
          <View style={styles.candleSection}>
            
            {candleItem && (
              <View>
                <Text style={styles.candleTitle}>
                  Candle Lighting {new Date(candleItem.date).toLocaleString('en-US', {
                      hour: 'numeric', minute: '2-digit'
                    })}
                  </Text>
                  <Text style={styles.candleInfo}>
                    {new Date(candleItem.date).toLocaleString('en-US', {
                      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </Text>
              </View>
            )}
            {havdalahItem && (
              <View>
                <Text style={styles.candleTitle}>Havdalah {new Date(havdalahItem.date).toLocaleString('en-US', {
                      hour: 'numeric', minute: '2-digit'
                    })}
                </Text>
                  <Text style={styles.candleInfo}>
                    {new Date(havdalahItem.date).toLocaleString('en-US', {
                      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </Text>
                )
              </View>
            )}
          </View>
          {/* Weather Forecast Section */}
          {[
            { label: 'Friday', forecast: fridayForecast },
            { label: 'Saturday', forecast: saturdayForecast }
          ].map(({ label, forecast }) =>
            forecast && (
              <View style={styles.card} key={label}>
                <Text style={styles.dayTitle}>{label} Weather
                  <Text style={styles.summary}> {forecast.summary}</Text>
                </Text>
                <Text style={styles.temperature}>
                  {Math.floor(forecast.temp.min)}°F / {Math.floor(forecast.temp.max)}°F
                </Text>
                <View style={styles.twoColumnContainer}>
                  <View style={styles.column}>
                    <Text style={styles.weatherInfo}>
                      Weather: {forecast.weather[0].description}
                    </Text>
                    <Text style={styles.weatherInfo}>
                      Precipitation: {Math.round(forecast.pop * 100)}%
                    </Text>
                    <Text style={styles.weatherInfo}>
                      Humidity: {forecast.humidity}%
                    </Text>
                  </View>
                  <View style={styles.columnRight}>
                    <Text style={styles.weatherInfo}>
                      Wind: {Math.round(forecast.wind_speed)} mph
                    </Text>
                    <Text style={styles.weatherInfo}>
                      UV Index: {Math.round(forecast.uvi)}
                    </Text>
                  </View>
                </View>
                <Text style={styles.weatherInfo}>Morning {Math.floor(forecast.temp.morn)}ºF</Text>
                <Text style={styles.weatherInfo}>{label === 'Saturday' ? 'Day' : 'Afternoon'} {Math.floor(forecast.temp.day)}ºF</Text>
                <Text style={styles.weatherInfo}>Evening {Math.floor(forecast.temp.eve)}ºF</Text>
                <Text style={styles.weatherInfo}>Night {Math.floor(forecast.temp.night)}ºF</Text>
              </View>
            )
          )}
        </View>
      </Page>
    </Document>
  );
};

export default WeatherPDF; 