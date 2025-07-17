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

  // Weather logic
  const [weatherData, setWeatherData] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState(null);
  const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const location = geoData?.loc || null;
  // console.log('weatherAPI', weatherApiKey);
  // console.log('location', location);
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setWeatherLoading(true);
        setWeatherError(null);
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${location}&days=7&aqi=no&alerts=no`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        console.error("Error fetching weather:", err);
        setWeatherError(err.message);
      } finally {
        setWeatherLoading(false);
      }
    };
    if (weatherApiKey && location) {
      fetchWeather();
    }
  }, [weatherApiKey, location]);

  const getDayForecast = (dayName) => {
    if (!weatherData?.daily) return null;
    const dayIndex = dayName === "Friday" ? 5 : 6;
    return weatherData.daily.find((day) => {
      const date = new Date(day.dt * 1000);
      return date.getDay() === dayIndex;
    });
  };

  const value = {
    // Candle
    candleData,
    geoData,
    candleLoading,
    candleError,
    // Weather
    weatherData,
    weatherLoading,
    weatherError,
    setWeatherData,
    getDayForecast,
  };

  return (
    <ShabbosContext.Provider value={value}>{children}</ShabbosContext.Provider>
  );
};
