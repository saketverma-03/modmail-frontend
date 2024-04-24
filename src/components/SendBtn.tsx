import { Loader2, SaveIcon } from 'lucide-react';
import { Embed } from '../store/types';
import { Embed as ResEmbed } from '../types';
import { TNode, useV2Store } from '../store/store';
import { useApi } from '../hooks';
import { postConfigUser } from '../api';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

function formateEmbed(E: Embed[]) {
    // console.log({ E });
    return E.map((e): ResEmbed => {
        return {
            title: e.title,
            description: e.description,
            url: e.url,
            timestamp: e.timeStamp,
            //@ts-ignore
            color: e.color,
            footer: {
                text: e.footer || '',
                iconURL: e.footerIconUrl,
            },
            image: {
                url: e.imageUrl,
            },
            thumbnail: {
                url: e.thumbnailUrl,
            },
        };
    });
}

const useResObj = () => {
    const embeds = useV2Store((s) => s.embeds);
    const fn = (buttons: TNode, allBtns: TNode[]) => {
        const newData = allBtns.filter((c) => c.parentId === buttons.id);
        if (newData.length === 0) {
            const e = formateEmbed(
                embeds.filter((e) => e.conNodeId === buttons.id)
            );
            return {
                label: buttons?.label,
                linkedComponent: {
                    message: {
                        content: buttons?.message,
                    },

                    embeds: e,
                },
            };
        }

        const e = formateEmbed(
            embeds.filter((e) => e.conNodeId === buttons.id)
        );
        console.log({ e });
        const obj = {
            label: buttons?.label,
            linkedComponent: {
                message: {
                    content: buttons?.message,
                    embeds: e,
                    attachments: buttons?.attachments,
                    // embeds: embeds.filter((e) => e.conNodeId === data.id),
                },
                button: newData.map((item) => fn(item, allBtns)),
            },
        };

        return obj;
    };
    return [fn];
};

export const SendBtn = () => {
    const collection = useV2Store((s) => s.collection);
    const headNodeData = useV2Store((s) =>
        s.collection.find((val) => val.id === 'head')
    );

    const embeds = useV2Store((s) =>
        s.embeds.filter((val) => val.conNodeId === 'head')
    );

    const { api } = useApi()
    const [fn] = useResObj();
    async function handleOnSubmit() {
        const x = fn({ label: '', id: 'head', message: '' }, collection);
        const res = {
            archiveChannelId: 'saket123',
            modmailCategoryId: 'saket123',
            aiSupport: false,
            initialMessage: {
                message: {
                    content: headNodeData?.message, //TODO:
                    embeds: embeds, // TODO:
                    attachments: headNodeData?.attachments,
                },

                buttons: x.linkedComponent.button,
            },
        };
        mutate(res)
        // console.log('data', res);
    }

    const { mutate, isLoading, isPending, } = useMutation({
        mutationFn: async (res) => {
            return await postConfigUser(api, res)
        }
    })
    useEffect(() => { console.log("loading:::", isLoading) }, [isLoading])

    return (
        <>
            <button
                onClick={handleOnSubmit}
                className="flex fixed gap-2 bg-primary hover:bg-primary/50"
            >
                {

                    isLoading || isPending ? <Loader2 className='animate-spin' /> : <SaveIcon className="h-5 w-5 opacity-80" />
                } Save
            </button>
        </>
    );
};
