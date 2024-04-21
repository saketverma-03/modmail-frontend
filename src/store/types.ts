export type Embed = {
    id: string;
    conNodeId: string;
    title?: string; // 0-246
    description?: string; // 0-4096
    url?: string;
    color?: number;

    imageUrl?: string;
    thumbnailUrl?: string;
    // footer content
    footer?: string; // 0-2048
    footerIconUrl?: string;
    timeStamp?: string;
    // attachments: Attachments[];
};

export type Attachments = {
    id: string;
    title: string;
    url: string;
};
