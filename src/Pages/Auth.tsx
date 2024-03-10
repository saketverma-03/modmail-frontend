import { Loader2, XCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApi, useLocalStorage } from '../hooks';
import { useQuery } from '@tanstack/react-query';
import { getVerifyToken } from '../api';

export function AuthPage() {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const { api } = useApi();
    const { setItem } = useLocalStorage('auth');
    const { isLoading, isError, isSuccess } = useQuery({
        queryKey: ['auth'],
        queryFn: async () => {
            const token = params.get('token');
            if (!token) throw new Error('no token found in params');
            return await getVerifyToken(api, token);
        },
    });
    useEffect(() => {
        if (isSuccess) {
            setItem(params.get('token'));
            navigate('/');
        }
    }, [isSuccess]);
    return (
        <>
            <div className="h-[100vh] w-full flex justify-center items-center">
                {isLoading && (
                    <div className="flex gap-4 animate-pulse">
                        <Loader2 className="animate-spin " />
                        <h1 className="">Authenticating</h1>
                    </div>
                )}
                {isError && (
                    <div className="flex gap-2 text-red-600">
                        <XCircle />
                        <h1>Failed to Authenticate</h1>
                    </div>
                )}
            </div>
        </>
    );
}
