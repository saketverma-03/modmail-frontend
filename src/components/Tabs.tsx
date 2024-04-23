import { useState } from 'react';
import { TNode, useV2Store } from '../store/store';
import { RadioGroup } from '@headlessui/react';
import { cn } from '../utils';
import { Card } from './Card';
import { GitMergeIcon, PlusIcon } from 'lucide-react';

export default function Tabs({ parentId }: { parentId: string }) {
    const subNodes = useV2Store((s) =>
        s.collection.filter((n) => n.parentId === parentId)
    );
    const [selected, setSelected] = useState(subNodes[0]);
    const addNode = useV2Store((s) => s.addNode);
    if (subNodes.length === 0) {
        return (
            <button
                className="flex gap-2 rounded-full text-purple-300 hover:bg-purple-700 border-2 border-purple-600"
                onClick={() => addNode(parentId)}
            >
                <GitMergeIcon />
                <span className="inline-block">Add Buttons</span>
            </button>
        );
    }

    return (
        <>
            <TabBtn
                items={subNodes}
                value={selected}
                key={parentId}
                onChange={(v) => setSelected(v as TNode)}
                onAddBtnClick={() => addNode(parentId)}
            />
            {/* Render selected card */}
            {selected ? (
                <Card key={parentId + selected.id} item={selected} />
            ) : null}
            {/* child btns of the selected card */}
            {selected ? (
                <Tabs key={selected.id + parentId} parentId={selected.id} />
            ) : null}
        </>
    );
}

export function TabBtn({
    items,
    value,
    onChange,
    onAddBtnClick,
}: {
    items: TNode[];
    value: unknown;
    onChange?: (value: unknown) => void;
    onAddBtnClick?: () => void;
}) {
    return (
        <RadioGroup value={value} onChange={onChange}>
            <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
            <div className="gap-2 flex mt-12 mb-4">
                <button
                    onClick={onAddBtnClick}
                    className="p-2 rounded-xl hover:primary/20 border"
                >
                    <PlusIcon />
                </button>
                {items?.map((item) => (
                    <RadioGroup.Option
                        key={item.id}
                        value={item}
                        className={({ checked }) =>
                            cn(
                                'p-2 flex justify-center items-center bg-primary/10 rounded-xl hover:bg-primary/20 border ',
                                {
                                    'bg-purple-700 border-purple-500/60 hover:bg-purple-700/80':
                                        checked,
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
