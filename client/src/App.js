import logo from './logo.svg';
import './App.css';
import MapComponent from './components/MapComponent';
import { MapContainer } from 'react-leaflet';

function App() {
  return (
    <MapContainer>
    <h1>BeSnap</h1>
    <MapComponent />
  </MapContainer>
  );
}

export default App;
