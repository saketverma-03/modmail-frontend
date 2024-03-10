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
