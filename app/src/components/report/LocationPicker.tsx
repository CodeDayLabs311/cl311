import React, { useState, useEffect } from 'react';
import Map, {
    useControl,
    useMap,
    Marker,
    LngLat,
    MarkerDragEvent,
    GeolocateControl,
    GeolocateResultEvent,
} from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { Form } from 'react-bootstrap';
import { error } from 'console';

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

type LocationSearchBarProps = {
    placeMarker: (location: number[]) => void;
};

function LocationSearchBar({ placeMarker }: LocationSearchBarProps) {
    const geocoder = new MapboxGeocoder({
        accessToken: MAPBOX_ACCESS_TOKEN,
        mapboxgl: mapboxgl,
        marker: false,
        placeholder: 'Where do you report it?',
    });

    useControl(() => geocoder);

    geocoder.on('result', (event) => {
        // console.log(event);
        placeMarker(event.result.geometry.coordinates);
    });

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
    }

    function handleGeolocate(event: GeolocateResultEvent) {
        // console.log(event);
        const { longitude, latitude } = event.coords;
        setReportLocation([longitude, latitude]);
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
                {reportLocation.length > 0 && (
                    <Marker
                        longitude={reportLocation[0]}
                        latitude={reportLocation[1]}
                        color="red"
                        draggable={true}
                        onDragEnd={handleDragEnd}
                    />
                )}
                <LocationSearchBar placeMarker={setReportLocation} />
                <GeolocateControl
                    position="bottom-right"
                    onGeolocate={handleGeolocate}
                    onError={(error) => console.log(error)}
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
