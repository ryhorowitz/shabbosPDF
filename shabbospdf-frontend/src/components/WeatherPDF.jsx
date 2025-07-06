import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Register a default font
Font.register({
  family: 'Helvetica',
  src: 'https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyC0IT4ttDfA.ttf'
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
    marginBottom: 20,
    color: '#333333'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  card: {
    border: '1px solid #e0e0e0',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
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
    marginTop: 10
  }
});

const WeatherPDF = ({ fridayForecast, saturdayForecast }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text>Shabbos Weather Forecast</Text>
      </View>
      
      <View style={styles.section}>
        {fridayForecast && (
          <View style={styles.card}>
            <Text style={styles.dayTitle}>Friday</Text>
            <Text style={styles.temperature}>
              {Math.floor(fridayForecast.temp.min)}°F / {Math.floor(fridayForecast.temp.max)}°F
            </Text>
            <Text style={styles.weatherInfo}>
              Weather: {fridayForecast.weather[0].description}
            </Text>
            <Text style={styles.weatherInfo}>
              Precipitation: {Math.round(fridayForecast.pop * 100)}%
            </Text>
            <Text style={styles.weatherInfo}>
              Humidity: {fridayForecast.humidity}%
            </Text>
            <Text style={styles.weatherInfo}>
              Wind: {Math.round(fridayForecast.wind_speed)} mph
            </Text>
            <Text style={styles.weatherInfo}>
              UV Index: {Math.round(fridayForecast.uvi)}
            </Text>
            <Text style={styles.summary}>
              {fridayForecast.summary}
            </Text>
          </View>
        )}
        
        {saturdayForecast && (
          <View style={styles.card}>
            <Text style={styles.dayTitle}>Saturday</Text>
            <Text style={styles.temperature}>
              {Math.floor(saturdayForecast.temp.min)}°F / {Math.round(saturdayForecast.temp.max)}°F
            </Text>
            <Text style={styles.weatherInfo}>
              Weather: {saturdayForecast.weather[0].description}
            </Text>
            <Text style={styles.weatherInfo}>
              Precipitation: {Math.round(saturdayForecast.pop * 100)}%
            </Text>
            <Text style={styles.weatherInfo}>
              Humidity: {saturdayForecast.humidity}%
            </Text>
            <Text style={styles.weatherInfo}>
              Wind: {Math.round(saturdayForecast.wind_speed)} mph
            </Text>
            <Text style={styles.weatherInfo}>
              UV Index: {Math.round(saturdayForecast.uvi)}
            </Text>
            <Text style={styles.summary}>
              {saturdayForecast.summary}
            </Text>
          </View>
        )}
      </View>
    </Page>
  </Document>
);

export default WeatherPDF; 