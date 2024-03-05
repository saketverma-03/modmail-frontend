import './App.css';
import { useCollectionStore } from './store';
import { Card } from './components/test';

function App() {
    const data = useCollectionStore((s) => s.collection);
    const addNode = useCollectionStore((s) => s.addNode);
    return (
        <>
            <div className="pt-8">
                <h1 className="text-3xl font-bold text-center mb-8">
                    Create Bot Like{' '}
                </h1>
                {data.map((item, idx) => {
                    return <Card key={idx} idx={idx} items={item} />;
                })}
                <button onClick={addNode}>Add</button>
            </div>
        </>
    );
}

export default App;
