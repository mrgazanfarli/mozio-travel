import { allCities } from 'consts/cities';
import { stall } from 'utils/async';

export const fetchCities = async (query: string) => {
    if (query === 'fail') {
        throw new Error('Unexpected error occurred!');
    }

    const results = allCities.filter(cityItem => cityItem[0].toLowerCase().includes(query.toLowerCase()));
    await stall();

    return results;
}
