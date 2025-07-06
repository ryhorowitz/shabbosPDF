import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import WeatherContainer from './components/WeatherContainer.jsx';
import CandleTimes from './components/CandleTimes.jsx';
import WeatherPDF from './components/WeatherPDF.jsx';
import { WeatherProvider } from './context/WeatherContext.js';

function App() {
  return (
    <WeatherProvider>
      <div className="App">
        <header className="App-header">
          <h1>Erev Shabbos Weather Report</h1>
        </header>
        <header>
          <CandleTimes/>
        </header>
        <main>
          <div className="WeatherPDFcontainer">
            <WeatherPDF/>
          </div>
          <div className="weather-container">
             <WeatherContainer/>
          </div>
        </main>
      </div>
    </WeatherProvider>
  );
}

export default App;
