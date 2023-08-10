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

type ViewStateType = {
    longitude: number;
    latitude: number;
    zoom: number;
};

/** Save user reported location in local storage */
function submitLocation(reportCoords: number[]) {
    localStorage.setItem('lastReportedLocation', JSON.stringify(reportCoords));
}

/** Retrieve last user reported location */
function fetchUserLastLocation() {
    if (typeof window === 'undefined') return{ longitude: -117.15726, latitude: 32.71533, zoom: 10.5 }

    const lastReportedLocation = localStorage.getItem('lastReportedLocation');

    if (lastReportedLocation) {
        const [longitude, latitude] = JSON.parse(lastReportedLocation);
        console.log('Setting to user location:', longitude, latitude); // debug line
        return { longitude, latitude, zoom: 10.5 };
    } else {
        console.log('Setting to default location'); // debug line
        return{ longitude: -117.15726, latitude: 32.71533, zoom: 10.5 };
    }
}

/** Location Search Bar */
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

/** The map */
export default function LocationPicker() {
    const [viewState, setViewState] = useState<ViewStateType | {}>(fetchUserLastLocation);
    const [reportCoords, setReportCoords] = useState<number[]>([]);
    const [reportAddress, setReportAddress] = useState<string | undefined>(undefined);

    function handleDragEnd(event: MarkerDragEvent) {
        const { lng, lat } = event.lngLat;
        setReportCoords([lng, lat]);
    }

    function handleGeolocate(event: GeolocateResultEvent) {
        // console.log(event);
        const { longitude, latitude } = event.coords;
        setReportCoords([longitude, latitude]);
    }

    async function reverseGeolocation() {
        const endpoint = 'mapbox.places';
        const [longitude, latitude] = reportCoords;

        if (!longitude || !latitude) return;

        try {
            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/${endpoint}/${longitude},${latitude}.json?types=address,poi,place&access_token=${MAPBOX_ACCESS_TOKEN}`
            );
            const json = await response.json();
            // console.log(json)
            const results = json.features[0];
            setReportAddress(results?.place_name || undefined);
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
                {reportCoords.length > 0 && (
                    <Marker
                        longitude={reportCoords[0]}
                        latitude={reportCoords[1]}
                        color="red"
                        draggable={true}
                        onDragEnd={handleDragEnd}
                    />
                )}
                <LocationSearchBar placeMarker={setReportCoords} />
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
                    <Form.Control placeholder="Coordinates" value={reportCoords.map(String)} />
                </Form.Group>
                <Form.Group>
                    <Form.Control placeholder="Address" value={reportAddress} />
                </Form.Group>
                <Button onClick={reverseGeolocation}>Reverse Geo</Button>
                <Button onClick={() => submitLocation(reportCoords)}>Submit Location</Button>
            </Form>
        </div>
    );
}
