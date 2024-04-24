import { Loader2, XCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLocalStorage } from '../hooks';

export function AuthPage() {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const { setItem } = useLocalStorage('auth');
    useEffect(() => {
        if (params.get('token')) {
            setItem(params.get('token'));
            navigate('/modmail');
        }
    }, [params]);

    return (
        <>
            <div className="h-[100vh] w-full flex justify-center items-center">
                <div className="flex gap-4 animate-pulse">
                    <Loader2 className="animate-spin " />
                    <h1 className="">Authenticating</h1>
                </div>
                <div className="flex gap-2 bg-red-950/30 p-16 text-red-400 rounded-xl">
                    <XCircle />
                    <h1>Failed to Authenticate, Please Generate a new link through discord bot</h1>
                </div>
            </div>
        </>
    );
}


