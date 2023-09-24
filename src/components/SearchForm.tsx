import { Box, Button, Grid, Paper, styled, Typography } from '@mui/material';
import { PassengerCount } from 'components/PassengerCount';
import { useCallback, useMemo, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { DestinationCities, ICityDetails } from 'types/cities';
import { CitiesAutocomplete } from 'components/CitiesAutocomplete';
import { generateUUID } from 'utils/crypto';
import { Destinations } from 'components/Destinations';
import type { Dayjs } from 'dayjs';
import { useTravelValidation } from 'hooks/useTravelValidation';
import type { TravelForm } from 'types/form';
import { VerticalList } from 'VerticalList';
import { useDestinations } from 'hooks/useDestinations';


const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
    ' input': {
        padding: theme.spacing(1),
        borderColor: 'red !important'

    },
}));

interface Props {
    onSubmit: (data: TravelForm) => void;
}

export function SearchForm({ onSubmit }: Props) {
    const [passengerCount, setPassengerCount] = useState(1);
    const [cityOfOrigin, setCityOfOrigin] = useState<ICityDetails | null>(null);
    const [destinations, setDestinations] = useState<string[]>([generateUUID()]);
    const [destinationCities, setDestinationCities] = useState<DestinationCities>({});
    const [date, setDate] = useState<Dayjs | null>(null);

    const errors = useTravelValidation({ date, passengerCount, cityOfOrigin, destinationCities });
    const hasError = useMemo(() => Object.values(errors).some(isError => !!isError), [errors]);

    const handleDestinationCitiesChange = useCallback((destinationId: string, value: ICityDetails | null) => {
        setDestinationCities(old => ({
            ...old,
            [destinationId]: value
        }))
    }, []);

    const handlePassengerCountChange = useCallback((type: 'remove' | 'add') => {
        if (type === 'remove') {
            setPassengerCount(old => old - 1);
        } else {
            setPassengerCount(old => old + 1);
        }
    }, []);

    const handleDestinationAddition = useCallback(() => {
        const newId = generateUUID();
        setDestinations(old => [...old, newId]);
        setDestinationCities(old => ({ ...old, [newId]: null }));
    }, []);

    const handleDestinationRemoval = useCallback((destinationId: string) => {
        setDestinations(old => old.filter(item => item !== destinationId));
        setDestinationCities(old => {
            const oldCopy = { ...old };
            delete oldCopy[destinationId];

            return oldCopy;
        })
    }, []);

    const handleSubmit = useCallback(() => {
        onSubmit({
            date,
            cityOfOrigin: cityOfOrigin,
            destinationCities,
            passengerCount,
        })
    }, [cityOfOrigin, date, destinationCities, onSubmit, passengerCount]);

    const destinationsList = useDestinations({
        onDestinationChange: handleDestinationCitiesChange,
        onDestinationRemoval: handleDestinationRemoval,
        destinationCities: destinationCities,
        destinationIds: destinations,
    })

    return (
        <Paper>
            <Grid container spacing={2} p={2}>
                <Grid item xs={12} lg={8}>
                    <VerticalList
                        rightItems={[
                            <Box pr={4.5} sx={{ width: '100%' }}>
                                <Typography variant="body2" mb={0.5}>City of origin</Typography>
                                <CitiesAutocomplete
                                    hasError={errors.cityOfOrigin}
                                    value={cityOfOrigin}
                                    onChange={setCityOfOrigin}
                                />
                            </Box>,
                            ...destinationsList,
                        ]}
                    />
                    <Box mt={1.5}>
                        <Button
                            variant="text"
                            size="small"
                            onClick={handleDestinationAddition}
                        >
                            Add destination
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <PassengerCount hasError={errors.passengerCount} onChange={handlePassengerCountChange} value={passengerCount} />
                    <Box mt={1.5}>
                        <Typography variant="body2" mb={0.5}>Date</Typography>
                        <StyledDatePicker
                            disablePast
                            value={date}
                            onChange={(value: unknown) => setDate(value as  Dayjs | null)}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} justifyContent="center" display="flex" mt={1.5}>
                    <Button
                        onClick={handleSubmit}
                        disabled={hasError}
                        variant="contained"
                        color="primary"
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    )
}
