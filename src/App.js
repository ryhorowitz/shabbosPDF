import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CandleTimes from "./components/CandleTimes.jsx";
import WeatherContainer from "./components/WeatherContainer.jsx";
import { ShabbosProvider } from "./context/shabbosContext.js";
import PDFDownloadButton from "./components/pdf/PDFDownloadButton.jsx";

function App() {
  return (
    <ShabbosProvider>
      <div className="App">
        <header className="App-header">
          <h1>Erev Shabbos Weather Report Test DEPLOY</h1>
        </header>
        <header>
          <CandleTimes />
        </header>
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
  );
}

export default App;
