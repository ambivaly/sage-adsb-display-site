 /*-----------------Static Arrays--------------------*/   
    
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

    // Color mapping for different aircraft categories
    const colorAircraftMap = {
        "A1": "#FFA500",
        "A2": "#FFFF00",
        "A3": "#ADFF2F",
        "A4": "#ADFF2F",
        "A5": "#ADFF2F",
        "A6": "#1E90FF",
        "A7": "#8A2BE2",
        "B1": "#FF0000",
        "B2": "#FF0000",
        "B3": "#FF0000",
        "B4": "#FF0000",
        "B6": "#FF0000",
        "B7": "#FF0000",
        "C1": "#A0522D",
        "C2": "#A0522D",
        "C3": "#A0522D",
        "Unknown": "#FFFFFF"
    };


    // Airport data with their respective details, currently hard-coded
    const airportData = {
        1: { icao: "KTCM", name: "McChord Field", color: "#1E90FF", lat: 47.1334, long: -122.4859, true_angle: 180 },
        2: { icao: "KPLU", name: "Thun Field", color: "#A0522D", lat: 47.1031, long: -122.2903, true_angle: 180 },
        3: { icao: "KSEA", name: "SeaTac Intl", color: "#1E90FF", lat: 47.4484, long: -122.3086, true_angle: 180 },
        4: { icao: "KBFI", name: "Boeing Field", color: "#A0522D", lat: 47.5369, long: -122.3039, true_angle: 150 },
        5: { icao: "KRNT", name: "Renton Mncpl", color: "#A0522D", lat: 47.4919, long: -122.2173, true_angle: 174 },
        6: { icao: "KTIW", name: "Tacoma Narrows", color: "#A0522D", lat: 47.2678, long: -122.5774, true_angle: 187 }
    };




    function aircraftSVGCreation(aircraft){
        const category = aircraft.M.category?.S || 'Unknown';
        const markerColor = colorAircraftMap[category] || "#FFFFFF";

        /*----- Credit for most of the SVG images goes to Peter Lowden, peter@lowden.nz -----*/
        const iconSVGData = {
            "A1":`data:image/svg+xml;base64,${btoa(`
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 64 64" xml:space="preserve">
                <g transform="scale(0.6) translate(19.2,19.2)">
                v2.0 14 November 2016 - Peter Lowden - peter@lowden.nz
                <path d="m 32,10.2 0.4,0.7 0.2,0.6 4.7,0 0,0.2 -4.6,0.1 0.1,0.4 0.7,0 0.6,0.2 0.3,0.4 0.2,0.7 0.3,3.5 0.1,3 11.3,0 15.6,0.7 0.6,0.4 0.3,0.8 0,5.5 
                    -17.5,2.5 -10.6,0 -1.8,14.1 8,1.2 0.4,0.5 0.2,1.1 0,1.2 -0.2,0.9 -0.4,0.7 -7.3,1.1 -1.3,-2.5 -0.1,5.6 -0.2,0.1 -0.2,-0.1 -0.1,-5.6 -1.3,2.5 -7.3,-1.1 
                    -0.4,-0.7 -0.2,-0.9 0,-1.2 0.2,-1.1 0.4,-0.4 8,-1.3 -1.8,-14.1 -10.6,0 -17.5,-2.5 0,-5.5 0.3,-0.8 0.6,-0.3 15.6,-0.8 11.3,0 0.1,-3 0.3,-3.5 0.2,-0.7 0.3,
                    -0.4 0.6,-0.2 0.7,0 0.1,-0.4 -4.7,-0.1 0,-0.2 4.8,0 0.2,-0.6 z" stroke="${markerColor}" stroke-width="1" fill="${markerColor}" fill-opacity="0.3"/>
                </g>
                </svg>
            `)}`,
            "A2":`data:image/svg+xml;base64,${btoa(`
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 64 64" xml:space="preserve">
                <g transform="scale(0.9) translate(3,7)">
                v2.0 14 November 2016 - Peter Lowden - peter@lowden.nz
                <path d="m 32,1 1,0 1,2 1,4 0,10 21,17 0,5 -2,-2 -16,-8 -3,0 0,3 2,0 1,1 0,5 -1,1 0,3 -2,0 0,1 7,5 0,3 -9,-3 -1,0 -9,3 0,-3 7,-5 0,-1 -2,0 0,-3 -1,-1 0,
                    -5 1,-1 2,0 0,-3 -3,0 -16,8 -2,2 0,-5 21,-17 0,-10 1,-4 1,-2z" stroke="${markerColor}" stroke-width="1" fill="${markerColor}" fill-opacity="0.3"/>
                </g>
                </svg>
            `)}`,
            "A3":`data:image/svg+xml;base64,${btoa(`
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 64 64" xml:space="preserve">
                <g transform="scale(1)">
                v2.0 14 November 2016 - Peter Lowden - peter@lowden.nz
                <path d="m 32,4.8 0.3,0.1 0.8,1.2 0.9,3.1 0.6,3.1 0.5,5.2 0,6.9 3.6,2.7 -0.2,-1.5 0,-1.5 0.1,-1.2 0.2,-0.4 2.8,0 0.2,0.4 0.1,1.2 0,1.5 -0.4,2.2 -0.3,
                    0 -0.1,0.9 14,7.7 0.4,0.4 0.2,0.7 0,1.5 -8.3,-2.4 -0.1,0.4 -0.2,0.2 -0.2,-0.2 -0.1,-0.5 -3.7,-1.1 -0.1,0.4 -0.2,0.2 -0.2,-0.2 -0.1,-0.5 -2,-0.6 0,1 -0.1,0.5 -0.1,0.1 -0.4,
                    0 -0.1,-0.1 -0.1,-0.5 0,-1.3 -4.6,0 0,7.7 -0.1,2.8 -0.6,3.7 -0.6,3 0.1,0.4 8.5,5.9 0,1.8 -10,-2.5 -0.2,0.7 -0.1,0.8 -0.1,0.4 -0.1,-0.4 -0.1,-0.8 -0.2,-0.7 -10,2.5 0,-1.8 8.5,
                    -5.9 0.1,-0.4 -0.6,-3 -0.6,-3.7 -0.1,-2.8 0,-7.7 -4.6,0 0,1.3 -0.1,0.5 -0.1,0.1 -0.4,0 -0.1,-0.1 -0.1,-0.5 0,-1 -2,0.6 -0.1,0.5 -0.2,0.2 -0.2,-0.2 -0.1,-0.4 -3.7,1.1 -0.1,0.5 -0.2,
                    0.2 -0.2,-0.2 -0.1,-0.4 -8.3,2.4 0,-1.5 0.2,-0.7 0.4,-0.4 14,-7.7 -0.1,-0.9 -0.3,0 -0.4,-2.2 0,-1.5 0.1,-1.2 0.2,-0.4 2.8,0 0.2,0.4 0.1,1.6 0,1.1 -0.2,1.5 3.6,-2.8 0,
                    -6.8 0.5,-5.2 0.6,-3.1 1,-3.1 0.7,-1.2 z" stroke="${markerColor}" stroke-width="1" fill="${markerColor}" fill-opacity="0.3"/>
                </g>
                </svg>
            `)}`,
            "A4":`data:image/svg+xml;base64,${btoa(`
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 64 64" xml:space="preserve">
                <g transform="scacle(1)">
                v2.0 14 November 2016 - Peter Lowden - peter@lowden.nz
                <path d="m 32,4.8 0.3,0.1 0.8,1.2 0.9,3.1 0.6,3.1 0.5,5.2 0,6.9 3.6,2.7 -0.2,-1.5 0,-1.5 0.1,-1.2 0.2,-0.4 2.8,0 0.2,0.4 0.1,1.2 0,1.5 -0.4,2.2 -0.3,
                    0 -0.1,0.9 14,7.7 0.4,0.4 0.2,0.7 0,1.5 -8.3,-2.4 -0.1,0.4 -0.2,0.2 -0.2,-0.2 -0.1,-0.5 -3.7,-1.1 -0.1,0.4 -0.2,0.2 -0.2,-0.2 -0.1,-0.5 -2,-0.6 0,1 -0.1,0.5 -0.1,0.1 -0.4,
                    0 -0.1,-0.1 -0.1,-0.5 0,-1.3 -4.6,0 0,7.7 -0.1,2.8 -0.6,3.7 -0.6,3 0.1,0.4 8.5,5.9 0,1.8 -10,-2.5 -0.2,0.7 -0.1,0.8 -0.1,0.4 -0.1,-0.4 -0.1,-0.8 -0.2,-0.7 -10,2.5 0,-1.8 8.5,
                    -5.9 0.1,-0.4 -0.6,-3 -0.6,-3.7 -0.1,-2.8 0,-7.7 -4.6,0 0,1.3 -0.1,0.5 -0.1,0.1 -0.4,0 -0.1,-0.1 -0.1,-0.5 0,-1 -2,0.6 -0.1,0.5 -0.2,0.2 -0.2,-0.2 -0.1,-0.4 -3.7,1.1 -0.1,0.5 -0.2,
                    0.2 -0.2,-0.2 -0.1,-0.4 -8.3,2.4 0,-1.5 0.2,-0.7 0.4,-0.4 14,-7.7 -0.1,-0.9 -0.3,0 -0.4,-2.2 0,-1.5 0.1,-1.2 0.2,-0.4 2.8,0 0.2,0.4 0.1,1.6 0,1.1 -0.2,1.5 3.6,-2.8 0,
                    -6.8 0.5,-5.2 0.6,-3.1 1,-3.1 0.7,-1.2 z" stroke="${markerColor}" stroke-width="1" fill="${markerColor}" fill-opacity="0.3"/>
                </g>
                </svg>
            `)}`,
            "A5":`data:image/svg+xml;base64,${btoa(`
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 64 64" xml:space="preserve">
                <g transform="scale(1)">
                v2.0 14 November 2016 - Peter Lowden - peter@lowden.nz
                <path d="m 31.6,1.6 0.4,0 0.4,0.4 0.6,0.7 0.8,2.1 0.5,2.6 0.3,2.1 0.1,2.2 0,4.9 0.9,1.3 6.7,5.5 -0.2,-0.9 0,-1.5 0.2,-1.2 0.2,-0.3 2.3,0 0.25,0.3 0.15,1.2 0,1.5 -0.1,1.3 -0.3,0.7 -0.4,
                    0 -0.1,0.5 6.8,5 -0.1,-1.3 0,-1.5 0.2,-1.2 0.2,-0.3 2.3,0 0.2,0.3 0.2,1.2 0,1.5 -0.1,1.3 -0.3,0.8 -0.4,0 -0.2,0.7 9.5,7 0.6,0.8 0.4,1.2 0.1,2.8 -0.1,0 0,-0.9 -10.7,-4.6 0,0.7 -0.3,0.7 -0.2,-0.7 -0.1,
                    -1 -2.8,-1.1 -0.1,1 -0.1,0.6 -0.4,-0.8 -0.1,-1.1 -2.7,-1 0,0.5 -0.2,1.4 -0.5,-2.2 -2.6,-1.1 -0.2,0.8 -0.2,-0.4 -0.1,-0.6 -1.3,-0.5 -1.4,-0.4 -0.1,0.4 -0.2,0.4 -0.3,-1 -3.8,-1 -0.2,2.4 -0.3,2.1 0,
                    6.8 -0.5,4 -0.4,1.8 0.1,0.5 0.4,0.5 8.5,6.5 0.4,0.6 0.5,1.5 0.3,1.8 -10.2,-3.7 -1.3,0 -0.2,0.9 -0.3,0.8 -0.2,2.1 -0.2,-2.1 -0.3,-0.8 -0.2,-0.9 -1.3,0 -10.2,3.7 0.3,-1.8 0.5,-1.5 0.4,-0.6 8.5,-6.5 0.4,
                    -0.5 0.1,-0.5 -0.4,-1.8 -0.5,-4 0,-6.8 -0.3,-2.1 -0.2,-2.4 -3.8,1 -0.3,1 -0.2,-0.4 -0.1,-0.4 -1.4,0.4 -1.3,0.5 -0.1,0.6 -0.2,0.4 -0.2,-0.8 -2.6,1.1 -0.5,2.2 -0.2,-1.4 0,-0.5 -2.7,1 -0.1,
                    1.1 -0.4,0.8 -0.1,-0.6 -0.1,-1 -2.8,1.1 -0.1,1 -0.2,0.7 -0.2,-0.7 -0.1,-0.7 -10.7,4.6 0,0.9 -0.1,0 0.1,-2.8 0.4,-1.2 0.6,-0.8 9.5,-7 -0.2,-0.7 -0.4,0 -0.3,-0.8 -0.1,-1.3 0,-1.5 0.2,-1.2 0.2,-0.3 2.3,
                    0 0.2,0.3 0.2,1.2 0,1.5 -0.1,1.3 6.8,-5 -0.1,-0.5 -0.4,0 -0.3,-0.7 -0.1,-1.3 0,-1.5 0.15,-1.2 0.25,-0.3 2.3,0 0.2,0.3 0.2,1.2 0,1.5 -0.2,0.9 6.7,-5.5 0.9,-1.3 0,-4.9 0.1,-2.2 0.3,-2.1 0.5,-2.6 0.8,-2.1 0.6,
                    -0.7 z" stroke="${markerColor}" stroke-width="1" fill="${markerColor}" fill-opacity="0.3"/>
                </g>
                </svg>
            `)}`,
            "A6":`data:image/svg+xml;base64,${btoa(`
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 128 128" xml:space="preserve">
                <g transform="scale(0.6) translate(38.4,38.4)">
                v2.0 14 November 2016 - Peter Lowden - peter@lowden.nz
                <path d="m 63,0 5,13 2,20 1,12 6,0 1,10 32,42 -3,10 -33,-24 0,8 20,23 0,6 -21,-4 -2,4 -6,0 -2,7 -2,-7 -7,0 -2,-4 -20,4 -1,-6 L 51,91 51.368655,83.126269 19,107 16,
                    96 47,55 l 1,-9 7,0 1,-18 2,-15 z" stroke="${markerColor}" stroke-width="1" fill="${markerColor}" fill-opacity="0.3"/>
                </g>
                </svg>
            `)}`,
            "A7":`data:image/svg+xml;base64,${btoa(`
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 64 64" xml:space="preserve">
                <g transform="scale(0.75) translate(12,12)">
                v2.0 14 November 2016 - Peter Lowden - peter@lowden.nz
                <path d="m 27.5,17.2 0,-0.2 -0.1,-0.3 0.2,-0.3 0,-0.5 0.1,-0.6 -0.4,-0.1 -0.2,-0.3 0.3,-1.1 0.2,0.1 -0.1,0.5 0.4,0.1 0.3,-0.7 0.5,-0.9 0.8,-0.7 0.9,-0.4 1,-0.1 1,0.1 0.9,
                    0.4 0.8,0.7 0.5,0.9 0.3,0.7 0.4,-0.1 -0.1,-0.5 0.2,-0.1 0.3,1.1 -0.2,0.3 -0.4,0.1 0.1,0.6 0,0.5 0.2,0.3 -0.1,0.3 0,0.2 0.2,0.6 0,0.7 0.1,1 0.2,0 0,-1.2 0.1,-0.6 0.2,0 0.1,
                    0.6 0.1,1.2 0,-2.4 0.1,-0.6 0.2,-0.1 0.2,0.1 0.1,0.6 -0.1,13.3 0.8,1 0,1.3 -2.2,-0.1 -0.1,1.7 -0.4,1.8 0.1,0.5 -0.1,0.4 -0.3,0.8 -0.4,0.7 -0.4,0.5 -0.1,0 -0.9,1.3 -0.2,
                    0.9 -0.1,3.1 0.2,0.2 0.4,0 0.3,0.3 -0.1,1.7 -0.3,0.3 -0.4,0 -0.2,0.2 -0.1,2.6 5.7,0 0.4,0.4 0,0.3 -0.1,0.2 0,0.2 -0.1,0.3 0.3,2.4 -0.3,0 -0.2,-1.1 -5.7,0 0,0.7 3.1,-0.3 3.9,
                    -0.9 4,-1.7 3.4,-2.1 3.1,-2.7 2.4,-2.9 2.1,-3.4 1.5,-3.5 1,-4.1 0.3,-4.1 -0.3,-4.1 -1,-3.9 -1.5,-3.7 -2.1,-3.3 -2.6,-3 -3,-2.7 -3.3,-2.1 -4,-1.7 -3.9,-0.9 -4,-0.3 -4,0.3 -3.9,
                    0.9 -4,1.7 -3.3,2.1 -3,2.7 -2.6,3 -2,3.3 -1.6,3.7 -1,3.9 -0.2,4.1 0.2,4.1 1.1,3.9 1.4,3.6 2.1,3.5 2.6,2.9 3,2.7 3.4,2.1 3.9,1.7 3.9,0.9 3,0.3 1.9,0 0,0.2 -1.9,0 -3,-0.3 -3.9,
                    -0.9 -4,-1.7 -3.4,-2.1 -3.1,-2.7 -2.6,-3 -2.1,-3.5 -1.5,-3.7 -1,-3.9 -0.3,-4.1 0.3,-4.1 1,-3.9 1.5,-3.7 2.1,-3.5 2.6,-3 3.1,-2.7 3.4,-2.1 4,-1.7 3.9,-0.9 4,-0.3 4,0.3 3.9,0.9 4,
                    1.7 3.4,2.1 3.1,2.7 2.6,3 2.1,3.5 1.5,3.7 1,3.9 0.3,4.1 -0.3,4.1 -1,4.1 -1.5,3.5 -2.1,3.5 -2.6,3 -3.1,2.7 -3.4,2.1 -4,1.7 -3.9,0.9 -3.1,0.3 0,2.5 0.2,0.7 0,2.4 -0.2,0.2 0,
                    1.8 -0.3,2.1 -1.2,0 -0.3,-2.1 0,-8.5 -5.7,-0.1 0.1,1.2 -0.3,0 -0.3,-2.5 -0.3,-0.3 0,-0.2 -0.1,-0.2 0,-0.3 0.3,-0.3 6.3,0 -0.1,-2.6 -0.2,-0.2 -0.4,0 -0.3,-0.3 -0.1,-1.7 0.3,
                    -0.3 0.4,0 0.2,-0.2 L 30.2,41.2 30,40.3 29.1,39 29,39 28.6,38.5 28.2,37.8 27.9,37 l -0.1,-0.4 0.1,-0.5 -0.4,-1.8 -0.1,-1.7 -2.2,0.1 0,-1.3 0.8,-1 -0.1,-13.3 0.1,-0.6 0.2,
                    -0.1 0.2,0.1 0.1,0.6 0,2.4 0.1,-1.2 0.1,-0.6 0.2,0 0.1,0.6 0,1.2 0.2,0 0.1,-1 0,-0.7 z" stroke="${markerColor}" stroke-width="1" fill="${markerColor}" fill-opacity="0.3"/>
                </g>
                </svg>
        `   )}`,
            "B1":`data:image/svg+xml;base64,${btoa(`
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 64 64" xml:space="preserve">
                <g transform="scale(0.75) translate(12,12)">
                v2.0 14 November 2016 - Peter Lowden - peter@lowden.nz
                <path d="m 31,1 1,0 1,2 1,4 1,6 0,3 16.5,0 11,2 1,2 -21,2 -8,0 -1,5 -1,15 0,4 4,0 5,1 0.5,1 0,1 -11,0 0.5,2 0.5,-2 -11,0 0.5,-1 0,-1 5,-1 4,0 0,-4 -1,-15 -1,-5 -8,0 -21,-2 1,-2 11,
                    -2 16.5,0 0,-3 1,-6 1,-4 1,-2 z" 
                    stroke="${markerColor}" stroke-width="1" fill="${markerColor}" fill-opacity="0.3"/>
                </g>
                </svg>
            `)}`,
            "B2":`data:image/svg+xml;base64,${btoa(`
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 64 64" xml:space="preserve">
                <g transform="scale(0.75) translate(12,12)">
                v2.0 14 November 2016 - Peter Lowden - peter@lowden.nz
                <path d="m 27,1 10,0 3,1 3,1 1,1 2,1 6,6 1,2 1,1 1,3 1,3 0,10 -1,3 -1,3 -1,1 -1,2 -6,6 -2,1 -1,1 -2,1 -2,1 -2,8 -1,0 2,-8 -3,1 -6,0 -3,-1 2,8 9,0 0,6 
                    -10,0 0,-6 -2,-8 -2,-1 -2,-1 -1,-1 -2,-1 -6,-6 -1,-2 -1,-1 -1,-3 -1,-3 0,-10 1,-3 1,-3 1,-1 1,-2 6,-6 2,-1 1,-1 3,-1 3,-1z" 
                    stroke="${markerColor}" stroke-width="1" fill="${markerColor}" fill-opacity="0.3"/>
                </g>
                </svg>
            `)}`,

            "Unknown":`data:image/svg+xml;base64,${btoa(`
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" xml:space="preserve">
                <g transform="scale(0.5) translate(12,12)">
                <path d="M17 8.21094C19.989 8.93258 22 10.2814 22 11.8262C22 14.1313 17.5228 15.9999 12 15.9999C6.47715 15.9999 2 14.1313 2 11.8262C2 10.2814 4.01099 8.93258 7 8.21094" stroke="${markerColor}" stroke-width="1.5"/>
                <path d="M7 8.72876C7 6.11714 9.11714 4 11.7288 4H12.2712C14.8829 4 17 6.11714 17 8.72876C17 8.90601 16.9458 9.07918 16.8003 9.18039C16.3862 9.4684 15.1898 10 12 10C8.81016 10 7.6138 9.4684 7.19972 9.18039C7.0542 9.07918 7 8.90601 7 8.72876Z" stroke="${markerColor}" stroke-width="1.5"/>
                <path d="M12 16V19" stroke="${markerColor}" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M5.50036 15.5L4.5 17.5" stroke="${markerColor}" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M18.4996 15.5L19.5 17.5" stroke="${markerColor}" stroke-width="1.5" stroke-linecap="round"/>
                <circle cx="12" cy="13" r="1" fill="${markerColor}"/>
                <circle cx="7" cy="12" r="1" fill="${markerColor}"/>
                <circle cx="17" cy="12" r="1" fill="${markerColor}"/>
                </g>
            </svg>
            `)}`,
            "Dragon":`data:image/svg+xml;base64,${btoa(`
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 64 64" xml:space="preserve">
            <g transform="scale(1)">
            v2.0 14 November 2016 - Peter Lowden - peter@lowden.nz
            <path d="m 31.8,1.6 -0.6,0.3 0.2,0.6 -0.4,2.9 -0.4,1.5 -0.1,2 -1.4,1.1 -0.9,1.2 -0.5,1.7 0.8,-1.1 1.4,-1.1 0.9,-0.4 -0.6,1.4 0.5,-0.2 0.5,-0.1 -0.2,2.5 -0.5,2.6 -0.3,0.7 -0.3,0.5 -0.5,0.1 -1,0.8 -0.7,0.9 -1,
                0.6 -1.2,0 -1.8,-0.5 -1.7,-0.9 -2.2,-1.8 -2.1,-2.3 -1.9,-1.9 -1.9,-1.5 -1.3,-0.7 -0.8,-0.2 0.4,0.7 -0.8,0.5 -1.3,1 -2.1,2.3 -2.2,3.2 -1.2,2.5 -1,3 -0.5,2.7 0,3.8 0.1,2 0.4,2.2 0.7,1.4 0.8,0.9 -0.4,-1.6 -0.2,
                -2.6 0.2,-2.6 0.3,-2.1 0.9,-2.1 1.3,-1.7 1,-0.7 0.9,-0.3 0,2.4 0.3,2.6 0.6,2.5 1,2.5 1.1,1.9 1.1,1.1 L 12.9,34.7 l -0.4,-1.8 -0.1,-2.6 0.1,-2.4 0.4,-1.4 0.7,-1 0.9,-1 1,-0.5 0.1,0.7 0.3,0.8 0.3,0.3 0,-0.7 L 16.7,24.4 17.3,
                24 l 1,-0.2 0.8,0 0.9,0.3 0.6,0.8 1.8,1.9 1,0.8 0.6,0.1 0.5,0.4 0.3,0.4 0.3,0.3 0.5,0.1 0.6,-0.2 0.7,-0.5 0.8,-0.3 0.8,-0.1 0.5,0.2 0.1,0.3 0,0.5 -0.2,0.3 -0.4,0 -0.4,-0.3 -0.4,-0.2 -0.5,0.1 L 26.9,29 l -0.2,0.6 0,
                1 0.1,0.8 0.3,1.1 0.7,1.8 0.4,0.8 0.2,0.6 0,0.5 -0.2,0.6 -0.2,1.5 0.1,1.8 0.2,-0.6 0.1,-0.5 0.2,-0.1 0.1,0.1 0.1,1.4 0.2,0.8 0.3,0.5 0,-0.7 -0.1,-0.8 0,-0.9 0.4,0.3 0.2,0.2 L 29.7,39.4 29.5,38.7 l -0.1,-1.1 -0.1,-0.8 0,
                -0.8 0.2,-0.6 -0.3,-0.2 -0.5,-0.6 -0.2,-0.7 -0.1,-0.7 0.1,-0.6 0.2,-0.4 0.3,-0.1 0.2,0.1 0.4,0.5 0.5,1.2 0.3,3.3 -0.2,2.7 0.1,2.3 0.4,2.5 0.5,1.9 0.4,1.2 0.2,1.2 0.1,1.6 -0.3,1.6 -0.4,1.3 -0.3,1.2 -0.1,1.3 0.1,1.7 0.3,1.5 0.2,
                0.7 -0.7,0 1.6,3.4 0.2,-3.4 -0.7,0 -0.2,-0.7 -0.2,-1.5 -0.1,-1.7 0.2,-1.3 0.4,-1.2 0.5,-1.3 0.4,-1.6 0.2,-1.6 0,-1.2 -0.2,-1.2 -0.4,-1.9 -0.2,-2.5 0.2,-2.3 0.5,-2.7 1,-3.3 0.5,-1.2 0.4,-0.5 0.2,-0.1 0.3,0.1 0.2,0.4 0.1,
                0.6 -0.1,0.7 -0.2,0.7 -0.5,0.6 -0.3,0.2 0.2,0.6 0,0.8 -0.1,0.8 -0.1,1.1 -0.2,0.7 -0.1,0.4 0.2,-0.2 0.4,-0.3 0,0.9 -0.1,0.8 0,0.7 0.3,-0.5 0.2,-0.8 0.1,-1.4 0.1,-0.1 0.2,0.1 0.1,0.5 0.2,0.6 0.1,-1.8 -0.2,-1.5 -0.2,-0.6 0,
                -0.5 0.2,-0.6 0.4,-0.8 0.7,-1.8 0.3,-1.1 0.1,-0.8 0,-1 -0.2,-0.6 -0.3,-0.3 -0.5,-0.1 -0.4,0.2 -0.4,0.3 -0.4,0 -0.2,-0.3 0,-0.5 0.1,-0.3 0.5,-0.2 0.8,0.1 0.8,0.3 0.7,0.5 0.6,0.2 0.5,-0.1 0.3,-0.3 0.3,-0.4 0.5,-0.4 0.6,-0.1 1,
                -0.8 1.8,-1.9 0.6,-0.8 0.9,-0.3 0.8,0 1,0.2 0.6,0.4 0.5,0.7 0,0.7 0.3,-0.3 0.3,-0.8 0.1,-0.7 1,0.5 0.9,1 0.7,1 0.4,1.4 0.1,2.4 -0.1,2.6 -0.4,1.8 -0.3,1.1 L 51.9,34.7 53,32.8 54,30.3 54.6,27.8 54.9,25.2 l 0,-2.4 0.9,0.3 1,
                0.7 1.3,1.7 0.9,2.1 0.3,2.1 0.2,2.6 -0.2,2.6 -0.4,1.6 0.8,-0.9 0.7,-1.4 0.4,-2.2 0.1,-2 0,-3.8 -0.5,-2.7 -1,-3 -1.2,-2.5 -2.2,-3.2 -2.1,-2.3 -1.3,-1 -0.8,-0.5 0.4,-0.7 -0.8,0.2 -1.3,0.7 -1.9,1.5 -1.9,1.9 -2.1,
                2.3 -2.2,1.8 -1.7,0.9 -1.8,0.5 -1.2,0 -1,-0.6 -0.7,-0.9 -1,-0.8 -0.5,-0.1 -0.3,-0.5 -0.3,-0.7 -0.5,-2.6 -0.2,-2.5 0.5,0.1 0.5,0.2 -0.6,-1.4 0.9,0.4 1.4,1.1 0.8,1.1 -0.5,-1.7 -0.9,-1.2 -1.4,-1.1 -0.1,-2 -0.4,-1.5 -0.4,
                -2.9 0.2,-0.6 -0.6,-0.3 L 32,1 Z" stroke="${markerColor}" stroke-width="1" fill="${markerColor}" fill-opacity="0.3"/>
            </g>
            </svg>
            `)}`,
        };

        if(category in iconSVGData){
            return iconSVGData[category];
        }
        return iconSVGData["A1"];
    };

        //Below is the old code for the arrow icons pulled from the adsb-map.js file. Saved in case I need it again.
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
    

export { colorAircraftMap, airportData, aircraftSVGCreation , categoryAircraftMap };