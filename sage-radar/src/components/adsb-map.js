// src/components/AircraftMap.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const AircraftMap = () => {
  const [aircraftData, setAircraftData] = useState([]); // Initialize with an empty array
  const initialLat = 47.1342; // Replace with the initial latitude
  const initialLong = -122.4857; // Replace with the initial longitude

 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/aircraft_data.json'); // Adjust the path
  
        // Check if the response has the expected structure
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          // Assuming the first element in the array has the 'aircraft' property
          const aircraftArray = response.data[0].aircraft?.L || [];
  
          setAircraftData(aircraftArray);
        } else {
          console.error('Invalid ADS-B data structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching ADS-B data:', error);
      }
    };
  
    fetchData();
  }, []);

  const center = [initialLat, initialLong];

  //console.log(aircraftData)
  return (
    <MapContainer center={center} zoom={9} style={{ height: '500px', width: '100%'}}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

        {Array.isArray(aircraftData) && aircraftData.map((aircraft) => {
            if (aircraft.M && aircraft.M.lat && aircraft.M.lon && aircraft.M.hex) {
                return (
                <Marker key={aircraft.M.hex.S} position={[aircraft.M.lat.N, aircraft.M.lon.N]}>
                    <Popup>
                    Aircraft ID: {aircraft.M.hex.S}
                    <br />
                    Aircraft Callsign: {aircraft.M.flight?.S || 'N/A'}
                    <br />
                    Mode 3A: {aircraft.M.squawk?.S || 'N/A'}
                    <br />
                    Aircraft Category: {aircraft.M.category?.S || 'N/A'}
                    <br />
                    Latitude: {aircraft.M.lat.N}, Longitude: {aircraft.M.lon.N}
                    </Popup>
                </Marker>
                );
            }
            return null;
        })}

    </MapContainer>
  );
};

export default AircraftMap;
