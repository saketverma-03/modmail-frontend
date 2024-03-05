import { useEffect, useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { ContainerNode } from '../store/types';
import { cn } from '../utils';
import { useCollectionStore } from '../store';
import { EmbedForm } from './embedForm';
export const Card = ({
    idx,
    items,
}: {
    idx: number;
    items: ContainerNode[];
}) => {
    const [selected, setSelected] = useState(items[0]);
    const handleSelectChange = (value: ContainerNode) => {
        setSelected(value);
    };
    const addSubNode = useCollectionStore((s) => s.addSubNode);
    const updateCardTitle = useCollectionStore((s) => s.updateTitleOfCard);
    const updateCardContent = useCollectionStore((s) => s.updateContentOfCard);
    const handleAddTabBtn = () => addSubNode(idx);
    return (
        <>
            <div className="flex flex-col gap-8 mb-12 items-center w-full ">
                {idx !== 0 ? (
                    <TabBtn
                        items={items}
                        value={selected}
                        onChange={handleSelectChange}
                        onAddBtnClick={handleAddTabBtn}
                    />
                ) : undefined}

                {items.map((item) => {
                    return (
                        <>
                            <CardBody
                                updateTitle={(text: string) =>
                                    updateCardTitle(idx, item.id, text)
                                }
                                updateContent={(text: string) =>
                                    updateCardContent(idx, item.id, text)
                                }
                                key={items[0].id}
                                id={selected.id}
                                item={item}
                            />
                        </>
                    );
                })}
            </div>
        </>
    );
};

const CardBody = ({
    id,
    item,
    updateTitle,
    updateContent,
}: {
    id: string;
    item: ContainerNode;
    updateTitle: (text: string) => void;
    updateContent: (text: string) => void;
}) => {
    const [title, setTitle] = useState(item.title);
    const embeds = useCollectionStore((s) =>
        s.embeds.filter((embed) => embed.conNodeId === item.id)
    );
    const addNewEmbed = useCollectionStore((s) => s.addEmbed);
    useEffect(() => {
        updateTitle(title);
    }, [title]);

    const [content, setContent] = useState(item.content);
    useEffect(() => {
        updateContent(content);
    }, [content]);
    return (
        <>
            <div
                className={cn(
                    'p-4 pt-3 border flex flex-col bg-card max-w-4xl rounded ',
                    {
                        'hidden _': id !== item.id,
                    }
                )}
            >
                <input
                    type="texi"
                    defaultValue={item.title}
                    maxLength={10}
                    onBlur={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className=" resize-none  p-2 my-2 rounded focus-visible:outline-none"
                    name=""
                    id=""
                    cols={30}
                    rows={10}
                    defaultValue={item.content}
                    onBlur={(e) => setContent(e.target.value)}
                ></textarea>
                <button
                    className="bg-primary hover:bg-primary/70"
                    onClick={() => addNewEmbed(item.id)}
                >
                    Add embed
                </button>
                {embeds.map((embed) => {
                    return (
                        <>
                            <EmbedForm key={embed.id} details={embed} />
                        </>
                    );
                })}
            </div>
        </>
    );
};

export default function TabBtn({
    items,
    value,
    onChange,
    onAddBtnClick,
}: {
    items: ContainerNode[];
    value: unknown;
    onChange: (value: unknown) => void;
    onAddBtnClick: () => void;
}) {
    return (
        <RadioGroup value={value} onChange={onChange}>
            <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
            <div className="gap-2 flex">
                <button
                    onClick={onAddBtnClick}
                    className="p-2 rounded-xl hover:bg-muted border"
                >
                    +
                </button>
                {items?.map((item) => (
                    <RadioGroup.Option
                        key={item.id}
                        value={item}
                        className={({ checked }) =>
                            cn(
                                'p-2 flex justify-center items-center rounded-xl hover:bg-muted border',
                                {
                                    'bg-primary hover:bg-primary/80': checked,
                                }
                            )
                        }
                    >
                        {({ checked }) => (
                            <>
                                <div className="flex w-full items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="text-sm">
                                            <RadioGroup.Label
                                                as="p"
                                                className={cn('font-medium', {
                                                    'text-primary-foreground':
                                                        checked,
                                                })}
                                            >
                                                {item.title}
                                            </RadioGroup.Label>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </RadioGroup.Option>
                ))}
            </div>
        </RadioGroup>
    );
}
