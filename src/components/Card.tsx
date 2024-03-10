import { cn } from '../utils';
import { TNode, useV2Store } from '../store/store';
import { EmbedForm } from './embedForm';
import { ListPlus, Trash } from 'lucide-react';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

export default function MyModal({ idToRemove }: { idToRemove: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const remove = useV2Store((s) => s.removeNode);

    function closeModal() {
        remove(idToRemove);
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    return (
        <>
            <div className="">
                <button
                    type="button"
                    onClick={openModal}
                    className=" hover:bg-red-950/50 text-red-900"
                >
                    <Trash />
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-0 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="bg-card bg-gradient-to-br from-red-950/60 to-yellow-950/40 backdrop-blur-xl p-8 pb-6 rounded-xl text-left  max-w-sm">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-xl font-medium leading-6 "
                                    >
                                        Delete Permenantely
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-white/70">
                                            All the buttons and embeds related
                                            to this card will also be removed
                                            permanently
                                        </p>
                                    </div>

                                    <div className="mt-6 grid grid-cols-2 gap-2">
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className=" hover:bg-primary/80"
                                        >
                                            cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="bg-yellow-900/60 shadow-xl hover:bg-yellow-700 border-2 w-full border-yellow-800"
                                            onClick={closeModal}
                                        >
                                            Sure!! delete this
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

export const Card = ({ item }: { item: TNode }) => {
    const [title, setTitle] = useState(item.label);
    const update = useV2Store((s) => s.updateNode);
    const embeds = useV2Store((s) =>
        s.embeds.filter((e) => e.conNodeId === item.id)
    );
    const addEmbed = useV2Store((s) => s.addEmbed);
    const [content, setContent] = useState(item.message);
    function handleOnBlur() {
        update({ ...item, label: title, message: content });
    }

    return (
        <>
            <div
                className={cn(
                    'p-4 pt-3  flex gap-4  flex-col bg-card/70  rounded-xl w-full max-w-[70vh]',
                    {
                        'hidden _': false,
                    }
                )}
            >
                <div className="flex gap-1">
                    <input
                        type="texi"
                        defaultValue={title}
                        maxLength={10}
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={() => handleOnBlur()}
                    />

                    <MyModal idToRemove={item.id} />
                </div>
                <textarea
                    className=" resize-none  p-2  rounded focus-visible:outline-none"
                    name=""
                    id=""
                    cols={30}
                    rows={10}
                    defaultValue={content}
                    onChange={(e) => setContent(e.target.value)}
                    onBlur={() => handleOnBlur()}
                ></textarea>
                <button
                    className="bg-green-900 hover:bg-green-900/80 shadow-sm "
                    onClick={() => addEmbed(item.id)}
                >
                    <ListPlus /> Add Embed
                </button>

                <div className="grid gap-2 ">
                    {embeds?.map((item) => <EmbedForm details={item} />)}
                </div>
            </div>
        </>
    );
};
