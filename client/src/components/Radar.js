// src/components/Radar.js
import React, { useEffect, useState } from 'react';

const Radar = () => {
    const [aircraftData, setAircraftData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/aircraft');
                const data = await response.json();
                setAircraftData(data);
            } catch (error) {
                console.error('Error fetching aircraft data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {/* Render radar display using aircraftData */}
        </div>
    );
};

export default Radar;