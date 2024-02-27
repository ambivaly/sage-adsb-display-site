import React, { useState } from 'react';
import AircraftMap from './adsb-map';
import SelectedAircraftInfo from './adsb-details';

const AircraftMapLayout = () => {
    const [selectedAircraft, setSelectedAircraft] = useState(null);

    const handleSelectAircraft = (selectedAircraft) => {
        setSelectedAircraft(selectedAircraft);
    };

    return (
        <div className= 'app-container'>
            <div className= 'map-container'>
                <AircraftMap onSelectAircraft={handleSelectAircraft} />
            </div>
            <div className='marker-details'>
                <center><h2 style={{marginBottom:'0'}}>Detail Panel</h2></center>
                <SelectedAircraftInfo key={selectedAircraft?.M.hex.S} selectedAircraft={selectedAircraft} />
            </div>
        </div>
    );
};

export default AircraftMapLayout;