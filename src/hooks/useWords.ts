import words from '../words.json';

export const useWords = () => {
    //configurações das palavras do jogo
    const wordSize = 5;
    const columns = 8;
    const maxCells = wordSize * columns;

    //limitamos a 1000 palavras pois as mais "normais" aparecem mais acima
    let correctWord = words[Math.floor(Math.random() * 1000)];

    const wordIsValid = (word: string) => {
        return words.includes(word);
    };

    function pickAnotherWord () {
        correctWord = words[Math.floor(Math.random() * 1000)];
    }

    return {
        correctWord, wordSize, maxCells, wordIsValid, pickAnotherWord
    };
};
