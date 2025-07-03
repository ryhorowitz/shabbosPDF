import './App.css';
import WeatherContainer from './components/WeatherContainer.jsx';
import CandleTimes from './components/CandleTimes.jsx';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Shabbos Weather</h1>
      </header>
      <header>
        <CandleTimes/>
        </header>
      <main>
        <div className="weather-container">
           <WeatherContainer/>
        </div>
      </main>
    </div>
  );
}

export default App;
