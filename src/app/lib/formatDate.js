export default function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' }); // "July"
    const year = date.getFullYear();

    // Add ordinal suffix
    const getOrdinal = (n) => {
        if (n > 3 && n < 21) return n + 'th';
        switch (n % 10) {
            case 1: return n + 'st';
            case 2: return n + 'nd';
            case 3: return n + 'rd';
            default: return n + 'th';
        }
    };

    return `${getOrdinal(day)} ${month.slice(0,3)} ${year}`;
}