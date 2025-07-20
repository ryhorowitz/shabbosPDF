import React, { createContext, useContext, useState, useEffect } from "react";

const ShabbosContext = createContext();

export const useShabbos = () => {
  const context = useContext(ShabbosContext);
  if (!context) {
    throw new Error("useShabbos must be used within a ShabbosProvider");
  }
  return context;
};

export const ShabbosProvider = ({ children }) => {
  // Candle logic
  const [candleData, setCandleData] = useState(null);
  const [geoData, setGeoData] = useState(null);
  const [candleLoading, setCandleLoading] = useState(true);
  const [candleError, setCandleError] = useState(null);

  const ipinfoApiKey = process.env.REACT_APP_IPINFO_API_KEY;

  useEffect(() => {
    const getGeoData = async () => {
      try {
        const response = await fetch(`https://ipinfo.io?token=${ipinfoApiKey}`);
        const data = await response.json();
        setGeoData(data);
      } catch (err) {
        console.error("Error fetching geo data:", err);
        setCandleError("Failed to get location data");
        setCandleLoading(false);
      }
    };
    getGeoData();
  }, [ipinfoApiKey]);

  useEffect(() => {
    if (!geoData) return;
    const fetchCandleTimes = async () => {
      try {
        setCandleLoading(true);
        setCandleError(null);
        const lat = geoData.loc.split(",")[0];
        const lon = geoData.loc.split(",")[1];
        const timezone = geoData.timezone;
        const response = await fetch(
          `https://www.hebcal.com/shabbat?cfg=json&latitude=${lat}&longitude=${lon}&tzid=${timezone}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch candle times");
        }
        const data = await response.json();
        setCandleData(data);
      } catch (err) {
        console.error("Error fetching candle times:", err);
        setCandleError(err.message);
      } finally {
        setCandleLoading(false);
      }
    };
    fetchCandleTimes();
  }, [geoData]);

  // Weather.gov logic
  const [hourlyURL, setHourlyURL] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState(null);

  // Step 1: Get grid info from weather.gov
  useEffect(() => {
    const fetchHourlyURL= async () => {
      if (!geoData) return;
      try {
        const [lat, lon] = geoData.loc.split(",");
        const pointsUrl = `https://api.weather.gov/points/${lat},${lon}`;
        const response = await fetch(pointsUrl);
        if (!response.ok) throw new Error("Failed to fetch grid info");
        const data = await response.json();
        console.log('data from fetchHourlyURL', data)
        setHourlyURL(data.properties.forecastHourly);
      } catch (err) {
        setWeatherError("Failed to get grid info");
        setWeatherLoading(false);
      }
    };
    if (geoData?.loc) fetchHourlyURL();
  }, [geoData]);

  // Step 2: Get hourly forecast from weather.gov
  useEffect(() => {
    const fetchHourlyForecast = async () => {
      if (!hourlyURL) {
        console.log('No HOURLY URL')
        return;
      
      }
      try {
        setWeatherLoading(true);
        setWeatherError(null);
        console.log('hourlyURL', hourlyURL)
        const response = await fetch(hourlyURL);
        if (!response.ok) throw new Error("Failed to fetch hourly forecast");
        const data = await response.json();
        console.log('data from fetchHourlyForecast ', data)
        setWeatherData(data.properties.periods);
      } catch (err) {
        setWeatherError("Failed to fetch weather data");
      } finally {
        setWeatherLoading(false);
      }
    };
    if (hourlyURL) fetchHourlyForecast();
  }, [hourlyURL]);

  // Helper: Get forecast periods for a given date and list of hours (local time)
  const getForecastForDateAndHours = (dateObj, hoursArr) => {
    if (!weatherData) return [];
    // dateObj: JS Date, hoursArr: [16, 20, 0] etc.
    return hoursArr.map((hour) => {
      // For 0 (midnight), if date is Friday, midnight is technically Saturday
      let targetDate = new Date(dateObj);
      if (hour === 0) {
        targetDate.setDate(targetDate.getDate() + 1);
      }
      targetDate.setHours(hour, 0, 0, 0);
      // Find the period with matching startTime (local)
      return weatherData.find((period) => {
        const periodDate = new Date(period.startTime);
        return (
          periodDate.getFullYear() === targetDate.getFullYear() &&
          periodDate.getMonth() === targetDate.getMonth() &&
          periodDate.getDate() === targetDate.getDate() &&
          periodDate.getHours() === targetDate.getHours()
        );
      });
    });
  };

  // Helper: Get Friday and Saturday forecast periods for the required hours
  const getShabbosForecasts = (candleData) => {
    // Use extractCandleItems to get Friday and Saturday dates
    // Friday: 4pm (16), 8pm (20), 12am (0, Sat)
    // Saturday: 8am (8), 12pm (12), 4pm (16), 8pm (20)
    if (!candleData) return { friday: [], saturday: [] };
    // Get Friday candle lighting date (should be Friday)
    let fridayDate = null;
    let saturdayDate = null;
    try {
      const { candleItem, havdalahItem } = require("../utils/candleDataUtils.js").extractCandleItems(candleData);
      if (candleItem && candleItem.date) fridayDate = new Date(candleItem.date);
      if (havdalahItem && havdalahItem.date) saturdayDate = new Date(havdalahItem.date);
      // For Saturday, use the date part of havdalah (should be Sat night)
      if (saturdayDate) saturdayDate.setHours(0, 0, 0, 0);
    } catch (e) {}
    return {
      friday: fridayDate ? getForecastForDateAndHours(fridayDate, [16, 20, 0]) : [],
      saturday: fridayDate ? getForecastForDateAndHours(new Date(fridayDate.getTime() + 24*60*60*1000), [8, 12, 16, 20]) : [],
    };
  };

  const value = {
    // Candle
    candleData,
    geoData,
    candleLoading,
    candleError,
    // Weather
    weatherData, // array of hourly periods
    weatherLoading,
    weatherError,
    getShabbosForecasts,
  };

  return (
    <ShabbosContext.Provider value={value}>{children}</ShabbosContext.Provider>
  );
};
