import React from 'react';


/* This component displays the selected Aircrafts ADS-B data in a seperate div from the Leaflet map
 * If no aircraft is selected, it displays a message.
 * If an aircraft is selected, it displays the aircraft's ADS-B data. */

// Array associating the Category codes with their definitions
const categoryAircraftMap = {
    "A1": "Light",
    "A2": "Small",
    "A3": "Large",
    "A4": "High Vortex Large",
    "A5": "Heavy",
    "A6": "High Performance",
    "A7": "Rotorcraft",
    "B1": "Glider/Light Sport",
    "B2": "Lighter-than-Air",
    "B3": "Parachutist/Skydiver",
    "B4": "Ultralight/Hang-Glider",
    "B6": "UAV",
    "B7": "Space",
    "C1": "Surface Emergency",
    "C2": "Surface Service",
    "C3": "Surface Obstruction",
    "Unknown": "Unknown"
}


// Function to generate the component. 
// If no aircraft is selected, it displays a message. 
// If an aircraft is selected, it displays the aircraft's ADS-B data.
const SelectedAircraftInfo = ({ selectedAircraft }) => {
    if (!selectedAircraft || !selectedAircraft.M) {
        return (
            <div className="selected-aircraft-info crt">
                <p>No aircraft selected.</p>
            </div>
        );
    }
    const category = selectedAircraft.M.category?.S || 'Unknown';
    const catDesc = categoryAircraftMap[category] // Translate the category into the description text for display
    return (
        <div className="selected-aircraft-info crt">
            {(

                <>
                    <p><b>Aircraft ID:</b> {selectedAircraft.M.hex.S}</p>
                    <p><b>Callsign:</b> {selectedAircraft.M.flight?.S || 'N/A'}</p>
                    <p><b>Heading:</b> {selectedAircraft.M.track?.N || 'N/A'}</p>
                    <p><b>Speed:</b> {selectedAircraft.M.gs?.N || 'N/A'}</p>
                    <p><b>Altitude:</b> {selectedAircraft.M.alt_baro?.N || 'N/A'}</p>
                    <p><b>Mode 3A:</b> {selectedAircraft.M.squawk?.S || 'N/A'}</p>
                    <p><b>Category:</b> {catDesc}</p>
                    <p><b>Latitude:</b> {selectedAircraft.M.lat.N}</p>
                    <p><b>Longitude:</b> {selectedAircraft.M.lon.N}</p>
                </>
            )}
        </div>
    );
};

export default SelectedAircraftInfo;