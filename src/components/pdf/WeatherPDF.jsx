import React from "react";
import { Document, Page, Text, View, Font } from "@react-pdf/renderer";
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
  fridayPeriods,
  saturdayPeriods,
  fridaySummary,
  saturdaySummary,
  candleData,
  geoData,
}) => {
  const styles = usePDFStyles();

  const { candleItem, parshahItem, havdalahItem } =
    extractCandleItems(candleData);

  const getTimeLabel = (period, dayLabel) => {
    if (dayLabel === "Friday") {
      if (period.temperature) {
        const hour = new Date(period.startTime).getHours();
        if (hour === 16) return "Afternoon (4pm)";
        if (hour === 20) return "Evening (8pm)";
        if (hour === 0) return "Night (12am)";
      }
    } else if (dayLabel === "Saturday") {
      if (period.temperature) {
        const hour = new Date(period.startTime).getHours();
        if (hour === 8) return "Morning (8am)";
        if (hour === 12) return "Day (12pm)";
        if (hour === 16) return "Afternoon (4pm)";
        if (hour === 20) return "Evening (8pm)";
      }
    }
    return period.name || "";
  };

  return (
    <Document title="Shabbos Weather & Times">
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
            {parshahItem.title}
            <Text style={{ fontFamily: "NotoSansHebrew" }}>
              {" "}
              {parshahItem.hebrew}
            </Text>
          </Text>
          {parshahItem && (
            <View>
              {parshahItem.hdate && (
                <View style={{ alignItems: "center", width: "100%" }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                  >
                    {parshahItem.hdate}
                  </Text>
                </View>
              )}
            </View>
          )}
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
            {
              label: "Friday",
              periods: fridayPeriods,
              summary: fridaySummary,
            },
            {
              label: "Saturday",
              periods: saturdayPeriods,
              summary: saturdaySummary,
            },
          ].map(
            ({ label, periods, summary }) =>
              periods &&
              periods.length > 0 && (
                <View style={styles.card} key={label}>
                  <View style={styles.weatherHeader}>
                    <Text style={styles.dayTitle}>{label}</Text>
                    {summary && (
                      <>
                        <Text style={styles.temperature}>
                          {summary.temperature}°{summary.temperatureUnit}
                        </Text>
                        <Text style={styles.summary}>
                          {summary.shortForecast}
                        </Text>
                      </>
                    )}
                  </View>

                  {summary && (
                    <View style={styles.twoColumnContainer}>
                      <View style={styles.column}>
                        <Text style={styles.weatherInfo}>
                          Weather: {summary.shortForecast}
                        </Text>
                        {summary.probabilityOfPrecipitation && (
                          <Text style={styles.weatherInfo}>
                            Precipitation:{" "}
                            {summary.probabilityOfPrecipitation.value}%
                          </Text>
                        )}
                      </View>
                      <View style={styles.columnRight}>
                        <Text style={styles.weatherInfo}>
                          Wind: {summary.windSpeed} {summary.windDirection}
                        </Text>
                      </View>
                    </View>
                  )}

                  <View style={styles.tempTableRow}>
                    {periods.map(
                      (period, idx) =>
                        period && (
                          <View style={styles.tempTableCol} key={idx}>
                            <Text style={styles.tempPeriodLabel}>
                              {getTimeLabel(period, label)}
                            </Text>
                            <Text style={styles.tempPeriodValue}>
                              {period.temperature}°{period.temperatureUnit}
                            </Text>
                            <Text style={styles.feelsLikeTemp}>
                              {period.shortForecast}
                            </Text>
                          </View>
                        )
                    )}
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
