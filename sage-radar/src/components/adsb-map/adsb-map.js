// Import necessary libraries and styles
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-rotatedmarker';
import './adsb-map.css';
import io from 'socket.io-client';
import { colorAircraftMap, airportData, aircraftSVGCreation} from './static.js';

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
        const category = aircraft.M.category?.S || 'Unknown';
        const markerColor = colorAircraftMap[category] || "#FFFFFF";

        /*const iconSVGData = `data:image/svg+xml;base64,${btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 490.941 490.941" xml:space="preserve">
        <path fill="${markerColor}" d="M477.8,293.387l-75.9-75.9c9.8-13.4,32.4-49.7,1.9-100.4l12.5-12.5l29.2,29.2c12.2,11.7,25,4.2,29.2,0
            c8.3-8.3,8.3-20.9,0-29.2l-88.6-88.6c-8.3-8.3-20.9-8.3-29.2,0c-8.3,8.3-8.3,20.9,0,29.2l30.1,30.2l-13,12.6
            c-15.7-9.6-55.4-26-99.2,3.5l-77.5-77.5c-18.8-18.8-49-17.7-67.8,1l-21.9,21.9c-26.3,31.4-10.4,58.4-1,67.8l86.2,86.2l-67.7,86.5
            l-18.5-18.5c-47.8-41-88.6,3.1-88.6,3.1c-24,24-24,62.6,0,86.5l125.1,124.1c39.1,33.7,72.1,12.4,87.6-3.1c23.9-24.1,24-62.6,0-86.5
            l-15.4-15.4l86.6-67.7l84.1,84.1c8.3,9.4,36.1,25.7,67.8-1l22.9-21.9C495.5,341.287,495.5,311.087,477.8,293.387z M134.8,76.487
            c-1-2.1-2.4-5.8,2.1-10.4l21.9-21.9c3.1-2.1,7.3-3.1,9.4-1l78.7,78.7l-29.3,37.4L134.8,76.487z M203.6,440.387
            c0,0-13.8,16.8-32.3,3.1l-124.1-124.1c-15.9-17.3,3.1-31.3,3.1-31.3c13.8-11.5,25-4.2,28.1-1l125.1,124.1
            C214.7,422.787,207.8,436.187,203.6,440.387z M153.7,305.987l135.4-173.2c28.6-32.2,61.5-13.6,71.9-3.1s28.7,42.3-3.1,71.9
            l-173.2,135.5L153.7,305.987z M447.6,330.887l-21.9,21.9c-3.6,4.5-9.4,3.1-10.4,2.1l-80.5-80.5l36.9-28.9l77,76.1
            C450.7,323.587,450.7,327.787,447.6,330.887z"/>
    </svg>
`)}`;*/
        const iconSVGData = aircraftSVGCreation(aircraft);

        const aircraftMarkerIcon = new L.Icon({
            iconUrl: iconSVGData,
            iconSize: [30, 30],
            iconAnchor: [15, 15],
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
                            rotationAngle={rotationAngle}
                            eventHandlers={{ click: () => selectMarker(aircraft) }}
                            ref={(marker) => {
                                markersRef.current[hex] = marker;
                            }}
                        >
                            <Tooltip
                                direction="right"
                                offset={[0, 0]}
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
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="${markerColor}" viewBox="0 0 20 20"> <rect x="0" y="0" width="100%" height="100%" stroke="black" fill="${markerColor}"/>
        </svg>
        `)}`;

        const airportMarkerIcon = new L.Icon({
            iconUrl: iconSVGData,
            iconSize: [10, 10],
            iconAnchor: [10, 10],
            className: 'airport-icon',
        });

        return airportMarkerIcon;
    };

    // Function to create airport markers
    const createAirportMarkers = () => {
        return Object.values(airportData).map((airport) => {
            return (
                <Marker
                    key={airport.icao}
                    position={[airport.lat, airport.long]}
                    icon={createAirportIcon(airport)}
                >
                    <Tooltip
                        direction="right"
                        offset={[0, 0]}
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
