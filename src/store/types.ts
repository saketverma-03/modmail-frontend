export type Collection = CollectionItem[];

export type CollectionItem = ContainerNode[];

export type ContainerNode = {
    id: string;
    title: string;
    content: string;
    attachments?: string;
};

export type Embed = {
    id: string;
    conNodeId: string;
    title?: string; // 0-246
    description?: string; // 0-4096
    url?: string;
    color?: string;
    imageUrl?: string;
    footerText?: string; // 0-2048
    footerIconUrl?: string;
    timeStamp?: string;
    fields?: Field[];
};

export type Field = {
    id: string;
    name: string; // 0-256
    value: string; // 0-1024
};
