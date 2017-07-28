function countWords(str) {
    return str.trim().length === 0 ? str.trim().length : str.trim().replace(/\s+/g, ' ').split(' ').length;
}