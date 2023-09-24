import type { Dayjs } from 'dayjs';
import type { DestinationCities, ICityDetails } from 'types/cities';

export interface TravelForm {
    date: Dayjs | null;
    cityOfOrigin: ICityDetails | null;
    destinationCities: DestinationCities;
    passengerCount: string | number;
}
