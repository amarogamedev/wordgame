import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const useWords = () => {

    const toast = useToast();

    //configurações das palavras do jogo
    const wordSize = 5;
    const columns = 8;
    const maxCells = wordSize * columns;

    const [words, setWords] = useState<string[]>([]);
    const [correctWord, setCorrectWord] = useState<string>("");

    const wordIsValid = (word: string) => {
        return words.includes(word.toLocaleLowerCase());
    };

    useEffect(() => {
        const fetchWords = async () => {
            try {
                const response = await fetch("/words.json");
                if (!response.ok) {
                    errorLoadingWords("Error loading words");
                }
                const data = await response.json();
                setWords(data);
                const randomWord = data[Math.floor(Math.random() * data.length)];
                setCorrectWord(randomWord);
            } catch (error) {
                errorLoadingWords(error);
            }
        };

        fetchWords();
    }, []);

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
