import type { LatLonObject } from 'types/location';

function toRad(value: number) {
    return value * Math.PI / 180;
}

export function haversineDistanceInKm(location1: LatLonObject, location2: LatLonObject) {
    const R = 6371; // in kilometers
    const x1 = location2.lat - location1.lat;
    const x2 = location2.lon - location1.lon;
    const dLat = toRad(x1);
    const dLon = toRad(x2);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(location1.lat)) * Math.cos(toRad(location2.lat)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}
