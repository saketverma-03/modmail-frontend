import { useNavigate } from 'react-router-dom';
import wretch from 'wretch';
export const useLocalStorage = (key: string) => {
    const setItem = (value: unknown) => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.log(error);
        }
    };

    const getItem = () => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : undefined;
        } catch (error) {
            console.log(error);
        }
    };

    const removeItem = () => {
        try {
            window.localStorage.removeItem(key);
        } catch (error) {
            console.log(error);
        }
    };

    return { setItem, getItem, removeItem };
};
export const useApi = () => {
    const { getItem } = useLocalStorage('auth');
    const naviate = useNavigate();
    const api = wretch('http://localhost:3000', {
        mode: 'cors',
    })
        .auth(`bearer ${getItem()}`)
        .catcher(404, () => console.log('lol 404 caught'))
        .catcher(401, () => naviate('/'))
        .errorType('json');

    return { api };
};
