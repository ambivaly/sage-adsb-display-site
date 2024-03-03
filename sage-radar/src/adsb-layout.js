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
                <div className='display-labels' style={{width: "30%"}}><h2>Situation Display</h2></div>
                <AircraftMap onSelectAircraft={handleSelectAircraft} />
            </div>
            <div className='marker-details'>
                <div className='display-labels'><h2>Digital Information Display</h2></div>
                <SelectedAircraftInfo key={selectedAircraft?.M.hex.S} selectedAircraft={selectedAircraft} />
            </div>
        </div>
    );
};

export default AircraftMapLayout;