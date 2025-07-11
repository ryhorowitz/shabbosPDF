import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CandleTimes from "./components/CandleTimes.jsx";
import WeatherContainer from "./components/WeatherContainer.jsx";
import { ShabbosProvider } from "./context/shabbosContext.js";
import PDFDownloadButton from "./components/pdf/PDFDownloadButton.jsx";
import SeoHelmet from "./components/SeoHelmet.jsx";

function App() {
  return (
    <>
      <SeoHelmet />
      <ShabbosProvider>
        <div className="App">
          <header className="App-header text-center mb-4">
            <h1>Erev Shabbos Weather Report</h1>
            <p className="intro-blurb mx-5 px-5">
              Welcome to the Erev Shabbos Weather Report! This app provides you
              with up-to-date weather forecasts and candle lighting times to
              help you prepare for Shabbos. Download a printable PDF and stay
              informed for a peaceful and organized Shabbos experience.
            </p>
          </header>
          <div className="mb-4">
            <CandleTimes />
          </div>
          <main>
            <div className="pdf-download-section">
              <PDFDownloadButton />
            </div>
            <div className="weather-container">
              <WeatherContainer />
            </div>
          </main>
        </div>
      </ShabbosProvider>
    </>
  );
}

export default App;
