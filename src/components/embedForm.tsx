import { FormEvent, useEffect, useRef, useState } from 'react';
import { Embed, Field } from '../store/types';
import { cn } from '../utils';
import { useV2Store } from '../v2/store';

export const EmbedForm = ({ details }: { details: Embed }) => {
    const formRef = useRef<HTMLFormElement>();
    const [show, setShow] = useState(false);
    const remove = useV2Store((s) => s.removeEmbed);
    const update = useV2Store((s) => s.updateEmbed);
    const valueOf = (filed: string) => formRef.current[filed].value;
    const [fields, setFileds] = useState<
        { id: string; name: string; value: string }[]
    >([]);
    useEffect(() => {
        handleSubmit();
    }, [fields]);

    function handleSubmit() {
        const obj: Embed = {
            id: details.id,
            conNodeId: details.conNodeId,
            title: valueOf('title'),
            description: valueOf('disc'),
            color: valueOf('color'),
            url: valueOf('url'),
            footerText: valueOf('footer-text'),
            timeStamp: valueOf('timestamp'),
            footerIconUrl: valueOf('footer-icon-url'),
            fields: fields.map((f) => ({ name: f.name, value: f.value })),
        };

        console.log(obj);
        update(details.id, obj);
    }
    return (
        <>
            <div className="flex">
                <button
                    className="hover:bg-primary/30 flex-1"
                    onClick={() => setShow((s) => !s)}
                >
                    show embed
                </button>
                <button onClick={() => remove(details.id)}>DELETE</button>
            </div>
            <form
                ref={formRef}
                className={cn('embed', { hidden: !show })}
                action=""
                onSubmit={(e) => e.preventDefault()}
            >
                <div className="flex flex-col">
                    <label htmlFor="title" className="mt-4 mb-2">
                        <span>Title</span>
                    </label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Title"
                        defaultValue={details?.title}
                        onBlur={handleSubmit}
                    />
                    <label htmlFor="disc" className="mt-4 mb-2">
                        Discription
                    </label>
                    <textarea
                        name="disc"
                        id="disc"
                        defaultValue={details?.description}
                        onBlur={handleSubmit}
                        cols={30}
                        rows={10}
                    ></textarea>
                    <div className="grid grid-cols-2">
                        <label className="embed-label" htmlFor="">
                            {' '}
                            url
                        </label>

                        <label className="embed-label" htmlFor="">
                            {' '}
                            color
                        </label>
                        <input
                            type="url"
                            id="url"
                            defaultValue={details?.url}
                            className="flex-1"
                            onBlur={handleSubmit}
                        />
                        <input
                            id="color"
                            defaultValue={details?.color}
                            type="color"
                            onBlur={handleSubmit}
                        />
                    </div>
                    <div title="footer" className="grid grid-cols-2 gap-1">
                        <label htmlFor="" className="col-span-2 embed-label">
                            Footer Text
                        </label>
                        <input
                            type="text"
                            id="footer-text"
                            defaultValue={details?.footer}
                            onBlur={handleSubmit}
                            className="col-span-2"
                        />
                        <label htmlFor="" className="embed-label">
                            Image url
                        </label>

                        <label htmlFor="" className="embed-label">
                            Time Stamp
                        </label>
                        <input id="footer-icon-url" onBlur={handleSubmit} />

                        <input
                            type="date"
                            id="timestamp"
                            onBlur={handleSubmit}
                        />
                    </div>

                    <button className="btn my-4 w-fit">Add fields</button>
                </div>
            </form>
        </>
    );
};

const FieldForm = ({
    id,
    name,
    value,
    handleUpdate,
}: {
    id: string;
    name: string;
    value: string;
    handleUpdate: any;
}) => {
    const nameRef = useRef();
    const valRef = useRef();

    return (
        <>
            <div className="grid grid-cols-2">
                <label htmlFor="">Name</label>
                <label htmlFor="">Value</label>
                <input
                    type="text"
                    ref={nameRef}
                    placeholder="Ashok"
                    defaultValue={name}
                    onBlur={handleChange}
                />
                <input
                    type="text"
                    ref={valRef}
                    placeholder="cant dance"
                    defaultValue={value}
                    onBlur={handleChange}
                />
            </div>
        </>
    );
};
