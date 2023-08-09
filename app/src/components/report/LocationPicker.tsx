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
import { Form, Button } from 'react-bootstrap';

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
        console.log(event);
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
    const [reportAddress, setReportAddress] = useState<string | undefined>(undefined);

    function handleDragEnd(event: MarkerDragEvent) {
        const { lng, lat } = event.lngLat;
        setReportLocation([lng, lat]);
    }

    function handleGeolocate(event: GeolocateResultEvent) {
        // console.log(event);
        const { longitude, latitude } = event.coords;
        setReportLocation([longitude, latitude]);
    }

    async function reverseGeolocation() {
        const endpoint = 'mapbox.places';
        const [longitude, latitude] = reportLocation;

        if (!longitude || !latitude) return;

        try {
            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/${endpoint}/${longitude},${latitude}.json?types=address,poi,place&access_token=${MAPBOX_ACCESS_TOKEN}`
            );
            const json = await response.json();
            // console.log(json)
            const address = json.features[0].place_name;
            setReportAddress(address);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div
            style={{
                height: 'auto',
                width: '600px',
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
                    onError={(error) => {
                        window.alert(error.message);
                    }}
                />
            </Map>

            <Form className="locationSearchBar">
                <Form.Group>
                    <Form.Control placeholder="Coordinate" value={reportLocation.map(String)} />
                </Form.Group>
                <Form.Group>
                    <Form.Control placeholder="Addresses" value={reportAddress} />
                </Form.Group>
                <Button onClick={reverseGeolocation}>Reverse Geo</Button>
            </Form>
        </div>
    );
}
