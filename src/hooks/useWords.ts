import { useToast } from "@chakra-ui/react";
import words from '../words.json';

export const useWords = () => {

    const toast = useToast();

    //configurações das palavras do jogo
    const wordSize = 5;
    const columns = 8;
    const maxCells = wordSize * columns;

    const correctWord = words[Math.floor(Math.random() * words.length)];

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
