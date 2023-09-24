import { Box, Button, CircularProgress, Grid, Paper, Typography } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { VerticalList } from 'VerticalList';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchDistanceBetweenLocations } from 'services/location';
import { ILocation } from 'types/location';
import dayjs from 'dayjs';

export function Results() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const destinationNames = useMemo(() => searchParams.get('destinationNames')?.split(',') ?? [], [searchParams]);
    const destinationLats = useMemo(() => searchParams.get('destinationLats')?.split(',') ?? [], [searchParams]);
    const destinationLons = useMemo(() => searchParams.get('destinationLons')?.split(',') ?? [], [searchParams]);
    const passengerCount = useMemo(() => searchParams.get('passengerCount'), [searchParams]);;
    const date = useMemo(() => searchParams.get('date'), [searchParams]);;
    const [isLoading, setLoading] = useState(false);
    const [totalDistance, setTotalDistance] = useState<number>();
    const [distances, setDistances] = useState<number[]>([]);
    const [error, setError] = useState('');

    const handleBack = useCallback(() => {
        navigate('/');
    }, [navigate]);

    const fetchDistance = useCallback(async () => {
        setLoading(true);

        const locations: ILocation[] = [];

        destinationNames.forEach((name, i) => {
            locations.push({ name, lat: Number(destinationLats[i]), lon: Number(destinationLons[i]) });
        });

        try {
            const { distanceInKm, distances } = await fetchDistanceBetweenLocations(locations);
            setDistances(distances);
            setTotalDistance(distanceInKm);
        } catch (err: any) {
            setError(err.message);
        }

        setLoading(false);
    }, [destinationLats, destinationLons, destinationNames]);

    useEffect(() => {
        fetchDistance();
    }, [fetchDistance]);

    return (
        <Grid container justifyContent="center" mt={3}>
            <Grid item xs={12} lg={6} px={1}>
                {isLoading && (
                    <Box display="flex" justifyContent="center">
                        <CircularProgress />
                    </Box>
                )}

                {error && (
                    <Paper>
                        <Typography align="center" variant="h6" color="error">
                            {error}
                        </Typography>
                    </Paper>
                )}

                {!isLoading && !error && (
                    <Paper elevation={3} sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                        <Box maxWidth="400px">
                            <Box maxWidth="200px" pl={7}>
                                <VerticalList
                                    small
                                    rightItems={destinationNames}
                                    leftItems={distances.map(d => d.toFixed(2) + ' km')}
                                    verticallyPadded={false}
                                />
                            </Box>

                            <Box mt={2}>
                                <Typography align="center">
                                    <Typography display="inline" color="primary.main">{totalDistance?.toFixed(2)} km</Typography> is total distance
                                </Typography>
                            </Box>
                            <Box mt={2}>
                                <Typography align="center">
                                    <Typography fontWeight={700} display="inline" color="primary.main">{passengerCount}</Typography> passenger{Number(passengerCount) > 1 ? 's' : ''}
                                </Typography>
                            </Box>
                            <Box mt={2}>
                                <Typography align="center">
                                    <Typography fontWeight={700} display="inline" color="primary.main">{dayjs(date).format('MMM DD, YYYY')}</Typography>
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                )}

                <Box display="flex" justifyContent="center" mt={2}>
                    <Button onClick={handleBack}>
                        Back
                    </Button>
                </Box>
            </Grid>
        </Grid>
    )
}
