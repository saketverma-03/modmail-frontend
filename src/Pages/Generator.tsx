import { useEffect } from 'react';
import { getConfigOfuser } from '../api';
import { Card } from '../components/Card';
import { SendBtn } from '../components/SendBtn';

import Tabs from '../components/Tabs';
import { useV2Store } from '../store/store';
import { useApi } from '../hooks';

function GeneratorPage() {
    const { api } = useApi();

    const headCardData = useV2Store((s) =>
        s.collection.find((val) => val.id === 'head')
    );

    useEffect(() => {
        async function fn() {
            const a = await getConfigOfuser(api);
            console.log(a);
        }
        fn();
    }, [api]);
    return (
        <>
            <main className="flex flex-col ">
                <div className="w-full flex  justify-end p-16 ">
                    <SendBtn />
                </div>
                <div className="p-16 flex gap-8 flex-col items-center">
                    <Card
                        item={{
                            message: headCardData?.message,
                            id: 'head',
                            label: headCardData?.label,
                        }}
                    />
                    <Tabs parentId="head" />
                </div>
            </main>
        </>
    );
}

export default GeneratorPage;
