import { SaveIcon } from 'lucide-react';
import { Embed } from '../store/types';
import { TNode, useV2Store } from '../store/store';

function formateEmbed(E: Embed[]) {
    // console.log({ E });
    return E.map((e) => {
        return {
            title: e.title,
            description: e.description,
            url: e.url,
            timestamp: e.timeStamp,
            color: e.color,
            footer: {
                text: e.footer,
                iconUrl: e.footerIconUrl,
            },
            image: e.imageUrl,
            thumbnail: e.thumbnailUrl,
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
    const [fn] = useResObj();
    function handleOnSubmit() {
        const x = fn({ label: '', id: 'head', message: '' }, collection);
        const res = {
            archiveChannelId: 'saket',
            modmailCategoryId: 'sakt',
            aiSupport: false,
            initialMessage: {
                message: {
                    content: headNodeData?.message, //TODO:
                    embeds: embeds, // TODO:
                },

                buttons: x.linkedComponent.button,
            },
        };
        console.log('data', res.initialMessage);
        const myHeaders = new Headers();
        myHeaders.append('accept', '*/*');
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append(
            'Authorization',
            'Bearer 8RCfuP7F252GaLNadq0vhEWcmHhOsj'
        );
        fetch('http://localhost:3000/editor/', {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(res),
        });
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
