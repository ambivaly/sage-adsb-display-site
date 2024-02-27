import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-rotatedmarker';
import './adsb-map.css';

const AircraftMap = ({ onSelectAircraft }) => {
    const [aircraftData, setAircraftData] = useState([]);
    const mapCenterLat = 47.1342;
    const mapCenterLong = -122.4857;
    const mapCenter = [mapCenterLat, mapCenterLong];
    const bounds = [
        [mapCenterLat + 0.7, mapCenterLong + 0.7],
        [mapCenterLat + 0.7, mapCenterLong - 0.7],
        [mapCenterLat - 0.7, mapCenterLong - 0.7],
    ];

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
        }
    };

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
        if (mapRef.current) {
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
            };
        }
    }, [bounds]);

    const aircraftIcon = new L.Icon({
        iconUrl: './line-icon.png',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, -15],
        tooltipAnchor: [10, -12],
    });

    const selectMarker = (aircraft) => {
        onSelectAircraft(aircraft);
    };

    return (
        <MapContainer
            key={1}
            center={mapCenter}
            id="circular-map"
            className="circular-map"
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
                url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {Array.isArray(aircraftData) &&
                aircraftData.map((aircraft) => {
                    if (aircraft.M && aircraft.M.lat && aircraft.M.lon && aircraft.M.hex) {
                        return (
                            <Marker
                                key={aircraft.M.hex.S}
                                position={[aircraft.M.lat.N, aircraft.M.lon.N]}
                                icon={aircraftIcon}
                                rotationAngle={aircraft.M.nav_heading?.N || 0}
                                eventHandlers={{ click: () => selectMarker(aircraft) }}
                            >
                                {/*<Popup autoPan={false}>
                                    Aircraft ID: {aircraft.M.hex.S}
                                    <br />
                                    Aircraft Callsign: {aircraft.M.flight?.S || 'N/A'}
                                    <br />
                                    Heading: {aircraft.M.nav_heading?.N || 'N/A'}
                                    <br />
                                    Speed: {aircraft.M.gs?.N || 'N/A'}
                                    <br />
                                    Altitude: {aircraft.M.alt_baro?.N || 'N/A'}
                                    <br />
                                    Mode 3A: {aircraft.M.squawk?.S || 'N/A'}
                                    <br />
                                    Aircraft Category: {aircraft.M.category?.S || 'N/A'}
                                    <br />
                                    Latitude: {aircraft.M.lat.N}, Longitude: {aircraft.M.lon.N}
                        </Popup>*/}

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