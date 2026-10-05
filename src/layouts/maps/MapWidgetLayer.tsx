import { MapContainer, TileLayer, FeatureGroup, useMap } from 'react-leaflet';
import { EditControl } from "react-leaflet-draw";
import { type LatLngExpression } from 'leaflet';
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { useEffect, useRef, useState } from 'react';


import '../../styles/Popup.css';
import { createCustomCheckboxControl, CreateCustomCheckboxControl } from './controls/CustomControls';
import { FeaturesLayer } from './geojson-layers/FeaturesLayer';
import { DistrictLayer } from './geojson-layers/DistrictLayer';

const position: LatLngExpression = [-12.046132, -77.031156]; 
const zoomLevel: number = 13;

export const MapWidgetLayer = () => {

    const [showGeoDistrict, setShowGeoDistrict] = useState(false);
    
    const featureGroupRef = useRef<L.FeatureGroup>(null);

    // Evento de creación de una nueva figura
    const _onCreate = (e: any) => {
        const { layerType, layer } = e;
        // const { _leaflet_id } = layer;
        if (layerType === "polygon") {
        // Ejemplo: Obtener coordenadas si es un polígono
        const polygonLayer = layer as L.Polygon;
        const latlngs = polygonLayer.getLatLngs();
        console.log("Coordenadas del polígono creado:", latlngs);
        }

        console.log("Capa creada completa:", layer);
    };

    // Evento para cuando se editan figuras existentes
    const _onEdited = (e: any) => {
        const { layers } = e;
        layers.eachLayer((layer: L.Layer) => {
        console.log("Capa editada:", layer);
        });
    };

    // Evento para cuando se eliminan figuras
    const _onDeleted = (e: any) => {
        const { layers } = e;
        layers.eachLayer((layer: L.Layer) => {
        console.log("Capa eliminada:", layer);
        });
    };

    return (
        <>
        <MapContainer center={position} zoom={zoomLevel} scrollWheelZoom={true} style={{ height: '100%', width: '100%', zIndex: 0 }}>
            <TileLayer attribution="&copy; OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <FeatureGroup ref={featureGroupRef}>
                <EditControl
                        position="topleft"
                        onCreated={_onCreate}
                        onEdited={_onEdited}
                        onDeleted={_onDeleted}
                        draw={{
                        polygon:    {
                                allowIntersection: false,
                                shapeOptions: { color: "#2c3e50" }
                            },
                        polyline: false,
                        rectangle: false,
                        circle: false,
                        marker: false,
                        circlemarker: false
                    }}
                    edit={{
                        remove: false,
                        edit: false
                    }}
                />
                {/* <EditControlLayer onCreated={ onCreated } /> */}
                <CreateCustomCheckboxControl label="Ver Distritos" onClick={setShowGeoDistrict} />
                {/* <CustomCheckboxControl /> */}
            </FeatureGroup>
            
            <FeaturesLayer />
            {
                showGeoDistrict && <DistrictLayer display={showGeoDistrict} />
            }

        </MapContainer>
        </>
    )

    function CustomCheckboxControl() {
        const map = useMap();

        useEffect(() => {
            // Instanciar y añadir al mapa
            const control = createCustomCheckboxControl({
            position: 'topleft',
            label: 'Activar Capa',
            onClick: (isChecked) => {
                //console.log('Checkbox cambiado:', isChecked);
                setShowGeoDistrict(isChecked);
            }
            });

            control.addTo(map);

            // Limpieza al desmontar el componente React
            return () => {
            map.removeControl(control);
            };
        }, [map]);

        return null;
    }
}
