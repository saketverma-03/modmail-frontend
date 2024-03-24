import { createBrowserRouter } from 'react-router-dom';
import { AuthPage } from './Pages/Auth';
import GeneratorPage from './Pages/Generator';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthPage />,
    },
    {
        path: 'modmail',
        element: <GeneratorPage />,
    },
]);

// domain.com?token="dasdasdas"
