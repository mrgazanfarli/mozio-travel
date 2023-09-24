import type { RouteObject } from 'react-router-dom';
import { Home } from 'pages/Home';
import { Results } from 'pages/Results';

export const appRoutes: RouteObject[] = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/results',
        element: <Results />
    }
]
