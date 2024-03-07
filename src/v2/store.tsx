import { create } from 'zustand';

import { devtools } from 'zustand/middleware';
import { Embed } from '../store/types';

export type TNode = {
    id: string;
    parentId: string;
    message: string;
    label?: string;
};

type State = {
    collection: TNode[];
    embeds: Embed[];
};

type Actions = {
    // node
    addNode: (id?: string) => void;
    updateNode: (newNode: TNode) => void;

    // embeds
    addEmbed: (nodeId: string) => void;
    removeEmbed: (embedId: string) => void;
    updateEmbed: (embedId, newData) => void;
};

export const useV2Store = create<State & Actions>()(
    devtools((set) => ({
        collection: [
            {
                label: 'default',
                message: 'saket',
                parentId: 'head',
                id: crypto.randomUUID(),
            },
        ],
        embeds: [],
        addNode: (id) =>
            set((s) => {
                if (!id) {
                    id = 'head';
                }
                const temp = s.collection.slice();
                temp.push({
                    label: 'default label',
                    id: crypto.randomUUID(),
                    message: 'hellow owrld',
                    parentId: id,
                });
                return { ...s, collection: temp };
            }),
        updateNode: (newNode) =>
            set((s) => {
                const temp = s.collection.slice();
                for (let i = 0; i < temp.length; i++) {
                    if (temp[i].id === newNode.id) {
                        temp[i] = newNode;
                        break;
                    }
                }
                return { ...s, collection: temp };
            }),
        addEmbed: (nodeId) =>
            set((s) => {
                const newEmbed: Embed = {
                    id: crypto.randomUUID(),
                    conNodeId: nodeId,
                };
                const tempEmbeds: Embed[] = s.embeds.slice();
                tempEmbeds.push(newEmbed);
                return { ...s, embeds: tempEmbeds };
            }),
        removeEmbed: (embedId: string) =>
            set((s) => {
                const newEmbedList = s.embeds.filter((e) => e.id !== embedId);
                return { ...s, embeds: newEmbedList };
            }),
        updateEmbed: (embedId, newData) =>
            set((s) => {
                let embeds = s.embeds.slice();
                embeds = embeds.filter((e) => e.id !== embedId);
                embeds.push(newData);
                return { ...s, embeds: embeds };
            }),
    }))
);
