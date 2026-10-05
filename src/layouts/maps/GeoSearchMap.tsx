import { useEffect } from "react";
import L from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { leafletService } from "../../services/leafletService";
import '../../styles/GeoSearch.css';

export interface Location {
    direction: string,
    label?: string,
    latLng: [number, number]
}

export interface SelectedLocation {
    location: Location;
    onChangeLocation: (location: Location) => void;
}

export const GeoSearchMap = ({ location, onChangeLocation = () => { } }: SelectedLocation) => {
    return (
        <>
            <MapContainer center={[-12.046132, -77.031156]} zoom={13} scrollWheelZoom={true} style={{ height: '100%', width: '100%', zIndex: 80 }}>
                <TileLayer attribution="&copy; OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <CreateGeoSearchControl location={location} onChangeLocation={onChangeLocation} />
            </MapContainer>
        </>
    );
}

export const CreateGeoSearchControl = ({ location, onChangeLocation = () => { } }: SelectedLocation) => {
    const map = useMap();
    const provider = new OpenStreetMapProvider()
    let marker: L.Marker | undefined = undefined;

    // @ts-ignore
    const searchControl = new GeoSearchControl({
        provider: provider,
        style: 'button', // 'bar' o 'button'
        showMarker: true,
        showPopup: true,
        position: 'topright',
        marker: {
            draggable: true,
            icon: new L.Icon.Default()
        },
        retainZoomLevel: false,
        animateZoom: true,
        autoClose: false,
        searchLabel: 'Buscar sucursal',
    });

    useEffect(() => {
        map.addControl(searchControl);

        map.on('geosearch/showlocation', onShowLocation, this);
        map.on('geosearch/marker/dragend', onMarkerDragEnd, this);
        return () => {
            map.removeControl(searchControl)
            offGeoSearch();
        };
    }, [map]);

    useEffect(() => {
        if (!!location) {
            setLocation(location);
        }
    }, [location]);
    
    function onShowLocation(e: any) {
        const { marker: mrk, location: { bounds, label, x: longitude, y: latitude } } = e;
        if (bounds)
            map.setView([latitude, longitude], 13)
            // map.fitBounds(bounds).panTo([latitude, longitude]);

        if (mrk) {
            mrk.remove();
        }

        if (label && longitude && latitude)
            onChangeLocation({ direction: label, latLng: [latitude, longitude] });

    }

    async function onMarkerDragEnd(e: any) {
        if (e?.location) {
            const { location: { lat, lng } } = e;

            if (lat && lng)
                searchLocation([lat, lng]);
        }
    }

    function _onMarkerDragStart(e: any) {
        console.log('Inicio del arrastre en:', e.target.getLatLng());
    }

    function _onMarkerDragEnd(e: any) {
        const { lat, lng } = e.target.getLatLng();
        console.log('Nueva posición:', { lat, lng });

        if (lat && lng)
            searchLocation([lat, lng]);
    }

    /**
     * 
     * @param {{ direction: string, latLng: number[] }} location Location
     * @example
     * {
     *    direction: 'Lima',
     *    location: [0.0, 0.0],
     * }
     */
    function setLocation(location: Location) {
        const { direction = undefined, latLng = undefined } = location;
        if (Array.isArray(latLng) && direction) {
            if (!marker) {
                marker = new L.Marker(latLng, {
                    draggable: true,
                    icon: new L.Icon(leafletService.getIcon())
                })
                    .bindPopup(direction)
                    .openPopup();

                map
                    .addLayer(marker)
                    .setView(latLng, 13);

            } else {
                marker
                    .addTo(map)
                    .setLatLng(latLng)
                    .setPopupContent(direction)
                    .openPopup();

                map.setView(latLng, 13);
            }

            marker.on('dragstart', _onMarkerDragStart);
            marker.on('dragend', _onMarkerDragEnd);
        }
    }

    /**
     * 
     * @param {Array<number, number> | string} location
     * @example
     * location = [-72.1, 11.3] | 'Lima'
     */
    async function searchLocation(location: number[] | string) {
        if (Array.isArray(location) || typeof location === "string") {
            const searchQuery = location.toString();
            
            const res = await provider.search({
                query: `${searchQuery}`
            });

            onShowLocation({ location: res?.[0] });
        }
    }

    function offGeoSearch() {
        marker?.remove();
    }

    return null;
    
}