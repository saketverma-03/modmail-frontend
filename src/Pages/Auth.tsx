import { Loader2, XCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function AuthPage() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/');
    }, []);
    return (
        <>
            <div className="h-[100vh] w-full flex justify-center items-center">
                <div className="flex gap-4 animate-pulse">
                    <Loader2 className="animate-spin " />
                    <h1 className="">Authenticating</h1>
                </div>
                {false && (
                    <div className="flex gap-2 text-red-600">
                        <XCircle />
                        <h1>Failed to Authenticate</h1>
                    </div>
                )}
            </div>
        </>
    );
}
