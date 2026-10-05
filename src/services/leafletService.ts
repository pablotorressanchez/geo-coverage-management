import L from "leaflet";
import type { FeatureModel } from "../types/geojson/types";

export interface District {
    departamento: string;
    provincia: string;
    distrito: string;
    distrito2?: string;
    ubigeo: string;
}

type ExtraProperties = FeatureModel['properties'] | District;
export type PopupProps = ExtraProperties & {
    className?: string;
    type: string;
}

export const leafletService = {
    getPopupContent: ({ type, ...rest }: PopupProps) => {
        if (type === 'district') {
            const dist = rest;
            return `
        <div class="custom-district-popup flex flex-col w-full h-full rounded-lg dark:bg-gray-700" style="z-index: 80">
            <div class="custom-header flex items-center justify-center px-3 py-2 bg-gray-100 border-b border-b-gray-300 rounded-t-lg dark:bg-gray-800 dark:border-b-gray-700 text-sm font-medium">
                <h3 class="">${dist.departamento}</h3>
            </div>
            <div class="flex flex-col gap-1 custom-content px-3 py-2 text-sm font-normal text-gray-600 bg-white dark:text-white dark:bg-gray-800">
                <h2>Departamento: ${dist.departamento}</h2>
                <h2>Provincia: ${dist.provincia}</h2>
                <h2>Distrito: ${dist.distrito}</h2>
                ${dist.ubigeo ? `<h2>UBIGEO: ${dist.ubigeo}</h2>` : ''}
            </div>
            <div class="custom-footer flex items-center justify-end px-3 py-2 text-sm font-normal text-gray-600 bg-gray-100 dark:text-white dark:bg-gray-800 border-t border-t-gray-300 dark:border-t-gray-700 gap-2">
                
                <button type="button" id="add-coverage-district" value="${dist.departamento}" class="inline-flex items-center gap-1 px-3 py-1.5 font-light text-sm tracking-wide text-center rounded-lg cursor-pointer text-white focus:outline-2 focus:outline-offset-2  dark:bg-sky-600 dark:hover:bg-sky-700">
                    <svg class="w-4 h-4" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="m2.513 12.833 9.022 5.04a.995.995 0 0 0 .973.001l8.978-5a1 1 0 0 0-.002-1.749l-9.022-5a1 1 0 0 0-.968-.001l-8.978 4.96a1 1 0 0 0-.003 1.749z"></path><path d="m3.485 15.126-.971 1.748 9 5a1 1 0 0 0 .971 0l9-5-.971-1.748L12 19.856l-8.515-4.73zM20 8V6h2V4h-2V2h-2v2h-2v2h2v2z"></path>
                    </svg>
                    Usar como covertura
                </button>
            </div>
        </div>
        `
        } else {
            const layer = rest as FeatureModel['properties'];
            return `
                <div class="custom-district-popup flex flex-col w-full h-full rounded-lg dark:bg-gray-700" style="z-index: 80">
                    <div class="custom-header flex items-center justify-center px-3 py-2 bg-gray-100 border-b border-b-gray-300 rounded-t-lg dark:bg-gray-800 dark:border-b-gray-700 text-sm font-medium text-gray-600 dark:text-white">
                        <h3 class="">${layer.name}</h3>
                    </div>
                    <div class="custom-content px-3 py-2 text-sm font-normal text-gray-600 bg-white dark:text-white dark:bg-gray-800">
                        <p>${layer.popupContent}</p>
                    </div>
                    <div class="custom-footer flex items-center justify-center px-3 py-2 text-sm font-normal text-gray-600 bg-gray-100 dark:text-white dark:bg-gray-800 border-t border-t-gray-300 dark:border-t-gray-700 gap-2">
                        
                        <button type="button" id="edit-polygon" class="${layer.isBeginEdited ? 'hidden' : 'inline-flex'} items-center gap-1 p-1.5 font-light text-sm tracking-wide text-center rounded-lg cursor-pointer text-green-300 dark:text-green-500 focus:outline-2 focus:outline-offset-2 bg-transparent hover:bg-gray-300 dark:hover:bg-gray-700" title="Editar">
                            <svg class="w-4 h-4" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"></path>
                            </svg>
                            
                        </button>
        
                        <button type="button" id="del-polygon" class="${layer.isBeginEdited ? 'hidden' : 'inline-flex'} items-center gap-1 p-1.5 font-light text-sm tracking-wide text-center rounded-lg cursor-pointer text-rose-300 dark:text-rose-400 focus:outline-2 focus:outline-offset-2 bg-transparent hover:bg-gray-300 dark:hover:bg-gray-700" title="Eliminar">
                            <svg class="w-4 h-4" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"></path>
                            </svg>
                            
                        </button>
                        
                        <button type="button" id="save-edit-polygon" class="${layer.isBeginEdited ? 'inline-flex ' : 'hidden'} items-center gap-1 p-1.5 font-light text-sm tracking-wide text-center rounded-lg cursor-pointer text-indigo-300 dark:text-indigo-500 focus:outline-2 focus:outline-offset-2 bg-transparent hover:bg-gray-300 dark:hover:bg-gray-700" title="Guardar">
                            <svg class="w-4 h-4" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 21h14a2 2 0 0 0 2-2V8l-5-5H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2zM7 5h4v2h2V5h2v4H7V5zm0 8h10v6H7v-6z"></path>
                            </svg>
                            
                        </button>
                        
                        <button type="button" id="cancel-edit-polygon" class="${layer.isBeginEdited ? 'inline-flex' : 'hidden'} items-center gap-1 p-1.5 font-light text-sm tracking-wide text-center rounded-lg cursor-pointer text-red-400 dark:text-red-600 focus:outline-2 focus:outline-offset-2 bg-transparent hover:bg-gray-300 dark:hover:bg-gray-700" title="Cancelar">
                            <svg class="w-4 h-4" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="m289.94 256 95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 1 0 34 34l95-95 95 95a24 24 0 0 0 34-34z"></path>
                            </svg>
                            
                        </button>
                    </div>
                </div>
            `
        }
    },

    customPopup: (props: PopupProps) => {

        const popup = leafletService.getPopupContent(props);

        return L.popup({
            pane: 'popupPane',
            offset: new L.Point(0, 7),
            maxWidth: 250,
            minWidth: 50,
            maxHeight: undefined,
            autoPan: true,
            //autoPanPaddingTopLeft: undefined,
            //autoPanPaddingBottomRight: undefined,
            autoPanPadding: new L.Point(5, 5),
            keepInView: false,
            closeButton: false,
            autoClose: true,
            closeOnEscapeKey: true,
            closeOnClick: true,
            className: 'custom-popup bg-gray-200 dark:bg-gray-700 border border-gray-300 rounded-lg shadow-xs dark:border-gray-700',
        })
            .setContent(popup)

    },

    /**
     * 
     * @param {{ title: string, latLng: Array<number, number>, popupContent:string }} Object
     */
    getMarker: ({ title, latLng, popupContent }: { title: string, latLng: [number, number], popupContent: string }) => {
        // const { title, latLng, popupContent } = props;
        console.log("fdsfsdfdsf")
        return L.marker(latLng, {
            draggable: false,
            title,
            icon: new L.Icon(leafletService.getIcon()),
        }).bindPopup(popupContent);
    },

    getIcon: (_ = '', fillColor = "#EF5B0C") => {
        const icon: any = {
            iconUrl: "data:image/svg+xml," + encodeURIComponent(getSvgIcon(fillColor)),
            iconSize: [24, 24],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: "",
            shadowAnchor: [41, 41],
            className: 'l-marker'
        };

        return icon;

        function getSvgIcon(fillColor: string) {
            return `
            <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' fill='none' stroke='${fillColor}'>
                <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
                <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g>
                <g id='SVGRepo_iconCarrier'>
                    <path fill='${fillColor}' fill-rule='evenodd' d='M11.291 21.706 12 21l-.709.706zM12 21l.708.706a1 1 0 0 1-1.417 0l-.006-.007-.017-.017-.062-.063a47.708 47.708 0 0 1-1.04-1.106 49.562 49.562 0 0 1-2.456-2.908c-.892-1.15-1.804-2.45-2.497-3.734C4.535 12.612 4 11.248 4 10c0-4.539 3.592-8 8-8 4.408 0 8 3.461 8 8 0 1.248-.535 2.612-1.213 3.87-.693 1.286-1.604 2.585-2.497 3.735a49.583 49.583 0 0 1-3.496 4.014l-.062.063-.017.017-.006.006L12 21zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' clip-rule='evenodd'>
                    </path>
                </g>
            </svg>
        `
        }
    },

    getBaseStyle: () => {
        const rndColorFill = '#' + Math.floor(Math.random() * 16777215).toString(16);
        return {
            fillOpacity: 0.45,
            color: rndColorFill,
            strokeWeight: 4,
            fillColor: rndColorFill,
            clickable: true
        }
    },

    _editingStyle: 
        {
            stroke: true,
            color: '#f06eaa',
            weight: 4,
            opacity: 0.5,
            fill: true,
            fillColor: '#f06eaa',
            fillOpacity: 0.2,
            clickable: true
        }
}