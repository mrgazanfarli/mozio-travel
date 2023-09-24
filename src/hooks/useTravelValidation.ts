import { TravelForm } from 'types/form';
import { useMemo } from 'react';

export function useTravelValidation(form: TravelForm) {
    const isPassengerCountInvalid = useMemo(() => {
        const countAsNumber = Number(form.passengerCount);

        return !form.passengerCount || !Number.isInteger(countAsNumber) || countAsNumber < 1;
    }, [form.passengerCount]);
    const isDestinationCitiesInvalid = useMemo(() => {
        const values = Object.values(form.destinationCities);

        return !values.length || values.some(v => !v);
    }, [form.destinationCities]);
    
    return {
        cityOfOrigin: !form.cityOfOrigin,
        date: !form.date,
        passengerCount: !form.passengerCount || isPassengerCountInvalid,
        destinationCities: isDestinationCitiesInvalid,
    }
}
