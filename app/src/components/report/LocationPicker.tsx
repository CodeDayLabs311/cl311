import React, { useState, useEffect } from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Form } from 'react-bootstrap';

export default function LocationPicker() {

    const [viewState, setViewState] = useState({
        longitude: -122.335167,
        latitude: 47.608013,
        zoom: 10.5,
    });

    // const [reportLocation, setReportLocation] = useState<MapDragEvent | {} >({})

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
                    longitude={-122.335167}
                    latitude={47.608013}
                    color="red"
                    draggable={true}
                    onDragEnd={(event) => {
                        console.log(event.lngLat);
                    }}
                />
            </Map>

            <Form className="locationSearchBar">
                <Form.Group>
                    <Form.Control placeholder="Coordinate" />
                </Form.Group>
            </Form>
        </div>
    );
}
