import { create } from 'zustand';

import { devtools } from 'zustand/middleware';
import { Embed } from './types';
import { getRandomValue } from '../randomList';

export type TNode = {
    id: string;
    parentId: string;
    message: string;
    label?: string;
};

export type State = {
    collection: TNode[];
    embeds: Embed[];
};

export type Actions = {
    // node
    addNode: (id?: string) => void;
    updateNode: (newNode: TNode) => void;
    removeNode: (nodeid: string) => void;

    // embeds
    addEmbed: (nodeId: string) => void;
    removeEmbed: (embedId: string) => void;
    updateEmbed: (embedId: string, newData: Embed) => void;
};

export const useV2Store = create<State & Actions>()(
    devtools((set) => ({
        collection: [
            {
                label: getRandomValue().label,
                message: getRandomValue().message,
                id: 'head',
            },
            {
                label: getRandomValue().label,
                message: getRandomValue().message,
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
                    label: getRandomValue().label,
                    id: crypto.randomUUID(),
                    message: getRandomValue().message,
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

        removeNode: (id: string) =>
            set((s) => {
                let collection = s.collection.slice();
                let embeds = s.embeds.slice();
                embeds = embeds.filter((e) => e.conNodeId !== id);

                // remvoe embeds of nodes that are childrens of our node
                // NOTE: in case of performance issue this step can be ommited
                // as res will ignore any embeds whose parentId does not exist
                for (const i in collection) {
                    if (collection[i].parentId === id) {
                        embeds = embeds.filter(
                            (e) => e.conNodeId !== collection[i].id
                        );
                    }
                }

                // remove all nodes with id=id or parentId = id
                collection = collection.filter(
                    (n) => n.id !== id && n.parentId !== id
                );

                return { ...s, embeds, collection };
            }),

        // Embeds
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
