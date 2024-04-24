import { getConfigOfuser } from '../api';
import { Card } from '../components/Card';
import { SendBtn } from '../components/SendBtn';

import Tabs from '../components/Tabs';
import { useV2Store } from '../store/store';
import { useApi } from '../hooks';
import { useQuery } from '@tanstack/react-query';

import { Loader2, XCircle } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function GeneratorPage() {
    const { api } = useApi();

    //    const navigate = useNavigate();
    const [params] = useSearchParams();
    //    const { setItem } = useLocalStorage('auth');

    const headCardData = useV2Store((s) =>
        s.collection.find((val) => val.id === 'head')
    );

    const init = useV2Store((s) => s.init);
    const { isLoading, isError } = useQuery({
        queryKey: ['init'],
        queryFn: async () => {

            const { node, embeds } = await getConfigOfuser(api);

            // set data from backend into the store
            init(node, embeds);
        },
    });

    return (
        <>
            <main className="flex flex-col ">

                <div className="hidden h-[100vh] w-full flex justify-center items-center">
                    {isLoading && (
                        <div className="flex gap-4 animate-pulse">
                            <Loader2 className="animate-spin " />
                            <h1 className="">Authenticating</h1>
                        </div>
                    )}
                    {isError && (
                        <div className="hidden flex gap-2 bg-red-950/30 p-16 text-red-400 rounded-xl">
                            <XCircle />
                            <h1>Failed to Authenticate, Please Generate a new link through discord bot</h1>
                        </div>
                    )}
                </div>
                {!isLoading ? (
                    <>
                        <div className="p-2 relative md:p-16 flex gap-8 flex-col items-center">
                            {/*Render Head Card*/}
                            <div className=" z-50 w-full max-w-[70vh] flex justify-end py-16 ">
                                <SendBtn />
                            </div>
                            <Card
                                item={{
                                    message: headCardData?.message || '',
                                    id: 'head',
                                    label: headCardData?.label,
                                    parentId: '',
                                }}
                            />
                            {/*Render other Cards*/}
                            <Tabs parentId="head" />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="h-screen w-screen grid place-items-center">
                            <Loader2 className="animate-spin" />
                        </div>
                    </>
                )}
            </main>
        </>
    );
}

export default GeneratorPage;
