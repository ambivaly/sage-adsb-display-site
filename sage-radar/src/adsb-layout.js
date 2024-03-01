import React, { useState } from 'react';
import AircraftMap from './components/adsb-map/adsb-map';
import SelectedAircraftInfo from './components/adsb-map/adsb-details';

const AircraftMapLayout = () => {
    const [selectedAircraft, setSelectedAircraft] = useState(null);

    const handleSelectAircraft = (selectedAircraft) => {
        setSelectedAircraft(selectedAircraft);
    };

    return (
        <div className= 'app-container'>
            <div className= 'map-container'>
                <center><h2>Situation Display</h2></center>
                <AircraftMap onSelectAircraft={handleSelectAircraft} />
            </div>
            <div className='marker-details'>
                <center><h2 style={{/*marginBottom:'0'*/}}>Digital Information Display</h2></center>
                <SelectedAircraftInfo key={selectedAircraft?.M.hex.S} selectedAircraft={selectedAircraft} />
            </div>
        </div>
    );
};

export default AircraftMapLayout;