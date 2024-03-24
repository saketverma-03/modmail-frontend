import { Wretch } from 'wretch/bundle/types';
import { TNode, mapResponse, transformEmbeds } from '../types';
import { Embed } from '../store/types';

export async function getConfigOfuser(api: Wretch) {
    const res = await api.get('/editor').json();
    const node: TNode[] = [];
    const embeds: Embed[] = [];

    const headEmbeds = res.data.initialMessage.message.embeds;
    if (headEmbeds) {
        headEmbeds.forEach((e) => {
            const temp = transformEmbeds(e, 'head');
            embeds.push(temp);
        });
    }
    node.push({
        id: 'head',
        message: res.data.initialMessage.message.content,
        parentId: '',
    });

    // mutating data
    mapResponse(
        res.data.initialMessage.buttons,
        'head',
        node,
        embeds
    );
    console.log({ node, embeds });
    return { node, embeds };
}

export async function getVerifyToken(api: Wretch, token: string) {
    return api.get(`/verify?$token=${token}`).json();
}

export async function postConfigUser(api: Wretch, data: unknown) {
    return api.post('/editor');
}
