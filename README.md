# sage-adsb-display-site

## ADS-B Data Display on Leaflet Map
This React project is designed to display ADS-B (Automatic Dependent Surveillance – Broadcast) data on a Leaflet map. 
ADS-B is a surveillance technology in which an aircraft determines its position via satellite navigation and periodically broadcasts it, enabling it to be tracked.

The end goal is to eventually display the data in a way that resembles Cold War era Air Defense systems, but for now it's serving as both a learning project and workspace to try new ideas.

## Overview
This project consists of several components:

- AircraftMapLayout: This component renders the main layout of the application, including the Leaflet map and the panel for displaying selected aircraft details.

- AircraftMap: This component is responsible for rendering the Leaflet map and displaying aircraft markers based on the ADS-B data received from a WebSocket connection.

- SelectedAircraftInfo: This component displays detailed information about the selected aircraft, including its identifier, callsign, heading, speed, altitude, mode 3A squawk code, category, latitude, and longitude.


## Installation

### To run this project locally, follow these steps:

Clone the repository:
'''git clone <repository_url>'''

Navigate to the project directory:
'''cd <project_directory>'''

Navigate to the sage-radar sub-direcotry:
'''cd sage-radar'''

### Install dependencies using npm:
NPM:
'''npm install'''


### Start the development server:
NPM:
'''npm start'''


### Open your web browser and navigate to localhost:3000 to view the application.

## Usage
Upon launching the application, you should see a Leaflet map displaying aircraft markers.
Click on any aircraft marker to view detailed information about the selected aircraft in the panel on the right side of the map.
If no aircraft is selected, a message indicating "No aircraft selected" will be displayed in the panel.

_Note: May take a few seconds before the data is pulled from the server for the aircraft, if it takes more than 10 seconds the receiver is likely down._

## Technologies Used
- React.js: A JavaScript library for building user interfaces.
- Leaflet: An open-source JavaScript library for interactive maps.
- WebSocket: A communication protocol that provides full-duplex communication channels over a single TCP connection.
- Socket.IO: A library that enables real-time, bidirectional, and event-based communication between web clients and servers.
- Node.js: Javascript library used to run the back-end server, code not packaged here.

## License
This project is licensed under the MIT License.