import { useState, useEffect } from "react";
import { Cell } from "../interfaces/cell";
import { useToast } from "@chakra-ui/react";
import { useWords } from "./useWords";

export const useGame = () => {
    const [cells, setCells] = useState<Cell[]>([]);
    const [gameEnded, setGameEnded] = useState(false);
    const { correctWord, wordSize, maxCells, wordIsValid, pickAnotherWord } = useWords();
    
    const toast = useToast();

    const addCell = (character: string) => {
        setCells((prevCells) => {
            const newCells = [
                ...prevCells,
                {
                    character: character,
                    typing: true,
                    selected: false,
                    correctPlace: false,
                    existsInTheWord: false,
                },
            ];

            if (newCells.length % wordSize === 0) {
                checkWord(newCells, newCells.length === maxCells);
            }

            return newCells;
        });
    };

    function checkWord(newCells: Cell[], lastChance: boolean) {
        const currentWord = newCells.slice(-wordSize).map(cell => cell.character).join('');
        const wordExists = wordIsValid(currentWord);

        const letterCount: { [key: string]: number } = {};
        const correctLetterCount: { [key: string]: number } = {};

        //contamos quantas vezes cada letra aparece na palavra correta
        for (const char of correctWord) {
            correctLetterCount[char] = (correctLetterCount[char] || 0) + 1;
        }

        const updatedCells = newCells.slice(-wordSize).map((cell, index) => {
            let existsInTheWord = false;
            if (correctWord.includes(cell.character)) {
                //incrementamos a contagem de letras da palavra inputada
                letterCount[cell.character] = (letterCount[cell.character] || 0) + 1;
                
                if (letterCount[cell.character] <= correctLetterCount[cell.character]) {
                    existsInTheWord = true;
                }
            }

            const correctPlace = cell.character === correctWord[index];

            return {
                ...cell,
                correctPlace,
                existsInTheWord,
                typing: false
            };
        });

        setCells(prevCells => [
            ...prevCells.slice(0, -wordSize),
            ...(wordExists ? updatedCells : [])
        ]);

        if(currentWord === correctWord) {
            win();
        }
        else if(!wordExists) {
            invalidWord();
        }
        else if(lastChance) {
            lose();
        }
    };

    const removeLastCharacter = () => {
        setCells((prevCells) => {
            const lastCellIndex = prevCells.length - 1;
            if (lastCellIndex >= 0 && prevCells[lastCellIndex].typing) {
                return prevCells.slice(0, -1);
            }
            return prevCells;
        });
    };

    useEffect(() => {
        if(gameEnded) {
            return;
        }

        const handleKeydown = (event: KeyboardEvent) => {
            if (/^[a-zA-Z]$/.test(event.key)) {
                addCell(event.key.toLocaleUpperCase());
            } else if (event.key === "Backspace") {
                removeLastCharacter();
            }
        };

        window.addEventListener("keydown", handleKeydown);

        return () => {
            window.removeEventListener("keydown", handleKeydown);
        };
    }, []);

    function lose() {
        setGameEnded(true);
        toast({
            title: "You lose!",
            description: "The word was: " + correctWord,
            status: "error",
            duration: 3000,
            isClosable: true,
        });
    }

    function win() {
        setGameEnded(true);
        toast({
            title: "You win!",
            description: "Congratulations! You found the word!",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    }

    function invalidWord() {
        toast({
            title: "Invalid word!",
            description: "This word does not exist in our dictionary",
            status: "warning",
            duration: 3000,
            isClosable: true,
        });
    }

    const resetGame = () => {
        setCells([]);
        setGameEnded(false);
        pickAnotherWord();
    };

    return {
        cells,
        maxCells,
        wordSize,
        resetGame
    };
};
