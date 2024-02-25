import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import './adsb-map.css'

const AircraftMap = () => {
    const [aircraftData, setAircraftData] = useState([]); // Initialize with an empty array
    const mapCenterLat = 47.1342;
    const mapCenterLong = -122.4857;
    const mapCenter = [mapCenterLat, mapCenterLong];
    const bounds = [[mapCenterLat+0.5, mapCenterLong+0.5],
                    [mapCenterLat+0.5, mapCenterLong-0.5],
                    [mapCenterLat-0.5, mapCenterLong-0.5]]

    const mapRef = useRef();

    const fetchData = async () => {
        try {
            const response = await axios.get('/aircraft_data.json');

            if (response.data && Array.isArray(response.data) && response.data.length > 0) {
            const aircraftArray = response.data[0].aircraft?.L || [];

            setAircraftData(aircraftArray);
            } else {
            console.error('Invalid ADS-B data structure:', response.data);
            }
        } catch (error) {
            console.error('Error fetching ADS-B data:', error);
        }};


    useEffect(() => {
        // Initial fetch
        fetchData();

        // Set up interval to poll for updates every 6 seconds
        const intervalId = setInterval(() => {
            fetchData();
        }, 6000);

        // Cleanup interval on component unmount
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    useEffect(() => {
        // Fit bounds at startup
        if (mapRef.current){
        mapRef.current.whenReady(() => {
            mapRef.current.fitBounds(bounds);
        });
    
        // Add event listener for window resize
        const handleResize = () => {
            mapRef.current.fitBounds(bounds);
        };
    
        window.addEventListener('resize', handleResize);
    
        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        }};
    }, [bounds]);

    return (
    <MapContainer 
        center={mapCenter} 
        zoom={9} 
        id="circular-map" 
        className="circular-map" 
        style={{ height: '85vmin' }} 
        ref={mapRef}
        zoomControl={false}
        scrollWheelZoom={false}
        dragging={false}
        boxZoom={false} 
        keyboard={false} 
        touchZoom={false} 
        tap={false}
        doubleClickZoom={false} 
        attributionControl={false}
        bounds={bounds}
    >

        <TileLayer
        //url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {Array.isArray(aircraftData) && aircraftData.map((aircraft) => {
            if (aircraft.M && aircraft.M.lat && aircraft.M.lon && aircraft.M.hex) {
                return (
                <Marker key={aircraft.M.hex.S} position={[aircraft.M.lat.N, aircraft.M.lon.N]}>

                    <Popup autoPan={false}>
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

                    <Tooltip 
                        direction="right" 
                        offset={[0, 0]} 
                        opacity={1} 
                        permanent
                        className="aircraft-label" 
                        style={{ color: 'red' }}
                    >
                        {aircraft.M.flight?.S || aircraft.M.hex.S}
                    </Tooltip>

                </Marker>
                );
            }
            return null;
        })}

    </MapContainer>
    );
};

export default AircraftMap;
