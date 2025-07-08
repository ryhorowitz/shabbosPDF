import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CandleTimes from './components/CandleTimes.jsx';
import WeatherContainer from './components/WeatherContainer.jsx';
import { CandleProvider } from './context/CandleContext.js';
import { WeatherProvider } from './context/WeatherContext.js';
import PDFDownloadButton from './components/pdf/PDFDownloadButton.jsx';

function App() {
  return (
    <WeatherProvider>
      <CandleProvider>
        <div className="App">
          <header className="App-header">
            <h1>Erev Shabbos Weather Report</h1>
          </header>
          <header>
            <CandleTimes/>
          </header>
          <main>
            <div className="pdf-download-section">
              <PDFDownloadButton />
            </div>
            <div className="weather-container">
               <WeatherContainer/>
            </div>
          </main>
        </div>
      </CandleProvider>
    </WeatherProvider>
  );
}

export default App;
