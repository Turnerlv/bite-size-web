'use client';

import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import formatEditorDataForDB from '@/utils/formatFromEditor';
import formatDBDataForEditor from '@/utils/formatToEditor';

const RichText = React.forwardRef(function RichText({ defaultContent }, ref) {
    const editorRef = useRef(null);
    const holderRef = useRef(null);
    const [isEditorReady, setIsEditorReady] = useState(false);
    const [editorError, setEditorError] = useState('');

    useImperativeHandle(ref, () => ({
        async save() {
            if (!editorRef.current) return '';
            const rawData = await editorRef.current.save();
            return formatEditorDataForDB(rawData);
        },
        async clear() {
            if (editorRef.current?.clear) {
                await editorRef.current.clear();
            }
        },
    }));

    useEffect(() => {
        let isMounted = true;

        const initEditor = async () => {
            try {
                setEditorError('');

                const [{ default: EditorJS }, headerModule, listModule, paragraphModule] = await Promise.all([
                    import('@editorjs/editorjs'),
                    import('@editorjs/header'),
                    import('@editorjs/list'),
                    import('@editorjs/paragraph'),
                ]);

                const Header = headerModule?.default ?? headerModule;
                const List = listModule?.default ?? listModule;
                const Paragraph = paragraphModule?.default ?? paragraphModule;

                if (!isMounted || !holderRef.current || !Header || !List || !Paragraph) return;

                const editor = new EditorJS({
                    holder: holderRef.current,
                    data: defaultContent ? formatDBDataForEditor(defaultContent) : undefined,
                    autofocus: true,
                    placeholder: 'Write your blog post...',
                    tools: {
                        paragraph: { class: Paragraph, inlineToolbar: true },
                        header: { class: Header, inlineToolbar: true },
                        list: { class: List, inlineToolbar: true },
                    },
                });

                await editor.isReady;

                if (!isMounted) {
                    editor.destroy();
                    return;
                }

                editorRef.current = editor;
                setIsEditorReady(true);
            } catch (reason) {
                const message = reason instanceof Error ? reason.message : String(reason);
                setEditorError(message);
            }
        };

        initEditor();

        return () => {
            isMounted = false;
            setIsEditorReady(false);
            if (editorRef.current) {
                editorRef.current.destroy();
                editorRef.current = null;
            }
        };
    }, []);

    return (
        <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-foreground">Body</p>
            <div
                id="editorjs"
                ref={holderRef}
                className="blog-editor blog-editor-theme min-h-[320px] rounded-[1.625rem] border border-border bg-transparent p-4"
            />
            {!isEditorReady && !editorError && (
                <p className="text-sm text-gray-500">Loading editor...</p>
            )}
            {editorError && (
                <p className="text-sm text-red-600">Editor failed to initialize: {editorError}</p>
            )}
        </div>
    );
});

export default RichText;
