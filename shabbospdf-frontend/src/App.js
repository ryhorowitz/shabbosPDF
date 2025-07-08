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
        <div className="App" style={{width:"100%", height:"100%"}}>
            
          <PDFDownloadButton />
           
        </div>
      </CandleProvider>
    </WeatherProvider>
  );
}

export default App;
