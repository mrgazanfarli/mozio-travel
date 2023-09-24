import { Box, IconButton, Typography } from '@mui/material';
import { CitiesAutocomplete } from 'components/CitiesAutocomplete';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { DestinationCities, ICityDetails } from 'types/cities';

interface Props {
    destinationIds: string[];
    destinationCities: DestinationCities;
    onDestinationChange: (destinationId: string,  val: ICityDetails | null) => void;
    onDestinationRemoval: (destinationId: string) => void;
}

export function Destinations({ destinationIds, destinationCities, onDestinationChange, onDestinationRemoval }: Props) {
    return (
        <>
            {destinationIds.map((destinationId, i) => (
                <Box mt={1.5} key={destinationId}>
                    <Typography variant="body2" mb={0.5}>Destination {i + 1}</Typography>
                    <Box display="flex" alignItems="center">
                        <CitiesAutocomplete
                            value={destinationCities[destinationId]}
                            onChange={(value) => {
                                onDestinationChange(destinationId, value);
                            }}
                            hasError={!destinationCities[destinationId]}
                        />
                        <IconButton onClick={() => onDestinationRemoval(destinationId)} color="primary" size="small"
                                    style={{ marginLeft: '4px' }}>
                            <HighlightOffIcon />
                        </IconButton>
                    </Box>
                </Box>
            ))}
        </>
    )
}
