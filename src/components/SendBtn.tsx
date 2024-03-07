import { SaveIcon } from 'lucide-react';
import { useCollectionStore } from '../store';
import { Embed } from '../store/types';
import { TNode, useV2Store } from '../v2/store';

function formateEmbed(e: Embed) {
    return {
        title: e.title,
        description: e.description,

        url: e.url,
        timestamp: e.timeStamp,
        color: e.color,
        footer: {
            text: e.footerText,
            iconUrl: e.footerIconUrl,
        },
        image: e.imageUrl,
    };
}

/**
 
 message*
 able
 btn [
 {}
 ]
 */

const useResObj = () => {
    const embeds = useV2Store((s) => s.embeds);
    const fn = (data: TNode, constData: TNode[]) => {
        const newData = constData.filter((c) => c.parentId === data.id);
        if (newData.length === 0) {
            return {
                message: data.message,
                label: data.label,
                embeds: embeds.filter((e) => e.conNodeId === data.id),
                button: undefined,
            };
        }

        const obj = {
            message: data.message,
            label: data.label,

            embeds: embeds.filter((e) => e.conNodeId === data.id),
            button: newData.map((item) => fn(item, constData)),
        };
        return obj;
    };
    return [fn];
};

export const SendBtn = () => {
    const collection = useV2Store((s) => s.collection);
    const [fn] = useResObj();
    function handleOnSubmit() {
        const x = fn({ label: 's', id: 'head', message: 'sas' }, collection);
        console.log('data', x);
    }

    return (
        <>
            <button
                onClick={handleOnSubmit}
                className="flex gap-2 bg-primary hover:bg-primary/50"
            >
                Save <SaveIcon className="h-5 w-5 opacity-80" />
            </button>
        </>
    );
};
