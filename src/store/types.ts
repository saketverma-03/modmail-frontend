export type Embed = {
    id: string;
    conNodeId: string;
    title?: string; // 0-246
    description?: string; // 0-4096
    url?: string;
    color?: string;

    imageUrl?: string;
    thumbnailUrl?: string;
    // footer content
    footer?: string; // 0-2048
    footerIconUrl?: string;
    timeStamp?: string;
    fields?: Map<string, field>;
};

export type field = {
    name: string; // 0-256
    value: string; // 0-1024
};
