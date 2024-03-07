import './App.css';
import { SendBtn } from './components/SendBtn';
// import { useCollectionStore } from './store';
// import { Card } from './components/test';
// import { SendBtn } from './components/SendBtn';

import Tabs from './v2/Tabs';
import { useV2Store } from './v2/store';

function App() {
    // const data = useCollectionStore((s) => s.collection);
    // const addNode = useCollectionStore((s) => s.addNode);
    const data = useV2Store((s) => s.collection);
    return (
        <>
            {data?.map((item) => <span>{item.message}</span>)}
            <SendBtn />
            <Tabs parentId="head" />
        </>
    );
}

export default App;
/*
 *
 *    return (
        <>
            <div className="pt-8">
                <h1 className="text-3xl font-bold text-center mb-8">
                    Create Bot Like{' '}
                </h1>
                <SendBtn />
                {data.map((item, idx) => {
                    return <Card key={idx} idx={idx} items={item} />;
                })}
                <div className="flex w-full items-center justify-center mb-20">
                    <button
                        onClick={addNode}
                        className="bg-primary hover:bg-primary/50"
                    >
                        Add Card +
                    </button>
                </div>
            </div>
        </>
    );

 *
 */
