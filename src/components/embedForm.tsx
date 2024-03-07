import { useRef, useState } from 'react';
import { Embed } from '../store/types';
import { cn } from '../utils';
import { useV2Store } from '../store/store';
import { ChevronDown, XCircle } from 'lucide-react';

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
            title: valueOf('title'),
            description: valueOf('disc'),
            color: valueOf('color'),
            url: valueOf('url'),
            footerText: valueOf('footer-text'),
            timeStamp: valueOf('timestamp'),
            footerIconUrl: valueOf('footer-icon-url'),
        };

        // console.log(obj);
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
