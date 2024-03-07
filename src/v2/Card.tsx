import { useEffect, useState } from 'react';
import { cn } from '../utils';
import { useV2Store } from './store';
import { EmbedForm } from '../components/embedForm';

export const Card = ({ item }: { item: any }) => {
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
                    'p-4 pt-3 border flex flex-col bg-card max-w-4xl rounded ',
                    {
                        'hidden _': false,
                    }
                )}
            >
                <input
                    type="texi"
                    defaultValue={title}
                    maxLength={10}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={(e) => handleOnBlur()}
                />
                <textarea
                    className=" resize-none  p-2 my-2 rounded focus-visible:outline-none"
                    name=""
                    id=""
                    cols={30}
                    rows={10}
                    defaultValue={content}
                    onChange={(e) => setContent(e.target.value)}
                    onBlur={(e) => handleOnBlur()}
                ></textarea>
                <button onClick={() => addEmbed(item.id)}>add</button>
                {embeds?.map((item) => <EmbedForm details={item} />)}
            </div>
        </>
    );
};
