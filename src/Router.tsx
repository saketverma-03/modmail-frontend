import { createBrowserRouter } from 'react-router-dom';
import { AuthPage } from './Pages/Auth';
import GeneratorPage from './Pages/Generator';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <GeneratorPage />,
    },
    {
        path: 'modmail',
        element: <AuthPage />,
    },
]);
