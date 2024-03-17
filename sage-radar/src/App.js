import React from 'react';
import AircraftMapLayout from './components/adsb-layout';


// All this file does is return the layout file, helps seperate my layout a bit if I ever want to add more
const App = () => {
  return (
    <div>
      <AircraftMapLayout />
    </div>
  );
};


export default App;
