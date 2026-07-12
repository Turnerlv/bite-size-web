export function formatDate(rawDateString) {
    if (!rawDateString) return "";

    return new Date(rawDateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}