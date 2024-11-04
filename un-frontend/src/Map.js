import { useEffect, useState } from 'react';
import data from './data.json';
import UseShowMarkerDetails from './hooks/UseShowMarkerDetails';

const Map = () => {
    // Default location of NYC
    const [userLocation, setUserLocation] = useState({ lat: 40.7128, lng: -74.0060 });
    const [map, setMap] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Get user location if location sharing. If not, defaults to NYC
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => console.error('Error getting user location:', error)
            );
        }
    }, []);

    useEffect(() => {
        const initializeMap = () => {
            if (!window.H || !userLocation) {
                return;
            }

            // Dispose of pre-existing map to prevent rendering a second map
            if (map) {
                map.dispose()
            }

            const platform = new window.H.service.Platform({
                apikey: process.env.REACT_APP_HERE_API_KEY,
            });
            const defaultLayers = platform.createDefaultLayers();

            const mapInstance = new window.H.Map(
                document.getElementById('mapContainer'),
                defaultLayers.vector.normal.map,
                {
                    zoom: 6,
                    center: userLocation,
                }
            );

            window.H.ui.UI.createDefault(mapInstance, defaultLayers);
            new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(mapInstance));

            setMap(mapInstance);

            return () => mapInstance.dispose();
        };
        // Small delay to allow scripts to load
        const mapTimeout = setTimeout(initializeMap, 700);
        return () => clearTimeout(mapTimeout);
    }, [userLocation]);

    useEffect(() => {
        const placeMarkers = () => {
            if (!map || !data || data.length === 0 || !window.H) {
                return;
            }

            // Create icon and add to map
            data.forEach((place) => {
                const svgMarkup = '<svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
                    '<path fill="green" d="M12 2C8.13 2 5 5.13 5 9c0 4.97 7 13 7 13s7-8.03 7-13c0-3.87-3.13-7-7-7z"/>' +
                    '<circle cx="12" cy="9" r="4" fill="#F9F7F7"/>' +
                    '</svg>';

                const icon = new window.H.map.Icon(svgMarkup);
                const marker = new window.H.map.Marker({ lat: place.latitude, lng: place.longitude }, { icon });

                marker.addEventListener('pointerenter', () => {
                    document.getElementById('mapContainer').style.cursor = 'pointer';
                });

                marker.addEventListener('pointerleave', () => {
                    document.getElementById('mapContainer').style.cursor = 'default';
                });

                marker.addEventListener('tap', () => {
                    setSelectedPlace(place);
                });

                map.addObject(marker);
            });
        };
        // Small delay to allow map to initialize
        const markerTimeout = setTimeout(placeMarkers, 800);
        return () => clearTimeout(markerTimeout);
    }, [map]);

    return (

        <div style={{ 
            width: '100%', 
            height: '100%', 
            minHeight: '400px', 
            position: 'relative',
        }}
            id="mapContainer"
        >
            {selectedPlace && (
                <UseShowMarkerDetails
                    place={selectedPlace}
                    show={show}
                    setShow={setShow}
                    onClose={() => setSelectedPlace(null)}
                />
            )}

        </div>

    );
};

export default Map;