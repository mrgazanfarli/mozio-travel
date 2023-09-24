import { Box, Button, Typography, useTheme } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

interface Props {
    hasError?: boolean;
    value: string | number;
    onChange: (type: 'add' | 'remove') => void;
}

export function PassengerCount({ hasError, value, onChange }: Props) {
    const theme = useTheme();

    return (
        <Box>
            <Typography variant="body2" mb={0.5}>Passengers</Typography>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                border="1px solid"
                borderColor={hasError ? theme.palette.error.main : theme.palette.divider}
                borderRadius={1}
                padding={0.5}
            >
                <Button size="small" onClick={() => onChange('remove')}>
                    <RemoveIcon />
                </Button>
                <Typography flexGrow={1} textAlign="center" variant="body1">
                    {value}
                </Typography>
                <Button size="small" onClick={() => onChange('add')}>
                    <AddIcon />
                </Button>
            </Box>
        </Box>
    )
}
