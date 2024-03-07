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

const useFN = () => {
    const d = useV2Store((s) => s.collection);
    const fn = (data: TNode, constData: TNode[]) => {
        const newData = constData.filter((c) => c.id === data.id);
        if (newData.length === 0) {
            return data;
        }

        return {
            message: data.message,
            label: data.label,
            button: newData.map((item) => useFN(item, constData)),
        };
    };
    const x = fn({ label: 's', id: 'head', message: 'sas', parentId: 'ss' }, d);
    return x;
};

/**
 
 message*
 able
 btn [
 {}
 ]
 */

export const SendBtn = () => {
    const d = useV2Store((s) => s.collection);
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
            button: newData.map((item) => fn(item, constData)),
        };
        return obj;
    };
    function handleOnSubmit() {
        const x = fn({ label: 's', id: 'head', message: 'sas' }, d);
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
