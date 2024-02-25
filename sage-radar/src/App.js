/*import logo from './logo.svg';
import './App.css';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/
import React from 'react';
//import AircraftMap from './components/adsb-map';
import AircraftMapLayout from './components/adsb-layout';

const App = () => {
  return (
    <div>
      <center><h1>SAGE ADS-B Display</h1></center>
      <AircraftMapLayout />
    </div>
  );
};


export default App;
