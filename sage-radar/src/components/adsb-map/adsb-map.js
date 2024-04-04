// Import necessary libraries and styles
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-rotatedmarker';
import './adsb-map.css';
import io from 'socket.io-client';
import { airportData, aircraftSVGCreation } from './static.js';

// Establish socket connection
const socket = io('https://ambivaly.com');

// Functional component for rendering the aircraft map
const AircraftMap = ({ onSelectAircraft }) => {

/*-----------------------------------------------------Constant Setup-----------------------------------------------------*/   

    // State variables
    const [aircraftData, setAircraftData] = useState([]);

    // Initial map center coordinates
    const mapCenterLat = 47.1342;
    const mapCenterLong = -122.4857;
    const mapCenter = [mapCenterLat, mapCenterLong];

    // Define map bounds
    const bounds = useMemo(() => [
        [mapCenterLat + 0.7, mapCenterLong + 0.7],
        [mapCenterLat + 0.7, mapCenterLong - 0.7],
        [mapCenterLat - 0.7, mapCenterLong - 0.7],
    ], [mapCenterLat, mapCenterLong]);

    // Refs for map and markers
    const mapRef = useRef();
    const markersRef = useRef({});


/*-----------------------------------------------------Effect Hooks-----------------------------------------------------*/

    // Effect hook for initial data retrieval and socket management
    useEffect(() => {
        socket.on('initialData', (initialData) => {
            setAircraftData(initialData);
        });

        socket.on('newData', (newData) => {
            const aircraftArray = newData?.aircraft?.L || [];
            setAircraftData([...aircraftArray]);
        });

        // Cleanup on unmount
        return () => {
            if (socket.readyState === 1) {
                socket.disconnect();
            }
        };
    }, []);

    // Effect hook for resizing and map centering
    useEffect(() => {
        const handleResize = () => {
            if (mapRef.current) {
                mapRef.current.invalidateSize();
                mapRef.current.fitBounds(bounds);
            }
        };

        window.addEventListener('resize', handleResize);

        if (mapRef.current) {
            mapRef.current.whenReady(() => {
                mapRef.current.fitBounds(bounds);
            });
        }

        // Cleanup on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [bounds]);

    // Function to handle marker selection
    const selectMarker = (aircraft) => {
        // The below gets pushed to the adsb-layout.js as the currently selected aircraft
        onSelectAircraft(aircraft);
    };

    // Function to update marker rotation
    const updateMarkerRotation = (hex, angle) => {
        const marker = markersRef.current[hex];
        if (marker) {
            marker.setRotationAngle(angle);
        }
    };

/*-----------------------------------------------------Aircraft Markers-----------------------------------------------------*/

    // Function to create aircraft marker icon
    const createAircraftIcon = (aircraft) => {
        const iconSVGData = aircraftSVGCreation(aircraft);
        const aircraftMarkerIcon = new L.Icon({
            iconUrl: iconSVGData,
            iconSize: [30,30],
            iconAnchor: [15,15],
            className: 'aircraft-icon fadeOut',
        });

        return aircraftMarkerIcon;
    };

    // Function to create aircraft markers
    const createAircraftMarkers = () => {
        return (
            Array.isArray(aircraftData) &&
            aircraftData.map((aircraft) => {
                if (aircraft.M && aircraft.M.lat && aircraft.M.lon && aircraft.M.hex) {
                    const aircraftMarkerIcon = createAircraftIcon(aircraft);
                    const rotationAngle = aircraft.M.track?.N || 0;
                    const hex = aircraft.M.hex.S;

                    if (markersRef.current[hex]) {
                        updateMarkerRotation(hex, rotationAngle);
                    }

                    return (
                        <Marker
                            key={hex}
                            position={[aircraft.M.lat.N, aircraft.M.lon.N]}
                            icon={aircraftMarkerIcon}
                            rotationOrigin={'center center'}
                            rotationAngle={rotationAngle}
                            eventHandlers={{ click: () => selectMarker(aircraft) }}
                            ref={(marker) => {
                                markersRef.current[hex] = marker;
                            }}
                        >
                            <Tooltip
                                direction="right"
                                offset={[0, -10]}
                                opacity={1}
                                permanent
                                className="aircraft-label fadeOut"
                                z-index=""
                            >
                                {aircraft.M.flight?.S || hex}
                            </Tooltip>
                        </Marker>
                    );
                }
                return null;
            })
        );
    };

/*-----------------------------------------------------Airport Markers-----------------------------------------------------*/

    // Function to create airport marker icon
    const createAirportIcon = (airport) => {
        const markerColor = (airport?.color || '%23ADFF2F');

        const iconSVGData = `data:image/svg+xml;base64,${btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="${markerColor}" viewBox="0 0 20 20"> <rect x="35%" y="0" width="30%" height="100%" stroke="black" fill="${markerColor}"/>
        </svg>
        `)}`;

        const airportMarkerIcon = new L.Icon({
            iconUrl: iconSVGData,
            iconSize: [10, 10],
            iconAnchor: [10, 10],
            className: 'airport-icon'
        });

        return airportMarkerIcon;
    };

    // Function to create airport markers
    const createAirportMarkers = () => {
        return Object.values(airportData).map((airport) => {
            const rotationAngle = airport?.true_angle || 90;
            return (
                <Marker
                    key={airport.icao}
                    position={[airport.lat, airport.long]}
                    icon={createAirportIcon(airport)}
                    rotationOrigin={'center center'}
                    rotationAngle= {rotationAngle}
                >
                    <Tooltip
                        direction="right"
                        offset={[-5, 0]}
                        opacity={1}
                        permanent
                        className="airport-label"
                    >
                        {airport.icao}
                    </Tooltip>
                </Marker>
            );
        });
    };

/*-----------------------------------------------------Map Creation/Update-----------------------------------------------------*/

    // Return JSX for rendering the map component
    return (
        <MapContainer
            key={1}
            center={mapCenter}
            id="circular-map"
            className="circular-map crt"
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

            <div className="scan-line"></div>

            {createAirportMarkers()}
            {createAircraftMarkers()}
        </MapContainer>
    );
};

// Export the AircraftMap component
export default AircraftMap;
