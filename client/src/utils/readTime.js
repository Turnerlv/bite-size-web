export function calculateReadTime(content, wordsPerMinute = 200) {
    if (!content) return '0 min read';

    // 1. If content is an object/array (like from a block-based CMS), 
    // turn it into a raw string first.
    let text = typeof content === 'string' ? content : JSON.stringify(content);

    // 2. Clean up the text: strip HTML tags and Markdown syntax
    const cleanText = text
        .replace(/<\/?[^>]+(>|$)/g, "") // Strips HTML tags
        .replace(/[#*`_\[\]()]/g, "");   // Strips basic markdown symbols

    // 3. Split the text by spaces to count the words
    const words = cleanText.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;

    // 4. Calculate minutes and round up so you never see "0 min read"
    const minutes = Math.ceil(wordCount / wordsPerMinute);

    return minutes <= 1 ? '1 minute' : `${minutes} minutes`;
}