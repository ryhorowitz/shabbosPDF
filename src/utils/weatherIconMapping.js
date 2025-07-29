/**
 * Weather icon mapping utility
 * Maps weather conditions from the API to custom weather icons
 */

// Import weather icons (you'll need to add these to your project)
// Example structure - replace with your actual icon imports
const weatherIcons = {
  // Clear/Sunny conditions
  sunny: "/img/weather/sunny.svg",
  clear: "/img/weather/clear.svg",
  mostlyClear: "/img/weather/mostly-clear.svg",
  mostlySunny: "/img/weather/mostly-sunny.svg",

  // Cloudy conditions
  cloudy: "/img/weather/cloudy.svg",
  mostlyCloudy: "/img/weather/mostly-cloudy.svg",
  partlyCloudy: "/img/weather/partly-cloudy.svg",

  // Rain conditions
  rain: "/img/weather/rain.svg",
  lightRain: "/img/weather/light-rain.svg",
  heavyRain: "/img/weather/heavy-rain.svg",
  rainShowers: "/img/weather/rain-showers.svg",

  // Thunderstorm conditions
  thunderstorm: "/img/weather/thunderstorm.svg",
  thunderstorms: "/img/weather/thunderstorms.svg",

  // Snow conditions
  snow: "/img/weather/snow.svg",
  lightSnow: "/img/weather/light-snow.svg",
  heavySnow: "/img/weather/heavy-snow.svg",

  // Mixed conditions
  rainAndSnow: "/img/weather/rain-snow.svg",
  sleet: "/img/weather/sleet.svg",

  // Fog/Mist conditions
  fog: "/img/weather/fog.svg",
  mist: "/img/weather/mist.svg",
  haze: "/img/weather/haze.svg",

  // Wind conditions
  windy: "/img/weather/windy.svg",
  breezy: "/img/weather/breezy.svg",

  // Default fallback
  default: "/img/weather/default.svg",
};

/**
 * Maps weather forecast text to icon keys
 * @param {string} shortForecast - The short forecast text from the API
 * @param {boolean} isDaytime - Whether it's daytime or nighttime
 * @returns {string} - The icon key to use
 */
export const getWeatherIconKey = (shortForecast, isDaytime = true) => {
  if (!shortForecast) return "default";

  const forecast = shortForecast.toLowerCase();

  // Clear/Sunny conditions
  if (forecast.includes("sunny")) return "sunny";
  if (forecast.includes("clear")) return "clear";
  if (forecast.includes("mostly clear")) return "mostlyClear";
  if (forecast.includes("mostly sunny")) return "mostlySunny";

  // Cloudy conditions
  if (forecast.includes("cloudy")) {
    if (forecast.includes("mostly cloudy")) return "mostlyCloudy";
    if (forecast.includes("partly cloudy")) return "partlyCloudy";
    return "cloudy";
  }

  // Rain conditions
  if (forecast.includes("rain")) {
    if (forecast.includes("heavy rain") || forecast.includes("heavy rainfall"))
      return "heavyRain";
    if (forecast.includes("light rain") || forecast.includes("drizzle"))
      return "lightRain";
    if (forecast.includes("rain showers") || forecast.includes("showers"))
      return "rainShowers";
    return "rain";
  }

  // Thunderstorm conditions
  if (forecast.includes("thunderstorm")) {
    if (forecast.includes("thunderstorms")) return "thunderstorms";
    return "thunderstorm";
  }

  // Snow conditions
  if (forecast.includes("snow")) {
    if (forecast.includes("heavy snow")) return "heavySnow";
    if (forecast.includes("light snow")) return "lightSnow";
    return "snow";
  }

  // Mixed conditions
  if (forecast.includes("rain") && forecast.includes("snow"))
    return "rainAndSnow";
  if (forecast.includes("sleet")) return "sleet";

  // Fog/Mist conditions
  if (forecast.includes("fog")) return "fog";
  if (forecast.includes("mist")) return "mist";
  if (forecast.includes("haze")) return "haze";

  // Wind conditions
  if (forecast.includes("windy")) return "windy";
  if (forecast.includes("breezy")) return "breezy";

  // Chance conditions - use the base weather type
  if (forecast.includes("chance")) {
    if (forecast.includes("rain")) return "rainShowers";
    if (forecast.includes("snow")) return "lightSnow";
    if (forecast.includes("thunderstorm")) return "thunderstorm";
  }

  // Slight chance conditions
  if (forecast.includes("slight chance")) {
    if (forecast.includes("rain")) return "lightRain";
    if (forecast.includes("snow")) return "lightSnow";
    if (forecast.includes("thunderstorm")) return "thunderstorm";
  }

  // Likely conditions
  if (forecast.includes("likely")) {
    if (forecast.includes("rain")) return "rain";
    if (forecast.includes("snow")) return "snow";
    if (forecast.includes("thunderstorm")) return "thunderstorms";
  }

  return "default";
};

/**
 * Gets the weather icon URL for a given forecast
 * @param {string} shortForecast - The short forecast text from the API
 * @param {boolean} isDaytime - Whether it's daytime or nighttime
 * @returns {string} - The icon URL
 */
export const getWeatherIcon = (shortForecast, isDaytime = true) => {
  const iconKey = getWeatherIconKey(shortForecast, isDaytime);
  return weatherIcons[iconKey] || weatherIcons.default;
};

/**
 * Gets all available weather icon keys
 * @returns {string[]} - Array of available icon keys
 */
export const getAvailableIconKeys = () => {
  return Object.keys(weatherIcons);
};

/**
 * Gets all weather icon URLs
 * @returns {Object} - Object with icon keys and URLs
 */
export const getAllWeatherIcons = () => {
  return { ...weatherIcons };
};
