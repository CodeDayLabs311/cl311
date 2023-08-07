import React, { useState, useEffect } from 'react';
import Map, { Marker, LngLat, MarkerDragEvent } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Form } from 'react-bootstrap';

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
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
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
            </Map>

            <Form className="locationSearchBar">
                <Form.Group>
                    <Form.Control placeholder="Coordinate" value={reportLocation.map(String)} />
                </Form.Group>
            </Form>
        </div>
    );
}
