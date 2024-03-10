import { useRef, useState } from 'react';
import { Embed } from '../store/types';
import { cn } from '../utils';
import { useV2Store } from '../store/store';
import { ChevronDown, XCircle } from 'lucide-react';
import { z as t } from 'zod';
import { Value } from '@sinclair/typebox/value';

const validator = t.object({
    id: t.string(),
    conNodeId: t.string(),
    title: t.optional(t.string()),
    description: t.optional(t.string()),
    url: t.optional(t.string().url('Field url must be of type url')),
    color: t.optional(t.string()),
    imageUrl: t.optional(t.string()),
    thumbnailUrl: t.optional(t.string()),
    footer: t.optional(t.string()),
    footerIconUrl: t.optional(t.string()),
    timeStamp: t.optional(t.string()),
});

export const EmbedForm = ({ details }: { details: Embed }) => {
    const formRef = useRef<HTMLFormElement>();
    const [show, setShow] = useState(false);
    const remove = useV2Store((s) => s.removeEmbed);
    const update = useV2Store((s) => s.updateEmbed);
    const valueOf = (filed: string) => formRef.current[filed].value;

    function handleSubmit() {
        const obj: Embed = {
            id: details.id,
            conNodeId: details.conNodeId,
            title: valueOf('title') || undefined,
            description: valueOf('disc') || undefined,
            color: valueOf('color') || undefined,
            url: valueOf('url') || undefined,
            footer: valueOf('footer-text') || undefined,
            timeStamp: valueOf('timestamp') || undefined,
            footerIconUrl: valueOf('footer-icon-url') || undefined,
            imageUrl: valueOf('img-url') || undefined,
            thumbnailUrl: valueOf('thumb-url') || undefined,
        };

        // console.log(obj);
        const a = validator.parse(obj);

        console.log({ a });
        console.log(document.getElementById('title'));
        update(details.id, obj);
    }
    return (
        <>
            <div className="flex">
                <button
                    className="hover:bg-primary/30 flex-1 bg-gray-950/70 flex gap-2 mr-1"
                    onClick={() => setShow((s) => !s)}
                >
                    <span className="inline-block mr-auto ">Show Embed</span>{' '}
                    <ChevronDown
                        data-show={show}
                        className='data-[show="true"]:rotate-180 transition-transform'
                    />{' '}
                </button>
                <button
                    title="remove embed"
                    className="opacity-70 hover:opacity-80 text-red-800 hover:bg-red-900/30"
                    onClick={() => remove(details.id)}
                >
                    <XCircle />
                </button>
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
                        Content
                    </label>
                    <textarea
                        name="disc"
                        id="disc"
                        defaultValue={details?.description}
                        placeholder="Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."
                        onBlur={handleSubmit}
                        cols={30}
                        rows={10}
                    ></textarea>
                    <div className="grid grid-cols-2 gap-1">
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
                    {/*image & thumbnail*/}

                    <div title="footer" className="grid grid-cols-2 gap-1">
                        <label htmlFor="" className="embed-label">
                            Image url{' '}
                        </label>

                        <label htmlFor="" className="embed-label">
                            Thumbnail url
                        </label>
                        <input id="img-url" type="url" onBlur={handleSubmit} />

                        <input
                            type="datetime-local"
                            id="thumb-url"
                            type="url"
                            onBlur={handleSubmit}
                        />
                    </div>

                    {/*Footer*/}
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
                            Footer Icon
                        </label>

                        <label htmlFor="" className="embed-label">
                            Time Stamp
                        </label>
                        <input id="footer-icon-url" onBlur={handleSubmit} />

                        <input
                            type="datetime-local"
                            id="timestamp"
                            onBlur={handleSubmit}
                        />
                    </div>
                </div>
            </form>
        </>
    );
};

/**
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

**/
