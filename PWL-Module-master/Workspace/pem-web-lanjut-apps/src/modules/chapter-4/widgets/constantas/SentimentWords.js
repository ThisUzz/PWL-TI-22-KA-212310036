const SentimentWords = ["fuck", "bangsat", "asu", "shit", "bego"];

const FilterWords = (message) => {
    let newValue = message;

    let words = newValue.split(' ');
    for (let i = 0; i < words.length; i++) {
        if (SentimentWords.includes(words[i].toLowerCase())) {
            words[i] = '*'.repeat(words[i].length);
        }
    }

    newValue = words.join(' ');
    return newValue;
}
export { FilterWords }