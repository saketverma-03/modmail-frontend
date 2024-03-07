import { useEffect, useState } from 'react';
import { useV2Store } from './store';
import { RadioGroup, Tab } from '@headlessui/react';
import { cn } from '../utils';
import { Card } from './Card';

export default function Tabs({ parentId }: { parentId: string }) {
    const subNodes = useV2Store((s) =>
        s.collection.filter((n) => n.parentId === parentId)
    );
    const [selected, setSelected] = useState(subNodes[0]);
    const addNode = useV2Store((s) => s.addNode);
    useEffect(() => {}, [selected]);
    if (subNodes.length === 0) {
        return (
            <button className="bg-green-300" onClick={() => addNode(parentId)}>
                Add Sub node
            </button>
        );
    }

    return (
        <>
            <TabBtn
                items={subNodes}
                value={selected}
                onChange={(v) => setSelected(v)}
                onAddBtnClick={() => addNode(parentId)}
            />
            {selected ? <Card key={selected.id} item={selected} /> : null}
            {selected ? <Tabs parentId={selected.id} /> : null}
        </>
    );
}

export function TabBtn({
    items,
    value,
    onChange,
    onAddBtnClick,
}: {
    items: { parentId: string; id: string; message: string }[];
    value: unknown;
    onChange?: (value: unknown) => void;
    onAddBtnClick?: () => void;
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
                        key={item.label}
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
                                                {item.label}
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
