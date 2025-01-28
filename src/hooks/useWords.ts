import { useToast } from "@chakra-ui/react";
import words from '../words.json';

export const useWords = () => {

    const toast = useToast();

    //configurações das palavras do jogo
    const wordSize = 5;
    const columns = 8;
    const maxCells = wordSize * columns;

    //limitamos a 1000 palavras pois as mais "normais" aparecem mais acima
    const correctWord = words[Math.floor(Math.random() * 1000)];

    const wordIsValid = (word: string) => {
        return words.includes(word);
    };

    function errorLoadingWords(error: any) {
        toast({
            title: "Error",
            description: error,
            status: "error",
            duration: 3000,
            isClosable: true,
        });
    }

    return {
        correctWord, wordSize, maxCells, wordIsValid
    };
};
