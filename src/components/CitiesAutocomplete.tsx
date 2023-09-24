import { Alert, Autocomplete, debounce, Snackbar, TextField } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ICityDetails } from 'types/cities';
import { fetchCities } from 'services/cities';

interface Props {
    value: ICityDetails | null;
    onChange: (val: ICityDetails | null) => void;
    hasError?: boolean;
}

export function CitiesAutocomplete({ value, onChange, hasError }: Props) {
    const [cities, setCities] = useState<ICityDetails[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleErrorClose = useCallback(() => {
        setError('');
    }, []);

    const handleFetch = useMemo( () =>
        debounce(async (query: string) => {
            setLoading(true);

            try {
                const results = await fetchCities(query);
                setCities(results);
            } catch (err: any) {
                setError(err.message);
            }

            setLoading(false);
        }, 400), []);

    useEffect(() => {
        if (inputValue === '') {
            setCities([]);
            return;
        }

        if (inputValue.length > 2) {
            handleFetch(inputValue)
        }
    }, [handleFetch, inputValue])

    return (
       <>
           <Autocomplete
               fullWidth
               value={value}
               onChange={(e, val) => onChange(val)}
               loading={isLoading}
               onInputChange={(e, value) => {
                   setInputValue(value);
               }}
               getOptionLabel={opt => opt ? opt[0] : ''}
               renderInput={(params) => (
                   <TextField {...params} error={hasError} size="small" fullWidth />
               )}
               renderOption={(props, option) => (
                   <li {...props} style={{ padding: '0 8px' }}>{option[0]}</li>
               )}
               options={cities}
           />
           <Snackbar
               open={!!error}
               autoHideDuration={4000}
               onClose={handleErrorClose}
               anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
           >
               <Alert
                   onClose={handleErrorClose}
                   severity="error"
                   sx={{ width: '100%' }}
               >
                   {error}
               </Alert>
           </Snackbar>
       </>
    )
}
