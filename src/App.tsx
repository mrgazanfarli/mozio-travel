import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { appRoutes } from 'routes/consts';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from 'theme';
import { NavBar } from 'components/NavBar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const router = createBrowserRouter(appRoutes);

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={theme}>
                <NavBar />
                <RouterProvider router={router} />
                <CssBaseline />
            </ThemeProvider>
        </LocalizationProvider>
    );
}

export default App;
