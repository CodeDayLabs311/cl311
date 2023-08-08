import React, { useState, useEffect } from 'react';
import Map, { useControl, Marker, LngLat, MarkerDragEvent } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { Form } from 'react-bootstrap';

const MAPBOX_ACCESS_TOKEN= process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

function LocationSearchBar() {
    const geocoder = new MapboxGeocoder({
        accessToken: MAPBOX_ACCESS_TOKEN,
        mapboxgl: mapboxgl,
        marker: true,
        placeholder:'Where do you report it?',
    });

    useControl(() => geocoder);

    return null;
}

export default function LocationPicker() {
    const [viewState, setViewState] = useState({
        longitude: -122.335167,
        latitude: 47.608013,
        zoom: 10.5,
    });

    const [reportLocation, setReportLocation] = useState<number[]>([]);

    function handleDragEnd(event: MarkerDragEvent) {
        const { lng, lat } = event.lngLat;
        setReportLocation([lng, lat]);
        setViewState((prev) => ({
            ...prev,
            longitude: lng,
            latitude: lat,
        }));
    }

    return (
        <div
            style={{
                height: '400px',
                marginBottom: '20px',
                // overflow: 'hidden',
            }}
        >
            <Map
                mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
                reuseMaps={true} //remove this if map breaks
                initialViewState={{ ...viewState }}
                style={{ width: 600, height: 400 }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
            >
                <Marker
                    longitude={viewState.longitude}
                    latitude={viewState.latitude}
                    color="red"
                    draggable={true}
                    onDragEnd={handleDragEnd}
                />
                <LocationSearchBar/>
            </Map>

            <Form className="locationSearchBar">
                <Form.Group>
                    <Form.Control placeholder="Coordinate" value={reportLocation.map(String)} />
                </Form.Group>
            </Form>
        </div>
    );
}
