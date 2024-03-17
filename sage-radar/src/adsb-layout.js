import React, { useState } from 'react';
import AircraftMap from './components/adsb-map/adsb-map';
import SelectedAircraftInfo from './components/adsb-map/adsb-details';

const AircraftMapLayout = () => {

    /* Create selectedAircraft variable, then link it to the AircraftMap variable using a function */
    const [selectedAircraft, setSelectedAircraft] = useState(null);

    const handleSelectAircraft = (selectedAircraft) => {
        setSelectedAircraft(selectedAircraft);
    };

    /* Return the jsx for the AircraftMap component and the SelectedAircraftInfo component. */
    return (
        <div className= 'app-container'>
            {/* Map Component */}
            <div className= 'map-container'>
                <div className='display-labels' style={{width: "30%"}}><h2>Situation Display</h2></div>
                <AircraftMap onSelectAircraft={handleSelectAircraft} />
            </div>

            {/* Details Component */}
            <div className='marker-details'>
                <div className='display-labels'><h2>Digital Information Display</h2></div>
                <SelectedAircraftInfo key={selectedAircraft?.M.hex.S} selectedAircraft={selectedAircraft} />
            </div>
        </div>
    );
};

export default AircraftMapLayout;