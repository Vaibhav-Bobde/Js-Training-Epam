function countWords(str) {
    str = str.trim();
    return str.length === 0 ? str.length : str.replace(/\s+/g, ' ').split(' ').length;
}