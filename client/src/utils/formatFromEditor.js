export default function formatEditorDataForDB(editorResponse) {
    // 1. Extract the blocks array, defaulting to an empty array if empty
    const blocks = editorResponse?.blocks || [];

    // 2. Map over each block to transform it into your target database schema
    return blocks.map(block => {
        // Smooth over the block type variance ('header' -> 'subheading')
        let adjustedType = block.type === 'header' ? 'subheading' : block.type;
        let adjustedData = { ...block.data };

        // 3. Intercept bullet lists to check for your labeled list format
        if (block.type === 'list' && block.data?.items) {

            // EditorJS list plugin v2 outputs object items: { content: "<b>Label</b>\ntext", meta, items }
            const htmlLabelRegex = /^<b>(.*?)<\/b>\s*([\s\S]*)/;
            const isObjectItems = block.data.items.every(item => typeof item === 'object' && item !== null && 'content' in item);

            if (isObjectItems) {
                const isLabeledList = block.data.items.every(item => htmlLabelRegex.test(item.content));

                if (isLabeledList) {
                    adjustedType = 'labeledList';
                    adjustedData.items = block.data.items.map(item => {
                        const match = item.content.match(htmlLabelRegex);
                        return {
                            label: match[1].trim(),
                            content: match[2].trim()
                        };
                    });
                } else {
                    adjustedType = block.data.style === 'ordered' ? 'orderedList' : 'unorderedList';
                    adjustedData.items = block.data.items.map(item => item.content ?? item);
                }
            } else {
                // Legacy: plain string items with **markdown bold**
                const labeledListRegex = /^\*\*(.*?)\*\*[:\s]*(.*)/;
                const isLabeledList = block.data.items.every(item => labeledListRegex.test(item));

                if (isLabeledList) {
                    adjustedType = 'labeledList';
                    adjustedData.items = block.data.items.map(item => {
                        const match = item.match(labeledListRegex);
                        return {
                            label: match[1].trim(),
                            content: match[2].trim()
                        };
                    });
                } else {
                    adjustedType = block.data.style === 'ordered' ? 'orderedList' : 'unorderedList';
                }
            }
        }

        return {
            data: adjustedData,
            type: adjustedType
        };
    });
}