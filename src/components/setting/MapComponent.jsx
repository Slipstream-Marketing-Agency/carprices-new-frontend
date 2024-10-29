'use client'

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Marker Component for handling user clicks on the map
const LocationMarker = ({ setAddressFromMap }) => {
    const map = useMap();

    useEffect(() => {
        map.invalidateSize(); // Ensures map renders correctly when modal opens
    }, [map]);

    map.on('click', (e) => {
        const { lat, lng } = e.latlng;
        setAddressFromMap(lat, lng);
        map.flyTo(e.latlng, map.getZoom());
    });

    return null;
};

const MapComponent = ({ lat, lng, setAddressFromMap }) => {
    const icon = L.icon({ iconUrl: "/assets/images/marker-icon.png" });

    return (
        <MapContainer
            center={[lat || 25.276987, lng || 55.296249]} // Default location is Dubai
            zoom={13}
            style={{ height: '300px', width: '100%' }}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {lat && lng && <Marker icon={icon} position={[lat, lng]} />}
            <LocationMarker setAddressFromMap={setAddressFromMap} />
        </MapContainer>
    );
};

export default MapComponent;
