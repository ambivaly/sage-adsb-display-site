import React from 'react';
import './adsb-map.css';

const SelectedAircraftInfo = ({ selectedAircraft }) => {
    return (
        <div className="selected-aircraft-info">
            {selectedAircraft ? (
                <>
                    <h2>Aircraft Information</h2>
                    <p>Aircraft ID: {selectedAircraft.M.hex.S}</p>
                    <p>Aircraft Callsign: {selectedAircraft.M.flight?.S || 'N/A'}</p>
                    <p>Heading: {selectedAircraft.M.nav_heading?.N || 'N/A'}</p>
                    <p>Speed: {selectedAircraft.M.gs?.N || 'N/A'}</p>
                    <p>Altitude: {selectedAircraft.M.alt_baro?.N || 'N/A'}</p>
                    <p>Mode 3A: {selectedAircraft.M.squawk?.S || 'N/A'}</p>
                    <p>Aircraft Category: {selectedAircraft.M.category?.S || 'N/A'}</p>
                    <p>Latitude: {selectedAircraft.M.lat.N}, Longitude: {selectedAircraft.M.lon.N}</p>
                </>
            ) : (
                <p>No aircraft selected.</p>
            )}
        </div>
    );
};

export default SelectedAircraftInfo;