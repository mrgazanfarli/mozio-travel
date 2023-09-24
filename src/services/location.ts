import { allCities } from 'consts/cities';
import { stall } from 'utils/async';
import type { ILocation } from 'types/location';
import { haversineDistanceInKm } from 'utils/location';

export const fetchDistanceBetweenLocations = async (locations: ILocation[]) => {
    const distances: number[] = [];

    locations.forEach((location, i, self) => {
        const nextItem = self[i + 1];
        if (nextItem) {
            distances.push(haversineDistanceInKm(location, nextItem));
        }
    });

    await stall(2500);

    if (locations.some(location => location.name.includes('Dijon'))) {
        throw new Error('Unexpected error occurred!');
    }

    return { distanceInKm: distances.reduce((sum, current) => sum + current, 0), distances };
}
