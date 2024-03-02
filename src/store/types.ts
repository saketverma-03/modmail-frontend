export type Collection = Container[];

export type Container = {
  title: string;
  content: string;
  attachments: string | undefined;
  embeds: embed[];
};

export type embed = {
  title: string; // 0-246
  description: string; // 0-4096
  url: string;
  color: string;
  imageUrl: string;
  footer: string; // 0-2048
  footerIconUrl: string;
  timeStamp: string;
  fields: field[];
};

export type field = {
  name: string; // 0-256
  value: string; // 0-1024
};
