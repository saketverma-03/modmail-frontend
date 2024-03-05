import { Collection, ContainerNode, Embed } from './types';
import { create } from 'zustand';

import { devtools } from 'zustand/middleware';

type State = {
    collection: Collection;
    embeds: Embed[];
};

type Actions = {
    addNode: () => void;
    addSubNode: (idx: number) => void;
    updateTitleOfCard: (idx: number, cardId: string, text: string) => void;
    updateContentOfCard: (idx: number, cardId: string, text: string) => void;
    addEmbed: (nodeId: string) => void;
    removeEmbed: (embedId: string) => void;
    updateEmbed: (embedId: string, newData: Embed) => void;
};

const initialNode: ContainerNode = {
    id: 'randomUUID',
    title: 'this is amazing',
    content: 'icons loook more amazingg,but why stomp \nhereee',
};

export const useCollectionStore = create<State & Actions>()(
    devtools((set) => ({
        collection: [[initialNode]],
        embeds: [],
        addNode: () => {
            const tempNode = {
                id: '',
                title: 'title',
                content: 'dasda',
            };
            tempNode.id = crypto.randomUUID();
            return set((s) => ({
                ...s,
                collection: [...s.collection, [tempNode]],
            }));
        },
        addSubNode: (idx) => {
            set((s) => {
                const temp = s.collection.slice();
                const tempNode = {
                    id: 'dasd',
                    title: 'title',
                    content: 'dasda',
                };
                tempNode.id = crypto.randomUUID();
                temp[idx].push(tempNode);
                return { ...s, collection: temp };
            });
        },
        updateTitleOfCard: (idx, cardId, text) =>
            set((s) => {
                const collection = s.collection.slice();
                for (const i in collection[idx]) {
                    if (collection[idx][i].id === cardId) {
                        collection[idx][i].title = text;

                        break;
                    }
                }
                return { ...s, collection };
            }),
        updateContentOfCard: (idx, cardId, text) =>
            set((s) => {
                const collection = s.collection.slice();
                for (const i in collection[idx]) {
                    if (collection[idx][i].id === cardId) {
                        collection[idx][i].content = text;

                        break;
                    }
                }
                return { ...s, collection };
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
