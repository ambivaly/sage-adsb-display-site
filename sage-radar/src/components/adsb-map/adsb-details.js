import React from 'react';
//import './adsb-map.css';
//import './adsb-details.css';

const SelectedAircraftInfo = ({ selectedAircraft }) => {
    return (
        <div className="selected-aircraft-info">
            {selectedAircraft ? (
                <>
                    <p><b>Aircraft ID:</b> {selectedAircraft.M.hex.S}</p>
                    <p><b>Callsign:</b> {selectedAircraft.M.flight?.S || 'N/A'}</p>
                    <p><b>Heading:</b> {selectedAircraft.M.nav_heading?.N || 'N/A'}</p>
                    <p><b>Speed:</b> {selectedAircraft.M.gs?.N || 'N/A'}</p>
                    <p><b>Altitude:</b> {selectedAircraft.M.alt_baro?.N || 'N/A'}</p>
                    <p><b>Mode 3A:</b> {selectedAircraft.M.squawk?.S || 'N/A'}</p>
                    <p><b>Category:</b> {selectedAircraft.M.category?.S || 'N/A'}</p>
                    <p><b>Latitude:</b> {selectedAircraft.M.lat.N}</p>
                    <p><b>Longitude:</b> {selectedAircraft.M.lon.N}</p>
                </>
            ) : (
                <>
                    <p>No aircraft selected.</p>
                </>
            )}
        </div>
    );
};

export default SelectedAircraftInfo;