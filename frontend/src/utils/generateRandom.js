/**
 * Generates a random word of a given length.
 * @param {number} length - Length of the word to generate.
 * @returns {string} Randomly generated word.
 */
function generateRandomWord(length = 6) {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    let word = '';
    for (let i = 0; i < length; i++) {
        word += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return word;
}

export default generateRandomWord;