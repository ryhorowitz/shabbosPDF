import React from "react";
import { Document, Page, Text, View, Image, Font } from "@react-pdf/renderer";
import { usePDFStyles } from "../../context/PDFStylesContext";
import { extractCandleItems } from "../../utils/candleDataUtils.js";

// Register a default font
Font.register({
  family: "Helvetica",
  src: "https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyC0IT4ttDfA.ttf",
});
Font.register({
  family: "NotoSansHebrew",
  src: "/fonts/static/NotoSansHebrew-Regular.ttf",
  fontStyle: "normal",
  fontWeight: "normal",
});

const WeatherPDF = ({
  fridayForecast,
  saturdayForecast,
  candleData,
  geoData,
}) => {
  const styles = usePDFStyles();
  // Extract parsha, candle, and havdalah items
  const { candleItem, parshaItem, havdalahItem } =
    extractCandleItems(candleData);

  const getWeatherIcon = (weatherCode) => {
    // Map weather codes to emoji icons
    const weatherIcons = {
      200: "https://openweathermap.org/img/wn/11d@2x.png", // thunderstorm
      300: "https://openweathermap.org/img/wn/10d@2x.png", // drizzle rain
      500: "https://openweathermap.org/img/wn/09d@2x.png", // shower rain
      600: "https://openweathermap.org/img/wn/013d@2x.png", // snow
      700: "https://openweathermap.org/img/wn/50d@2x.png", // fog/mist
      800: "https://openweathermap.org/img/wn/01d@2x.png", // clear sky
      801: "https://openweathermap.org/img/wn/02d@2x.png", // few clouds
      802: "https://openweathermap.org/img/wn/03d@2x.png", // scattered clouds
      803: "https://openweathermap.org/img/wn/04d@2x.png", // broken clouds
      804: "https://openweathermap.org/img/wn/04d@2x.png", // overcast
    };
    const code = Math.floor(weatherCode / 100) * 100;
    return weatherIcons[code] || "☀";
  };

  return (
    <Document title="Shabbos Weather & Times">
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
            {parshaItem.title}
            <Text style={{ fontFamily: "NotoSansHebrew" }}>
              {" "}
              {parshaItem.hebrew}
            </Text>
          </Text>
          {parshaItem && (
            <View>
              {parshaItem.hdate && (
                <View style={{ alignItems: "center", width: "100%" }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                  >
                    {parshaItem.hdate}
                  </Text>
                </View>
              )}
            </View>
          )}
          <Text>{console.log("fridayForecast", fridayForecast)}</Text>
          <Text>{console.log("geoData", geoData)}</Text>
          <View style={{ alignItems: "center", width: "100%" }}>
            <Text style={{ fontSize: 14, textAlign: "center" }}>
              {geoData.city}, {geoData.region}
            </Text>
          </View>
        </View>
        <View style={styles.section}>
          {/* Candle Times Section */}
          <View style={styles.candleSection}>
            {candleItem && (
              <View>
                <Text style={styles.candleTitle}>
                  Candle Lighting{" "}
                  {new Date(candleItem.date).toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </Text>
                <Text style={styles.candleInfo}>
                  {new Date(candleItem.date).toLocaleString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Text>
              </View>
            )}
            {havdalahItem && (
              <View>
                <Text style={styles.candleTitle}>
                  Havdalah{" "}
                  {new Date(havdalahItem.date).toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </Text>
                <Text style={styles.candleInfo}>
                  {new Date(havdalahItem.date).toLocaleString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Text>
              </View>
            )}
          </View>
          {/* Weather Forecast Section */}
          {[
            { label: "Friday", forecast: fridayForecast },
            { label: "Saturday", forecast: saturdayForecast },
          ].map(
            ({ label, forecast }) =>
              forecast && (
                <View style={styles.card} key={label}>
                  <View style={styles.weatherHeader}>
                    <Text style={styles.dayTitle}>{label}</Text>
                    <Text style={{ fontSize: 72 }}>
                      <Image src={getWeatherIcon(forecast.weather[0].id)} />
                    </Text>
                    <Text style={styles.temperature}>
                      {Math.floor(forecast.temp.min)}°F /{" "}
                      {Math.floor(forecast.temp.max)}°F
                    </Text>
                    <Text style={styles.summary}>{forecast.summary}</Text>
                  </View>
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
                  <View style={styles.tempTableRow}>
                    <View style={styles.tempTableCol}>
                      <Text style={styles.tempPeriodLabel}>Morning</Text>
                      <Text style={styles.tempPeriodValue}>
                        {Math.floor(forecast.temp.morn)}ºF
                      </Text>
                      <Text style={styles.feelsLikeTemp}>
                        Feels like: {Math.floor(forecast.feels_like.morn)}ºF
                      </Text>
                    </View>
                    <View style={styles.tempTableCol}>
                      <Text style={styles.tempPeriodLabel}>Day</Text>
                      <Text style={styles.tempPeriodValue}>
                        {Math.floor(forecast.temp.day)}ºF
                      </Text>
                      <Text style={styles.feelsLikeTemp}>
                        Feels like: {Math.floor(forecast.feels_like.day)}ºF
                      </Text>
                    </View>
                    <View style={styles.tempTableCol}>
                      <Text style={styles.tempPeriodLabel}>Evening</Text>
                      <Text style={styles.tempPeriodValue}>
                        {Math.floor(forecast.temp.eve)}ºF
                      </Text>
                      <Text style={styles.feelsLikeTemp}>
                        Feels like: {Math.floor(forecast.feels_like.eve)}ºF
                      </Text>
                    </View>
                    <View style={styles.tempTableCol}>
                      <Text style={styles.tempPeriodLabel}>Night</Text>
                      <Text style={styles.tempPeriodValue}>
                        {Math.floor(forecast.temp.night)}ºF
                      </Text>
                      <Text style={styles.feelsLikeTemp}>
                        Feels like: {Math.floor(forecast.feels_like.night)}ºF
                      </Text>
                    </View>
                  </View>
                </View>
              )
          )}
        </View>
      </Page>
    </Document>
  );
};

export default WeatherPDF;
