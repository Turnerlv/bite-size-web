export default function formatDBDataForEditor(dbArray) {
    if (!Array.isArray(dbArray)) return { blocks: [] };

    const blocks = dbArray.map(block => {
        let adjustedType = block.type;
        let adjustedData = { ...block.data };

        // 1. Convert 'subheading' back to Editor.js 'header'
        if (adjustedType === 'subheading') {
            adjustedType = 'header';
        }

        // 2. Convert 'unorderedList' back to Editor.js 'list'
        if (adjustedType === 'unorderedList') {
            adjustedType = 'list';
            adjustedData.style = 'unordered';
        }

        // 3. Convert 'orderedList' back to Editor.js 'list'
        if (adjustedType === 'orderedList') {
            adjustedType = 'list';
            adjustedData.style = 'ordered';
        }

        // 4. Convert 'labeledList' back to Editor.js 'list'
        if (adjustedType === 'labeledList' && Array.isArray(adjustedData.items)) {
            adjustedType = 'list';
            adjustedData.style = 'unordered';
            adjustedData.items = adjustedData.items.map(item => {
                const contentStr = item.content ? ` ${item.content}` : '';
                return `**${item.label}**${contentStr}`;
            });
        }

        // 4. Generate a random 10-character alphanumeric ID (Editor.js standard)
        const generatedId = Math.random().toString(36).substring(2, 12);

        return {
            id: generatedId,
            type: adjustedType,
            data: adjustedData
        };
    });

    // 5. Wrap it in the top-level object Editor.js demands
    return { blocks };
}