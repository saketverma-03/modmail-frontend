import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthPage } from './Pages/Auth';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: 'auth',
        element: <AuthPage />,
    },
]);
