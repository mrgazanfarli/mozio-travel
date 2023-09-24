import { Grid } from '@mui/material';
import { SearchForm } from 'components/SearchForm';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import type { TravelForm } from 'types/form';

export const Home = () => {
    const navigate = useNavigate();

    const handleSubmit = useCallback(({ date, destinationCities, cityOfOrigin, passengerCount }: TravelForm) => {
        if (cityOfOrigin) {
            const queryParamsObject = {
                date: date ? date.toISOString() : '',
                passengerCount: `${passengerCount}`,
                destinationNames: `${cityOfOrigin[0]}, ${Object.values(destinationCities).map(cityDetails => cityDetails![0]).join(', ')}`,
                destinationLats: `${cityOfOrigin[1]}, ${Object.values(destinationCities).map(cityDetails => cityDetails![1]).join(', ')}`,
                destinationLons: `${cityOfOrigin[2]}, ${Object.values(destinationCities).map(cityDetails => cityDetails![2]).join(', ')}`,
            }
            const params = new URLSearchParams(queryParamsObject).toString();

            navigate(`/results?${params}`);
        }
    }, [navigate]);

    return (
        <Grid container justifyContent="center" mt={4} px={2}>
            <Grid item xs={12} lg={6}>
                <SearchForm onSubmit={handleSubmit} />
            </Grid>
        </Grid>
    )
}
