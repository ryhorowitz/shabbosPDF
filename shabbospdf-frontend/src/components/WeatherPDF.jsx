import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

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

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
    fontFamily: 'Helvetica'
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 0,
    color: '#333333'
  },
  section: {
    margin: 10,
    marginBottom: 5,
    padding: 10,
    flexGrow: 1
  },
  card: {
    border: '1px solid #e0e0e0',
    borderRadius: 8,
    padding: 15,
    marginBottom: 5,
    backgroundColor: '#f9f9f9'
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50'
  },
  weatherInfo: {
    fontSize: 12,
    marginBottom: 5,
    color: '#555555'
  },
  temperature: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 10
  },
  summary: {
    fontSize: 11,
    fontStyle: 'italic',
    color: '#7f8c8d',
    marginTop: 0
  },
  candleSection: {
    border: '1px solid #e0e0e0',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fff8dc'
  },
  candleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#8b4513'
  },
  candleInfo: {
    fontSize: 12,
    marginBottom: 5,
    color: '#555555'
  },
  twoColumnContainer: {
    flexDirection: 'row',
    marginBottom: 5
  },
  column: {
    flex: 1,
    marginRight: 10
  },
  columnRight: {
    flex: 1
  }
});

const WeatherPDF = ({ fridayForecast, saturdayForecast, candleData }) => {
  // Extract parsha, candle, and havdalah items
  let candleItem = candleData.items[0];
  let parshaItem = candleData.items[1];
  let havdalahItem = candleData.items[2];

  return (
    <Document title='Shabbos Weather & Times'>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>Shabbos Weather & Candle Times</Text>
          <Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 4 }}>{parshaItem.title} 
            <Text style={{ fontFamily: 'NotoSansHebrew', fontSize: 32 }}>  {parshaItem.hebrew}</Text>
          </Text>
        </View>
        <View style={styles.section}>
          {/* Candle Times Section */}
          <View style={styles.candleSection}>
            {parshaItem && (
              <View>
                {parshaItem.hdate && <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 8 }}>{parshaItem.hdate}</Text>}
              </View>
            )}
            {candleItem && (
              <View>
                <Text style={styles.candleTitle}>Candle Lighting</Text>
                  <Text style={styles.candleInfo}>
                    {new Date(candleItem.date).toLocaleString('en-US', {
                      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit'
                    })}
                  </Text>
              </View>
            )}
            {havdalahItem && (
              <View>
                <Text style={styles.candleTitle}>Havdalah</Text>
                  <Text style={styles.candleInfo}>
                    {new Date(havdalahItem.date).toLocaleString('en-US', {
                      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit'
                    })}
                  </Text>
                )
              </View>
            )}
          </View>
          {/* Weather Forecast Section */}
          {fridayForecast && (
            <View style={styles.card}>
              <Text style={styles.dayTitle}>Friday Weather
                <Text style={styles.summary}> {fridayForecast.summary}</Text>
              </Text>
              <Text style={styles.temperature}>
                {Math.floor(fridayForecast.temp.min)}°F / {Math.floor(fridayForecast.temp.max)}°F
              </Text>
              <View style={styles.twoColumnContainer}>
                <View style={styles.column}>
                  <Text style={styles.weatherInfo}>
                    Weather: {fridayForecast.weather[0].description}
                  </Text>
                  <Text style={styles.weatherInfo}>
                    Precipitation: {Math.round(fridayForecast.pop * 100)}%
                  </Text>
                  <Text style={styles.weatherInfo}>
                    Humidity: {fridayForecast.humidity}%
                  </Text>
                </View>
                <View style={styles.columnRight}>
                  <Text style={styles.weatherInfo}>
                    Wind: {Math.round(fridayForecast.wind_speed)} mph
                  </Text>
                  <Text style={styles.weatherInfo}>
                    UV Index: {Math.round(fridayForecast.uvi)}
                  </Text>

                </View>
              </View>
              <Text style={styles.weatherInfo}>Morning {Math.floor(fridayForecast.temp.morn)}ºF</Text>
              <Text style={styles.weatherInfo}>Afternoon {Math.floor(fridayForecast.temp.day)}ºF</Text>
              <Text style={styles.weatherInfo}>Evening {Math.floor(fridayForecast.temp.eve)}ºF</Text>
              <Text style={styles.weatherInfo}>Night {Math.floor(fridayForecast.temp.night)}ºF</Text>
            </View>
          )}
          {saturdayForecast && (
            <View style={styles.card}>
              <Text style={styles.dayTitle}>Saturday Weather
                <Text style={styles.summary}>{saturdayForecast.summary}</Text>
              </Text>
              <Text style={styles.temperature}>
                {Math.floor(saturdayForecast.temp.min)}°F / {Math.round(saturdayForecast.temp.max)}°F
              </Text>
              <View style={styles.twoColumnContainer}>
                <View style={styles.column}>
                  <Text style={styles.weatherInfo}>
                    Weather: {saturdayForecast.weather[0].description}
                  </Text>
                  <Text style={styles.weatherInfo}>
                    Precipitation: {Math.round(saturdayForecast.pop * 100)}%
                  </Text>
                  <Text style={styles.weatherInfo}>
                    Humidity: {saturdayForecast.humidity}%
                  </Text>
                </View>
                <View style={styles.columnRight}>
                  <Text style={styles.weatherInfo}>
                    Wind: {Math.round(saturdayForecast.wind_speed)} mph
                  </Text>
                  <Text style={styles.weatherInfo}>
                    UV Index: {Math.round(saturdayForecast.uvi)}
                  </Text>
                </View>
              </View>
              <Text style={styles.weatherInfo}>Morning {Math.floor(saturdayForecast.temp.morn)}ºF</Text>
              <Text style={styles.weatherInfo}>Day {Math.floor(saturdayForecast.temp.day)}ºF</Text>
              <Text style={styles.weatherInfo}>Afternoon {Math.floor(saturdayForecast.temp.eve)}ºF</Text>
              <Text style={styles.weatherInfo}>Night {Math.floor(saturdayForecast.temp.night)}ºF</Text>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default WeatherPDF; 