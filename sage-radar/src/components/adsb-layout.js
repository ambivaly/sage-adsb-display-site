import React, { useState } from 'react';
import AircraftMap from './adsb-map';
import SelectedAircraftInfo from './adsb-details';

const AircraftMapLayout = () => {
    const [selectedAircraft, setSelectedAircraft] = useState(null);

    const handleSelectAircraft = (selectedAircraft) => {
        setSelectedAircraft(selectedAircraft);
    };

    return (
        <div style={{ display: 'flex', height: '100vmin'}}>
            <div style={{ flex: 1, position: 'relative' }}>
                <AircraftMap onSelectAircraft={handleSelectAircraft} />
            </div>
            <div style={{ flex: 1, paddingLeft: '16px', overflowY: 'auto' }}>
                <SelectedAircraftInfo key={selectedAircraft?.M.hex.S} selectedAircraft={selectedAircraft} />
            </div>
        </div>
    );
};

export default AircraftMapLayout;