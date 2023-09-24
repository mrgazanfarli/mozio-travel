import { DestinationCities, ICityDetails } from 'types/cities';
import { Box, IconButton, Typography } from '@mui/material';
import { CitiesAutocomplete } from 'components/CitiesAutocomplete';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useMemo } from 'react';

type UseDestinationsArgs = {
    destinationIds: string[];
    destinationCities: DestinationCities;
    onDestinationChange: (destinationId: string, val: ICityDetails | null) => void;
    onDestinationRemoval: (destinationId: string) => void;
}

export function useDestinations({
                                    destinationCities,
                                    onDestinationRemoval,
                                    onDestinationChange,
                                    destinationIds,
                                }: UseDestinationsArgs) {
    const hasSeveralItems = useMemo(() => destinationIds.length > 1, [destinationIds]);

    return destinationIds.map((destinationId, i) => (
        <Box mt={1.5} sx={{ width: '100%' }} key={destinationId}>
            <Typography variant="body2" mb={0.5}>Destination {i + 1}</Typography>
            <Box display="flex" alignItems="center" pr={hasSeveralItems ? 0 : 4.5}>
                <CitiesAutocomplete
                    value={destinationCities[destinationId]}
                    onChange={(value) => {
                        onDestinationChange(destinationId, value);
                    }}
                    hasError={!destinationCities[destinationId]}
                />
                {hasSeveralItems && (
                    <IconButton onClick={() => onDestinationRemoval(destinationId)} color="primary" size="small"
                                style={{ marginLeft: '4px' }}>
                        <HighlightOffIcon />
                    </IconButton>
                )}
            </Box>
        </Box>
    ))
}
