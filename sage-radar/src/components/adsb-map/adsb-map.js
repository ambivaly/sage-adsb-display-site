import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-rotatedmarker';
import './adsb-map.css';
import io from 'socket.io-client';

const socket = io('https://ambivaly.com');

const AircraftMap = ({ onSelectAircraft }) => {
    const [aircraftData, setAircraftData] = useState([]);
    const mapCenterLat = 47.1342;
    const mapCenterLong = -122.4857;
    const mapCenter = [mapCenterLat, mapCenterLong];
    const bounds = useMemo(() => [
        [mapCenterLat + 0.7, mapCenterLong + 0.7],
        [mapCenterLat + 0.7, mapCenterLong - 0.7],
        [mapCenterLat - 0.7, mapCenterLong - 0.7],
    ], [mapCenterLat, mapCenterLong]);

    const mapRef = useRef();
    const markersRef = useRef({});

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

    useEffect(() => {
        socket.on('initialData', (initialData) => {
            setAircraftData(initialData);
        });

        socket.on('newData', (newData) => {
            const aircraftArray = newData?.aircraft?.L || [];
            setAircraftData([...aircraftArray]);
        });

        return () => {
            if (socket.readyState === 1) {
                socket.disconnect();
            }
        };
    }, []);

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

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [bounds]);

    const selectMarker = (aircraft) => {
        onSelectAircraft(aircraft);
    };

    const updateMarkerRotation = (hex, angle) => {
        const marker = markersRef.current[hex];
        if (marker) {
            marker.setRotationAngle(angle);
        }
    };

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

    const createAircraftMarkers = () => {
        return (
            Array.isArray(aircraftData) &&
            aircraftData.map((aircraft) => {
                if (aircraft.M && aircraft.M.lat && aircraft.M.lon && aircraft.M.hex) {
                    const aircraftMarkerIcon = createAircraftIcon(aircraft);
                    const rotationAngle = aircraft.M.track?.N || 0;
                    const hex = aircraft.M.hex.S;

                    // Update existing marker's rotation if it exists
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

            {createAircraftMarkers()}
        </MapContainer>
    );
};

export default AircraftMap;
