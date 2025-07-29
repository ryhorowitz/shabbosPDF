import React from "react";
import { Document, Page, Text, View, Font, Svg } from "@react-pdf/renderer";
import { usePDFStyles } from "../../context/PDFStylesContext";
import {
  extractCandleItems,
  formatParshahTitle,
} from "../../utils/candleDataUtils.js";
// import { cleanDetailedForecast } from "../../utils/forecastUtils.js";
import { getPDFWeatherIcon } from "../../utils/pdfWeatherIcons.js";

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
  fridayHourly,
  saturdayHourly,
  candleData,
  geoData,
  forecastType = "daily", // "daily" or "hourly"
}) => {
  const styles = usePDFStyles();

  const { candleItem, parshahItem, havdalahItem } =
    extractCandleItems(candleData);

  const parshahEnglish = formatParshahTitle(parshahItem);

  const getTimeLabel = (period, dayLabel) => {
    if (dayLabel === "Friday") {
      if (period.temperature) {
        const hour = new Date(period.startTime).getHours();
        if (hour === 16) return "Afternoon 4pm";
        if (hour === 20) return "Evening 8pm";
        if (hour === 0) return "Night 12am";
      }
    } else if (dayLabel === "Saturday") {
      if (period.temperature) {
        const hour = new Date(period.startTime).getHours();
        if (hour === 8) return "Morning 8am";
        if (hour === 12) return "Day 12pm";
        if (hour === 16) return "Afternoon 4pm";
        if (hour === 20) return "Evening 8pm";
      }
    }
    return period.name || "";
  };

  const formatHourlyTime = (startTime) => {
    const date = new Date(startTime);
    return date
      .toLocaleTimeString("en-US", {
        hour: "numeric",
        hour12: true,
      })
      .replace(":00", "")
      .toLowerCase();
  };

  // Error handling
  if (!fridayPeriods || !saturdayPeriods || !candleData || !geoData) {
    console.error("WeatherPDF: Missing required props", {
      fridayPeriods: !!fridayPeriods,
      saturdayPeriods: !!saturdayPeriods,
      candleData: !!candleData,
      geoData: !!geoData,
    });
    return (
      <Document title="Shabbos Weather & Times">
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text>Error: Missing data for PDF generation</Text>
          </View>
        </Page>
      </Document>
    );
  }

  return (
    <Document title="Shabbos Weather & Times">
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
            {parshahEnglish}
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
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              {candleItem && (
                <View
                  style={{ flex: 1, marginRight: 20, alignItems: "center" }}
                >
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
                <View style={{ flex: 1, marginLeft: 20, alignItems: "center" }}>
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
          </View>

          {/* Weather Forecast Section */}
          {forecastType === "daily" &&
            [
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
                    </View>

                    {summary && summary.temperature && (
                      <View style={styles.summaryContainer}>
                        {/* Main weather info row */}
                        <View style={styles.summaryMainRow}>
                          <View style={styles.summaryLeft}>
                            <View
                              style={{
                                alignItems: "center",
                                marginBottom: 4,
                              }}
                            >
                              {summary.shortForecast &&
                                getPDFWeatherIcon(
                                  summary.shortForecast,
                                  true,
                                  48
                                )}
                              <Text style={styles.summaryCondition}>
                                {summary.shortForecast ||
                                  "No forecast available"}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.summaryCenter}>
                            <Text
                              style={{
                                fontSize: 10,
                                color: "#9CA3AF",
                                textAlign: "center",
                              }}
                            >
                              high:
                            </Text>
                            <Text style={styles.summaryTemp}>
                              {summary.temperature}°
                              {summary.temperatureUnit || "F"}
                            </Text>
                          </View>
                          <View style={styles.summaryRight}>
                            {summary.windSpeed && (
                              <View style={styles.weatherDetail}>
                                <Text style={styles.detailLabel}>Wind</Text>
                                <Text style={styles.detailValue}>
                                  {summary.windSpeed}{" "}
                                  {summary.windDirection || ""}
                                </Text>
                              </View>
                            )}
                            {summary.probabilityOfPrecipitation &&
                              summary.probabilityOfPrecipitation.value && (
                                <View style={styles.weatherDetail}>
                                  <Text style={styles.detailLabel}>
                                    Precipitation
                                  </Text>
                                  <Text style={styles.detailValue}>
                                    {summary.probabilityOfPrecipitation.value}%
                                  </Text>
                                </View>
                              )}
                          </View>
                        </View>
                      </View>
                    )}

                    <View style={styles.tempTableRow}>
                      {periods.map(
                        (period, idx) =>
                          period &&
                          period.temperature && (
                            <View style={styles.tempTableCol} key={idx}>
                              <Text style={styles.tempPeriodLabel}>
                                {getTimeLabel(period, label)}
                              </Text>
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                  marginBottom: 2,
                                }}
                              >
                                {period.shortForecast &&
                                  getPDFWeatherIcon(
                                    period.shortForecast,
                                    period.isDaytime,
                                    16
                                  )}
                                <Text style={styles.tempPeriodValue}>
                                  {period.temperature}°
                                  {period.temperatureUnit || "F"}
                                </Text>
                              </View>
                              <Text style={styles.feelsLikeTemp}>
                                {period.shortForecast || "No forecast"}
                              </Text>
                            </View>
                          )
                      )}
                    </View>
                  </View>
                )
            )}

          {/* Hourly Forecast Section */}
          {forecastType === "hourly" &&
            [
              {
                label: "Friday",
                hourlyData: fridayHourly,
                summary: fridaySummary,
              },
              {
                label: "Saturday",
                hourlyData: saturdayHourly,
                summary: saturdaySummary,
              },
            ].map(
              ({ label, hourlyData, summary }) =>
                hourlyData &&
                hourlyData.length > 0 && (
                  <View style={styles.card} key={`${label}-hourly`}>
                    <View style={styles.weatherHeader}>
                      <Text style={styles.dayTitle}>
                        {label} Hourly Forecast
                      </Text>
                    </View>

                    {/* Daily summary container */}
                    {summary && summary.temperature && (
                      <View style={styles.summaryContainer}>
                        {/* Main weather info row */}
                        <View style={styles.summaryMainRow}>
                          <View style={styles.summaryLeft}>
                            <View
                              style={{
                                alignItems: "center",
                                marginBottom: 4,
                              }}
                            >
                              {summary.shortForecast &&
                                getPDFWeatherIcon(
                                  summary.shortForecast,
                                  true,
                                  48
                                )}
                              <Text style={styles.summaryCondition}>
                                {summary.shortForecast ||
                                  "No forecast available"}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.summaryCenter}>
                            <Text
                              style={{
                                fontSize: 10,
                                color: "#9CA3AF",
                                textAlign: "center",
                              }}
                            >
                              high:
                            </Text>
                            <Text style={styles.summaryTemp}>
                              {summary.temperature}°
                              {summary.temperatureUnit || "F"}
                            </Text>
                          </View>
                          <View style={styles.summaryRight}>
                            {summary.windSpeed && (
                              <View style={styles.weatherDetail}>
                                <Text style={styles.detailLabel}>Wind</Text>
                                <Text style={styles.detailValue}>
                                  {summary.windSpeed}{" "}
                                  {summary.windDirection || ""}
                                </Text>
                              </View>
                            )}
                            {summary.probabilityOfPrecipitation &&
                              summary.probabilityOfPrecipitation.value && (
                                <View style={styles.weatherDetail}>
                                  <Text style={styles.detailLabel}>
                                    Precipitation
                                  </Text>
                                  <Text style={styles.detailValue}>
                                    {summary.probabilityOfPrecipitation.value}%
                                  </Text>
                                </View>
                              )}
                          </View>
                        </View>
                      </View>
                    )}

                    {/* Hourly Table Header */}
                    <View style={styles.hourlyTableHeader}>
                      <Text style={{ ...styles.hourlyHeaderCell, flex: 0.6 }}>
                        Time
                      </Text>
                      <Text style={{ ...styles.hourlyHeaderCell, flex: 0.6 }}>
                        Temp
                      </Text>
                      <Text style={{ ...styles.hourlyHeaderCell, flex: 2.5 }}>
                        Weather
                      </Text>
                      <Text style={{ ...styles.hourlyHeaderCell, flex: 0.8 }}>
                        Precip
                      </Text>
                      <Text style={{ ...styles.hourlyHeaderCell, flex: 1.5 }}>
                        Wind
                      </Text>
                    </View>

                    {/* Hourly Rows */}
                    {hourlyData.map((hour, idx) => (
                      <View style={styles.hourlyTableRow} key={idx}>
                        <Text style={{ ...styles.hourlyCell, flex: 0.6 }}>
                          {hour ? formatHourlyTime(hour.startTime) : "N/A"}
                        </Text>
                        <Text style={{ ...styles.hourlyCell, flex: 0.6 }}>
                          {hour
                            ? `${hour.temperature}°${hour.temperatureUnit}`
                            : "N/A"}
                        </Text>
                        <View style={{ ...styles.hourlyCell, flex: 2.5 }}>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {hour?.shortForecast &&
                              getPDFWeatherIcon(
                                hour.shortForecast,
                                hour.isDaytime,
                                12
                              )}
                            <Text style={{ fontSize: 8 }}>
                              {hour?.shortForecast || "N/A"}
                            </Text>
                          </View>
                        </View>
                        <Text style={{ ...styles.hourlyCell, flex: 0.8 }}>
                          {hour?.probabilityOfPrecipitation?.value !== null
                            ? `${hour.probabilityOfPrecipitation.value}%`
                            : "0%"}
                        </Text>
                        <Text style={{ ...styles.hourlyCell, flex: 1.5 }}>
                          {hour && hour.windSpeed && hour.windDirection
                            ? `${hour.windDirection} ${hour.windSpeed}`
                            : "N/A"}
                        </Text>
                      </View>
                    ))}
                  </View>
                )
            )}
        </View>
      </Page>
    </Document>
  );
};

export default WeatherPDF;
