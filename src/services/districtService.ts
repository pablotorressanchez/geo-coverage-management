import lima_district from '../utils/json/lima_distritos.json';
import type { GeoJsonObject } from 'geojson';

export const districtService = {
    getGeoDistricts: () => {
        return (lima_district as GeoJsonObject)
    },
    getDistricts: (district: string) => (
        lima_district.features.filter(({ properties: p }) => p.distrito.toLowerCase().includes(district.toLowerCase()))
    ),
    getDistrictNames: (district: string) => (
        districtService.getDistricts(district).map(({ properties: p }) => p.distrito)
    ),
    getDistrictLayer: (district: string) => (
        districtService.getDistricts(district).find(({ properties: p }) => p.distrito.toLowerCase().includes(district.toLowerCase()))
    )
}