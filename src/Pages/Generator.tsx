import { SendBtn } from '../components/SendBtn';

import Tabs from '../components/Tabs';

function GeneratorPage() {
    return (
        <>
            <main className="flex flex-col ">
                <div className="w-full flex justify-end p-16 ">
                    <SendBtn />
                </div>
                <div className="p-16 flex gap-8 flex-col items-center">
                    <Tabs parentId="head" />
                </div>
            </main>
        </>
    );
}

export default GeneratorPage;
