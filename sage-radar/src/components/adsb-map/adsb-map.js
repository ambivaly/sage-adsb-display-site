// Import necessary libraries and styles
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-rotatedmarker';
import './adsb-map.css';
import io from 'socket.io-client';

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

    // Color mapping for different aircraft categories, needs %23 since # doesn't seem to work in react html below
    const colorAircraftMap = {
        "A1": "%23FFFF00",
        "A2": "%23FFA500",
        "A3": "%23ADFF2F",
        "A4": "%23ADFF2F",
        "A5": "%23ADFF2F",
        "A6": "%231E90FF",
        "A7": "%238A2BE2",
        "B1": "%23FF0000",
        "B2": "%23FF0000",
        "B3": "%23FF0000",
        "B4": "%23FF0000",
        "B6": "%23FF0000",
        "B7": "%23FF0000",
        "C1": "%23A0522D",
        "C2": "%23A0522D",
        "C3": "%23A0522D",
        "Unknown": "%23FFFFFF"
    };

    // Airport data with their respective details, currently hard-coded
    const airportData = {
        1: { icao: "KTCM", name: "McChord Field", color: "%231E90FF", lat: 47.1334, long: -122.4859 },
        2: { icao: "KPLU", name: "Thun Field", color: "%23A0522D", lat: 47.1031, long: -122.2903 },
        3: { icao: "KSEA", name: "SeaTac Intl", color: "%231E90FF", lat: 47.4484, long: -122.3086 },
        4: { icao: "KBFI", name: "Boeing Field", color: "%23A0522D", lat: 47.5369, long: -122.3039 },
        5: { icao: "KRNT", name: "Renton Mncpl", color: "%23A0522D", lat: 47.4919, long: -122.2173 }
    };


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
        const markerColor = colorAircraftMap[category] || "%23FFFFFF";

        const iconSVGData = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="${markerColor}" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/></svg>`;

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

        const iconSVGData = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="${markerColor}" viewBox="0 0 20 20"> <rect x="0" y="0" width="100%" height="100%" stroke="black" fill="${markerColor}"/></svg>`;

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
