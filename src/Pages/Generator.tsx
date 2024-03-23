import { getConfigOfuser } from '../api';
import { Card } from '../components/Card';
import { SendBtn } from '../components/SendBtn';

import Tabs from '../components/Tabs';
import { useV2Store } from '../store/store';
import { useApi } from '../hooks';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

function GeneratorPage() {
    const { api } = useApi();

    const headCardData = useV2Store((s) =>
        s.collection.find((val) => val.id === 'head')
    );

    const init = useV2Store((s) => s.init);
    const { isLoading } = useQuery({
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
                <div className="w-full flex  justify-end p-16 ">
                    <SendBtn />
                </div>
                {!isLoading ? (
                    <>
                        <div className="p-16 flex gap-8 flex-col items-center">
                            {/*Render Head Card*/}
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
