import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { PDFViewer } from '@react-pdf/renderer';
import { CandleProvider } from './context/CandleContext.js';
import { WeatherProvider } from './context/WeatherContext.js';
import { PDFStyleProvider } from './context/PDFStylesContext.js';
import WeatherPDF from './components/pdf/WeatherPDF.jsx';

function App() {
  return (
    <PDFViewer width="100%" height="100%">
      <CandleProvider>
        <WeatherProvider>
          <PDFStyleProvider>
              <WeatherPDF/>
          </PDFStyleProvider>
        </WeatherProvider>
      </CandleProvider>
    </PDFViewer>
  );
}

export default App;
