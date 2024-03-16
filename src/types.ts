import { retry } from 'wretch/middlewares';
import { Embed as TEmbeds } from './store/types.ts';

export type Embed = {
    title?: string; // 256 character limit
    description?: string; // 4096 character limit
    url?: string; // url validation
    timestamp?: string; // ISO8601 timestamp
    color?: number; // 0x000000 - 0xFFFFFF
    footer?: {
        text: string; // 2048 character limit
        iconURL?: string; // url validation
    };
    image?: {
        url: string; // url validation
    };
    thumbnail?: {
        url: string; // url validation
    };
    video?: {
        url: string; // url validation
    };
    provider?: {
        name: string; // 256 character limit
        url: string; // url validation
    };
    author?: {
        name: string; // 256 character limit
        url: string; // url validation
        iconURL: string; // url validation
    };
    fields?: {
        name: string; // 256 character limit
        value: string; // 1024 character limit
        inline?: boolean;
    }[]; // 25 max fields
};

export type SupportMessage = {
    content: string; // 2000 character limit
    attachments?: string[]; // url validation
    embeds?: Embed[]; // max 10
};

export type ModmailConfig = {
    serverId: string; // server where the modmail was opened
    archiveChannelId: string; // server channel Id for threads (archived chat)
    modmailCategoryId: string; // server category Id for modmail
    aiSupport: boolean; // whether or not to use AI support
    initialMessage: MessageComponent; // initial message to send to users
};

export type MessageComponent = {
    message: SupportMessage;
    buttons: Button[]; // max 5
    // define max limit 5 in this type
};

export type Button = {
    label: string;
    linkedComponent: MessageComponent;
    emoji: string;
    style: string;
};
export type TNode = {
    id: string;
    parentId: string;
    message: string;
    label?: string;
};

//const node: TNode[] = [];
//let embeds: TEmbeds[] = [];
export function transformEmbeds(e: Embed, parentId: string): TEmbeds {
    console.log('remaping embed');
    return {
        title: e.title,
        id: crypto.randomUUID(),
        url: e.url,
        color: e.color,
        footer: e.footer?.text,
        footerIconUrl: e.footer?.text,
        timeStamp: e.timestamp,
        imageUrl: e.image?.url,
        description: e.description,
        thumbnailUrl: e.thumbnail?.url,
        conNodeId: parentId,
    };
}
export function mapResponse(b: Button[], parentId: string, node, embeds) {
    console.log({ fromFn: b });
    if (!b) {
        // console.log({ node, embeds });
        return;
    }
    b.map((i) => {
        const thisId = crypto.randomUUID();
        console.log({ ik: i.linkedComponent.embeds });
        node.push({
            id: thisId,
            parentId: parentId,
            label: i.label,
            message: i.linkedComponent.message.content,
        });
        // reformamte embeds
        const newEmbes = i.linkedComponent.embeds?.map((e) => {
            // console.log('here');
            return transformEmbeds(e, thisId);
        });
        // console.log({ newEmbes });
        if (newEmbes) {
            newEmbes.forEach((e) => embeds.push(e));
            // embeds = [...embeds, ...newEmbes];
            console.log({ embeds });
        }
        if (i.linkedComponent.button) {
            mapResponse(i.linkedComponent.button, thisId, node, embeds);
        }
    });

    //  console.log({ node, embeds });
}
